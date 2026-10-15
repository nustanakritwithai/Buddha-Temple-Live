# ลานพักใจ · AI Living Temple

A web-first, Thai-language 3D courtyard vertical slice. A static browser prototype for GitHub Pages. It does not connect to a VPS or persistent world server.

## Run

Requires Node.js 22.18+ (tested with 24.19.0) and npm. Dependencies and their exact versions are recorded in package-lock.json.

```sh
npm ci
npm run dev
# http://127.0.0.1:4173/Buddha-Temple-Live/
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

If npm's default cache directory is unavailable, use `npm ci --cache /tmp/temple-npm-cache`. The development host defaults to loopback; to test from another device on a trusted LAN, explicitly run `npm run dev -- --host 0.0.0.0` on a machine that permits network-interface inspection. No port forwarding or server setup is performed by this project.

## What's implemented

- A real GLB courtyard and independently instantiated original GLB gardener, with the duplicate static gardener removed.
- A distinct procedural ivory-shirted visitor, keyboard and touchscreen walking, orbit/zoom camera, bounded courtyard movement with simple collision proxies.
- Rest/stand and return-to-entrance controls, Thai help and settings dialogs.
- A deterministic local gardener loop: walk, water, rest. Movement is whole-model translation/rotation; the source model has no skeletal rig or animation clips.
- Fixed 60 Hz simulation outside the renderer; hidden-tab simulation pauses without catch-up. Closing the page stops the world. There is no fabricated offline history.
- Reduced-motion setting (initially respects OS preference). Optional synthesized ambient tones are off by default and require explicit interaction.
- Defensive localStorage persistence for validated visitor position and reduced-motion setting only. No credentials, accounts, analytics, external fonts, paid APIs or external audio.
- Honest browser-demo status: “โหมดทดลองในเบราว์เซอร์ · ยังไม่เชื่อมเซิร์ฟเวอร์”.
- Loading, model-load failure/retry and unsupported-WebGL UI.

## Controls

Desktop: WASD/arrows to walk relative to the current camera; drag the scene to orbit; scroll to zoom. Touch: left joystick to walk; drag the scene to orbit; pinch to zoom. “นั่งพัก” stops walking; “ลุกเดิน” resumes. “กลับทางเข้า” resets position and camera. Dialogs support keyboard focus, Escape, and close buttons.

The courtyard is walkable; pavilion interior/stairs, pond, planters and benches use conservative non-walkable zones. The visitor rest pose is a simplified compressed model, not a full articulated sitting animation. No full meditation realm is implemented.

## Architecture

- `src/simulation.ts`: pure movement/collision, gardener state machine and save validation.
- `src/adapter.ts`: `WorldAdapter` interface and local implementation. A future authoritative transport can replace this interface; no remote connection exists today.
- `src/main.ts`: Babylon renderer, input mapping and accessible DOM interface.
- `src/style.css`: responsive Thai interface.
- `tests/simulation.test.ts`: deterministic simulation and persistence tests.
- `public/assets/`: original GLBs and their reuse statement.

Coordinate convention: glTF right-handed Y-up, metres. Entrance is toward +Z; pavilion toward −Z. Asset source Blender coordinates were Z-up. Source assets are copied without modification; editable Blender originals are in the separate asset pack and intentionally not shipped to the web client.

## Build and publication

Public prototype target: https://nustanakritwithai.github.io/Buddha-Temple-Live/

Vite base is `/Buddha-Temple-Live/` for GitHub Pages project hosting. `dist/` is the static production output. To publish, upload the contents of `dist/` through the repository's chosen Pages workflow; this project does not push, deploy, modify DNS or configure a server. A different hosting subpath requires changing `base` in `vite.config.ts` before rebuilding. Root HTML and all GLB/module URLs must use the same base.

## Validation and limitations

TypeScript checks, production build and five deterministic tests passed in the cloud workspace. Independent QA also reran the five tests and inspected both GLB containers. Actual browser-render testing was blocked in this cloud session: Chromium socket creation was denied by the sandbox, and its escalated launch failed before execution. Therefore visual rendering, touchscreen interaction and audio behavior remain unverified. No genuine in-browser screenshot was captured. Physical Android/iOS devices and weak-device performance have not been verified; no mobile FPS claim is made. WebGL is required. Browser storage can be blocked/cleared and is intentionally optional. This prototype has no backend, authoritative persistence, multiplayer, chat/LLM service, authentication, security-reviewed API or production uptime guarantee. Babylon is bundled locally and can still be significant on slow connections.

## Licenses

Original GLB geometry/materials were procedurally generated for this project; see `public/assets/LICENSE.txt` for the asset reuse statement. No downloaded models/textures/audio are used. Babylon.js packages are Apache-2.0; Vite is MIT; TypeScript is Apache-2.0; Playwright is Apache-2.0. Their license files are included in installed dependencies. No third-party ownership or copyright exclusivity is asserted for generated project code, and no additional outbound code license has been selected on the repository owner's behalf.
