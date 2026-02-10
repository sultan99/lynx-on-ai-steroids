# Build Android APK

## Build Steps

### Step 1: Build the Lynx JS bundle

```bash
cd <project-root>
npx rspeedy build
```

This produces `dist/main.lynx.bundle` and `dist/static/` with image assets.

### Step 2: Copy dist/ to Android assets

Clear and copy the entire `dist/` directory into `android/app/src/main/assets/`:

```bash
rm -rf android/app/src/main/assets/*
cp -r dist/* android/app/src/main/assets/
```

This preserves the directory structure so images load correctly (e.g., `static/image/logo.png`).

### Step 3: Build the APK with Gradle

Set environment and run Gradle:

```bash
export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"
export PATH="$JAVA_HOME/bin:$PATH"
cd android
```

For **debug** build:
```bash
./gradlew.bat assembleDebug
```

For **release** build (when `--release` flag is passed):
```bash
./gradlew.bat assembleRelease
```

### Step 4: Report the result

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

Report the APK file path and size to the user.

### Step 5: Deploy to device (optional)

Ask the user if they want to install and launch the APK on a connected device. If yes:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk && adb shell am start -n com.lynxonaisteroids.app/.MainActivity
```

This requires a device connected via USB with USB debugging enabled.

## Troubleshooting

- If Gradle fails with SDK errors, check that `android/local.properties` has the correct `sdk.dir` path
- If images don't load in the app, ensure `dist/static/` was copied to `android/app/src/main/assets/static/` (not flattened)
- The `ImageInterceptor` in `MainActivity.kt` redirects `/static/...` paths to `asset:///static/...` for Fresco
- If `adb devices` shows empty, check: USB Debugging enabled, OEM unlocking on, data cable (not charge-only). OnePlus devices require OEM unlocking before ADB works.

## Project structure reference

```
android/
├── app/
│   ├── build.gradle.kts          # Lynx SDK deps, app config
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── assets/               # JS bundle + images copied here
│       └── java/com/lynxonaisteroids/app/
│           ├── MainApplication.kt     # Lynx engine init
│           ├── MainActivity.kt        # LynxView + ImageInterceptor
│           └── AssetTemplateProvider.kt  # Loads bundle from assets
├── build.gradle.kts
├── settings.gradle.kts
└── gradle/
    └── wrapper/
```
