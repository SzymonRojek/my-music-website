const $navigation = document.querySelector(".navigation");
const $hamburgerButton = document.querySelector(".navigation__hamburgerButton");
const $navigationLinkList = document.querySelector(".navigation__list");
const $navigationLinks = document.querySelectorAll(".navigation__link");

init();

function init() {
  $navigation.addEventListener("wheel", preventScroll, { passive: false });
  $navigation.addEventListener("click", (event) => setNavigationAction(event));
}

function preventScroll(event) {
  event.preventDefault();
  event.stopPropagation();
}

function setNavigationAction(event) {
  if (!(event.target.closest("button") || event.target.closest("li"))) {
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
    !link.classList.contains("linksFade")
      ? link.classList.add("linksFade")
      : link.classList.remove("linksFade")
  );
}
