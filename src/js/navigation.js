const $navigation = document.querySelector("[data-navigation]");
const $hamburgerButton = document.querySelector("[data-menu-button]");
const $navigationLinkList = document.querySelector("[data-navigation-list");
const $navigationLinks = document.querySelectorAll("[data-link]");

init();

function init() {
  // $navigation.addEventListener("wheel", preventScroll, { passive: false });
  $navigation.addEventListener("click", (event) => setNavigationAction(event));
}

function preventScroll(event) {
  event.preventDefault();
}

function setNavigationAction(event) {
  if (
    !(
      event.target.closest("[data-menu-button]") ||
      event.target.closest("[data-link]")
    )
  ) {
    return;
  }

  $hamburgerButton.classList.toggle("js-active");
  $navigationLinkList.classList.toggle("navigation__list--open");

  fadeLinks();

  if ($navigationLinkList.classList.contains("navigation__list--open")) {
    $hamburgerButton.setAttribute("aria-expanded", true);
  } else {
    $hamburgerButton.setAttribute("aria-expanded", false);
  }
}

function fadeLinks() {
  $navigationLinks.forEach((link) =>
    window.matchMedia("(max-width: 767px)").matches &&
    !link.classList.contains("fade-links")
      ? link.classList.add("fade-links")
      : link.classList.remove("fade-links")
  );
}
