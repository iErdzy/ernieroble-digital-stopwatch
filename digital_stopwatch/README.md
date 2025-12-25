# STOPWATCH

## DESCRIPTION
A modern, visually polished stopwatch web application built with HTML, CSS, and JavaScript. It supports Free Time tracking and Goal-based timing, complete with a circular progress visualizer, lap recording, and responsive UI.

## FEATURES

**🕒 Free Time Mode**
- Run the stopwatch with no time limit
- Smooth animated circular ring
- Record lap times
- Millisecond-level precision

**🎯 Goal Mode**
- Set a target time (hours, minutes, seconds)
- Circular progress fills as time passes
- Auto-stops when the goal is reached
- Visual warnings:
    • 🟢 Green – early progress
    • 🟡 Yellow – 80% reached
    • 🔴 Red – last 5 seconds
- Displays a “Time is up!” toast when finished

## TECHNOLOGIES USED

- **HTML5** – Structure
- **CSS3** – Styling, animations, and layout
- **Vanilla JavaScript** – Stopwatch logic and DOM handling
- **SVG** – Circular progress visualizer

## PROJECT STRUCTURE

│
├── index.html     # Main HTML file
├── style.css      # App styling and animations
├── script.js      # Stopwatch logic and interactivity
└── README.md      # Project documentation

## HOW TO RUN

1. Download or clone this repository
2. Open index.html in any modern web browser
3. Choose a mode:
    • Free Time – standard stopwatch
    • Set Goal – countdown-style stopwatch
4. Click Start, Pause, Lap, or Reset as needed
No installations or dependencies required.

## HOW IT WORKS (LOGIC OVERVIEW)

- Uses Date.now() for high-precision time tracking
- Updates the UI every 10 milliseconds
- Converts elapsed milliseconds into:
    • Hours
    • Minutes
    • Seconds
    • Centiseconds
- SVG stroke calculations control the progress ring animation
- Lap times are dynamically prepended to the lap list

