const navigation = document.querySelector(".navigation");
const hamburgerButton = document.querySelector(".navigation__hamburgerButton");
const arrowButton = document.querySelector(".navigation__list-arrowButton");
const navigationLinkList = document.querySelector(".navigation__list");
const navigationLinks = document.querySelectorAll(".navigation__link");
const submitFormButton = document.querySelector(".js-submitButton");

init();

function init() {
  navigation.addEventListener("click", (event) => setNavigationAction(event));
  window.addEventListener("scroll", setActionArrowButtonOnScroll);
  submitFormButton.addEventListener("submit", onFormSubmit);
}

function setNavigationAction(event) {
  if (event.target.matches("button") || event.target.matches("a")) {
    hamburgerButton.classList.toggle("js-active");
    navigationLinkList.classList.toggle("navigation__list--open");

    fadeLinks();
    setDirectionArrowButton();
  }

  if (navigationLinkList.classList.contains("navigation__list--open")) {
    hamburgerButton.setAttribute("aria-expanded", true);
    arrowButton.setAttribute("aria-expanded", true);
  } else {
    hamburgerButton.setAttribute("aria-expanded", false);
    arrowButton.setAttribute("aria-expanded", false);
  }
}

function fadeLinks() {
  navigationLinks.forEach((link) =>
    window.matchMedia("(max-width: 767px)").matches &&
    !link.classList.contains("linksFade")
      ? link.classList.add("linksFade")
      : link.classList.remove("linksFade")
  );
}

function setDirectionArrowButton() {
  const arrowRight = ">";
  const arrowLeft = "<";
  arrowButton.innerText =
    arrowButton.innerText === arrowRight ? arrowLeft : arrowRight;
}

function setActionArrowButtonOnScroll() {
  window.pageYOffset > 200
    ? arrowButton.classList.add("navigation__list-arrowButton--active")
    : arrowButton.classList.remove("navigation__list-arrowButton--active");
}

const onFormSubmit = (event) => {
  event.preventDefault;
};
