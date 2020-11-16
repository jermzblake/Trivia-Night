// Set a timer to direct user to the switchboard at next scheduled state change
setTimeout (function() {
  window.location.href = 'http://127.0.0.1:8000/switchboard'
}, time_left)

setInterval(function() {
  window.location.href = `http://127.0.0.1:8000/waiting/${result_id}`
},1000)
