setTimeout (function() {
  window.location.href = 'http://127.0.0.1:8000/switchboard'
}, time_left)

// // Start with an initial value of 20 seconds
// const TIME_LIMIT = 20;

// // Initially, no time has passed, but this will count up
// // and subtract from the TIME_LIMIT
// let timePassed = 0;
// let timeLeft = TIME_LIMIT;

function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);
  
  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;
  
  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

