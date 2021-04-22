

(() => {

  "use strict"
  
  const navigationHamburgerButton = document.querySelector(".navigation__hamburgerButton");
  const navigationArrowButton = document.querySelector(".navigation__list-arrowButton");
  const navigationList = document.querySelector(".navigation__list");
  const navigationLinks = document.querySelectorAll(".navigation__link");
  const arrowRight = '>';
  const arrowLeft = '<';


  function fadeLinks() {
    navigationLinks.forEach( link => {
      if ( window.innerWidth <= 767 && !link.classList.contains('linksFade') ) {
        link.classList.add('linksFade');
      } else {
        link.classList.remove('linksFade');
      }
    })
  }

  navigationHamburgerButton.addEventListener("click", () => {
    navigationHamburgerButton.classList.toggle("js-active");
    navigationList.classList.toggle('navigation__list--open');
    fadeLinks();

    if ( navigationList.classList.contains("navigation__list--open") ) {
      navigationHamburgerButton.setAttribute("aria-expanded", true);
    } else {
      navigationHamburgerButton.setAttribute("aria-expanded", false);
    }
  })

  navigationArrowButton.addEventListener("click", () => {
    navigationList.classList.toggle('navigation__list--open');

    if ( navigationHamburgerButton.classList.contains('js-active') ) {
      navigationHamburgerButton.classList.remove('js-active');
    }

    if ( navigationList.classList.contains("navigation__list--open") ) {
      navigationArrowButton.setAttribute("aria-expanded", true);
    } else {
      navigationArrowButton.setAttribute("aria-expanded", false);
    }

    fadeLinks();
    navigationArrowButton.innerText = navigationArrowButton.innerText === arrowRight ? arrowLeft : arrowRight;
  })

  function resetStates() {
    navigationLinks.forEach(link => {
      link.addEventListener('click', () => {
        navigationList.classList.remove('navigation__list--open');
        navigationHamburgerButton.classList.remove("js-active");
        fadeLinks();
      })
    })
  }
  resetStates();
 
  window.addEventListener("scroll", () => {
    if ( window.pageYOffset > 200 ) {
      navigationArrowButton.classList.add('navigation__list-arrowButton--active');
    } else {
      navigationArrowButton.classList.remove('navigation__list-arrowButton--active');
    } 
  })




  const chk = document.getElementById('chk');
  const mainContainer = document.querySelector('.main-container');

  chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    // mainContainer.classList.toggle('dark')
  });



})();