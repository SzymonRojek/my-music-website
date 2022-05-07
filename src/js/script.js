const hamburgerButton = document.querySelector(".navigation__hamburgerButton");
const arrowButton = document.querySelector(".navigation__list-arrowButton");
const navigationList = document.querySelector(".navigation__list");
const navigationLinks = document.querySelectorAll(".navigation__link");

const fadeLinks = () => {
  navigationLinks.forEach((link) => {
    if (
      window.matchMedia("(max-width: 767px)").matches &&
      !link.classList.contains("linksFade")
    ) {
      link.classList.add("linksFade");
    } else {
      link.classList.remove("linksFade");
    }
  });
};

const setHamburgerButton = () => {
  hamburgerButton.classList.toggle("js-active");
  navigationList.classList.toggle("navigation__list--open");
  fadeLinks();

  if (navigationList.classList.contains("navigation__list--open")) {
    hamburgerButton.setAttribute("aria-expanded", true);
  } else {
    hamburgerButton.setAttribute("aria-expanded", false);
    arrowButton.setAttribute("aria-expanded", false);
  }
};

const setTextArrowButton = () => {
  const arrowRight = ">";
  const arrowLeft = "<";
  arrowButton.innerText =
    arrowButton.innerText === arrowRight ? arrowLeft : arrowRight;
};

const setArrowButton = () => {
  navigationList.classList.toggle("navigation__list--open");

  if (navigationList.classList.contains("navigation__list--open")) {
    hamburgerButton.classList.add("js-active");
    arrowButton.setAttribute("aria-expanded", true);
  } else {
    hamburgerButton.classList.remove("js-active");
    arrowButton.setAttribute("aria-expanded", false);
    hamburgerButton.setAttribute("aria-expanded", false);
  }
  fadeLinks();
  setTextArrowButton();
};

const resetStatesWhenLinkPressed = () => {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigationList.classList.remove("navigation__list--open");
      hamburgerButton.classList.remove("js-active");
      arrowButton.setAttribute("aria-expanded", false);
      hamburgerButton.setAttribute("aria-expanded", false);
      fadeLinks();
    });
  });
};

const removeFadeLinksAnimation = () => {
  window.pageYOffset > 200
    ? arrowButton.classList.add("navigation__list-arrowButton--active")
    : arrowButton.classList.remove("navigation__list-arrowButton--active");
};

const onFormSubmit = (e) => {
  e.preventDefault;
};

const init = () => {
  const submitButton = document.querySelector(".js-submitButton");

  hamburgerButton.addEventListener("click", setHamburgerButton);
  arrowButton.addEventListener("click", setArrowButton);
  resetStatesWhenLinkPressed();
  window.addEventListener("scroll", removeFadeLinksAnimation);
  submitButton.addEventListener("submit", onFormSubmit);
};

init();
