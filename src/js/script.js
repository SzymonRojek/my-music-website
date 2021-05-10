{

  const navigationHamburgerButton = document.querySelector('.navigation__hamburgerButton');
  const navigationArrowButton = document.querySelector('.navigation__list-arrowButton');
  const navigationList = document.querySelector('.navigation__list');
  const navigationLinks = document.querySelectorAll('.navigation__link');

  const fadeLinks = () => {
    navigationLinks.forEach( link => {
      if ( window.matchMedia('(max-width: 767px)').matches && !link.classList.contains('linksFade') ) {
        link.classList.add('linksFade');
      } else {
        link.classList.remove('linksFade');
      }
    })
  }

  const setNavigationHamburgerButton = () => {
    navigationHamburgerButton.classList.toggle('js-active');
    navigationList.classList.toggle('navigation__list--open');
    fadeLinks();

    if (navigationList.classList.contains('navigation__list--open')) {
      navigationHamburgerButton.setAttribute('aria-expanded', true); 
    } else {
      navigationHamburgerButton.setAttribute('aria-expanded', false);
      navigationArrowButton.setAttribute('aria-expanded', false);
    }
  }

  const setTextNavigationArrowButton = () => {
    const arrowRight = '>';
    const arrowLeft = '<';
    navigationArrowButton.innerText = navigationArrowButton.innerText === arrowRight ? arrowLeft : arrowRight;
  }

  const setNavigationArrowButton = () => {
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
    setTextNavigationArrowButton();
  }

  const resetStatesWhenLinkPressed = () => {
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

  removeFadeLinksAnimation = () => {
    window.pageYOffset > 200 ? navigationArrowButton.classList.add('navigation__list-arrowButton--active') : navigationArrowButton.classList.remove('navigation__list-arrowButton--active');
  }


  // theme mode 
  const body = document.querySelector('body').classList; 
  const modeSwitcher = document.querySelector('.js-switcher__mode');
  const switcherText = document.querySelector('.switcher__text');

  const enableDarkMode = () => {
    modeSwitcher.checked = true;
    body.add( 'dark' );
    localStorage.setItem( 'theme', 'dark' );
    switcherText.innerText = 'light';
    modeSwitcher.setAttribute( 'aria-checked', true );
  }

  const disableDarkMode = () => {
    modeSwitcher.checked = false;
    body.remove( 'dark' );
    localStorage.setItem( 'theme', 'light' );
    switcherText.innerText = 'dark';
    modeSwitcher.setAttribute( 'aria-checked', false );
  }

  const getUserThemePreferences = () => {
    const userThemePreference = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
    userThemePreference ? enableDarkMode() : disableDarkMode();
  }

  const isThemeAvailable = () => {
    const theme = localStorage.getItem( 'theme' );
      if ( theme ) {
        theme === 'dark' ? enableDarkMode() : disableDarkMode();
      } else {
        getUserThemePreferences();
      }
  }

  const toggleButton = () => {
    const theme = localStorage.getItem( 'theme' );
    theme === 'light' ? enableDarkMode() : disableDarkMode();
  }

  const init = () => {
    navigationHamburgerButton.addEventListener('click', setNavigationHamburgerButton);
    navigationArrowButton.addEventListener('click', setNavigationArrowButton);
    resetStatesWhenLinkPressed();
    window.addEventListener( 'scroll', removeFadeLinksAnimation);
    isThemeAvailable();
    modeSwitcher.addEventListener('click', toggleButton);
  }

  init();
}