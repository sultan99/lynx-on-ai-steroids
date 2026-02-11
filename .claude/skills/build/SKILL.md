---
name: build
description: Build the app for a target platform (apk, aab, ipa)
user-invocable: true
argument-hint: <apk|aab|ipa> [--release]
---

# /build $ARGUMENTS

Build the app for the specified target platform.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<apk\|aab\|ipa>` | Yes | Target platform to build for |
| `[--release]` | No | Build in release mode (default: debug) |

## Usage

```
/build apk              # Debug APK
/build apk --release    # Release APK
/build aab              # Debug AAB (Android App Bundle)
/build aab --release    # Release AAB for Google Play
/build ipa              # iOS IPA (coming soon)
```

## Instructions

Read the target-specific instruction file and follow it exactly:

- **apk** → Read `.claude/skills/build/apk.md` and follow all steps
- **aab** → Read `.claude/skills/build/aab.md` and follow all steps
- **ipa** → Read `.claude/skills/build/ipa.md` and follow all steps

If no target is provided, ask the user which target they want to build.

If the target is not supported, inform the user and list the available targets.
