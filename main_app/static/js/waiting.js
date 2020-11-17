// Set a timer to direct user to the switchboard at next scheduled state change
setTimeout (function() {
  window.location.href = '/switchboard'
}, time_left)

refreshScoreboard()
setInterval(refreshScoreboard,2500)

listEl = document.getElementById('scoreboard')

async function refreshScoreboard() {
  await fetch('/refresh_scoreboard', {
    headers:{
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
  })
  .then(response => {
      return response.json()
  })
  .then(data => {
      listEl.innerHTML = ''
      for (const [key, value] of Object.entries(data)) {
        let scoreboardItem = document.createElement('h5')
        scoreboardItem.textContent =  `${key} - ${value}`
        listEl.appendChild(scoreboardItem)
      }
  })
}
