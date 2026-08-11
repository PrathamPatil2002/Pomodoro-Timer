const timerDisplay =
    document.getElementById("timer");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const skipBtn =
    document.getElementById("skipBtn");

const focusBtn =
    document.getElementById("focusBtn");

const breakBtn =
    document.getElementById("breakBtn");

const statusText =
    document.getElementById("status");

const sessionsText =
    document.getElementById("sessions");

const currentMode =
    document.getElementById("currentMode");

const themeBtn =
    document.getElementById("themeBtn");


let focusTime = 25 * 60;

let breakTime = 5 * 60;

let timeLeft = focusTime;

let timer = null;

let running = false;

let mode = "focus";

let sessions =
    Number(
        localStorage.getItem(
            "pomodoroSessions"
        )
    ) || 0;


/* FORMAT TIME */

function updateDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


/* START */

function startTimer() {

    if (running) return;

    running = true;

    timer = setInterval(
        () => {

            timeLeft--;

            updateDisplay();

            if (timeLeft <= 0) {

                clearInterval(timer);

                running = false;

                completeSession();

            }

        },
        1000
    );

}


/* PAUSE */

function pauseTimer() {

    clearInterval(timer);

    running = false;

}


/* RESET */

function resetTimer() {

    clearInterval(timer);

    running = false;

    timeLeft =
        mode === "focus"
            ? focusTime
            : breakTime;

    updateDisplay();

}


/* COMPLETE */

function completeSession() {

    if (mode === "focus") {

        sessions++;

        localStorage.setItem(
            "pomodoroSessions",
            sessions
        );

        sessionsText.textContent =
            sessions;

        alert(
            "🎉 Focus session complete! Take a break."
        );

        switchMode("break");

    }

    else {

        alert(
            "☕ Break complete! Ready to focus?"
        );

        switchMode("focus");

    }

}


/* SWITCH MODE */

function switchMode(newMode) {

    clearInterval(timer);

    running = false;

    mode = newMode;

    if (mode === "focus") {

        timeLeft = focusTime;

        focusBtn.classList.add(
            "active"
        );

        breakBtn.classList.remove(
            "active"
        );

        statusText.textContent =
            "Time to focus";

        currentMode.textContent =
            "Focus";

    }

    else {

        timeLeft = breakTime;

        breakBtn.classList.add(
            "active"
        );

        focusBtn.classList.remove(
            "active"
        );

        statusText.textContent =
            "Take a short break";

        currentMode.textContent =
            "Break";

    }

    updateDisplay();

}


/* BUTTON EVENTS */

startBtn.addEventListener(
    "click",
    startTimer
);


pauseBtn.addEventListener(
    "click",
    pauseTimer
);


resetBtn.addEventListener(
    "click",
    resetTimer
);


skipBtn.addEventListener(
    "click",
    () => {

        if (mode === "focus") {

            switchMode("break");

        }

        else {

            switchMode("focus");

        }

    }
);


focusBtn.addEventListener(
    "click",
    () => {

        switchMode("focus");

    }
);


breakBtn.addEventListener(
    "click",
    () => {

        switchMode("break");

    }
);


/* DARK MODE */

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        const dark =
            document.body.classList.contains(
                "dark"
            );

        themeBtn.textContent =
            dark
                ? "☀️"
                : "🌙";

        localStorage.setItem(
            "pomodoroDark",
            dark
        );

    }
);


/* LOAD DARK MODE */

if (
    localStorage.getItem(
        "pomodoroDark"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent =
        "☀️";

}


/* LOAD SESSIONS */

sessionsText.textContent =
    sessions;


/* INITIAL DISPLAY */

updateDisplay();
