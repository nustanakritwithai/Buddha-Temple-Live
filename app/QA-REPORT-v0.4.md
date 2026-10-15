# V0.4 independent deterministic QA

2026-10-15 14:52 UTC, frozen version 0.4.0. No publication performed.

## Result
- Repository suite: 38/38 pass.
- Independent suite: 11/11 pass.
- Typecheck and production build: pass.
- Real browser rendering, touch behavior, visual responsive layout, camera/seat appearance and physical Android: UNKNOWN / NOT TESTED. User waived manual browser checks; no browser retries or permissions requested.

## Findings corrected before final freeze
1. Releasing the left movement touch called full reset and cancelled a still-held first-person look touch. Now joystick-only reset preserves the independent look pointer and keyboard state; full resets remain on blur/dialog/policy transitions.
2. Opting out of quiet-practice look did not stop an already active first-person drag. Policy changes now reset captured input; pointermove also rejects look when quiet mode disallows it.
3. Cushion stand/save left the visitor at cushion center despite returning to a standing state. All authored seats now use safe stand positions for standing and save restoration. Practice/Realm exit intentionally returns to the selected cushion in untimed REST, preserving the requested view mode.

These are source-reviewed corrections. Actual multi-touch gestures and visual seat alignment are not represented as browser-tested.

## Independent cases
- All five seat exits are walkable with 10cm cardinal clearance; returned stand points do not alias seat records.
- All eight zone teleport destinations and all cushion centers are walkable.
- Joystick radial deadzone, saturation, monotonic analog strength and nonfinite input rejection across all angles.
- Camera-relative forward/right orthogonality and unit magnitude across headings.
- 42,000 seeded movement steps across entrance, all zones and all seat exits never leave walkable space.
- Height interpolation does not overshoot; reduced motion snaps to target.
- Paused practice freezes timer/walking; selected-cushion return semantics hold.
- First-person forward/right movement agrees with orbit controls at mode-toggle headings.
- First-person pitch clamps, sensitivity scaling, yaw bounds, saved-view immutability and mode switches.
- Pointer ownership ignores unrelated pointer releases and clears the owner.
- Stair entry height is continuous; the center route reaches the pavilion safely.

## Source integration review
- Scene hides visitor and player ring in first-person; manual drag changes view without pointer lock or head bob.
- Quiet practice blocks user walking, freezes gardener advancement and suppresses transient activity/toasts; optional look defaults off.
- Practice/Realm snapshots and restores view mode plus orbit camera state; Realm protocol remains source/session/origin validated.
- Audio toggle is explicitly cleared when practice suspends ambient sound.
- Save and stand routes use safe exits. Bench top .765 derives from authored mesh vertex bands; cushion top is authored .88. Final visual alignment remains unverified.
- Responsive rules reduce persistent HUD surfaces, use contextual actions and larger touch targets; no visual responsiveness pass claimed.

## Remaining warning
Production JS chunk is 3,096.76 kB, 728.93 kB gzip. Vite emits a >500kB chunk warning. This is a load/performance consideration, not a measured runtime failure.

## Evidence
- repository-tests.log
- independent.test.ts and independent.log
- build.log
- source-hashes.txt and dist-hashes.txt
