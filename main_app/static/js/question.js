// Set a timer to direct user to the switchboard at next scheduled state change
setTimeout (function() {
  window.location.href = '/pause'
}, time_left)

// Cache elements from page
let answerEls = document.querySelectorAll('.answer')
let scoreEl = document.querySelector('.progressjs-percent')

// Create event listener for answer selection
answerEls.forEach(a => {a.addEventListener('click', checkAnswer)})

let timeLeftPct = time_left / question_time

if (remove_order.length === 2) {
  if (timeLeftPct < (2/3)) {
    document.getElementById(remove_order.pop()).remove()
  } else {
    setTimeout(function(){
      document.getElementById(remove_order.pop()).remove()
    },(time_left - (question_time*2/3)))
  }
  if (timeLeftPct < (1/3)) {
    document.getElementById(remove_order.pop()).remove()
  } else {
    setTimeout(function(){
      document.getElementById(remove_order.pop()).remove()
    },(time_left - (question_time*1/3)))
  }
} else if (remove_order.length === 1) {
  if (timeLeftPct < (1/2)) {
    document.getElementById(remove_order.pop()).remove()
  } else {
    setTimeout(function(){
      document.getElementById(remove_order.pop()).remove()
    },(time_left - (question_time*1/2)))
  }
}

function checkAnswer(e) {
  answerEls.forEach(a => a.removeEventListener('click', checkAnswer))
  answer = e.target.textContent
  score = scoreEl.textContent.replace("%","")
  window.location.href = `/record_score/${answer}/${score}`
}

