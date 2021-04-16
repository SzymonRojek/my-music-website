


// navigation slide and links fade animation

const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");
const navLinks = document.querySelectorAll(".nav__link");

function fadeLinks() {
  navLinks.forEach( (link, index) => {
    if(window.screen.width < 767) {
      link.style.animation = link.style.animation ? 
      "" : link.style.animation = `linksFade .5s ease forwards ${index / 5 + .5}s`;
    }
  })
}

// hamburger animation and open nav on click with links fading 
hamburger.addEventListener("click", () => {

  hamburger.classList.toggle("js-active");
  navList.classList.toggle('nav__list--open');

  fadeLinks();

  // change the state true or false
  if(hamburger.classList.contains("js-active")) {
    hamburger.setAttribute("aria-expanded", true);
  } else {
    hamburger.setAttribute("aria-expanded", false);
  }
})


// links => hide the nav bar when a link is clicked 

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('nav__list--open');
    hamburger.classList.remove('js-active');
    fadeLinks();
  })
})

