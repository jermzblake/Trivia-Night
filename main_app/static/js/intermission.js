// page timer
setTimeout (function() {
  window.location.href = '/switchboard'
}, time_left)

// state variables
let timerInterval = null;
const FULL_DASH_ARRAY = 283;
// Warning occurs at 10s
const WARNING_THRESHOLD = time_left * 2 / 3;
// Alert occurs at 5s
const ALERT_THRESHOLD = time_left / 3;

// colours for the time remaining ring
const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

// this is if we want to have the time displayed 
//it's not included right now
function formatTime(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = 0;
  
  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = Math.floor(time / 1000)
  
  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

// // Start with an initial value of time_left seconds
const TIME_LIMIT = time_left - (time_left % (Math.floor(time_left/1000)*1000)) - 1000;
console.log(TIME_LIMIT)

// // Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

function startTimer() {
  timerInterval = setInterval(function (){
    // The amount of time passed increments by one
    timePassed = timePassed += 1000;
    timeLeft = TIME_LIMIT - timePassed;
    // Remaining Path Color change
    setRemainingPathColor(timeLeft)
    //update our path each second that passes
    setCircleDasharray();
    }, 1000);
}

startTimer()

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);

  // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}


//Animate the progress ring

// Divides time left by the defined time limit.
function calculateTimeFraction() {
  if (timeLeft > 0) {
    rawTimeFraction = timeLeft / TIME_LIMIT;
  } else {
    rawTimeFraction = 0
  }
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
    
// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

