# Changes

## 0.7.0 candidate

- Add explicit Thai browser-voice narration for visible learning station/helper text, with synthetic-voice label and source links.
- Provide play/pause/resume/stop and next-play volume; unavailable/error states retain text.
- Cancel speech across reading/quiet/Realm/page transitions, suppress queue overlap and stale callbacks, preserve bfcache reuse.
- Restore exact deployed V0.6.1 baseline before changes; no new runtime packages or paid audio services.

## 0.6.1 candidate

- Route split gestures through the app while excluding interactive UI, and pass decorative HUD touches through.
- Use canvas-relative half boundaries, touch-aware admission and window-level release cleanup.
- Test the actual first-person Babylon camera pose/render path alongside simultaneous movement/look.
- Physical mobile result remains unverified; do not infer the user-device root cause solely from headless tests.

## 0.6.0 candidate

- Integrate approved higher-detail environment with embedded CC0 PBR textures and provenance.
- Align raised cushion/floor surfaces, rail/post/table/bed collision proxies and watering location.
- Preserve first-person-only split-half input, learning stations, benches and Realm return.
- Retain original scene for rollback; character art remains the existing prototype.
- Runtime and physical-device performance remain unverified.

## 0.5.1 candidate

- Enforce first-person-only view and remove the view toggle.
- Disable Babylon camera input handlers; route left-half drags only to floating movement and right-half drags only to look.
- Lock gesture ownership from touchdown through crossing, release and cancellation; preserve UI, modal, seated and practice behavior.
- Preserve all V0.5 learning stations and cited content.

## 0.5.0 candidate
- Replace dominant course navigation with nearby, opt-in signs, books and a scripted AI helper.
- Show short reflections first, with expandable explanations and original source/context labels.
- Add optional ethics/five-precept/ritual-information helper branches with scripture versus ceremonial provenance distinguished.
- Preserve the full 17-lesson catalogue as a secondary accessible book catalogue.
- Suppress discovery prompts during rest/practice/modals/Realm; no automatic popups, gates or reading-history tracking.
- Add original static props, simple collision proxies and gardener route clearance.
- Development candidate only; no remote publish or device-runtime claims.

## 0.4.0 candidate
- Add optional first/third-person view with manual drag look, sensitivity, pitch clamps and no pointer lock/head bob.
- Harden mobile analog movement and independent multitouch ownership/cancellation.
- Align bench/cushion seated poses to authored surfaces, provide safe stand/reload anchors and restore cushion REST after practice/Realm.
- Add continuous stair support, movement substeps, missing obstacle proxies and cushion-height support.
- Make mobile HUD/context controls more compact; preserve access through settings.
- Preserve source content, Realm sandbox/quiet-state behavior and local-only status.
- No remote publication; device/runtime validation remains UNKNOWN.

## 0.3.0
- Separate untimed REST from explicit 3/5/10/15-minute PRACTICE, pause/exit and fixed camera.
- Add eight GDD anchors, pavilion access/three cushions, slow walking path and quiet-zone behavior.
- Add opt-in welcome guide, simulated garden/pond care, and cited learning panel with modern route filters.
- Integrate the actual existing Infinite Stillness HTML in a sandboxed iframe with validated lifecycle messages and host-owned exit/return.
- Keep chanting/audio, LLM conversation, persistent server scheduling and multiplayer unavailable.
- Runtime/device verification remains UNKNOWN; deterministic tests/build are recorded separately.

## 0.2.0
- Replace the visitor's static limbs and vertical squash with a directional articulated model, gait and seated pose.
- Add original descriptive interactions near the lotus pond, tree and pavilion front.
- Add optional 1/3/5-minute rest timer, stop/stand at any time, hidden-tab pause and clear completion notice.
- Add an in-memory, eight-entry session activity log and optional compact minimap with zone highlighting.
- Align watering stream with the left herb planter and rest waypoint with the left bench.
- Add 9 tests (14 total); retain six-file static deployment and existing base URL/local save format.
- No backend, chat, separate meditation realm, paid API or new external service.

Validation: TypeScript/build and 14 unit tests passed. Browser rendering and physical Android/iOS behavior are UNKNOWN; this increment did not run manual browser QA.
