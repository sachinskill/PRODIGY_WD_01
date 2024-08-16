const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lab")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const lapsContainer = document.querySelector(".laps");
const bg = document.getElementsByClassName("outer-circle")[0];
const countdownInput = document.getElementById("countdown");
const setCountdownButton = document.getElementById("set-countdown");
const brightModeToggle = document.getElementById("bright-mode-toggle");
const clearLapsButton = document.querySelector('.lab-clear-button');

let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let centiCounter = 0;
let centiInterval;
let isReset = false;
let countdown = false;
let countdownMin = 0;
let countdownSec = 0;
let startSound = new Audio('click-buttons-ui-menu-sounds-effects-button-7-203601.mp3'); // Add your sound file
let stopSound = new Audio('mouse-click-153941.mp3');   // Add your sound file
let resetSound = new Audio('switch-150130.mp3'); // Add your sound file

const toggleButton = () => {
  lapButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");
};

const updateDisplay = () => {
  centiSecond.innerHTML = `${centiCounter}`;
  second.innerHTML = `${secCounter} :`;
  minute.innerHTML = `${minCounter} :`;
};

const play = () => {
  if (!isPlay && !isReset) {
    playButton.innerHTML = 'Pause';
    startSound.play();
    bg.classList.add("animation-bg");
    centiInterval = setInterval(() => {
      if (countdown) {
        centiCounter--;
        if (centiCounter < 0) {
          centiCounter = 99;
          secCounter--;
        }
        if (secCounter < 0) {
          secCounter = 59;
          minCounter--;
        }
        if (minCounter < 0) {
          reset();
          alert("Countdown finished!");
          return;
        }
      } else {
        centiCounter++;
        if (centiCounter === 100) {
          centiCounter = 0;
          secCounter++;
        }
        if (secCounter === 60) {
          secCounter = 0;
          minCounter++;
        }
      }
      updateDisplay();
    }, 10);

    isPlay = true;
    isReset = false;
  } else {
    playButton.innerHTML = 'Play';
    clearInterval(centiInterval);
    stopSound.play();
    isPlay = false;
    isReset = false;
    bg.classList.remove("animation-bg");
  }
  toggleButton();
};

const reset = () => {
  isReset = true;
  play();
  secCounter = 0;
  minCounter = 0;
  centiCounter = 0;
  countdown = false;
  updateDisplay();
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  lapsContainer.innerHTML = "";
  clearLapsButton.classList.add("hidden");
  resetSound.play();
};

const lap = () => {
  const lapItem = document.createElement("li");
  lapItem.className = "lap-items";

  const number = document.createElement("span");
  number.className = "number";
  number.textContent = `#${lapsContainer.children.length + 1}`;

  const timeStamp = document.createElement("span");
  timeStamp.className = "time-stamp";
  timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

  lapItem.appendChild(number);
  lapItem.appendChild(timeStamp);
  lapsContainer.appendChild(lapItem);
  clearLapsButton.classList.remove("hidden");
};

const setCountdown = () => {
  const [minutes, seconds] = countdownInput.value.split(':').map(Number);
  countdownMin = minutes || 0;
  countdownSec = seconds || 0;
  minCounter = countdownMin;
  secCounter = countdownSec;
  centiCounter = 0;
  countdown = true;
  updateDisplay();
};

const toggleBrightMode = () => {
  document.body.classList.toggle('bright-mode');
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
setCountdownButton.addEventListener("click", setCountdown);
brightModeToggle.addEventListener("click", toggleBrightMode);

clearLapsButton.addEventListener('click', () => {
  lapsContainer.innerHTML = '';
  clearLapsButton.classList.add("hidden");
});
