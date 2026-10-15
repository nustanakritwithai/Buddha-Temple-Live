# Living Temple — quality study v0.6

A higher-detail, semi-realistic architectural sample built in Blender 4.3.2. The original 16 × 15 m courtyard footprint and pavilion/entry positions are retained. Existing starter files and the main project are untouched.

## Improvements
- Individually modeled glazed roof tiles, thin physical tile edges and repeated wooden fascia detail.
- Timber joists, handrails, balusters, carved bracket fans, fluted columns and stepped capitals.
- Individually laid stone paving with 1K scanned PBR stone and wood maps.
- Detailed original leaf canopy, branching silhouette, smoother lotus petals and pond ripples.
- Verified CC0 fern clumps and scanned rocks, with simplified rock geometry and repaired fern alpha.
- Warm/cool architectural light balance, softer shadows and a genuine 1600 × 1400 Blender render.

This sample upgrades the environment. It intentionally omits the old toy-like gardener; it does not claim an upgraded character model, character animation or functioning game.

## Deliverables
- `temple_quality_v06.blend`: editable source with packed textures, named collections and non-destructive detail modifiers.
- `temple_quality_v06.glb`: complete environment, with merged collection nodes and embedded textures; excludes the presentation-only ground, camera and lights.
- `build_quality.py`: deterministic scene rebuild. Run `blender -b -t 10 --python build_quality.py` with the adjacent `sources` folder, then `python optimize_glb.py` to repack JPEG images and set fern alpha cutout (requires Pillow).
- `temple_quality_v06_preview.png`: inspected Blender Cycles render.
- `pavilion_detail_v06.png`: 1200 × 1200 architectural close-up, reproduced with `render_detail.py`.
- `asset_stats.json`, `validation.json` and `texture_validation.json`: measured geometry/export checks.
- `validate_assets.py`: GLB header/container checks and actual Blender re-import.
- `sources/`: unchanged local CC0 source files and per-asset manifests, URLs, authors and download hashes.
- `THIRD_PARTY.md`: asset attribution, licensing and modifications.
- `SHA256SUMS.txt`: delivered-file integrity hashes.

## Units and integration
Metres. Blender uses Z up; exported GLB uses right-handed Y up. The scene is centered on the same courtyard as the starter; the front entry is toward Blender −Y. The land plinth extends below the ground plane. Materials and leaf geometry require double-sided rendering where the exporter marks it. Transparent fern foliage introduces overdraw; performance depends on the target device and renderer.

The file is designed toward mobile-friendly geometry and texture budgets, but that is a design target, not a benchmark result. No browser/device FPS test, navmesh, collision generation, LOD switching, lightmap bake, interactive AI or game integration has been performed. Detailed tile and leaf meshes may need further optimization for low-end devices. Material primitives can produce more than one draw call per collection node. See measured export statistics before integration.

This is Thai-inspired original architectural art rather than a historically surveyed temple or culturally reviewed restoration. No sacred inscriptions or deity likenesses are included.

## Ownership and reuse
Architecture, tile geometry, foliage canopy, paving placement and the procedural construction script were generated for this project. The four external asset sources are CC0; see `THIRD_PARTY.md`. The generated material can be used, modified and integrated commercially without an attribution requirement imposed by this pack. This does not guarantee copyright eligibility, exclusivity or architectural accuracy. Blender itself is separate software and is not bundled.

## Measured final export

- 111,270 triangles, 13 merged mesh nodes, 47 material primitives, 25 materials.
- 11,540,600 bytes (11.54 MB decimal).
- 12 embedded images, all at most 1024 × 1024 pixels.
- Blender re-import and finite world bounds passed; courtyard footprint remains 16 × 15 m.
- Fern uses double-sided alpha cutout at 0.45 in the GLB.
- No animation clips. These are asset-validation results, not device-performance results.
