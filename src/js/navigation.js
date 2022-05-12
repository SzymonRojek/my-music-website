const $navigation = document.querySelector(".navigation");
const $hamburgerButton = document.querySelector(".navigation__hamburgerButton");
const $arrowButton = document.querySelector(".navigation__list-arrowButton");
const $navigationLinkList = document.querySelector(".navigation__list");
const $navigationLinks = document.querySelectorAll(".navigation__link");

init();

function init() {
  $navigation.addEventListener("wheel", preventScroll, { passive: false });
  $navigation.addEventListener("click", (event) => setNavigationAction(event));
  window.addEventListener("scroll", setActionArrowButtonOnScroll);
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
  setDirectionArrowButton();

  if ($navigationLinkList.classList.contains("navigation__list--open")) {
    $hamburgerButton.setAttribute("aria-expanded", true);
    $arrowButton.setAttribute("aria-expanded", true);
  } else {
    $hamburgerButton.setAttribute("aria-expanded", false);
    $arrowButton.setAttribute("aria-expanded", false);
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

function setDirectionArrowButton() {
  const arrowRight = ">";
  const arrowLeft = "<";
  $arrowButton.textContent =
    $arrowButton.textContent === arrowRight ? arrowLeft : arrowRight;
}

function setActionArrowButtonOnScroll() {
  window.pageYOffset > 200
    ? $arrowButton.classList.add("navigation__list-arrowButton--active")
    : $arrowButton.classList.remove("navigation__list-arrowButton--active");
}
