const noticiasItem = document.querySelectorAll(".noticias-item");

let noticiasItemFocused = calculateNoticiasItemFocused();

window.addEventListener("scroll", () => {
  const noticiasItemToFocus = calculateNoticiasItemFocused();

  if (noticiasItemToFocus !== noticiasItemFocused) {
    updateNoticiasItemFocused(noticiasItemToFocus);
  }
});

function calculateNoticiasItemFocused() {
  const scrollY = window.scrollY;
  const noticiasItemHeight = noticiasItem[0].clientHeight;

  return Math.floor((scrollY + noticiasItemHeight / 2) / noticiasItemHeight);
}

function updateNoticiasItemFocused(noticiasItemToFocus) {
  noticiasItem[noticiasItemFocused].removeAttribute("focus");
  noticiasItem[noticiasItemToFocus].setAttribute("focus", "");

  noticiasItemFocused = noticiasItemToFocus;
}
