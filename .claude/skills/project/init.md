# Project Init

Guide the user through setting up this Lynx/ReactLynx project from a fresh clone.

### Step 1: Check Node.js

```bash
node --version
```

Required: >= 18. If missing or outdated, inform the user to install Node.js 18+.

### Step 2: Install dependencies

```bash
cd <project-root>
npm install
```

### Step 3: Install recommended VS Code extensions

Check if the developer is using VS Code:

```bash
code --version 2>/dev/null
```

If VS Code is detected, ask: "Would you like to install the recommended VS Code extensions for this project?"

If they agree:

```bash
cat .vscode/extensions.json
code --install-extension <id>  # for each extension in "recommendations"
```

If VS Code is not detected, skip this step silently.

### Step 4: Check Android Studio

Verify Android Studio is installed:

```bash
ls "/c/Program Files/Android/Android Studio/bin" 2>&1
```

If not found, tell the user to install Android Studio from https://developer.android.com/studio.

### Step 5: Check Android SDK

```bash
ls "$LOCALAPPDATA/Android/Sdk/platform-tools/adb.exe" 2>&1
```

If not found, tell the user to install the Android SDK via Android Studio's SDK Manager.

### Step 6: Set environment variables

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

### Step 7: Set up Android device for debugging

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

### Step 8: Check Gradle wrapper

If `android/gradle/wrapper/gradle-wrapper.jar` is missing, regenerate it:

```bash
export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"
export PATH="$JAVA_HOME/bin:$PATH"
curl -sL "https://services.gradle.org/distributions/gradle-8.7-bin.zip" -o /tmp/gradle-8.7-bin.zip
unzip -q -o /tmp/gradle-8.7-bin.zip -d /tmp/gradle-extract
cd <project-root>/android
/tmp/gradle-extract/gradle-8.7/bin/gradle wrapper --gradle-version 8.7
```

### Step 9: Check local.properties

If `android/local.properties` is missing, create it:

Detect the SDK path dynamically and write it:

```bash
echo "sdk.dir=$(echo $LOCALAPPDATA/Android/Sdk | sed 's|/|\\\\|g')" > android/local.properties
```

### Step 10: Install DeepSource CLI

Download and install the DeepSource CLI from GitHub releases:

```bash
gh release download v0.10.1 -R DeepSourceCorp/cli -p "deepsource_*_windows_x86_64.tar.gz" -D /tmp
mkdir -p ~/bin
tar -xzf /tmp/deepsource_*_windows_x86_64.tar.gz -C ~/bin deepsource.exe
```

Verify installation:

```bash
~/bin/deepsource.exe version
```

Authenticate with DeepSource:

```bash
~/bin/deepsource.exe auth login
```

This prints a one-time code and waits for browser auth. Tell the user to:

1. Open https://app.deepsource.com/device/activate
2. Enter the one-time code
3. Authorize the CLI

Confirm auth succeeded:

```bash
~/bin/deepsource.exe auth status
```

### Step 11: Set up DeepSource

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
2. **Copy the DSN** — go to Settings > General in DeepSource
  - open `https://app.deepsource.com/gh/<owner>/<repo>/settings/general`
  - find the `DEEPSOURCE_DSN` field and copy the DSN value
3. **Add the GitHub secret** — ask the user for the DSN value, then set it via CLI:
  ```bash
  gh secret set DEEPSOURCE_DSN --body "<dsn-value>"
  ```

### Step 12: Install Lynx DevTools

Lynx DevTools is a desktop application for debugging Lynx apps on-device. It provides Elements, Console, Sources, and Trace panels — similar to Chrome DevTools but for the Lynx rendering engine.

The debug APK already includes the DevTools integration (enabled automatically in debug builds). The desktop app connects to it over USB to provide the inspector UI.

Tell the user:

1. Download the latest release from https://github.com/lynx-family/lynx-devtool/releases
2. Install and launch it
3. Connect the Android device via USB — the app will be detected automatically

### Step 13: Verify setup

Run the dev server to confirm everything works:

```bash
npm start
```

If the QR code and bundle URL appear, setup is complete.

## Summary

After all steps, report a checklist:

- [ ] Node.js >= 18
- [ ] npm dependencies installed
- [ ] VS Code extensions installed (if applicable)
- [ ] Android Studio installed
- [ ] Android SDK available
- [ ] JAVA_HOME set
- [ ] ANDROID_HOME set
- [ ] Android device connected (USB debugging + OEM unlocking)
- [ ] Gradle wrapper ready
- [ ] local.properties configured
- [ ] DeepSource CLI installed and authenticated
- [ ] DeepSource activated with `DEEPSOURCE_DSN` secret configured
- [ ] Lynx DevTools desktop app installed
- [ ] Dev server runs successfully
