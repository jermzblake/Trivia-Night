let hamburger = document.getElementById("ham");
let sideMenu = document.getElementById("side-menu");
let menuState = localStorage.getItem("state");

hamburger.addEventListener("click", sideMenuShow);

function menuSet() {
  sideMenu.className = menuState;
}

function sideMenuShow() {
  if (sideMenu.className == "not-active") {
    sideMenu.classList.toggle("not-active");
    localStorage.setItem("state", "");
  } else {
    sideMenu.classList.toggle("not-active");
    localStorage.setItem("state", "not-active");
  }
}

menuSet();
