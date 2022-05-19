// navigation background-color change
const $navigation = document.querySelector(".navigation");
const $heroContainer = document.querySelector(".hero-container");

const sectionOneOptions = {
  rootMargin: "-100px 0px 0px 0px",
};

function heroObserverCallback(entries, options) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      $navigation.classList.add("observer-nav-background");
    } else {
      $navigation.classList.remove("observer-nav-background");
    }
  });
}

const heroObserver = new IntersectionObserver(
  heroObserverCallback,
  sectionOneOptions
);

heroObserver.observe($heroContainer);

function getPropertyValue(selector, property) {
  const element = document.querySelector(selector);
  const compStyles = window.getComputedStyle(element);

  return compStyles.getPropertyValue(property);
}

// navigation links change - add border depends on the section page

const sections = [
  selectElementByClass("intro"),
  selectElementByClass("music"),
  selectElementByClass("feedback"),
  selectElementByClass("contact"),
];

const navigationLinks = [
  selectElementByClass("js-navigation__link-intro"),
  selectElementByClass("js-navigation__link-music"),
  selectElementByClass("js-navigation__link-feedback"),
  selectElementByClass("js-navigation__link-contact"),
];

function linksObserverCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(sections).indexOf(entry.target);

      navigationLinks.forEach((link) => {
        link.classList.remove("navigation__link--active");
      });
      navigationLinks[index].classList.add("navigation__link--active");
    } else {
      selectElementByClass("js-navigation__link-intro").classList.remove(
        "navigation__link--active"
      );
    }
  });
}

const sectionsObserver = new IntersectionObserver(linksObserverCallback, {
  threshold: 0.25,
});

sections.forEach((section) => sectionsObserver.observe(section));

// helpers

function selectElementByClass(className) {
  return document.querySelector(`.${className}`);
}
