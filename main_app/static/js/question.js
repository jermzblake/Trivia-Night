// Set a timer to direct user to the switchboard at next scheduled state change
setTimeout (function() {
  window.location.href = '/switchboard'
}, time_left)

// Cache elements from page
let answerEls = document.querySelectorAll('.answer')
let scoreEl = document.querySelector('.progressjs-percent')

// Create event listener for answer selection
answerEls.forEach(a => {a.addEventListener('click', checkAnswer)})

function checkAnswer(e) {
  answer = e.target.textContent
  score = scoreEl.textContent.replace("%","")
  window.location.href = `/record_score/${answer}/${score}`
}


let num_incorrect = remove_order.length
if (num_incorrect > 1) {
  setInterval(function() {
    let remove = remove_order.pop()
    document.getElementById(remove).remove()
  }, time_left/num_incorrect + 500)
}


