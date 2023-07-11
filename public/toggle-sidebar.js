function openNav() {
  // set the width of the opened navigation bar
  document.getElementById("post-side-nav").style.width = "600px";
}
function closeNav() {
  // set the width of the closed navigation bar
  document.getElementById("post-side-nav").style.width = "0";
}

window.onload = () => {
  const openButton = document.querySelector("span.open-sidebar-button");
  openButton.addEventListener("click", () => {
    openNav();
  });

  const closeButton = document.querySelector("span.close-sidebar-button");
  closeButton.addEventListener("click", () => {
    closeNav();
  });
};
