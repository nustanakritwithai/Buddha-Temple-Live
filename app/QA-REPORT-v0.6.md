# V0.6 geometry and regression QA

2026-10-15 17:08 UTC. Independent deterministic/source/asset checks only. No publication or browser/device testing.

## Result
- Repository tests 55/55 PASS; independent cases 28/28 PASS.
- Typecheck/production build PASS, existing large-JS-chunk warning remains.
- Actual WebGL rendering, PBR appearance, readable signs, mobile touch delivery, FPS, GPU memory and device performance: UNKNOWN. Polygon counts are not a performance pass.

## Approved asset identity and integrity
Original approved, public and dist GLBs all match SHA-256 f5def35adcd1c77aa2bf9524c8101435b4ddf929861e686fbb28d41a3adaaf7f.
- 11,540,600 bytes; valid glTF2 binary header and bounds.
- 13 mesh nodes, 111,270 triangles, 47 primitives, 25 materials.
- 12 embedded images independently decoded with Pillow: JPEG/PNG, each at most 1024x1024.
- No external buffer/image URI; no required or used glTF extensions; no unsupported compressed texture dependency identified.
- Fern material: MASK cutoff .45, double sided.
- Four source manifests declare CC0-1.0 and Poly Haven provider URLs; all referenced local file lengths and SHA-256 values match. Attribution/modification/reference records copied into project provenance and asset license. This verifies supplied provenance integrity, not a new legal opinion.

## Geometry measurements and corrections
Measured transformed GLB vertices and vertical triangle intersections, not just source constants:
- Pavilion tile top .70849995 m.
- Cushion top .94500005 m (raised .065 m over old asset).
- Bench seat top .76499999 m, unchanged.
- Cross paving .179999996 m; stair treads approximately .17/.43/.69 m. Bevel edges slope locally; runtime uses a deliberate smooth traversal ramp.
- Side rail inner face x=±2.69; rear rail front z=-5.585. Traversable interior x±2.4 and rear cutoff -5.35 provide conservative margins. Six column feet additionally have .55-radius proxies.
- Tea table blocked around (0,-4.95). Four enlarged planting beds have 1.22-radius proxies.
- Scanned rocks are tiny, approximately .08x.15m and .11x.21m footprints, treated as walk-over pebbles rather than oversized invisible barriers.
- Prior ramp boundary had a .021m discontinuity; now starts at crosswalk .18 and reaches pavilion .7085.
- Original gardener sole minY=.059999995: moving root now groundHeight-.06. Helper uses its procedural sole offset groundHeight-.035.

## Navigation/seat/NPC checks
- All zone destinations, all seat stand points, all cushions and all learning anchors remain connected to entrance on a 10cm navigation grid.
- Every seat exit has 10cm cardinal clearance; new seat/floor helpers match measured surfaces within 1e-6m.
- Side/rear rails, column feet, table and planting centers are blocked; front stair/door route remains traversable.
- 12,000 NPC simulation steps stay in walkable space; revised water stop and detours avoid enlarged obstacles. Rendering of the watering stream remains unverified.
- 42,000 seeded player movement steps and prior controls/seating/content regressions pass.

## Preserved behavior
Actual-handler mock event tests still pass for first-person only, fixed left-move/right-look ownership across midline, two-finger independence and cancellation. No built-in camera attachControl calls. Quiet/Realm/input restoration and explicit learning discovery regressions pass. These deterministic results do not claim physical-device input acceptance.

## Evidence
- inspect_glb.py / geometry.json: transformed node bounds.
- surface_samples.py / surfaces.json: selected actual triangle surface samples (null samples denote tile gaps, not missing courtyard).
- validate_asset.py / asset-validation.json: binary, images and source hashes.
- geometry.test.ts: geometry/navigation/NPC assertions.
- repository-tests.log, independent.log, build.log, source-hashes.txt, dist-hashes.txt.

License wording clarified before packaging: original no-third-party paragraph is explicitly scoped to the two legacy GLBs; public and dist license copies match. License SHA is recorded in dist-hashes.txt.
