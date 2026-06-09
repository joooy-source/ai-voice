# Coach section video (02)

The Coach section uses a **single** video and seeks to a chapter timestamp
when each tab is clicked (no need to cut the video into pieces).

- Put one file here: `coach.mp4`

Then set each tab's `start` (in seconds) in
`src/components/landing/CoachSection.jsx` to match the chapter start times in
your video. Defaults are 0 / 8 / 16 / 24s — edit to fit.

Until a file is present, the section falls back to a timer-driven gauge.
