let hamburger = document.getElementById("ham");
let sideMenu = document.getElementById("side-menu");
let tableContent = document.querySelector("table-content");
let menuState = localStorage.getItem("state");
let leaderboardState = localStorage.getItem("leaderboard");

let hour = document.querySelector("#hour");
let day = document.querySelector("#day");
let week = document.querySelector("#week");
let month = document.querySelector("#month");
let alltime = document.querySelector("#alltime");

let hourBoard = document.querySelector(".hour_board");
let dayBoard = document.querySelector(".day_board");
let weekBoard = document.querySelector(".week_board");
let monthBoard = document.querySelector(".month_board");
let alltimeBoard = document.querySelector(".alltime_board");

hamburger.addEventListener("click", sideMenuShow);

hour.addEventListener("click", leaderboardChange);
day.addEventListener("click", leaderboardChange);
week.addEventListener("click", leaderboardChange);
month.addEventListener("click", leaderboardChange);
alltime.addEventListener("click", leaderboardChange);

function menuSet() {
  sideMenu.className = menuState;
}

// Toggling the two states of the menu in local storage and front end side
function sideMenuShow() {
  if (sideMenu.className == "closed") {
    sideMenu.classList.toggle("closed");
    localStorage.setItem("state", "open");
  } else {
    sideMenu.classList.toggle("closed");
    localStorage.setItem("state", "closed");
  }
}

function leaderboardChange(e) {
  let userChoice = e.target.value;
  if (userChoice === "hour") {
    hourBoard.style.display = "block";
    dayBoard.style.display = "none";
    weekBoard.style.display = "none";
    monthBoard.style.display = "none";
    alltimeBoard.style.display = "none";
    localStorage.setItem("leaderboard", "hour");
    localStorage.setItem("index", "0");
  }
  if (userChoice === "day") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "block";
    weekBoard.style.display = "none";
    monthBoard.style.display = "none";
    alltimeBoard.style.display = "none";
    localStorage.setItem("leaderboard", "day");
    localStorage.setItem("index", "1");
  }
  if (userChoice === "week") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "none";
    weekBoard.style.display = "block";
    monthBoard.style.display = "none";
    alltimeBoard.style.display = "none";
    localStorage.setItem("leaderboard", "week");
    localStorage.setItem("index", "2");
  }
  if (userChoice === "month") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "none";
    weekBoard.style.display = "none";
    monthBoard.style.display = "block";
    alltimeBoard.style.display = "none";
    localStorage.setItem("leaderboard", "month");
    localStorage.setItem("index", "3");
  }
  if (userChoice === "alltime") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "none";
    weekBoard.style.display = "none";
    monthBoard.style.display = "none";
    alltimeBoard.style.display = "block";
    localStorage.setItem("leaderboard", "alltime");
    localStorage.setItem("index", "4");
  }
}

currentBoard = localStorage.getItem("leaderboard");
localStorage.setItem("leaderboard", currentBoard);

function leaderboardStateChange() {
  currentSelect = localStorage.getItem("index");
  if (currentBoard == "hour") {
    hourBoard.style.display = "block";
    dayBoard.style.display = "none";
    weekBoard.style.display = "none";
    monthBoard.style.display = "none";
    alltimeBoard.style.display = "none";
    localStorage.setItem("leaderboard", "hour");
  }
  if (currentBoard == "day") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "block";
    weekBoard.style.display = "none";
    monthBoard.style.display = "none";
    alltime.style.display = "none";
    localStorage.setItem("leaderboard", "day");
  }
  if (currentBoard == "week") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "none";
    weekBoard.style.display = "block";
    monthBoard.style.display = "none";
    alltimeBoard.style.display = "none";
    localStorage.setItem("leaderboard", "week");
  }
  if (currentBoard == "month") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "none";
    weekBoard.style.display = "none";
    monthBoard.style.display = "block";
    alltimeBoard.style.display = "none";
    localStorage.setItem("leaderboard", "month");
  }
  if (currentBoard == "alltime") {
    hourBoard.style.display = "none";
    dayBoard.style.display = "none";
    weekBoard.style.display = "none";
    monthBoard.style.display = "none";
    alltimeBoard.style.display = "block";
    localStorage.setItem("leaderboard", "alltime");
  }
}

window.addEventListener("click", function (e) {
  if (
    e.target != hamburger &&
    e.target != sideMenu &&
    e.target.value != "hour" &&
    e.target.value != "day" &&
    e.target.value != "week" &&
    e.target.value != "month" &&
    e.target.value != "alltime" &&
    e.target != tableContent
  ) {
    sideMenu.classList.add("closed");
    localStorage.setItem("state", "closed");
  }
});

// Setting the menu every reload
menuSet();
leaderboardStateChange();
