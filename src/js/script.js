


// navigation slide and links fade animation

const navHamburger = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__list");
const navLinks = document.querySelectorAll(".nav__link");

function fadeLinks() {
  navLinks.forEach( (link, index) => {

      link.style.animation = link.style.animation ? 
      "" : link.style.animation = `linksFade .5s ease forwards ${index / 5 + .5}s`;

  })
}

// hamburger animation and open nav on click with links fading 
navHamburger.addEventListener("click", () => {
  navHamburger.classList.toggle("js-active");
  navList.classList.toggle('nav__list--open');
  fadeLinks();

  // change the state true or false
  if(navHamburger.classList.contains("js-active")) {
    navHamburger.setAttribute("aria-expanded", true);
  } else {
    navHamburger.setAttribute("aria-expanded", false);
  }
})


// links => hide the nav bar when a link is clicked 

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('nav__list--open');
    navHamburger.classList.remove('js-active');
    fadeLinks();
  })
})

