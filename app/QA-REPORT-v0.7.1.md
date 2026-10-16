# V0.7.1 independent silence-path QA

## Verdict
65 repository tests, 17 independent tests, TypeScript check and production build PASS. Existing large bundle warning persists. This verifies a bounded diagnostics/discovery improvement, not a proven fix for the user's phone silence. Actual native Thai voice availability, audible playback, Android behavior and browser hit-testing remain UNKNOWN. No deployment or browser permission retry performed.

## Findings
The report did not establish whether Play had been tapped or what status was shown. V0.7 requires explicit Play in a learning station/helper dialog and uses only an enumerated Thai voice. Its initialization and voiceschanged event query available voices; Play is disabled without Thai. It has no obvious dedicated retry control. Reopening a station or changing volume incidentally rechecks voices, so it was not an absolute permanent lockout. Missing voice inventory, missing Thai voice, startup failure, muted device/media output and not having tapped Play remain distinct possibilities.

V0.7.1 adds explicit discovery-only recheck with immediate and 300/1000/3000 ms queries, clear unavailable/error codes, selected voice information, a zero-volume warning and wording that the speech engine reported start rather than promising audible output. It does not install voices, use a paid API, play automatically, or provide audio files.

During review, successful late voice discovery initially enabled Play while stale unavailable status could still say no Thai voice. Corrected before freeze: a check resets inactive unavailable/error/stopped status to idle, while preserving starting/playing/paused speech state. Independent test executes actual UI-render code and verifies ready voice text after recovery.

## Primary-source timing review
Web Speech API §4.2.2 defines cancel as clearing queued utterances without clearing paused state; resume clears pause; speak queues the utterance. It specifies no mandatory task delay between those calls. No verified evidence established a same-task timing bug on this device, so adding an arbitrary delay was not recommended.
Source: https://webaudio.github.io/web-speech-api/#speechsynthesis-methods
Chromium issue search surfaced related reports, but the full issue pages required sign-in; they were not used to establish the phone's cause.

## Evidence
Independent audio checks use the actual controller with a mock synthesis port and virtual timers:
- Late voices without voiceschanged become available through explicit bounded checks.
- Construction/recheck never speaks; repeated checks replace pending timers.
- Stop/dispose clear discovery polls, no delayed restart or subscription leak.
- Unsupported API, unknown empty inventory and non-Thai inventory remain distinct; no English fallback.
- Native error code retained; stale cancelled-session callbacks ignored.
- Missing start times out after 10 seconds and late start cannot revive stopped playback.
- Pause/stop/play clears engine pause; discovery during paused playback does not cancel or add utterances.
- Volume remains bounded and applies to next Play; zero warning present.
- Actual main.ts status-render code reports ready after recovery and qualifies engine-start wording.
- Source contract retains dialog/branch/background/practice/Realm cancellation and bfcache handling.

Seven additional tests execute actual pointer handlers against mocked DOM/capture for left/right role lock, crossing center, two-finger independence, cancellation, modal/Realm/quiet gates and first-person-only behavior. Repository tests include real Babylon camera transform coverage. src/controls.ts and src/camera-view.ts are byte-identical to restored V0.7 baseline. These checks do not constitute native Android acceptance.

## Reproduce
Project: /workspace/scratch/86e439343dbe/buddha-temple-web-v071
QA directory: /workspace/scratch/86e439343dbe/temple-qa-v071

    npm test
    npm run build
    node --experimental-strip-types --test /workspace/scratch/86e439343dbe/temple-qa-v071/*.test.ts

Evidence: independent.log, repository.log, build.log, hashes.txt; tests in audio-checks.test.ts and routing.test.ts.

Main SHA256: d327a093b60bf2fd456e6ea0c399a7bfda56b06a0af71f41dc20ae846ab0dd09
Narration SHA256: 80c12dd58396c2c6d2df31a73edd4e772e2834ae3f22fdc188e63aac16a96afd
JS index-B92R1ATx.js SHA256: 6a3df5c4ade0aeb952d4212a5c71c42077d24d97d633cc8e7cdb429f38e87eb0
