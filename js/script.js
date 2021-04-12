

const section2 = document.querySelector('.section-two');

function smoothScroll(tar, duration) {
  const target = document.querySelector(tar);
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;


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
 


const goUp = () => {
  smoothScroll('.scroll-top', 1500);
}

// section2.addEventListener('click', goUp);




// hamburger 

const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
 
  if(hamburger.classList.contains("is-active")) {
    hamburger.setAttribute("aria-expanded", true);
  } else {
    hamburger.setAttribute("aria-expanded", false);
  }
})