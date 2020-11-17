let hamburger = document.getElementById("ham");
let sideMenu = document.getElementById("side-menu");

let menuState = localStorage.getItem("state");
let leaderboardState = localStorage.getItem("leaderboard");

let selector = document.getElementById("selector");

let hour = document.querySelector(".hour");
let day = document.querySelector(".day");
let week = document.querySelector(".week");
let month = document.querySelector(".month");
let alltime = document.querySelector(".alltime");

selector.addEventListener("click", leaderboardChange);

hamburger.addEventListener("click", sideMenuShow);

function menuSet() {
  sideMenu.className = menuState;
}

// Toggling the two states of the menu in local storage and front end side
function sideMenuShow(e) {
  if (sideMenu.className == "closed") {
    sideMenu.classList.toggle("closed");
    localStorage.setItem("state", "open");
  } else {
    sideMenu.classList.toggle("closed");
    localStorage.setItem("state", "closed");
  }
}

function leaderboardChange(e) {
  userChoice = e.target.value;
  if (userChoice === "hour") {
    hour.style.display = "block";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "hour");
    localStorage.setItem("index", "0");
  }
  if (userChoice === "day") {
    hour.style.display = "none";
    day.style.display = "block";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "day");
    localStorage.setItem("index", "1");
  }
  if (userChoice === "week") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "block";
    month.style.display = "none";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "week");
    localStorage.setItem("index", "2");
  }
  if (userChoice === "month") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "block";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "month");
    localStorage.setItem("index", "3");
  }
  if (userChoice === "alltime") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "block";
    localStorage.setItem("leaderboard", "alltime");
    localStorage.setItem("index", "4");
  }
}

currentBoard = localStorage.getItem("leaderboard");
localStorage.setItem("leaderboard", currentBoard);

function leaderboardStateChange() {
  currentSelect = localStorage.getItem("index");
  if (currentBoard == "hour") {
    hour.style.display = "block";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "hour");
    selector.selectedIndex = currentSelect;
  }
  if (currentBoard == "day") {
    hour.style.display = "none";
    day.style.display = "block";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "day");
    selector.selectedIndex = currentSelect;
  }
  if (currentBoard == "week") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "block";
    month.style.display = "none";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "week");
    selector.selectedIndex = currentSelect;
  }
  if (currentBoard == "month") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "block";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "month");
    selector.selectedIndex = currentSelect;
  }
  if (currentBoard == "alltime") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "block";
    localStorage.setItem("leaderboard", "alltime");
    selector.selectedIndex = currentSelect;
  }
}
window.addEventListener("click", function (e) {
  console.log(e.target.id);
  if (e.target != hamburger && e.target != selector && e.target != sideMenu) {
    sideMenu.classList.add("closed");
    localStorage.setItem("state", "closed");
  }
});
// Setting the menu every reload
menuSet();
leaderboardStateChange();
