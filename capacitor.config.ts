import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "network.vocem.app",
  appName: "Vocem",
  webDir: "www",
  appendUserAgent: "VocemNative/1.0",
  backgroundColor: "#000000",
  server: {
    url: "https://vocem.network/dashboard",
    androidScheme: "https",
    errorPath: "error.html",
    allowNavigation: [
      "vocem.network",
      "*.vocem.network",
      "*.privy.io",
      "auth.privy.io",
      "*.walletconnect.com",
      "*.walletconnect.org",
      "*.reown.com",
    ],
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#000000",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#000000",
    },
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
};

export default config;
