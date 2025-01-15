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
    if (strip % 2 === 1) number += Math.floor(Math.max(0, lastTime[id]) / 10) * 10;
    let d1 = Math.floor(number / 10);
    let d2 = number % 10;

    if ((lastTime[id] > -1 && lastTime[id] < 60) || lastTime[id] !== number) {
        
        strips[strip].style.transform = `translateY(${((strip % 2 === 0) ? d1 : d2) * -numberSize}rem)`;
        if (strip % 2 === 0) strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}rem)`;

        lastTime[id] = number;

        highlight(strip, (strip % 2 === 0) ? d1 : d2);
        if (strip % 2 === 0) highlight(strip + 1, d2);
    }
}

let timerRunning = false;

function updateClock() {
    let hours;
    let mins;
    let secs;
    if (menuOpen) {
        secs = lastTime[2];
        mins = lastTime[1];
        hours = lastTime[0];
        if (timerRunning) {
            if (secs > 0) {
                secs--;
            } else if (mins > 0) {
                secs = 59;
                mins--;
            } else if (lastTime[0] > 0)  {
                secs = 59;
                mins = 59;
                hours--;
            } else {
                timerRunning = false;
                if (menuOpen) toggleMenu();
            }
        }
    } else {
        if (timerRunning) timerRunning = false;
        const time = new Date();
        hours = time.getHours();
        mins = time.getMinutes();
        secs = time.getSeconds();        
    }

    // slide strips
    stripSlider(0, 0, hours);
    stripSlider(2, 1, mins);
    stripSlider(4, 2, secs);
}

function toggleTimer() {
    timerRunning = !timerRunning;
}

// set Timer for clock-update
setInterval(updateClock, 1000);

updateClock();