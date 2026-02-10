# Lynx on AI Steroids

ReactLynx cross-platform app with Android APK support. Uses Lynx SDK to render React-like components natively on mobile devices.

## Tech Stack

- **UI**: ReactLynx (`@lynx-js/react`) — React-like API targeting the Lynx rendering engine
- **Bundler**: Rspeedy (`@lynx-js/rspeedy`) — Rsbuild-based bundler for Lynx apps
- **Lynx SDK**: 3.6.0 (`@lynx-js/types`)
- **Android**: Kotlin, Gradle 8.5, AGP 8.5.0
- **Testing**: Vitest, Testing Library
- **Language**: TypeScript 5.9

## Project Structure

```
.claude/
  rules/
    coding.md             # Coding conventions (Lynx elements, threads, styling)
    testing.md            # Testing standards (Vitest, patterns, imports)
    skills.md             # Skill creation rules
  skills/
    build/                # /build skill (apk, ipa)
    dev/                  # /dev skill (feature implementation workflow)
    git/                  # /git skill (branch, commit, merge, rebase)
    project/              # /project skill (init, skill-up)
    validate/             # /validate skill (lint, types, tests in parallel)
  agents/
    test-writer/          # Autonomous test writing agent
    runner/               # Background command runner (npm, npx, CLI)
src/                    # App source code
  index.tsx             # Entry point — mounts <App /> via root.render()
  app.tsx               # Main component
  app.module.css        # Styles (CSS modules, kebab-case → camelCase imports)
  assets/               # Images (png)
  app.test.tsx          # Tests (co-located with source files)
android/                # Native Android wrapper (decoupled from JS)
  app/src/main/
    java/com/lynxonaisteroids/app/
      MainApplication.kt        # App init — sets up LynxEnv + Fresco
      AssetTemplateProvider.kt   # Loads .lynx.bundle from assets/
    assets/
      main.lynx.bundle          # Built JS bundle (generated, not tracked)
    AndroidManifest.xml
  gradle/libs.versions.toml     # Version catalog
lynx.config.ts          # Rspeedy/Lynx build config (plugins: QRCode, ReactLynx, TypeCheck)
```

## Scripts

- `npm start` — Start the dev server (Rspeedy)
- `npm run preview` — Preview the production build locally

There is no `npm run build`. Builds and device deployment are done via the `/build` skill.

## Skills

- `/build apk` — Build Android debug APK
- `/build apk --release` — Build Android release APK
- `/dev <description>` — Feature implementation workflow (plan, implement, test, commit)
- `/git branch [issue]` — Create branch from GitHub issue
- `/git commit` — Smart commit with auto-grouping
- `/git merge [branch]` — Merge branch into current
- `/git rebase [branch]` — Rebase current branch onto another
- `/project init` — Set up the project from scratch
- `/project skill-up` — Suggest improvements to instructions and rules based on session learnings
- `/validate` — Run lint, type-check, and tests in parallel

## Key Conventions

Lynx is NOT HTML. See `.claude/rules/coding.md` for full conventions — Lynx elements, TypeScript, styling, naming, and code style rules.

For testing standards, see `.claude/rules/testing.md`.

### Architecture

1. JS code in `src/` is bundled by Rspeedy into `main.lynx.bundle`
2. The bundle is copied into `android/app/src/main/assets/`
3. The Android app loads the bundle via `AssetTemplateProvider`
4. `LynxView` renders the bundle natively

The Android wrapper and JS code are decoupled — you can modify one without touching the other.

### Build Artifacts

- `dist/` — JS build output (gitignored)
- `android/app/src/main/assets/main.lynx.bundle` — Generated asset for Android
- `android/app/build/` — Gradle build output

## Reference Docs

Read these when working on Lynx tasks:

- **Lynx**: [llms.txt](https://lynxjs.org/next/llms.txt) — entry point for all Lynx docs
- **Rsbuild**: [llms.txt](https://rsbuild.rs/llms.txt)
- **Rspack**: [llms.txt](https://rspack.rs/llms.txt)

## Important Files

| File | Purpose |
|------|---------|
| `android/app/build.gradle.kts` | Android build config |
| `android/gradle/libs.versions.toml` | Android dependency versions |
| `lynx.config.ts` | Rspeedy build config |
| `package.json` | Dependencies and scripts |
| `src/app.tsx` | Main UI component |
| `src/index.tsx` | App entry point |
