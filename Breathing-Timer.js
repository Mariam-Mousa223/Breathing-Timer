let isRunning = false;
let currentPhase = 'idle'; 
let phaseDuration = 4;
let timeLeft = 4;
let completedCycles = 0;
let timerInterval = null;

const breathCircle = document.getElementById('breathCircle');
const phaseText = document.getElementById('phaseText');
const timerCountdown = document.getElementById('timerCountdown');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const phaseInput = document.getElementById('phaseDuration');
const cycleCount = document.getElementById('cycleCount');
const progressBar = document.getElementById('progressBar');

function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    isRunning = true;
    startBtn.textContent = '⏸ Pause';
    startBtn.style.background = '#eab308';
    phaseInput.disabled = true;

    if (currentPhase === 'idle') {
        phaseDuration = parseInt(phaseInput.value) || 4;
        setPhase('inhale');
    }

    timerInterval = setInterval(tick, 1000);
}

function pauseTimer() {
    isRunning = false;
    startBtn.textContent = '▶ Resume';
    startBtn.style.background = '#06b6d4';
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    currentPhase = 'idle';
    phaseDuration = parseInt(phaseInput.value) || 4;
    timeLeft = phaseDuration;
    completedCycles = 0;
    
    phaseInput.disabled = false;
    startBtn.textContent = '▶ Start';
    startBtn.style.background = '#06b6d4';
    phaseText.textContent = 'Ready?';
    timerCountdown.textContent = `${phaseDuration}s`;
    cycleCount.textContent = '0';
    progressBar.style.width = '0%';
    
    breathCircle.className = 'breath-circle';
}

function tick() {
    timeLeft--;
    timerCountdown.textContent = `${timeLeft}s`;
    
    let progressPercentage = ((phaseDuration - timeLeft) / phaseDuration) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (timeLeft <= 0) {
        nextPhase();
    }
}

function nextPhase() {
    if (currentPhase === 'inhale') {
        setPhase('hold');
    } else if (currentPhase === 'hold') {
        setPhase('exhale');
    } else if (currentPhase === 'exhale') {
        completedCycles++;
        cycleCount.textContent = completedCycles;
        setPhase('inhale');
    }
}

function setPhase(phase) {
    currentPhase = phase;
    timeLeft = phaseDuration;
    timerCountdown.textContent = `${timeLeft}s`;
    progressBar.style.width = '0%';

    breathCircle.className = 'breath-circle';

    if (phase === 'inhale') {
        phaseText.textContent = 'Inhale...';
        breathCircle.classList.add('inhale');
        breathCircle.style.transitionDuration = `${phaseDuration}s`;
    } else if (phase === 'hold') {
        phaseText.textContent = 'Hold';
        breathCircle.classList.add('hold');
        breathCircle.style.transitionDuration = '0.3s';
    } else if (phase === 'exhale') {
        phaseText.textContent = 'Exhale...';
        breathCircle.classList.add('exhale');
        breathCircle.style.transitionDuration = `${phaseDuration}s`;
    }
}

startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

phaseInput.addEventListener('change', () => {
    if (!isRunning) {
        phaseDuration = parseInt(phaseInput.value) || 4;
        timerCountdown.textContent = `${phaseDuration}s`;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        toggleTimer();
    }
});
