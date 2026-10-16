# สัปปายะวัด · AI Living Temple v0.7.1

Thai-language browser-only courtyard prototype, using the approved higher-detail V0.6 GLB environment. This candidate adds first-person-only view, mobile input hardening, geometry-aligned seating and a compact HUD while preserving the eight GDD areas, cited learning content and rest/practice separation. It connects the user's existing Infinite Stillness prototype through a local sandboxed iframe. No server, authentication, multiplayer or offline world is connected.

## Run and build

Node.js 22.18+ (tested with 24.19.0), npm:

```sh
npm ci
npm run dev
# http://127.0.0.1:4173/Buddha-Temple-Live/
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

Use `npm ci --cache /tmp/temple-npm-cache` if the default cache directory is unavailable. Exact dependencies are pinned in the lockfile. Vite 8 uses `build.rolldownOptions.output.codeSplitting: false`; deployment consists of HTML, one JS bundle, CSS, three GLBs (including the inactive rollback scene), asset license and the standalone Realm HTML. Preserve the `/Buddha-Temple-Live/` base. A publishing worker owns root/docs layout and the existing Pages workflow; this source package does not deploy itself.

## Eight actual areas

- Z01 entrance: optional welcome-guide text, learning and honest schedule availability.
- Z02 central path: opt-in slow walking practice along an actual bounded path.
- Z03 pavilion: accessible central stairs/floor, three selectable cushion coordinates (0.945 m tops), sitting practice and opt-in Infinite Stillness.
- Z04 tree: untimed rest and reading.
- Z05 pond: optional fixed-camera observation practice and removing one simulated floating leaf.
- Z06 garden: local watering/moist-soil effect and removing simulated fallen leaves.
- Z07 benches: rest and reading at the bench-front anchor; no forced timer or statistics. Both benches have authored seat anchors at 0.765 m, a seated leg pose, and safe front stand/restore anchors.
- Z08 safe perimeter: bounded movement and no contextual dialogue trigger.

The “เดินชมวัด” panel provides explicit “ไปยังจุดนี้” navigation for each actual anchor. These are convenient repositioning controls, not animated pathfinding. Keyboard WASD/arrows and touch joystick remain available. Start a drag on the unobstructed LEFT half to move (floating joystick), or RIGHT half to look. Ownership stays with that finger until release, even across the midpoint. UI controls do not initiate gestures. Engine camera inputs, pinch and wheel camera controls are disabled. Simple conservative colliders protect the pond, tree, benches, outer boundary and pavilion edges. Stairs use a continuous support ramp and bounded visual height smoothing; cushion tops have their own support height. Movement is substepped with simple obstacle proxies, not a full physics solver/navmesh.

## Rest and practice contract

REST: sit without a timer, session record, score or reminder. Stand whenever desired.

PRACTICE: explicitly choose 3/5/10/15 minutes. Pause/resume and immediate exit remain visible. The camera is fixed by default; an explicit practice checkbox can permit manual looking without movement. Normal HUD is hidden, gardener movement and activity/popups are suppressed, and optional ambient sound is suspended. Completion stays in the quiet scene until the user exits. Exit restores the first-person orientation and exact selected cushion/starting point; cushion sessions return to untimed seated REST. Standing then uses a safe stand anchor. Walking practice follows the central path and can stop immediately. No achievement, spiritual score, streak, diagnosis or attainment inference exists.

Practice timers use foreground simulation time, pause while hidden and do not catch up after inactivity. Severe rendering stalls can make timers slower than wall time. They are casual practice aids, not precision alarms. Rest and practice history are not persisted. Only validated visitor position (a safe standing position when seated) and reduced-motion preference are saved through guarded localStorage. Activity logs contain at most eight local garden events, reset on reload, and do not fabricate events while closed.

## Learning content

`src/content.ts` supplies 17 original Thai educational summaries/activities, seven MN107 themes and additional core/optional primary-source readings, with 11 distinct source URLs. Five learning routes are explicitly modern organization rather than canonical stages. UI shows original-source audience, source links, summary/adaptation labels and limits. Users may read, skip or close without scoring or belief profiling. The source-verification flag reflects checked references, not expert religious certification.

Chanting recordings, guided teaching audio, LLM religious conversation, authoritative group schedules and persistent world automation remain disabled/unavailable. No unverified audio or scripture translation is silently substituted.

## Existing Infinite Stillness integration

The real user-owned model-generated Library HTML is copied under `public/realm/infinite-stillness.html`; the original remains unchanged. It has self-contained procedural WebGL2 rendering and no external assets/network calls. The host uses a sandboxed iframe (`allow-scripts`, no same-origin permission), a per-session nonce and exact-window/opaque-origin message validation. The host uses a native modal dialog for background inert/focus containment and always has a visible exit button, disposes/removes the iframe and returns to the same cushion. Voice is off initially; any voice enablement requires a user action inside the prototype. Its generic guidance is product text, not scripture or an assessment of the user's mind. The host world stops rendering while the overlay is open. WebGL2 fallback remains local to the Realm and must not crash the temple.

This is integration code with deterministic protocol coverage, NOT a verified desktop/mobile runtime pass. Browser rendering, cross-frame input/audio, WebGL fallback and actual restoration still need device testing before production claims.

## Files

- `src/main.ts`, `style.css`: Babylon view, DOM controls, local interactions, host coordination.
- `src/simulation.ts`, `adapter.ts`: bounded movement and deterministic local gardener.
- `src/zones.ts`: eight anchors, cushion coordinates and floor height bands.
- `src/practice.ts`: explicit REST/PRACTICE, pause, quiet policy, walking and return state.
- `src/controls.ts`: radial analog input, view yaw/pitch/sensitivity, view-relative movement and pointer helpers.
- `src/seating.ts`: three cushion and two bench anchors, heights and safe stand positions.
- `src/visitor.ts`: articulated procedural visitor; the original gardener GLB remains unrigged.
- `src/experience.ts`: small local activity/movement helpers (legacy V0.2 timer helpers remain unused by the V0.3 UI).
- `src/content.ts`: sourced learning data; no runtime generation.
- `src/realm.ts`, `realm-protocol.ts`: sandboxed prototype lifecycle boundary.
- `tests/`: deterministic state, content and protocol checks.
- `RELEASE-MANIFEST.json`: exact final test count and distribution hashes.

## Validation and outstanding scope

Typecheck, production build and unit-test results are recorded in the release manifest. No manual browser gate was run for this increment, following the user's request to keep developing. Runtime, visual fidelity, touch usability and physical Android/iOS performance remain UNKNOWN. No FPS claim or production readiness claim is made. The runtime distribution now has eight files, including the standalone Realm, the new environment and the original environment retained for rollback.

Future work: real-device acceptance and collision/camera tuning, authorized chant/audio assets and review, authoritative server scheduling/persistence, authentication and admin controls. Those server features need suitable resources and separate implementation; the overloaded VPS has not been touched.

## Licenses and provenance

Original procedural GLB geometry/materials: `public/assets/LICENSE.txt`. Babylon.js Apache-2.0, Vite MIT, TypeScript Apache-2.0, Playwright Apache-2.0. V0.6 includes four Poly Haven CC0 source assets/materials; see asset-provenance/v06/THIRD_PARTY.md and source-manifests.json. No downloaded fonts or audio. The Realm originated from the user's existing model-generated Library artifact; no third-party runtime/assets were found in its inspected source. Learning summaries are newly written paraphrases with linked sources, not republished translations. No new outbound repository code license or exclusivity claim is made on the owner's behalf.

## V0.4 candidate controls and validation boundaries

Third-person remains the initial view. Use “มุมมองที่ 1” / “มุมมองที่ 3” to switch. First-person hides the guest's own mesh, uses drag-to-look (no pointer lock), has clamped pitch and adjustable sensitivity in settings. On touch, left joystick movement and a separate scene drag can coexist; releasing one finger does not cancel the other. No head bob, roll, screen shake or forced fullscreen is added. “จัดมุมมองใหม่” resets orientation without moving the guest. View/sensitivity choices are session-local.

Joystick input has a radial dead zone and proportional speed. Blur, dialogs and practice-look policy changes release captures; unrelated pointer IDs cannot release the active joystick. Movement rejects invalid delta time and uses bounded substeps, with added obstacle proxies for rear pots and the welcome guide. Bench/cushion sit heights derive from the actual authored surfaces; stand and reload use safe adjacent floor positions.

Mobile HUD hides redundant persistent help/activity buttons (still available in settings), increases touch targets, and adapts to short landscape viewports. These are implemented responsive rules, not physical-device verification. Audio is explicitly unchecked when practice suspends it, avoiding a misleading enabled switch after exit.

This is a local release candidate only: no repository push or Pages publication is performed by the implementation worker. The V0.3 baseline snapshot and existing published release archives are preserved. Final repository and independent deterministic review results appear in RELEASE-MANIFEST.json. Browser visual behavior, two-finger interaction, WebGL cameras and physical mobile performance remain UNKNOWN.

## V0.5 candidate: learning encountered naturally

The primary presentation is now seven opt-in discovery stations: an explicitly labelled scripted AI helper near the entrance, small signs along the path/tree/pond/garden, and books at the pavilion approach and bench. Props are original lightweight meshes with locally rendered Thai text, no flashing markers, downloads or new packages. The existing helper is moved to its actual interaction point; gardener waypoints keep clearance from the new props.

Walk close and explicitly choose the nearby action (or tap the nearby physical object) to read. First comes a short voluntary reflection. Explanations, all original lesson context/adaptation labels, source references and limitations remain expandable. There are no visit counts, completion states, unlocks, mandatory order or belief questions. Walking into range and selecting a destination never auto-open a window. The full 17-lesson catalogue remains available as a secondary book catalogue in settings and reading views; its five modern organization routes are collapsed by default.

The helper offers authored choices about why ethical conduct matters, reviewing the five precepts, or learning what requesting precepts means. AN 11.1 and AN 8.39 support the educational branches; the separate traditional chanting guide is visibly labelled ceremonial, not sutta wording. The helper is explicitly scripted AI without an LLM, is not a monk, does not confer precepts, does not request a pledge and never gates access to practice. The user can simply leave quietly.

Discovery and contextual prompts are suppressed during REST, PRACTICE, any open modal, hidden tabs and Realm. Every station open is revalidated for proximity and explicit user action. Native dialog close/Escape clears captured movement/look inputs without changing the selected camera view. No religious beliefs, personal answers or reading history are stored.

New modules: `learning-stations.ts` (authored mapping/branches), `discovery.ts` (pure proximity/quiet-state policy), `station-meshes.ts` (original signs/books). `src/content.ts` and the 17-lesson catalogue are preserved. The candidate remains unpublished until scoped approval; final test counts/hashes are in the manifest. Actual text legibility, object picking and mobile layout remain UNKNOWN until runtime/device testing.

## V0.5.1 control correction

First person is the only active view. The former toggle is removed; legacy third-person preferences are ignored and the guarded settings rewrite removes stale fields. No camera engine inputs are attached. Each pointer owns movement or look from touchdown, supports simultaneous fingers, and releases independently; blur, hidden tabs, dialogs, resize and practice policy changes clear captures. Left movement is disabled while seated; practice right look requires the existing opt-in. Runtime/physical-mobile behavior remains unverified.

## V0.6 environment integration

The approved `temple_quality_v06.glb` replaces the active environment. The original scene GLB is retained, unmodified, for rollback and is not loaded by this release. The new asset is 11,540,600 bytes, 111,270 triangles, 13 merged nodes, 47 material primitives, 25 materials and 12 embedded images at most 1024². It has no external texture URLs or animation. The gardener and scripted welcome helper retain their earlier prototype appearance; this release does not upgrade character art.

Lighting uses moderate hemispheric/directional lights and tone mapping, preserving imported PBR materials and fern alpha cutout. Only major architectural/tree-trunk/bench/rock meshes cast dynamic shadows, avoiding rendering all decorative foliage into the shadow map. No external environment map is fetched. Exact visual results and mobile performance remain UNKNOWN.

Collision proxies now account for side/rear rails, six column feet, the tea table and four wider garden beds. Central stairs use a smooth support ramp, with .7085 m pavilion tile tops, .945 m cushion tops, unchanged .765 m bench seats, .159 m path and .18 m cross-paving. The two tiny scanned rocks are treated as walk-over decorative pebbles. Watering moves to (−4.8, 5.8), outside the larger bed. Stations retain their approach coordinates, and all cushion/bench exits remain explicit. These are conservative authored proxies, not triangle-mesh collision or a generated navmesh.

CC0 provider URLs, authors, modifications and source hashes are carried under `asset-provenance/v06/` and the shipped asset license. The editable packed Blender/rebuild/source asset pack remains a separate deliverable; it is not downloaded by browsers. Source ZIP includes both environment GLBs and rollback baseline identity. The 11.54 MB environment and ~3.12 MB JS bundle warrant real low-end-device testing before production claims.

## V0.6.1 rotation-input repair

Gesture starts are handled on the app capture path, excluding actual controls/dialogs. Noninteractive right-side minimap/rest surfaces and toolbar/action gaps pass input through, rather than swallowing it before canvas-only listeners. Half selection uses the canvas bounding rectangle rather than assuming full viewport alignment; touch pointers are not filtered by mouse-button rules. Simultaneous left movement/right look keeps independent ownership. Window-level end/cancel clears owners even if capture fails and a finger exits the app. First-person pose is applied through a shared helper tested against Babylon NullEngine render/view matrices. This validates actual camera transforms without claiming a WebGL display or physical Android pass. The exact cause on the reporting user's device remains unconfirmed; confirmed source-level hit-area weaknesses are repaired.

## V0.7 opt-in teaching narration

Station readings and the entrance helper’s ethics/precept branches offer browser speech narration of the visible title, authored introduction and reflection. Nothing plays automatically. Play, pause/resume, stop and next-play volume controls are keyboard-accessible, with visible synthetic-AI-voice labelling and a source link beside the controls. The text remains available throughout. These are modern educational paraphrases, not a monk/teacher imitation, canonical scripture recording or medical/spiritual assessment.

A Thai (`th` or `th-*`) browser voice is required, preferring locally supplied voices. If the browser exposes none, the page explains that reading remains available. Voices may arrive asynchronously. Audio only reports playing after a speech-start callback; failed starts/errors have text fallback. Some system/browser voices may use the network, as disclosed in the UI; this application calls no paid TTS API and adds no credentials, recordings, packages or analytics. Actual Thai voice pronunciation, browser pause/resume support and physical-device behavior remain UNKNOWN. Native speech volume is applied on the next Play action because changing it mid-utterance is not portable.

Repeated Play cancels the old queue, clears a paused browser queue and ignores stale callbacks. Speech stops on reading/branch changes, dialog close/Escape, hidden pages, practice/Realm entry and page exit. A back-forward-cache pagehide stops rather than destroying the reusable controller. Narration suspends and unchecks ambient sound; starting ambient sound stops narration. Nothing resumes automatically after returning from another mode. Realm keeps its existing separate opt-in voice controls. Missing voices never trigger a substitute language or a claim of successful audio.

Baseline source was recovered from deployed GitHub commit `8ea22c7de91d94af8a0bb61392ca427e7a8282f9` under `app/`, with the V0.6.1 main-file hash verified before editing. The first-person camera/input repair and all GLBs remain intact. Validation uses deterministic speech-port mocks and real Babylon NullEngine transform tests; it is not a native browser speech or Android listening test.

## V0.7.1 silent-voice diagnostics candidate

Adds an explicit “check Thai voice again” button. Each user check queries immediately and at 0.3/1/3 seconds, then stops; it never queues speech. Closing/stopping/disposal cancels pending checks. This addresses missing discovery affordances when voices arrive late without `voiceschanged`. The prior version also incidentally refreshed on opening a station or changing volume, so this is not a claim that all late voices were permanently blocked.

Status distinguishes missing speech API, an empty voice list, voices without Thai, native synthesis errors and the 10-second start timeout. A zero-volume warning and the selected Thai voice name aid diagnosis. Native `onstart` now says the system reported starting, with advice to check media volume if inaudible; it does not assert the speaker emitted audible sound. Play remains an immediate user-click action and never falls back to the wrong language. Existing pause/stop/quiet/Realm cancellation and first-person controls remain intact.

The user's reported lack of audible sound is not reproduced on their device. This candidate improves discovery and actionable failure reporting; native Thai voice availability, device audio routing, browser rendering and actual Android audibility remain UNKNOWN. No delay workaround, paid service, external recording or new dependency was added.
