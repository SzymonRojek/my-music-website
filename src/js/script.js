
function smoothScroll(tar, duration) {
  const target = document.querySelector(tar);
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  console.log(targetPosition);

  function ease(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2* t* t + b;
    t--;
    return -c/2 * (t * (t-2) - 1) + b;
  }

  function animation(currentTime) {
    if(startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if(timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}


// scroll to home section
const homeLink = document.getElementById("homeLink");

homeLink.addEventListener("click", () => {
  smoothScroll(".scroll-home", 1500);
})


// scroll to intro section 
const introLink = document.getElementById("introLink");

introLink.addEventListener("click", () => {
  smoothScroll(".intro", 1500);
})


// scroll to feedback section
const feedbackLink = document.getElementById("feedbackLink");

feedbackLink.addEventListener("click", () => {
  smoothScroll(".feedback", 1500);
})

// scroll from the bottom to the top of the page

const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  smoothScroll(".scroll-home", 1500);
});



// navigation slide and links fade animation

const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");
const navLinks = document.querySelectorAll(".nav__link");

function fadeLinks() {
  navLinks.forEach( (link, index) => {
    
    link.style.animation = link.style.animation ? 
    "" : link.style.animation = `linksFade .5s ease forwards ${index / 5 + .5}s`;
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