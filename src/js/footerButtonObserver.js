const $footer = document.querySelector(".footer");
const $scrollToTopButton = document.querySelector(".footer__buttonUp");
const $rootElement = document.documentElement;

function toggleObserverCallback(entries, observer) {
  entries.forEach((entry) =>
    entry.isIntersecting
      ? $scrollToTopButton.classList.add("footer__buttonUp--show")
      : $scrollToTopButton.classList.remove("footer__buttonUp--show")
  );
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
