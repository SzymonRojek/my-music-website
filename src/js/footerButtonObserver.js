const $footer = document.querySelector(".footer");
const $scrollToTopButton = document.querySelector(".footer__buttonUp");
const $togglerMode = document.querySelector(".footer__buttonToggle");
const $rootElement = document.documentElement;

function toggleObserverCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      $scrollToTopButton.classList.add("footer__buttonUp--show");
      $togglerMode.classList.add("footer__buttonToggle--show");
    } else {
      $scrollToTopButton.classList.remove("footer__buttonUp--show");
      $togglerMode.classList.remove("footer__buttonToggle--show");
    }
  });
}

const footerObserver = new IntersectionObserver(toggleObserverCallback);

footerObserver.observe($footer);

function scrollToTop() {
  $rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

$scrollToTopButton.addEventListener("click", scrollToTop);
