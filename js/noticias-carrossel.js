function carrossel() {
  const noticiasLista = document.querySelector(".noticias-lista");
  const noticiasItems = noticiasLista.querySelectorAll(".noticias-item");

  const activeNoticiasItem = noticiasLista.querySelector(".noticias-item");
  activeNoticiasItem.setAttribute("active", "");

  document.querySelector("#previous").addEventListener("click", () => {
    const indexActiveNoticiasItem = [...noticiasItems].findIndex(
      (noticiasItem) => noticiasItem.hasAttribute("active")
    );

    toggleActive(
      noticiasItems[indexActiveNoticiasItem],
      findPrevious(indexActiveNoticiasItem)
    );
  });

  document.querySelector("#next").addEventListener("click", () => {
    const indexActiveNoticiasItem = [...noticiasItems].findIndex(
      (noticiasItem) => noticiasItem.hasAttribute("active")
    );

    toggleActive(
      noticiasItems[indexActiveNoticiasItem],
      findNext(indexActiveNoticiasItem)
    );
  });

  function findNext(activeElementIndex) {
    if (activeElementIndex === noticiasItems.length - 1) {
      return noticiasItems[0];
    } else {
      return noticiasItems[activeElementIndex + 1];
    }
  }

  function findPrevious(activeElementIndex) {
    if (activeElementIndex === 0) {
      return noticiasItems[noticiasItems.length - 1];
    } else {
      return noticiasItems[activeElementIndex - 1];
    }
  }

  function toggleActive(previousElement, targetElement) {
    previousElement.removeAttribute("active");
    targetElement.setAttribute("active", "");
  }
}

carrossel();
