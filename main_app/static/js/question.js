// Set a timer to direct user to the switchboard at next scheduled state change
setTimeout (function() {
  window.location.href = 'http://127.0.0.1:8000/switchboard'
}, time_left)

// Cache elements from page
let answerEls = document.querySelectorAll('.answer')
let scoreEl = document.querySelector('.progressjs-percent')

// Create event listener for answer selection
answerEls.forEach(a => {a.addEventListener('click', checkAnswer)})

function checkAnswer(e) {
  answer = e.target.textContent
  score = scoreEl.textContent.replace("%","")
  window.location.href = `http://127.0.0.1:8000/record_score/${answer}/${score}`
}
