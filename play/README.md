# Publish Vocem on Google Play (novice)

Google does **not** build the app on their website. You upload a signed **.aab** file (Android App Bundle). That file is built on a computer with Android Studio. This Mac/repo cannot produce it until Studio (or the Android SDK + JDK) is installed.

## A. One-time: Google Play developer account

1. Open [https://play.google.com/console](https://play.google.com/console) in a browser. Sign in with the Google account that should **own** Vocem.
2. Pay the one-time registration fee (USD $25). Use a real identity; Play will verify it.
3. Complete **Account details** and any identity / D-U-N-S prompts. This can take hours to a few days. You cannot publish until it is approved.
4. Turn on **2-Step Verification** on that Google account.

## B. Create the app listing

1. Play Console → **Create app**.
2. App name: `Vocem`
3. Default language: English (United States) unless you prefer another.
4. App or game: **App**
5. Free or paid: **Free**
6. Check the declarations (Play policies, US export laws) if they apply, then **Create app**.

Package name (already in the project, do not change): `network.vocem.app`

## C. Store listing (graphics + text)

Left menu → **Grow users** → **Store presence** → **Main store listing** (wording can vary slightly).

Upload from this folder on GitHub, `apps/android/play/`:

- **App icon:** `icon-512.png`
- **Feature graphic:** `feature-graphic-1024x500.jpg`

**Short description:**  
Wallet-to-wallet encrypted voice. Your 0x is the phone number.

**Full description:**  
Vocem is a decentralized phone for wallets. Your number is the 0x you connect. Open the app, keep the line live, paste another wallet, and talk in encrypted audio. Camera stays off.

Spend $VOCEM for minutes on Robinhood Chain. ETH and USDG still work. The caller pays. Missed rings return the hold. There is no SIM, no carrier account, and no voicemail box.

Keep the app open on WiFi to get called. Both wallets need Vocem open — that is the honest constraint of a phone that is not a carrier.

**Screenshots:** Play needs at least **two** phone screenshots (four at 1080×1920 is safer). Take them on a phone or Android emulator **after** you can run the app. Do not invent fake UI.

**Category:** Communication  
**Tags:** optional (voice, wallet, calling)  
Do **not** use Robinhood brokerage logos. Vocem is not the Robinhood investing app.

## D. Policy pages (required)

These URLs must load in a browser **before** you submit. Deploy the website first if they 404.

- Privacy: https://vocem.network/privacy
- Terms: https://vocem.network/terms

In Play Console, paste the privacy URL where it asks for a privacy policy.

## E. Other Console questionnaires (all required to send for review)

Complete each until its dashboard card is green:

1. **App content → Privacy policy** — URL above.
2. **App content → App access** — All functionality is available without a special login. (Users connect their own wallet.)
3. **App content → Ads** — No, the app does not contain ads.
4. **App content → Content rating** — Start questionnaire, email, category **Communication** / **Utility**. Answer honestly (user-generated conversation, not a kids app). Email the rating certificate if asked.
5. **App content → Target audience** — Age **13 and up**. Not primarily for children. Not in the Designed for Families program.
6. **App content → News app** — No.
7. **App content → COVID-19 contact tracing** — No.
8. **App content → Data safety** — You collect:
   - Microphone: to carry live call audio. Not sold. Not used for advertising.
   - Device or wallet identifiers: the 0x is the phone number; minute balance is tied to it. Not sold.
   - Approximate / precise location: **No**.
   - Contacts, photos, files: **No**.
   Data is used for app functionality. Users can request deletion via hello@vocem.network (stated on the privacy page).
9. **App content → Government apps** — No.
10. **Pricing** — Free, available in the countries you choose (start with one country if you want a smaller first review).

## F. Build a signed .aab (on your computer, not on Google’s site)

1. Install [Android Studio](https://developer.android.com/studio) (this also installs Java and the Android SDK). Open it once and finish the setup wizard. Install **Android SDK 36** if the wizard offers SDK platforms.
2. On your Mac:

```bash
cd ~/Desktop/PROJECTS/HoodVoice\ Project/apps/android
npm install
npx cap sync android
npx cap open android
```

3. If Android Studio says Gradle 8.11.1 is incompatible with JVM 25: in that dialog pick **JDK 21** (or 17), not 25. Use **Download JDK…** in the dropdown if 21 is not listed. Then wait until Gradle sync finishes (progress bar at the bottom).
4. **Build → Generate Signed App Bundle or APK…**
5. Choose **Android App Bundle**.
6. **Create new** keystore:
   - Save as something like `/Users/YOU/vocem-upload.jks` — **not** inside the git repo.
   - Password: long and unique. Save it in a password manager with the **alias** name.
   - Certificate fields: your name or company, country code. This is the *upload* key.
7. Build variant: **release**. Finish. Android Studio writes an `.aab` (often under `android/app/release/`).
8. If you lose that `.jks` file or its password, you cannot update the Play listing without a painful Google reset. Back it up offline. Never email it. Never commit it to GitHub.

Play App Signing: leave it **on**. Google keeps the key that devices trust. You only use the upload keystore above.

## G. Upload and test

1. Play Console → **Test and release** → **Testing** → **Internal testing**.
2. Create a release → upload the `.aab`.
3. Add yourself as an internal tester (the Gmail you use on the phone).
4. After processing, install from the internal testing link on an Android phone.
5. When that build works (connect wallet, mic permission, dial), promote to **Production** and send for review.

First review often takes a few days. If they reject, they email the Play Console account with a reason.

## What this GitHub repo already has

- App code and package id `network.vocem.app`
- Vocem launcher + splash (not Capacitor placeholders)
- Play icon + feature graphic in `apps/android/play/`
- Privacy and terms pages on the website (deploy those before you paste the URLs)
