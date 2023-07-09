document.addEventListener("DOMContentLoaded", () => {
  // Global Variables
  const newsItems = document.querySelectorAll(".news-item");
  const breakPointLarge = 992;

  // ---------------------------- AUTO FOCUS ----------------------------
  newsItems[0].setAttribute("focus", "");

  const newsItemHeight = newsItems[0].clientHeight;

  function focusNewsItemOnScroll() {
    const newsItemToFocus = getNewsItemToFocus();
    const newsItemOnFocus = document.querySelector(".news-item[focus]");

    if (newsItemToFocus !== newsItemOnFocus) {
      updateNewsItemFocused(newsItemOnFocus, newsItemToFocus);
    }
  }

  function getNewsItemToFocus() {
    const scrollY = window.scrollY;

    const newsItemToFocusIndex = Math.floor(
      (scrollY + newsItemHeight / 2) / newsItemHeight
    );

    return newsItems[newsItemToFocusIndex];
  }

  function updateNewsItemFocused(newsItemToUnfocus, newsItemToFocus) {
    newsItemToUnfocus.removeAttribute("focus");
    newsItemToFocus.setAttribute("focus", "");
  }

  // ---------------------------- FULLSCREEN HANDLER ----------------------------
  function extractNewsItem(element) {
    if (element.classList.contains("news-item")) {
      return element;
    }

    return extractNewsItem(element.parentElement);
  }

  function fullScreenNewsItem(e) {
    if (e.target.tagName === "A") {
      return;
    }

    const newsItem = extractNewsItem(e.target);

    window.removeEventListener("scroll", focusNewsItemOnScroll);
    newsItem.setAttribute("fullscreen", "");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  document.querySelector("#close-fullscreen").addEventListener("click", () => {
    const newsItemFullScreen = document.querySelector(".news-item[fullscreen]");

    newsItemFullScreen.removeAttribute("fullscreen");
    window.scrollTo({ top: newsItemFullScreen.offsetTop, behavior: "instant" });
    window.addEventListener("scroll", focusNewsItemOnScroll);
  });

  // ---------------------------- CARROUSEL HANDLER ----------------------------
  newsItems[0].setAttribute("active", "");

  document.querySelector("#previous").addEventListener("click", () => {
    const indexNewsItemActive = [...newsItems].findIndex((newsItem) =>
      newsItem.hasAttribute("active")
    );

    toggleActive(
      newsItems[indexNewsItemActive],
      findPrevious(indexNewsItemActive)
    );
  });

  document.querySelector("#next").addEventListener("click", () => {
    const newsItemActiveIndex = [...newsItems].findIndex((newsItem) =>
      newsItem.hasAttribute("active")
    );

    toggleActive(newsItems[newsItemActiveIndex], findNext(newsItemActiveIndex));
  });

  function toggleActive(previousElement, targetElement) {
    previousElement.removeAttribute("active");
    targetElement.setAttribute("active", "");

    updateNewsBadge();
  }

  function findNext(activeElementIndex) {
    if (activeElementIndex === newsItems.length - 1) {
      return newsItems[0];
    } else {
      return newsItems[activeElementIndex + 1];
    }
  }

  function findPrevious(activeElementIndex) {
    if (activeElementIndex === 0) {
      return newsItems[newsItems.length - 1];
    } else {
      return newsItems[activeElementIndex - 1];
    }
  }

  // ---------------------------- BADGE HANDLER ----------------------------
  const newsBadge = document.querySelector("#news-badge");

  const headerHeight = document.querySelector("header#cabecalho").clientHeight;
  const newsBadgeScrollY = newsBadge.offsetTop;
  const newsBadgeTopDistance = 30;

  window.addEventListener("scroll", () => {
    const offsetGapY = newsBadgeScrollY - window.scrollY;

    if (headerHeight >= window.scrollY) {
      newsBadge.style.top = `${offsetGapY}px`;
    } else {
      newsBadge.style.top = `${newsBadgeTopDistance}px`;
    }
  });

  function updateNewsBadge() {
    const newsItemActive = document.querySelector(".news-item[active]");
    const newsItemActiveIndex = [...newsItems].indexOf(newsItemActive);

    newsBadge.textContent = `${newsItemActiveIndex + 1} / ${newsItems.length}`;
  }

  updateNewsBadge();

  // ---------------------------- EVENTS HANDLER ----------------------------
  window.addEventListener("resize", eventsHandler);
  eventsHandler();

  function eventsHandler() {
    if (window.innerWidth >= breakPointLarge) {
      const newsItemFullScreen = document.querySelector(
        ".news-item[fullscreen]"
      );

      // Focus
      if (!newsItemFullScreen) {
        focusNewsItemOnScroll();
        window.addEventListener("scroll", focusNewsItemOnScroll);
      }

      // FullScreen
      newsItems.forEach((newsItem) => {
        newsItem.addEventListener("click", fullScreenNewsItem);
      });
    } else {
      // Focus
      window.removeEventListener("scroll", focusNewsItemOnScroll);

      // FullScreen
      newsItems.forEach((newsItem) => {
        newsItem.removeEventListener("click", fullScreenNewsItem);
      });
    }
  }
});