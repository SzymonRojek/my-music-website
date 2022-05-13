const $navigation = document.querySelector(".navigation");
const $heroContainer = document.querySelector(".hero-container");
const $mainHeading = document.querySelector(
  ".navigation__container-content-heading"
);
const $navigationLinks = document.querySelectorAll(".navigation__link");

const colorWhiteSmoke = "rgb(245, 245, 245)";
const sectionOneOptions = {
  rootMargin: "-80px 0px 0px 0px",
};

const sectionOneObserverBackground = new IntersectionObserver(
  (entries, sectionOneObserver) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        $navigation.classList.add("observer-nav-background");
      } else {
        $navigation.classList.remove("observer-nav-background");
      }
    }),
  sectionOneOptions
);

sectionOneObserverBackground.observe($heroContainer);

const sectionOneObserverColor = new IntersectionObserver(
  (entries, sectionOneObserver) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        const actualColor = getPropertyValue(
          ".main-container",
          "background-color"
        );

        if (actualColor === colorWhiteSmoke) {
          $mainHeading.classList.add("observer-nav-color");
          $navigationLinks.forEach((link) => {
            link.classList.add("observer-nav-color");
          });
        }
      } else {
        $mainHeading.classList.remove("observer-nav-color");
        $navigationLinks.forEach((link) => {
          link.classList.remove("observer-nav-color");
        });
      }
    }),
  sectionOneOptions
);

sectionOneObserverColor.observe($heroContainer);

function getPropertyValue(selector, property) {
  const element = document.querySelector(selector);
  const compStyles = window.getComputedStyle(element);

  return compStyles.getPropertyValue(property);
}
