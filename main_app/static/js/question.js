// Set a timer to direct user to the switchboard at next scheduled state change
setTimeout (function() {
  window.location.href = 'http://127.0.0.1:8000/switchboard'
}, time_left)

// Set a timer to reduce score periodically
setInterval(function() {
  let score = parseInt(document.getElementById('score').textContent)
  document.getElementById('score').textContent = (score - 50)
},1000)

// Cache elements from page
let answerEls = document.querySelectorAll('.answer')
let scoreEl = document.getElementById('score')

console.log(answerEls)

// Create event listener for answer selection
answerEls.forEach(a => {a.addEventListener('click', checkAnswer)})

function checkAnswer(e) {
  answer = e.target.textContent
  score = parseInt(scoreEl.textContent)
  window.location.href = `http://127.0.0.1:8000/waiting/${answer}/${score}`
}
