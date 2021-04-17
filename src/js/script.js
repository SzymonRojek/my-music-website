


// navigation slide and links fade animation

const navigationSwitcher = document.querySelector(".navigation__button");
const navigationList = document.querySelector(".navigation__list");
const navigationLinks = document.querySelectorAll(".navigation__link");


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


// links => hide the nav bar when a link is clicked 
function resetStates() {
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.toggle('navigation__list--open');
      navHamburger.classList.toggle("js-active");
      fadeLinks();
    })
  })
}
resetStates();
