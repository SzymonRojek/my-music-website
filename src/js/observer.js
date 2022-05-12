const header = document.querySelector("nav");
const sectionOne = document.querySelector(".hero-container");
const heading = document.querySelector(
  ".navigation__container-content-heading"
);

const sectionOneOptions = {
  rootMargin: "-80px 0px 0px 0px",
};

const sectionOneObserver = new IntersectionObserver(function (
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

sectionOneObserver.observe(sectionOne);

const sectionOneObserverOne = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      const a = getPropertyValue(".main-container", "background-color");

      console.log(a);

      if (a === "rgb(245, 245, 245)") {
        heading.classList.add("heading-white");
      }
      // heading.classList.add("heading-scrolled");
    } else {
      heading.classList.remove("heading-white");
    }
  });
},
sectionOneOptions);

sectionOneObserverOne.observe(sectionOne);

// const observer = new IntersectionObserver(([entry]) => {
//   const color = entry.isIntersecting ? "#2c2323" : "#f5f5f5";
//   // document.documentElement.style.setProperty("--header-text-color", color);
//   console.log(color);
// }, sectionOneOptions);

// observer.observe(sectionOne);

function getPropertyValue(selector, property) {
  const element = document.querySelector(selector);
  const compStyles = window.getComputedStyle(element);

  return compStyles.getPropertyValue(property);
}
