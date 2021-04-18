

// navigation slide and links fade animation

const navigationSwitcher = document.querySelector(".navigation__button");
const navigationList = document.querySelector(".navigation__list");
const navigationLinks = document.querySelectorAll(".navigation__link");
const navigationListButtonOpen = document.querySelector(".navigation__list-buttonOpen");
const navigationListButtonClosed = document.querySelector(".navigation__list-buttonClosed");


function fadeLinks() {
  navigationLinks.forEach( (link, index) => {
    if(window.innerWidth <= 767 && !link.classList.contains('linksFade')) {
      link.classList.add('linksFade');
    } else {
      link.classList.remove('linksFade');
    }
  })
}

// hamburger animation and open nav on click with links fading 
navigationSwitcher.addEventListener("click", () => {
  navigationSwitcher.classList.toggle("js-active");
  navigationList.classList.toggle('navigation__list--open');
  fadeLinks();
  // change the state true or false
  if(navigationSwitcher.classList.contains("js-active")) {
    navigationSwitcher.setAttribute("aria-expanded", true);
  } else {
    navigationSwitcher.setAttribute("aria-expanded", false);
  }
})

navigationListButtonOpen.addEventListener("click", () => {
  navigationList.classList.toggle('navigation__list--open');

  if(navigationSwitcher.classList.contains('js-active')) {
    navigationSwitcher.classList.remove('js-active');
  }
  fadeLinks();
})

// links => hide the nav bar when a link is clicked 
function resetStates() {
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      navigationList.classList.remove('navigation__list--open');
      navigationSwitcher.classList.remove("js-active");
      fadeLinks();
    })
  })
}
resetStates();



navigationListButtonClosed.addEventListener("click", () => {
  navigationList.classList.remove('navigation__list--open');

  if(navigationSwitcher.classList.contains('js-active')) {
    navigationSwitcher.classList.remove('js-active');
  }
  fadeLinks();
})