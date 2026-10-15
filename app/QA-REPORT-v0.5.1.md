# V0.5.1 first-person / split-touch independent QA

Frozen candidate verified 2026-10-15 16:11 UTC. No publication or browser/device execution.

## Result
- Repository tests: 51/51 PASS.
- Independent tests: 24/24 PASS (7 event-routing cases, 6 discovery cases, 11 prior control/collision/seating regressions).
- Typecheck and production build: PASS.
- Device/render acceptance remains UNKNOWN. The actual user-reported bug is valid; deterministic source/handler verification does not establish a physical mobile pass.

## Root cause and correction
The previous default was third-person, with Babylon ArcRotateCamera controls attached across the whole canvas. The custom first-person pointerdown handler also accepted any canvas coordinate. Left-side drags outside the old joystick could therefore rotate the view.

Current source starts and stays first-person, explicitly assigns the active FreeCamera, clears both cameras' built-in inputs, has no attachControl call and removes the view toggle. Legacy view state cannot restore third-person: view initializes first, save parsing ignores view fields, and guarded save rewriting strips stale view preferences. Practice/Realm return calls applyView, coercing first-person again.

Pointer ownership is chosen once on pointerdown: left half moves, right half looks; the exact midpoint belongs to right. Crossing the midpoint does not change ownership. The joystick is decorative/pointer-events:none; canvas owns floating movement origin. UI controls are DOM siblings of canvas and do not route their events through it.

## Actual handler sequence tests
routing.test.ts extracts the real main.ts canvas/reset handler definitions, strips TypeScript, and runs them with a mocked DOM/capture/event environment. This is executable handler testing rather than a new implementation of their routing logic. It does not emulate browser delivery or Babylon rendering.

1. Left touch crossing to right changes movement but never yaw.
2. Right touch crossing to left changes yaw but never movement.
3. Two simultaneous touches retain independent roles; third touch ignored; releasing either preserves the other.
4. Unrelated release, cancel and lost-capture behave correctly; full reset clears captures/keys/owners and allows fresh touch.
5. REST disables left movement and permits right look. PRACTICE look defaults off and optional look can be enabled/disabled. Modal/hidden/Realm prevents initiation.
6. UI-target router rejects initiation; nonprimary mouse ignored; midpoint classified right.
7. Default/migration/legacy switch enforce first-person; source has no built-in attachControl or toggle and explicitly activates first camera.

## Integration review
Blur and visibility handlers call full reset. Opening/closing dialogs and quiet-look policy changes clear input. Move events recheck modal/hidden/mode policy. Seat position and selected-cushion REST restoration remain unchanged. No head bob or pointer lock introduced. Source/render/device focus, actual capture cancellation timing, browser gesture arbitration and visual camera position remain untested.

## Remaining warning
Vite emits the existing large-bundle warning. No performance benchmark was performed.

## Evidence
repository-tests.log, build.log, independent.log, routing.test.ts, source-hashes.txt, dist-hashes.txt. Regression suites are ../v04/independent.test.ts and ../v05/discovery-independent.test.ts.
