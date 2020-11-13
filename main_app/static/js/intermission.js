// page timer
setTimeout (function() {
  window.location.href = 'http://127.0.0.1:8000/switchboard'
}, time_left)

// setting the class of the time remaining ring for dynamic colour change
// document
// .getElementById("base-timer-path-remaining")
// .setAttribute("class", `base-timer__path-remaining ${remainingPathColor}`);

// colours for the time remaining ring
// const COLOR_CODES = {
//   info: {
//     color: "green"
//   }
// };

// state variables
// let remainingPathColor = COLOR_CODES.info.color;
let timerInterval = null;
const FULL_DASH_ARRAY = 283;

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
const TIME_LIMIT = time_left;

// // Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;

function startTimer() {
  timerInterval = setInterval(function (){
    // The amount of time passed increments by one
    timePassed = timePassed += 1000;
    timeLeft = TIME_LIMIT - timePassed;
    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    //update our path each second that passes
    setCircleDasharray();
    }, 1000);
}

startTimer()

//Animate the progress ring

// Divides time left by the defined time limit.
function calculateTimeFraction() {
  return timeLeft / TIME_LIMIT;
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