# V0.6.1 independent rotation regression QA

## Result
- Repository tests: 57/57 PASS.
- Independent tests: 37/37 PASS (16 current input/camera integration, 21 geometry/discovery/control regressions).
- TypeScript and Vite production build: PASS. Existing >500 kB bundle warning persists.
- Actual Android, browser rendering, DOM hit-testing, native multitouch and performance: UNKNOWN. No browser or deployment performed.

## Findings and scope
The reported failure is rotation while walking. Existing camera math was independently exercised with Babylon 9.31.0 NullEngine, a real Scene in right-handed mode, and a real FreeCamera. Repeated original setTarget plus scene.render correctly changed camera rotation and world-forward direction. This does not reproduce the user's Android failure and does not prove browser/device input works.

V0.6 registered custom pointer handlers only on canvas. Noninteractive HUD surfaces such as an enabled minimap, and tools/context wrapper gaps, could intercept a touch so the canvas handler never received it. This is a concrete input-coverage defect; whether it caused this user's complete rotation failure remains unverified.

V0.6.1 moves pointer start to app capture, uses actual canvas rectangle for split ownership, allows touch independent of mouse button filtering, and makes decorative HUD regions pass through. Real interactive controls remain excluded. During review, checkbox-label exclusion, explicit Realm mid-gesture guard, and window-level end/cancel cleanup for capture failure/outside release were added. First-person pose now runs through an exported helper which also enforces the active camera.

## Test evidence
`camera-integration.test.ts` extracts the actual handlers and actual frame camera-update fragment from current main.ts. Event registration, element matching and capture are mocked; camera, scene, vector transforms and scene.render use real installed Babylon code through NullEngine. It is not a browser event or hit-test acceptance test.

Covered:
- Left move/right look roles remain locked across center; two fingers independent; third ignored.
- Releasing/cancelling one preserves the other; unrelated releases cannot steal ownership.
- Right drag changes real Babylon forward direction and pitch while left drag cannot rotate it.
- Thirty simultaneous simulation/render steps with left walking and right HUD-origin look change both actual camera position and direction; five decorative targets checked.
- UI controls, labels, role buttons, contenteditable, dialogs/loading/Realm excluded.
- Offset canvas routes by its rectangle, not viewport midpoint.
- Capture failure tolerated; window-level outside pointerup releases owners.
- REST camera position fixed; quiet practice requires optional look, Realm activation aborts owners.
- First-person-only defaults/migration; no built-in camera attachment.
- Prior asset geometry/seat/path regression, learning proximity/quiet gates, joystick/height/session behavior.

## Reproduction
From /workspace/shared/buddha-temple-web:

    npm test
    npm run build
    node --experimental-strip-types --test /workspace/shared/buddha-temple-web-qa/v061/camera-integration.test.ts /workspace/shared/buddha-temple-web-qa/v06/geometry.test.ts /workspace/shared/buddha-temple-web-qa/v05/discovery-independent.test.ts /workspace/shared/buddha-temple-web-qa/v04/independent.test.ts

Final outputs: repository-tests.log, independent.log, build.log, hashes.txt. Earlier candidate/baseline logs are exploratory harness development, not final application verdicts.

## Identity
Main: 7de96281da5a65fa76341780f8915337dfcbdc6e2ebeb858d536b4f95f02f240
JS index-CNJf6at5.js: d13f548a6a40a20c60da52ee5c20f34a8df8cca4a966b0161970e14d12772cc2
CSS index-BVGQqlBh.css: ddc95931363f5681610b1c10377acfa73383bfb5ee1aa9705a123cb66ed61207
Full source/dist hashes in hashes.txt.
