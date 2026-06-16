const strips = [...document.querySelectorAll(".strip")];
const numberSize = "4"; // in rem

const lastTime = [-1, -1, -1];

// highlight number i on strip s for 1 second
function highlight(strip, d) {
  strips[strip]
    .querySelector(`.number:nth-of-type(${d + 1})`)
    .classList.add("pop");

  setTimeout(() => {
    strips[strip]
      .querySelector(`.number:nth-of-type(${d + 1})`)
      .classList.remove("pop");
  }, 950); // causes ticking
}

function stripSlider(strip, id, number) {
  if (strip % 2 === 1)
    number += Math.floor(Math.max(0, lastTime[id]) / 10) * 10;
  let d1 = Math.floor(number / 10);
  let d2 = number % 10;

  if ((lastTime[id] > -1 && lastTime[id] < 60) || lastTime[id] !== number) {
    strips[strip].style.transform =
      `translateY(${(strip % 2 === 0 ? d1 : d2) * -numberSize}rem)`;
    if (strip % 2 === 0)
      strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}rem)`;

    lastTime[id] = number;

    highlight(strip, strip % 2 === 0 ? d1 : d2);
    if (strip % 2 === 0) highlight(strip + 1, d2);
  }
}

let timerRunning = false;
let showAlarm = false;
let timerDir = -1;

function updateClock() {
  let hours;
  let mins;
  let secs;
  if (menuOpen) {
    secs = lastTime[2];
    mins = lastTime[1];
    hours = lastTime[0];
    if (timerRunning) {
      if (secs > (timerDir < 0 ? 0 : -1) && secs < (timerDir < 0 ? 60 : 59)) {
        secs += timerDir;
      } else if (
        mins > (timerDir < 0 ? 0 : -1) &&
        mins < (timerDir < 0 ? 60 : 59)
      ) {
        secs = timerDir < 0 ? 59 : 0;
        mins += timerDir;
      } else if (
        hours > (timerDir < 0 ? 0 : -1) &&
        hours < (timerDir < 0 ? 60 : 59)
      ) {
        secs = timerDir < 0 ? 59 : 0;
        mins = timerDir < 0 ? 59 : 0;
        hours += timerDir;
      } else {
        timerDir = 1;
        secs += timerDir;
        setAlarm(true);
      }
    }
  } else {
    if (timerRunning) timerRunning = false;
    const time = new Date();
    hours = time.getHours();
    mins = time.getMinutes();
    secs = time.getSeconds();
  }
  slideClock(hours, mins, secs);
}

function slideClock(hours, mins, secs) {
  stripSlider(0, 0, Math.min(29, Math.max(0, hours)));
  stripSlider(2, 1, Math.min(59, Math.max(0, mins)));
  stripSlider(4, 2, Math.min(59, Math.max(0, secs)));
}

function setAlarm(alarm) {
  if (alarm !== showAlarm) {
    showAlarm = !showAlarm;
    const alarm = document.querySelector(".alarm");
    if (showAlarm) {
      alarm.classList.remove("hide");
      alarm.classList.add("show");
    } else {
      alarm.classList.remove("show");
      alarm.classList.add("hide");
    }
  }
}

function stripToZero() {
  timerRunning = false;
  setAlarm(false);
  slideClock(0, 0, 0);
}

function toggleStopwatch() {
  if (!showAlarm) timerRunning = !timerRunning;
  if (timerRunning) timerDir = 1;
  setAlarm(false);
}

function toggleTimer() {
  if (!showAlarm) timerRunning = !timerRunning;
  if (timerRunning) timerDir = -1;
  setAlarm(false);
}

// set Timer for clock-update
setInterval(updateClock, 1000);

updateClock();
