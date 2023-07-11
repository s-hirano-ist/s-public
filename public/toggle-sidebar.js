const SIDEBAR_WIDTH = "300px";
const SLIDE_MAIN_CONTENTS = false;

function openNav() {
  // set the width of the opened navigation bar
  document.getElementById("post-side-nav").style.width = SIDEBAR_WIDTH;
  if (SLIDE_MAIN_CONTENTS)
    document.getElementById("post-main-contents").style.marginLeft =
      SIDEBAR_WIDTH;
  localStorage.setItem("sidebarOpen", "true");
}
function closeNav() {
  // set the width of the closed navigation bar
  document.getElementById("post-side-nav").style.width = "0";
  if (SLIDE_MAIN_CONTENTS)
    document.getElementById("post-main-contents").style.marginLeft = "0";
  localStorage.setItem("sidebarOpen", "false");
}

const closeWithClickOutSide = e => {
  if (e.target.id === "open-sidebar-icon") return;

  // if outside of menu
  if (e.target === e.currentTarget) {
    if (localStorage.getItem("sidebarOpen") === "true") closeNav();
    else openNav();
  } else {
    if (localStorage.getItem("sidebarOpen") === "true") closeNav();
  }
};

localStorage.setItem("sidebarOpen", "false");

const mainClickArea = document.querySelector("div.main-click-area");
mainClickArea.addEventListener("click", e => {
  closeWithClickOutSide(e);
});

const openButton = document.querySelector("span.open-sidebar-button");
openButton.addEventListener("click", () => {
  openNav();
});

const closeButton = document.querySelector("span.close-sidebar-button");
closeButton.addEventListener("click", () => {
  closeNav();
});
