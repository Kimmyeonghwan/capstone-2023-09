import 'dart:async';
import 'dart:developer';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
// import 'firebase_options.dart';
// import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import "package:permission_handler/permission_handler.dart";
import 'package:flutter/services.dart';

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print("백그라운드 메시지 처리.. ${message.notification!.body!}");
}

void initializeNotification() async {
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  final flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(const AndroidNotificationChannel(
          'high_importance_channel', 'high_importance_notification',
          importance: Importance.max));

  await flutterLocalNotificationsPlugin.initialize(const InitializationSettings(
    android: AndroidInitializationSettings("@mipmap/ic_launcher"),
  ));

  await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
    alert: true,
    badge: true,
    sound: true,
  );
}

Future<void> main() async {
  await Future.delayed(Duration(seconds: 1));
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  initializeNotification();
  runApp(
    const MaterialApp(
      home: WebViewApp(),
    ),
  );
}

class WebViewApp extends StatefulWidget {
  const WebViewApp({Key? key}) : super(key: key);

  @override
  State<WebViewApp> createState() => _WebViewAppState();
}

class _WebViewAppState extends State<WebViewApp> {
  InAppWebViewController? _webViewController;

  final Completer<InAppWebViewController> _completerController =
      Completer<InAppWebViewController>();
  var messageString = "";
  var deviceToken = "";
  Uri webUrl = Uri.parse('http://13.125.249.51/');

  final GlobalKey webViewKey = GlobalKey();

  void getMyDeviceToken() async {
    final token = await FirebaseMessaging.instance.getToken();
    setState(() {
      deviceToken = token!;
    });
    print("내 디바이스 토큰: $deviceToken");
  }

  Future<bool> requestCameraPermission(BuildContext context) async {
    Map<Permission, PermissionStatus> statuses = await [
      Permission.camera,
      Permission.storage,
    ].request();
    if (statuses[Permission.camera]!.isGranted == false ||
        statuses[Permission.storage]!.isGranted == false) {
      // 허용이 안된 경우
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              content: Text("알림, 사진 및 동영상, 카메라에 대한 권한을 허용해주세요."),
              actions: [
                ElevatedButton(
                    onPressed: () {
                      openAppSettings(); // 앱 설정으로 이동
                    },
                    child: Text('설정하러 가기')),
              ],
            );
          });
      print("permission denied by user");
      return false;
    }
    print("permission ok");
    return true;
  }

  @override
  void initState() {
    // if (Platform.isAndroid) {
    //   WebView.platform = SurfaceAndroidWebView();
    // }
    getMyDeviceToken();
    FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      RemoteNotification? notification = message.notification;

      if (notification != null) {
        FlutterLocalNotificationsPlugin().show(
          notification.hashCode,
          notification.title,
          notification.body,
          const NotificationDetails(
            android: AndroidNotificationDetails(
              'high_importance_channel',
              'high_importance_notification',
              importance: Importance.max,
            ),
          ),
        );
        setState(() {
          messageString = message.notification!.body!;
          print("Foreground 메시지 수신: $messageString");
        });
      }
    });

    FirebaseMessaging.onMessageOpenedApp.listen(_handleMessage);

    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown
    ]); // 세로 고정

    super.initState();
  }

  void _handleMessage(RemoteMessage? message) {
    // 앱이 켜져 있지 않은 상태에서 푸시 클릭 시 알림함 화면으로 바로 이동
    if (_webViewController == null) {
      setState(() {
        webUrl = Uri.parse("http://13.125.249.51/notification");
      });
    } else {
      _webViewController!.loadUrl(
          urlRequest:
              URLRequest(url: Uri.parse("http://13.125.249.51/notification")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () => _goBack(context),
        child: Scaffold(
            body: Padding(
                padding: EdgeInsets.only(
                    top: MediaQuery.of(context).viewPadding.top),
                child: Container(
                  width: double.infinity,
                  height: double.infinity,
                  child: InAppWebView(
                    key: webViewKey,
                    onWebViewCreated:
                        (InAppWebViewController webViewController) async {
                      _completerController.future
                          .then((value) => _webViewController = value);
                      _completerController.complete(webViewController);
                      webViewController.addJavaScriptHandler(
                          //  디바이스 토큰을 웹뷰에 전달
                          handlerName: 'getDeviceToken',
                          callback: (args) {
                            return deviceToken;
                          });
                      // 앱이 꺼졌다가 켜졌을 경우에 화면 이동 시킴
                      webViewController.loadUrl(
                          urlRequest: URLRequest(url: webUrl));
                      // 앱 화면을 열 떄마다 권한 체크
                      await requestCameraPermission(context);
                    },
                    initialUrlRequest: URLRequest(url: webUrl),
                    initialOptions: InAppWebViewGroupOptions(
                      crossPlatform: InAppWebViewOptions(
                        javaScriptCanOpenWindowsAutomatically:
                            true, // 자바스크립트 새 창 실행 허용
                        javaScriptEnabled: true, // 자바스크립트 실행 허용
                        useOnDownloadStart: true,
                        useOnLoadResource: true,
                        allowFileAccessFromFileURLs: true,
                        verticalScrollBarEnabled: true,
                      ),
                      android: AndroidInAppWebViewOptions(
                          allowContentAccess: true,
                          builtInZoomControls: true,
                          thirdPartyCookiesEnabled: true,
                          allowFileAccess: true,
                          supportMultipleWindows: true // 새 창 실행 허용
                          ),
                    ),
                    onConsoleMessage: (InAppWebViewController controller,
                        ConsoleMessage consoleMessage) {
                      // 웹에서 찍은 콘솔 볼 수 있음
                      log("WEB CONSOLE: ${consoleMessage.message}");
                    },
                  ),
                ))));
  }

  Future<bool> _goBack(BuildContext context) async {
    // 앱을 닫은 경우 로그인 화면으로 이동
    if (_webViewController == null) {
      setState(() {
        webUrl = Uri.parse("http://13.125.249.51/");
      });
      return true;
    }
    if (await _webViewController!.canGoBack()) {
      _webViewController!.goBack();
      return Future.value(false);
    } else {
      _webViewController!.loadUrl(
          urlRequest: URLRequest(url: Uri.parse("http://13.125.249.51/")));
      return Future.value(true);
    }
  }
}
