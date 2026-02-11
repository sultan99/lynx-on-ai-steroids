# Project Init

Guide the user through setting up this Lynx/ReactLynx project from a fresh clone.

## Step 1: Check Node.js

```bash
node --version
```

Required: >= 18. If missing or outdated, inform the user to install Node.js 18+.

## Step 2: Install dependencies

```bash
cd <project-root>
npm install
```

## Step 3: Check Android Studio

Verify Android Studio is installed:

```bash
ls "/c/Program Files/Android/Android Studio/bin" 2>&1
```

If not found, tell the user to install Android Studio from https://developer.android.com/studio.

## Step 4: Check Android SDK

```bash
ls "$LOCALAPPDATA/Android/Sdk/platform-tools/adb.exe" 2>&1
```

If not found, tell the user to install the Android SDK via Android Studio's SDK Manager.

## Step 5: Set environment variables

Check if `JAVA_HOME` and `ANDROID_HOME` are set:

```bash
echo $JAVA_HOME
echo $ANDROID_HOME
```

If missing, set them:

```powershell
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
```

Add to PATH if missing:

```powershell
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$additions = @("$sdkPath\platform-tools", "$sdkPath\emulator", "$sdkPath\cmdline-tools\latest\bin")
foreach ($dir in $additions) {
    if ($currentPath -notlike "*$dir*") {
        $currentPath = "$currentPath;$dir"
    }
}
[System.Environment]::SetEnvironmentVariable("Path", $currentPath, "User")
```

## Step 6: Set up Android device for debugging

Inform the user to enable these on their Android device:

1. **Developer Options**: Settings > About Phone > tap "Build Number" 7 times
2. **USB Debugging**: Developer Options > USB Debugging (enable)
3. **OEM Unlocking**: Developer Options > OEM unlocking (enable — required for ADB on some devices like OnePlus)

Use a **data cable** (not charge-only). After connecting, the phone should prompt "Allow USB debugging?" — tap Allow.

Verify with:

```bash
adb devices
```

The device should appear in the list.

## Step 7: Check Gradle wrapper

If `android/gradle/wrapper/gradle-wrapper.jar` is missing, regenerate it:

```bash
export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"
export PATH="$JAVA_HOME/bin:$PATH"
curl -sL "https://services.gradle.org/distributions/gradle-8.7-bin.zip" -o /tmp/gradle-8.7-bin.zip
unzip -q -o /tmp/gradle-8.7-bin.zip -d /tmp/gradle-extract
cd <project-root>/android
/tmp/gradle-extract/gradle-8.7/bin/gradle wrapper --gradle-version 8.7
```

## Step 8: Check local.properties

If `android/local.properties` is missing, create it:

```properties
sdk.dir=C\:\\Users\\sulta\\AppData\\Local\\Android\\Sdk
```

## Step 9: Set up DeepSource

DeepSource provides automated code quality analysis and test coverage tracking on pull requests.

Resolve `<owner>/<repo>` dynamically before giving URLs to the user:

```bash
git remote get-url origin
# extract owner/repo from the URL (e.g., git@github.com:owner/repo.git → owner/repo)
```

1. **Activate the repository** — sign in at https://app.deepsource.com
  - click "Activate new repo" in the sidebar
  - select the repo
  - skip the `.deepsource.toml` generation — it's already in the repo
2. **Copy the DSN** — go to `https://app.deepsource.com/gh/<owner>/<repo>/settings/code-coverage` and copy the `DEEPSOURCE_DSN` value
3. **Add the GitHub secret**
  — go to `https://github.com/<owner>/<repo>/settings/secrets/actions`
  - add `DEEPSOURCE_DSN` as a repository secret
4. **Verify** — push a branch or open a PR and check that the DeepSource workflow runs in the Actions tab

## Step 10: Verify setup

Run the dev server to confirm everything works:

```bash
npm start
```

If the QR code and bundle URL appear, setup is complete.

## Summary

After all steps, report a checklist:

- [ ] Node.js >= 18
- [ ] npm dependencies installed
- [ ] Android Studio installed
- [ ] Android SDK available
- [ ] JAVA_HOME set
- [ ] ANDROID_HOME set
- [ ] Android device connected (USB debugging + OEM unlocking)
- [ ] Gradle wrapper ready
- [ ] local.properties configured
- [ ] DeepSource activated with `DEEPSOURCE_DSN` secret configured
- [ ] Dev server runs successfully
