export {};

declare global {
  interface Window {
    serverTimeDiff?: number;
    fbq: (...args: any) => void;
    browserName?: string;
    flutter_inappwebview?: {
      callHandler: (callbackName: string, args: string) => Promise<string>;
    };
  }
}
