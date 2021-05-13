{
  const hamburgerButton = document.querySelector('.navigation__hamburgerButton');
  const arrowButton = document.querySelector('.navigation__list-arrowButton');
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

  const setHamburgerButton = () => {
    hamburgerButton.classList.toggle('js-active');
    navigationList.classList.toggle('navigation__list--open');
    fadeLinks();

    if (navigationList.classList.contains('navigation__list--open')) {
      hamburgerButton.setAttribute('aria-expanded', true); 
    } else {
      hamburgerButton.setAttribute('aria-expanded', false);
      arrowButton.setAttribute('aria-expanded', false);
    }
  }

  const setTextArrowButton = () => {
    const arrowRight = '>';
    const arrowLeft = '<';
    arrowButton.innerText = arrowButton.innerText === arrowRight ? arrowLeft : arrowRight;
  }

  const setArrowButton = () => {
    navigationList.classList.toggle('navigation__list--open');
    
    if (navigationList.classList.contains('navigation__list--open')) {
      hamburgerButton.classList.add('js-active');
      arrowButton.setAttribute('aria-expanded', true)
    } else {
      hamburgerButton.classList.remove('js-active');
      arrowButton.setAttribute('aria-expanded', false);
      hamburgerButton.setAttribute('aria-expanded', false);
    }
    fadeLinks();
    setTextArrowButton();
  }

  const resetStatesWhenLinkPressed = () => {
    navigationLinks.forEach( link => {
      link.addEventListener('click', () => {
        navigationList.classList.remove('navigation__list--open');
        hamburgerButton.classList.remove('js-active');
        arrowButton.setAttribute('aria-expanded', false);
        hamburgerButton.setAttribute('aria-expanded', false);
        fadeLinks();
      })
    })
  }

  removeFadeLinksAnimation = () => {
    window.pageYOffset > 200 ? arrowButton.classList.add('navigation__list-arrowButton--active') : arrowButton.classList.remove('navigation__list-arrowButton--active');
  }


  // theme mode 
  const body = document.querySelector('body').classList; 
  const modeSwitcher = document.querySelector('.js-switcher__mode');
  const textSwitcher = document.querySelector('.switcher__text');

  const enableDarkMode = () => {
    modeSwitcher.checked = true;
    body.add( 'dark' );
    localStorage.setItem( 'theme', 'dark' );
    textSwitcher.innerText = 'light';
    modeSwitcher.setAttribute( 'aria-checked', true );
  }

  const disableDarkMode = () => {
    modeSwitcher.checked = false;
    body.remove( 'dark' );
    localStorage.setItem( 'theme', 'light' );
    textSwitcher.innerText = 'dark';
    modeSwitcher.setAttribute( 'aria-checked', false );
  }

  const getUserThemePreferences = () => {
    const userThemePreference = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
    userThemePreference ? enableDarkMode() : disableDarkMode();
  }

  const setTheme = theme => {
    theme = localStorage.getItem( 'theme' );
      if ( theme ) {
        theme === 'dark' ? enableDarkMode() : disableDarkMode();
      } else {
        getUserThemePreferences();
      }
  }

  const toggleButton = theme => {
    theme = localStorage.getItem( 'theme' );
    theme === 'light' ? enableDarkMode() : disableDarkMode();
  }

  const init = () => {
    hamburgerButton.addEventListener('click', setHamburgerButton);
    arrowButton.addEventListener('click', setArrowButton);
    resetStatesWhenLinkPressed();
    window.addEventListener( 'scroll', removeFadeLinksAnimation);
    setTheme();
    modeSwitcher.addEventListener('click', toggleButton);
  }

  init();
}