# V0.5 independent QA

Frozen version 0.5.0, verified 2026-10-15 15:50 UTC. No publication or browser checks performed.

## Results
- Repository tests: 47/47 PASS.
- Independent deterministic cases: 17/17 PASS (6 V0.5 discovery/collision/reference cases, 11 V0.4 regression cases).
- Typecheck and production build: PASS.
- No critical source-level finding remains in the reviewed scope.
- Actual rendering, visual/mobile layout, real gestures, source-link navigation and physical Android: UNKNOWN / NOT TESTED. User waived manual browser checks.

## Discovery and learning checks
- Tested all 24 combinations of EXPLORE/REST/PRACTICE, modal, Realm and page visibility: only foreground EXPLORE without a modal or Realm allows a prompt/open.
- Exact Euclidean radius, just-outside rejection, stale position revalidation, nearest selection, stable ties, empty lists and invalid positions tested.
- Discovery remains pure: no mutation, progress, visit record, unlock or modal operation in the helper.
- Every authored station anchor remains walkable and activates explicitly. New prop centers block movement; repeated approaches remain collision-safe.
- All station/branch lesson IDs resolve to existing lessons and source URLs use HTTPS. No score, locked, progress or ritual-prerequisite fields are present.
- Prior 11 tests cover seat exits, zones, 42,000 seeded collision steps, stairs, joystick/pointer ownership, FP/orbit movement equivalence, look clamps/sensitivity and paused practice.

## Source integration review
- Proximity updates contextual buttons only. Content opens from an explicit button or mesh tap, with current proximity/context rechecked.
- Zone navigation no longer automatically opens a dialog.
- Reading opens with an optional short reflection; explanation and source sections are collapsed. Three helper branches are explicit choices.
- Why-sila and five-precept branches have AN 11.1 / AN 8.39 references. The requesting-precepts branch separately labels its ceremony guide and says the app neither performs the ceremony nor confers precepts.
- Scripted helper identity and adaptation notices are visible. No mandatory ritual/course sequence, conferral button, completion gate, score or private confession input is introduced.
- Close and native Escape/cancel clear keyboard, joystick and look input; no learning handler changes first/third-person view state.
- Modal/REST/PRACTICE/Realm discovery suppression is enforced by pure gate and click revalidation. Realm protocol remains unchanged; source review only, not end-to-end runtime evidence.
- Secondary full catalogue remains opt-in from settings/books. Sources use explicit anchors with noopener/noreferrer. Source truth was verified by the curriculum owner; this QA checks mapping/UI wiring, not a new external-source audit.
- Physical sign/book/helper colliders and gardener detour are now present. Repository clearance regression passes.

## Remaining limitation
Vite retains a large-chunk warning; this is a bundle-size concern, not a measured performance failure. Visual quality, font legibility, mesh picking, actual popup focus and camera rendering require later runtime testing if requested.

## Evidence
repository-tests.log, build.log, independent.log, discovery-independent.test.ts, source-hashes.txt, dist-hashes.txt. Prior independent regression source: ../v04/independent.test.ts.
