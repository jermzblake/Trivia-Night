let hamburger = document.getElementById("ham");
let sideMenu = document.getElementById("side-menu");
hamburger.addEventListener("click", sideMenuShow);

function sideMenuShow() {
  sideMenu.classList.toggle("not-active");
}
