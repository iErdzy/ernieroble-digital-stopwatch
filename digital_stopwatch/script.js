let currentMode = 'free';
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

const progressBar = document.getElementById('progress-bar');
const timerMain = document.getElementById('timer-main');
const timerMs = document.getElementById('timer-ms');
const lapsList = document.getElementById('laps-list');
const toast = document.getElementById('goal-toast');

// Circle Setup
const radius = progressBar.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
progressBar.style.strokeDashoffset = circumference;

// Mode Switching
function setMode(mode) {
    if (timerInterval) return;
    currentMode = mode;
    document.getElementById('mode-free').classList.toggle('active', mode === 'free');
    document.getElementById('mode-goal').classList.toggle('active', mode === 'goal');
    document.getElementById('goal-container').classList.toggle('hidden', mode === 'free');
    reset();
}

function start() {
    startTime = Date.now() - elapsedTime;
    const goalMs = (currentMode === 'goal') ? getGoalInMs() : 0;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateUI(elapsedTime, goalMs);
    }, 10);

    if (currentMode === 'free') progressBar.classList.add('free-running');
    toggleButtons(true);
    toast.classList.add('hidden');
}

function updateUI(ms, goalMs) {
    // 1. Format Time
    let totalSeconds = Math.floor(ms / 1000);
    let h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    let m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    let s = (totalSeconds % 60).toString().padStart(2, '0');
    let cs = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');

    const formattedTime = `${h}:${m}:${s}`;
    timerMain.innerText = formattedTime;
    timerMs.innerText = `.${cs}`;

    // 2. Goal Mode logic: AUTO STOP
    if (currentMode === 'goal' && goalMs > 0) {
        const ratio = Math.min(ms / goalMs, 1);
        progressBar.style.strokeDashoffset = circumference - (ratio * circumference);

        if (ms >= goalMs) {
            pause(); // STOP the timer
            progressBar.style.stroke = "var(--accent-red)";
            toast.classList.remove('hidden');
            // Play a success sound
            try { new AudioContext().resume(); } catch(e) {}
        } else if ((goalMs - ms) <= 5000) {
            progressBar.style.stroke = "var(--accent-red)";
        } else if (ratio >= 0.8) {
            progressBar.style.stroke = "var(--accent-yellow)";
        } else {
            progressBar.style.stroke = "var(--accent-green)";
        }
    }
}

function recordLap() {
    lapCount++;
    const lapTime = `${timerMain.innerText}${timerMs.innerText}`;
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `<span>Lap ${lapCount}</span> <span>${lapTime}</span>`;
    lapsList.prepend(lapItem); // Add newest lap to top
}

function pause() {
    clearInterval(timerInterval);
    timerInterval = null;
    progressBar.classList.remove('free-running');
    toggleButtons(false);
}

function reset() {
    pause();
    elapsedTime = 0;
    lapCount = 0;
    lapsList.innerHTML = '';
    updateUI(0, 0);
    progressBar.style.strokeDashoffset = circumference;
    progressBar.style.stroke = currentMode === 'free' ? 'var(--accent-blue)' : 'var(--accent-green)';
    toast.classList.add('hidden');
}

function getGoalInMs() {
    const h = parseInt(document.getElementById('goal-hrs').value) || 0;
    const m = parseInt(document.getElementById('goal-min').value) || 0;
    const s = parseInt(document.getElementById('goal-sec').value) || 0;
    return (h * 3600 + m * 60 + s) * 1000;
}

function toggleButtons(running) {
    document.getElementById('start-btn').disabled = running;
    document.getElementById('pause-btn').disabled = !running;
    document.getElementById('lap-btn').disabled = !running;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.disabled = running);
}

// Listeners
document.getElementById('mode-free').addEventListener('click', () => setMode('free'));
document.getElementById('mode-goal').addEventListener('click', () => setMode('goal'));
document.getElementById('start-btn').addEventListener('click', start);
document.getElementById('pause-btn').addEventListener('click', pause);
document.getElementById('lap-btn').addEventListener('click', recordLap);
document.getElementById('reset-btn').addEventListener('click', reset);