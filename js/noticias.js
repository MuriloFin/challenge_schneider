function newsItemsAutoFocus() {
  const newsItems = document.querySelectorAll(".news-item");
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

  const breakPointLarge = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--bs-breakpoint-lg"
    )
  );

  window.addEventListener("resize", toggleFocusNewsItemOnScrollEventListener);

  toggleFocusNewsItemOnScrollEventListener();

  function toggleFocusNewsItemOnScrollEventListener() {
    if (window.innerWidth >= breakPointLarge) {
      focusNewsItemOnScroll();
      window.addEventListener("scroll", focusNewsItemOnScroll);
    } else {
      window.removeEventListener("scroll", focusNewsItemOnScroll);
    }
  }
}

function fullScreenNewsItemHandler() {
  const newsItems = document.querySelectorAll(".news-item");

  function extractNewsItem(element) {
    if (element.classList.contains("news-item")) {
      return element;
    }

    return extractNewsItem(element.parentElement);
  }

  function fullScreenNewsItem(e) {
    const newsItem = extractNewsItem(e.target);

    newsItem.setAttribute("fullscreen", "");
  }

  document.querySelector("#close-fullscreen").addEventListener("click", () => {
    const newsItemFullScreen = document.querySelector(".news-item[fullscreen]");

    newsItemFullScreen.removeAttribute("fullscreen");

    newsItemFullScreen.scrollIntoView();
  });

  window.addEventListener("resize", toggleFullScreenNewsItemEventListener);

  const breakPointLarge = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--bs-breakpoint-lg"
    )
  );

  toggleFullScreenNewsItemEventListener();

  function toggleFullScreenNewsItemEventListener() {
    if (window.innerWidth >= breakPointLarge) {
      newsItems.forEach((newsItem) => {
        newsItem.addEventListener("click", fullScreenNewsItem);
      });
    } else {
      newsItems.forEach((newsItem) => {
        newsItem.removeEventListener("click", fullScreenNewsItem);
      });
    }
  }
}

function changeNewsItemActive() {
  const newsItems = document.querySelectorAll(".news-item");

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
}

newsItemsAutoFocus();
fullScreenNewsItemHandler();
changeNewsItemActive();
