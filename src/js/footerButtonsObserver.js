const $footer = document.querySelector(".footer");
const $scrollToTopButton = document.querySelector(".js-scrollTop");
const $mainContent = document.getElementById("music");


// scroll top button

function scrollTopCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      $scrollToTopButton.classList.add("footer__buttonUp--show");
    } else {
      if (
        $scrollToTopButton.classList.contains("footer__buttonUp--show") &&
        entry.boundingClientRect.y > 0
      ) {
        $scrollToTopButton.classList.remove("footer__buttonUp--show");
        $scrollToTopButton.addEventListener(
          "transitionend",
          removeScrollFromView
        );
      }
    }
  });
}
const scrollTopObserver = new IntersectionObserver(scrollTopCallback);

function removeScrollFromView() {
  $scrollToTopButton.removeEventListener("transitionend", removeScrollFromView);
  if ($scrollToTopButton.classList.contains("footer__buttonUp--show")) {
    return;
  }
}

scrollTopObserver.observe($mainContent);

$scrollToTopButton.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
);
