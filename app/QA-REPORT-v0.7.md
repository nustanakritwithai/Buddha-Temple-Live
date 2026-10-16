# V0.7 independent narration QA

## Final result
- Repository tests: 62/62 PASS.
- Independent tests: 44/44 PASS.
- TypeScript and production Vite build: PASS.
- Existing large JS chunk warning remains (3,123.53 kB minified, 736.50 kB gzip).
- Browser rendering, actual Thai voice availability/pronunciation, native pause/resume, Android multitouch and audio output: UNKNOWN. No browser loop or publication performed.

## Findings addressed before freeze
1. Surviving local baseline initially lacked V0.6.1 app-level rotation fixes. Builder restored deployed baseline. Current independent tests verify app/canvas-relative ownership, interactive target exclusions, window cancellation, and actual Babylon camera changes during simultaneous walking/right drag.
2. The original narration controller cancelled speech but did not unpause the synthesis engine before new playback. A pause → stop → play sequence could stay silent. It now resumes the cleared engine before speaking; independently tested with a mock that correctly preserves paused state across cancel.
3. Disposing on every pagehide would disable narration after back/forward-cache restoration. Persisted pagehide now stops while retaining the controller; final navigation disposes. Actual source handler exercised with both event.persisted values.
4. Changing an engine-owned utterance's volume has undefined behavior. Slider now explicitly says it applies on the next Play and leaves the in-flight utterance untouched. Next playback receives the bounded volume.

The pause/cancel and post-speak mutation findings are grounded in Web Speech API §4.2.2: https://webaudio.github.io/web-speech-api/#speechsynthesis-methods
This is implementation guidance, not evidence of native Android execution.

## Coverage
10 narration-controller tests: no autoplay; delayed voiceschanged; correct Thai matching and local preference; missing API/voice fallback; paused-engine replay; repeated play replaces queue; stale callbacks cannot override current state; bounded volume; error recovery; dispose invalidation/listener removal; start timeout; next-play volume semantics (related cases grouped).

4 integration tests: execute actual Play handler against mock DOM to verify visible reviewed text and quiet/hidden/Realm/closed gates; execute actual pagehide handler; assert close/cancel/branch/background/practice/Realm cancellation wiring; assert synthetic labeling, source link, fallback, remote-engine disclosure and next-play volume copy.

9 camera/input tests: restored source event handlers with mocked DOM/capture; real Babylon NullEngine/Scene/FreeCamera verifies world-forward and position change while left movement and right HUD-origin look are simultaneous; no built-in camera controls; first-person only; locked roles across midpoint; independent release; interactive controls/labels excluded; canvas rectangle offset and global cleanup.

21 prior independent regression cases: geometry surfaces and collision/navigation, safe seats, NPC route, discovery proximity/quiet gates, joystick/height/session behavior. Existing measured surface fixtures were reused unchanged.

Text is optional synthetic narration of current station/helper introduction and reflection. It is not a recording of a monk or a verbatim scripture reading. Sources remain accessible beside playback and in details. No paid API, credentials, new voice recordings, or inference of religious beliefs introduced.

## Evidence and commands
Project: /workspace/scratch/86e439343dbe/buddha-temple-web-v07
QA: /workspace/scratch/86e439343dbe/temple-qa-v07

    npm test
    npm run build
    node --experimental-strip-types --test /workspace/scratch/86e439343dbe/temple-qa-v07/*.test.ts

Final logs: repository-tests.log, independent.log, build.log.
Tests: narration.test.ts, integration.test.ts, camera-integration.test.ts, v04-independent.test.ts, v05-discovery-independent.test.ts, v06-geometry.test.ts.
Complete source/dist identity: hashes.txt.

Main SHA256: 4cd0c0973f0e73fe71e847823f38f9d59660d8a8e4948aefb564625a988e38ea
Narration SHA256: b6340890d85e277a57f92c7586bc38d4f6bb28f2c9e309790aa8b42f7a552e34
JS index-Bx8XBtSR.js SHA256: bc7a77294ddf0df65fdd87b42d77c33fab7fdcc112f8cf7cb015f9411ffdef0b
CSS index-BeYgTHEZ.css SHA256: 9ab9e7c4157f4c7e096d31398a2771b72a25b3b1e914add7d53c5f0233350f20

Mocks establish code contracts, not actual DOM hit-testing or audio. NullEngine establishes Babylon transforms, not visual GPU rendering. No device acceptance or performance PASS is claimed.
