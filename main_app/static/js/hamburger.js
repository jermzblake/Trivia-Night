let hamburger = document.getElementById("ham");
let sideMenu = document.getElementById("side-menu");
let menuState = localStorage.getItem("state");

hamburger.addEventListener("click", sideMenuShow);

// This grabs the hamburger menu's state from localstorage
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

// Setting the menu every reload
menuSet();
