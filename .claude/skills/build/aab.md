# Build Android App Bundle (AAB)

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

### Step 3: Build the AAB with Gradle

Set environment and run Gradle:

```bash
export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"
export PATH="$JAVA_HOME/bin:$PATH"
cd android
```

For **debug** build:
```bash
./gradlew.bat bundleDebug
```

For **release** build (when `--release` flag is passed):
```bash
./gradlew.bat bundleRelease
```

### Step 4: Report the result

- **Debug AAB**: `android/app/build/outputs/bundle/debug/app-debug.aab`
- **Release AAB**: `android/app/build/outputs/bundle/release/app-release.aab`

Report the AAB file path and size to the user.

Remind the user that AAB is for Google Play upload — it cannot be installed directly on a device. Google Play generates optimized per-device APKs automatically (split by ABI, screen density, and language).

## Troubleshooting

- If Gradle fails with SDK errors, check that `android/local.properties` has the correct `sdk.dir` path
- If images don't load in the app, ensure `dist/static/` was copied to `android/app/src/main/assets/static/` (not flattened)
- AAB files cannot be installed via `adb install` — use `/build apk` for device testing
- To test an AAB locally, use `bundletool` to generate APKs: `bundletool build-apks --bundle=app.aab --output=app.apks --local-testing`
