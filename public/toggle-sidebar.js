const SIDEBAR_WIDTH = "300px";
function openNav() {
  // set the width of the opened navigation bar
  document.getElementById("post-side-nav").style.width = SIDEBAR_WIDTH;
  document.getElementById("post-main-contents").style.marginLeft =
    SIDEBAR_WIDTH;
  localStorage.setItem("sidebarOpen", "true");
}
function closeNav() {
  // set the width of the closed navigation bar
  document.getElementById("post-side-nav").style.width = "0";
  document.getElementById("post-main-contents").style.marginLeft = "0";
  localStorage.setItem("sidebarOpen", "false");
}

const closeWithClickOutSideMethod = e => {
  // if outside of menu
  if (e.target === e.currentTarget) {
    if (localStorage.getItem("sidebarOpen") === "true") closeNav();
    else openNav();
  }
};

window.onload = () => {
  localStorage.setItem("sidebarOpen", "false");

  const openButton = document.querySelector("span.open-sidebar-button");
  openButton.addEventListener("click", () => {
    openNav();
  });

  const closeButton = document.querySelector("span.close-sidebar-button");
  closeButton.addEventListener("click", () => {
    closeNav();
  });

  const mainClickArea = document.querySelector("div.main-click-area");
  mainClickArea.addEventListener("click", e => {
    closeWithClickOutSideMethod(e);
  });
};
