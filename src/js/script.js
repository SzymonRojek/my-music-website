(() => {

  'use strict';

  // navigation 
  const navigationHamburgerButton = document.querySelector('.navigation__hamburgerButton');
  const navigationArrowButton = document.querySelector('.navigation__list-arrowButton');
  const navigationList = document.querySelector('.navigation__list');
  const navigationLinks = document.querySelectorAll('.navigation__link');
  const arrowRight = '>';
  const arrowLeft = '<';

  function fadeLinks() {
    navigationLinks.forEach( link => {
      if ( window.matchMedia('(max-width: 767px)').matches && !link.classList.contains('linksFade') ) {
        link.classList.add('linksFade');
      } else {
        link.classList.remove('linksFade');
      }
    })
  }

  navigationHamburgerButton.addEventListener('click', () => {
    navigationHamburgerButton.classList.toggle('js-active');
    navigationList.classList.toggle('navigation__list--open');
    fadeLinks();

    if(navigationList.classList.contains('navigation__list--open')) {
      navigationHamburgerButton.setAttribute('aria-expanded', true); 
    } else {
      navigationHamburgerButton.setAttribute('aria-expanded', false);
      navigationArrowButton.setAttribute('aria-expanded', false);
    }
  })

  navigationArrowButton.addEventListener('click', () => {
    navigationList.classList.toggle('navigation__list--open');
    
    if (navigationList.classList.contains('navigation__list--open')) {
      navigationHamburgerButton.classList.add('js-active');
      navigationArrowButton.setAttribute('aria-expanded', true)
    } else {
      navigationHamburgerButton.classList.remove('js-active');
      navigationArrowButton.setAttribute('aria-expanded', false);
      navigationHamburgerButton.setAttribute('aria-expanded', false);
    }

    fadeLinks();

    navigationArrowButton.innerText = navigationArrowButton.innerText === arrowRight ? arrowLeft : arrowRight;
  })

  function resetStatesWhenLinkPressed() {
    navigationLinks.forEach( link => {
      link.addEventListener('click', () => {
        navigationList.classList.remove('navigation__list--open');
        navigationHamburgerButton.classList.remove('js-active');
        navigationArrowButton.setAttribute('aria-expanded', false);
        navigationHamburgerButton.setAttribute('aria-expanded', false);
        fadeLinks();
      })
    })
  }
  resetStatesWhenLinkPressed();

  window.addEventListener( 'scroll', () => {
    window.pageYOffset > 200 ? navigationArrowButton.classList.add('navigation__list-arrowButton--active') : navigationArrowButton.classList.remove('navigation__list-arrowButton--active');
  })


  // mode 
  const body = document.querySelector('body').classList;
  const modeSwitcher = document.querySelector('.js-mode-switcher');

  const userPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        userPrefersDarkMode ? body.add('dark') : body.remove('dark');
        console.log(`Dark mode is ${userPrefersDarkMode ? '🌒 on' : '☀️ off'}.`);

      if ( body.contains('dark') ) {
        modeSwitcher.checked = true; 
        modeSwitcher.classList.add('mode-switcher--active');
        modeSwitcher.setAttribute('aria-checked', true);
      }

 modeSwitcher.addEventListener( 'click', () => {
    if ( document.querySelector('.js-mode-switcher:checked') !== null ) {
      body.add('dark');
      modeSwitcher.classList.add('checkbox--active');
      modeSwitcher.setAttribute('aria-checked', true);
     } else {
      body.remove('dark');
      modeSwitcher.classList.remove('checkbox--active');
      modeSwitcher.setAttribute('aria-checked', false);
     }
  })

})();

// todo: => adding local or session storage

