let hamburger = document.getElementById("ham");
let sideMenu = document.getElementById("side-menu");
let menuState = localStorage.getItem("state");

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
  userChoice = e.target.value;
  if (userChoice === "hour") {
    hour.style.display = "block";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "none";
  }
  if (userChoice === "day") {
    hour.style.display = "none";
    day.style.display = "block";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "none";
  }
  if (userChoice === "month") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "block";
    month.style.display = "none";
    alltime.style.display = "none";
  }
  if (userChoice === "alltime") {
    hour.style.display = "none";
    day.style.display = "none";
    week.style.display = "none";
    month.style.display = "none";
    alltime.style.display = "block";
  }
}
// Setting the menu every reload
menuSet();
