---
name: build
description: Build the app for a target platform (apk, ipa)
user-invocable: true
argument-hint: <apk|ipa> [--release]
---

# /build $ARGUMENTS

Build the app for the specified target platform.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `<apk\|ipa>` | Yes | Target platform to build for |
| `[--release]` | No | Build in release mode (default: debug) |

## Usage

```
/build apk              # Debug APK
/build apk --release    # Release APK
/build ipa              # iOS IPA (coming soon)
```

## Instructions

Read the target-specific instruction file and follow it exactly:

- **apk** → Read `.claude/skills/build/apk.md` and follow all steps
- **ipa** → Read `.claude/skills/build/ipa.md` and follow all steps

If no target is provided, ask the user which target they want to build.

If the target is not supported, inform the user and list the available targets.
