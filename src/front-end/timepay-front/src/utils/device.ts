export const isMobileWidth = (windowWidth: number) => windowWidth <= 600;

export const getDeviceToken = async () => {
  let deviceToken;
  if (window && window.flutter_inappwebview)
    deviceToken = await window.flutter_inappwebview?.callHandler(
      'getDeviceToken',
      '',
    );

  return deviceToken;
};
