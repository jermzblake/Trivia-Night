// // Set a timer to direct user to the switchboard at next scheduled state change
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
      let num = 1
      let htmlBlock = ''
      for (item of data) {
        if (num === 1) {
          htmlBlock = 
            '<div class="score-tile">' +
              '<div class="score-tile-score">' +
                `<div class="score-tile-score-avatar"><img id="avatar-pic" width="48px" src="${item.url}" alt=""/></div>` +
                `<div class="score-tile-score-name">${item.user}</div>` +
                `<div class="score-tile-score-score">${item.points}</div>` +
              '</div>' +
              '<div class="score-tile-quip">' +
                `<div class="score-tile-quip-quip">${item.quip}</div>` +
              '</div>' +
            '</div>'
          num += 1
        } else {
          htmlBlock = 
            '<div class="score-tile">' +
              '<div class="score-tile-score">' +
                `<div class="score-tile-score-avatar"><img id="avatar-pic" width="48px" src="${item.url}" alt=""/></div>` +
                `<div class="score-tile-score-name">${item.user}</div>` +
                `<div class="score-tile-score-score">${item.points}</div>` +
              '</div>' +
            '</div>'
        }
        let scoreboardItem = document.createElement('div')
        scoreboardItem.innerHTML =  htmlBlock
        listEl.appendChild(scoreboardItem)
      }
  })
}




