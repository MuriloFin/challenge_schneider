const header = document.querySelector("header#cabecalho");
const main = document.querySelector("header#cabecalho + main");

function resizeMainMinHeight() {
  const { height: headerHeight } = header.getBoundingClientRect();

  const newMainMinHeight = window.innerHeight - headerHeight
  main.style.minHeight = `${newMainMinHeight}px`;
}

window.addEventListener("resize", resizeMainMinHeight);

resizeMainMinHeight()
