setTimeout (function() {
  window.location.href = 'http://127.0.0.1:8000/switchboard'
}, time_left)

setInterval(function() {
  let score = parseInt(document.getElementById('score').textContent)
  document.getElementById('score').textContent = (score - 50)
},1000)
