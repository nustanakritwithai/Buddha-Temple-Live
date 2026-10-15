# สัปปายะวัด · AI Living Temple v0.3.0

Thai-language browser-only courtyard prototype, extending the original real GLB scene. This release separates rest from practice, adds the eight GDD areas and cited learning content, and connects the user's existing Infinite Stillness prototype through a local sandboxed iframe. No server, authentication, multiplayer or offline world is connected.

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

Use `npm ci --cache /tmp/temple-npm-cache` if the default cache directory is unavailable. Exact dependencies are pinned in the lockfile. Vite 8 uses `build.rolldownOptions.output.codeSplitting: false`; deployment consists of HTML, one JS bundle, CSS, two GLBs, asset license and the standalone Realm HTML. Preserve the `/Buddha-Temple-Live/` base. A publishing worker owns root/docs layout and the existing Pages workflow; this source package does not deploy itself.

## Eight actual areas

- Z01 entrance: optional welcome-guide text, learning and honest schedule availability.
- Z02 central path: opt-in slow walking practice along an actual bounded path.
- Z03 pavilion: accessible central stairs/floor, three selectable cushion coordinates, sitting practice and opt-in Infinite Stillness.
- Z04 tree: untimed rest and reading.
- Z05 pond: optional fixed-camera observation practice and removing one simulated floating leaf.
- Z06 garden: local watering/moist-soil effect and removing simulated fallen leaves.
- Z07 benches: rest and reading at the bench-front anchor; no forced timer or statistics. The guest currently sits on the ground in front of the bench, not on its seat geometry.
- Z08 safe perimeter: bounded movement and no contextual dialogue trigger.

The “พื้นที่ / เรียนรู้” panel provides explicit “ไปยังจุดนี้” navigation for each actual anchor. These are convenient repositioning controls, not animated pathfinding. Keyboard WASD/arrows and touch joystick remain available. Drag/pinch/scroll controls the camera manually during exploration; no automatic camera follow. Simple conservative colliders protect the pond, tree, benches, outer boundary and pavilion edges. Stairs use discrete height bands, not a physics solver/navmesh.

## Rest and practice contract

REST: sit without a timer, session record, score or reminder. Stand whenever desired.

PRACTICE: explicitly choose 3/5/10/15 minutes. Pause/resume and immediate exit remain visible. The camera is fixed, normal HUD is hidden, gardener movement and activity/popups are suppressed, and optional ambient sound is suspended. Completion stays in the quiet scene until the user exits. Exit restores the exact selected cushion/starting point. Walking practice follows the central path and can stop immediately. No achievement, spiritual score, streak, diagnosis or attainment inference exists.

Practice timers use foreground simulation time, pause while hidden and do not catch up after inactivity. Severe rendering stalls can make timers slower than wall time. They are casual practice aids, not precision alarms. Rest and practice history are not persisted. Only validated visitor position and reduced-motion preference are saved through guarded localStorage. Activity logs contain at most eight local garden events, reset on reload, and do not fabricate events while closed.

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
- `src/visitor.ts`: articulated procedural visitor; the original gardener GLB remains unrigged.
- `src/experience.ts`: small local activity/movement helpers (legacy V0.2 timer helpers remain unused by the V0.3 UI).
- `src/content.ts`: sourced learning data; no runtime generation.
- `src/realm.ts`, `realm-protocol.ts`: sandboxed prototype lifecycle boundary.
- `tests/`: deterministic state, content and protocol checks.
- `RELEASE-MANIFEST.json`: exact final test count and distribution hashes.

## Validation and outstanding scope

Typecheck, production build and unit-test results are recorded in the release manifest. No manual browser gate was run for this increment, following the user's request to keep developing. Runtime, visual fidelity, touch usability and physical Android/iOS performance remain UNKNOWN. No FPS claim or production readiness claim is made. Six original static files become seven with the actual standalone Realm HTML.

Future work: real-device acceptance, continuous stair traversal/collision tuning, seated bench placement, authorized chant/audio assets and review, authoritative server scheduling/persistence, authentication and admin controls. Those server features need suitable resources and separate implementation; the overloaded VPS has not been touched.

## Licenses and provenance

Original procedural GLB geometry/materials: `public/assets/LICENSE.txt`. Babylon.js Apache-2.0, Vite MIT, TypeScript Apache-2.0, Playwright Apache-2.0. No third-party downloaded models, fonts or audio. The Realm originated from the user's existing model-generated Library artifact; no third-party runtime/assets were found in its inspected source. Learning summaries are newly written paraphrases with linked sources, not republished translations. No new outbound repository code license or exclusivity claim is made on the owner's behalf.
