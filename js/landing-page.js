document.addEventListener("DOMContentLoaded", () => {
  const landingPageInteractive = document.querySelector(
    "#landing-page-interactive"
  );
  const article = document.querySelector("#landing-page-interactive article");
  const park = document.querySelector("#landing-page-interactive img.park");
  const icons = document.querySelectorAll("#landing-page-interactive img.icon");
  const trash = document.querySelector("#landing-page-interactive .trash img");

  const EMOJIS = ["👍", "❤️", "😄"];

  const viewportStabilizerX =
    (landingPageInteractive.clientWidth - article.clientWidth) / 2;
  const viewportStabilizerY =
    (landingPageInteractive.clientHeight - article.clientHeight) / 2;

  const [trashAnimation] = trash.getAnimations();

  icons.forEach((icon, index) => {
    icon.style.zIndex = `${index + 1}`;

    icon.addEventListener("mousedown", (downEvent) => {
      if (downEvent.button !== 0) {
        return;
      }

      zIndexHandler(icon);

      trashAnimation.play();

      const [iconAnimation] = icon.getAnimations();
      iconAnimation.pause();

      const clientRect = icon.getBoundingClientRect();

      this.mouseMove = cursorMoveHandler.bind(this, icon, downEvent);
      window.addEventListener("mousemove", this.mouseMove);

      this.mouseUp = mouseUpHandler.bind(
        this,
        icon,
        downEvent,
        clientRect,
        iconAnimation
      );
      window.addEventListener("mouseup", this.mouseUp);
    });
  });

  function zIndexHandler(icon) {
    icons.forEach((icon_) => {
      const iconZIndex = parseInt(icon_.style.zIndex);

      if (icon_.style.zIndex > icon.style.zIndex) {
        icon_.style.zIndex = iconZIndex - 1;
      }
    });
    icon.style.zIndex = `${icons.length}`;
  }

  function moveIcon(icon, downEvent, { clientX, clientY }) {
    const x = clientX - downEvent.offsetX - viewportStabilizerX;
    const y = clientY - downEvent.offsetY - viewportStabilizerY;

    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
  }

  function isCursorOverTrash(icon, downEvent, { clientX, clientY }) {
    const { left, top } = trash.getBoundingClientRect();

    const offsetLeft = left - viewportStabilizerX,
      offsetTop = top - viewportStabilizerY;

    const iconOffsetX =
      clientX + icon.clientWidth - downEvent.offsetX - viewportStabilizerX;
    const overX =
      iconOffsetX >= offsetLeft &&
      icon.offsetLeft <= offsetLeft + trash.clientWidth;

    const iconOffsetTop =
      clientY + icon.clientHeight - downEvent.offsetY - viewportStabilizerY;
    const overY =
      iconOffsetTop >= offsetTop &&
      icon.offsetTop <= offsetTop + trash.clientHeight;

    return overX && overY;
  }

  let hasMouseEnterTrash = false;
  function mouseEnterTrash(cursorOverTrash) {
    if (cursorOverTrash) {
      if (!hasMouseEnterTrash) {
        trashAnimation.play();
      }

      hasMouseEnterTrash = true;
    } else {
      hasMouseEnterTrash = false;
    }
  }

  function cursorMoveHandler(icon, downEvent, e) {
    moveIcon(icon, downEvent, e);

    const cursorOverTrash = isCursorOverTrash(icon, downEvent, e);
    mouseEnterTrash(cursorOverTrash);
  }

  function mouseUpAction(icon, clientRect, cursorOverTrash) {
    if (!cursorOverTrash) {
      const { left: iconLeft, top: iconTop } = clientRect;
      icon.style.left = `${iconLeft - viewportStabilizerX}px`;
      icon.style.top = `${iconTop - viewportStabilizerY}px`;
      return;
    }

    icon.remove();

    const iconsLeft = document.querySelectorAll(
      "#landing-page-interactive img.icon"
    ).length;

    const filter = window.getComputedStyle(park).filter;
    const saturate = parseFloat(filter.replace("saturate(", ""));
    const saturateToAdd = (1 - saturate) / (iconsLeft + 1);

    park.style.filter = `saturate(${saturate + saturateToAdd})`;

    const i = document.createElement("i");
    i.innerText = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    i.classList.add("reaction-icon");

    trash.insertAdjacentElement("afterend", i);

    const degrees = Math.random() * 60 - 30;
    i.style.transform = `${
      window.getComputedStyle(i).transform
    } rotate(${degrees}deg)`;

    i.addEventListener("animationend", (e) => {
      e.target.remove();
    });

    if (!iconsLeft) {
      trash.style.visibility = "hidden";
    }
  }

  function mouseUpHandler(icon, downEvent, clientRect, iconAnimation, e) {
    const cursorOverTrash = isCursorOverTrash(icon, downEvent, e);
    mouseUpAction(icon, clientRect, cursorOverTrash);

    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("mouseup", this.mouseUp);

    iconAnimation.play();
  }
});
