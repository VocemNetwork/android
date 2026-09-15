# Vocem Android

Capacitor shell for [vocem.network](https://vocem.network). Package id: `network.vocem.app`. Targets API 36.

The app opens `https://vocem.network/dashboard`. A small script in the Android WebView hides “Spend $VOCEM” buttons and wires the system back button. Microphone is the only sensitive permission.

This repository is the Android project only. Signing keystores, Play `.aab` files, and the website are not stored here.

## Setup

Android Studio with SDK 36. Gradle JVM must be **JDK 21** (not the Studio-bundled JDK 25).

```bash
npm install
npx cap sync android
npx cap open android
```

Play listing assets and copy: [`play/README.md`](play/README.md)  
Privacy: https://vocem.network/privacy  
Terms: https://vocem.network/terms
