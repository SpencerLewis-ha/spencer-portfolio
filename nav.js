document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!nav || !toggle || !links) return;

  const linkEls = Array.from(links.querySelectorAll("a"));
  const focusable = [toggle, ...linkEls];

  function isOpen() {
    return links.classList.contains("is-open");
  }

  function openMenu() {
    links.classList.add("is-open");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("click", onOutsideClick);
  }

  function closeMenu({ returnFocus = true } = {}) {
    links.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.removeEventListener("keydown", onKeydown);
    document.removeEventListener("click", onOutsideClick);
    if (returnFocus) toggle.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      closeMenu();
      return;
    }
    if (e.key === "Tab") {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function onOutsideClick(e) {
    if (!nav.contains(e.target)) {
      closeMenu({ returnFocus: false });
    }
  }

  toggle.addEventListener("click", () => {
    if (isOpen()) {
      closeMenu({ returnFocus: false });
    } else {
      openMenu();
      linkEls[0].focus();
    }
  });

  linkEls.forEach((link) => {
    link.addEventListener("click", () => closeMenu({ returnFocus: false }));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isOpen()) {
      closeMenu({ returnFocus: false });
    }
  });
});
