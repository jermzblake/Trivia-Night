// Set a timer to direct user to the switchboard at next scheduled state change
setTimeout (function() {
  window.location.href = '/switchboard'
}, time_left)

setInterval(function() {
  window.location.href = `/waiting/${result_id}`
},1000)
