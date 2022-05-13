const header = document.querySelector("nav");
const sectionOne = document.querySelector(".hero-container");
const heading = document.querySelector(
  ".navigation__container-content-heading"
);
const colorWhiteSmoke = "rgb(245, 245, 245)";

const sectionOneOptions = {
  rootMargin: "-80px 0px 0px 0px",
};

const sectionOneObserverBackground = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserverBackground.observe(sectionOne);

const sectionOneObserverColor = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      const actualColor = getPropertyValue(
        ".main-container",
        "background-color"
      );

      if (actualColor === colorWhiteSmoke) {
        heading.classList.add("heading-white");
      }
    } else {
      heading.classList.remove("heading-white");
    }
  });
},
sectionOneOptions);

sectionOneObserverColor.observe(sectionOne);

function getPropertyValue(selector, property) {
  const element = document.querySelector(selector);
  const compStyles = window.getComputedStyle(element);

  return compStyles.getPropertyValue(property);
}
