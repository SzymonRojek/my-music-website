

const switcherNavigationHamburger = document.querySelector(".navigation__hamburgerButton");
const switcherNavigationButton = document.querySelector(".navigation__list-arrowButton");
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
switcherNavigationHamburger.addEventListener("click", (e) => {
  switcherNavigationHamburger.classList.toggle("js-active");
  navigationList.classList.toggle('navigation__list--open');
  fadeLinks();

  if(navigationList.classList.contains("navigation__list--open")) {
    switcherNavigationHamburger.setAttribute("aria-expanded", true);

  } else {
    switcherNavigationHamburger.setAttribute("aria-expanded", false);
  }

  if(switcherNavigationHamburger.getAttribute('aria-expanded') === true) {
    switcherNavigationHamburger.classList.remove('js-active')
  }

})

switcherNavigationButton.addEventListener("click", () => {
  navigationList.classList.toggle('navigation__list--open');

  if(switcherNavigationHamburger.classList.contains('js-active')) {
    switcherNavigationHamburger.classList.remove('js-active');
  }

  if(navigationList.classList.contains("navigation__list--open")) {
    switcherNavigationButton.setAttribute("aria-expanded", true);
  } else {
    switcherNavigationButton.setAttribute("aria-expanded", false);
  }

 
  fadeLinks();

  const arrowRight = '>';
  const arrowLeft = '<';
  switcherNavigationButton.innerText = switcherNavigationButton.innerText === arrowRight ? arrowLeft : arrowRight;
})

// links => hide the nav bar when a link is clicked 
function resetStates() {
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      navigationList.classList.remove('navigation__list--open');
      switcherNavigationHamburger.classList.remove("js-active");
      fadeLinks();
    })
  })
}
resetStates();
