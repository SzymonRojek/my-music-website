


// navigation slide and links fade animation

const navHamburger = document.querySelector(".navigation__button");
const navList = document.querySelector(".navigation__list");
const navLinks = document.querySelectorAll(".navigation__link");


function fadeLinks() {
  navLinks.forEach( (link, index) => {
    const animationLink = `linksFade .5s ease forwards ${index / 5 + .5}s`;
      if(window.innerWidth <= 767 && !link.style.animation) {
        link.style.animation = animationLink;
      } else {
        link.style.animation = '';
      }
  })
}

// hamburger animation and open nav on click with links fading 
navHamburger.addEventListener("click", () => {
  navHamburger.classList.toggle("js-active");
  navList.classList.toggle('navigation__list--open');
  fadeLinks();

  // change the state true or false
  if(navHamburger.classList.contains("js-active")) {
    navHamburger.setAttribute("aria-expanded", true);
  } else {
    navHamburger.setAttribute("aria-expanded", false);
  }
})


// links => hide the nav bar when a link is clicked 

function resetStates() {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('nav__list--open');
      navHamburger.classList.remove('js-active');
      fadeLinks();
    })
  })
}
resetStates();
