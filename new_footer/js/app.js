document.addEventListener('DOMContentLoaded', () => {

  const footerToggle = document.querySelector('.footer-useful-links');
  const hiddenMenu = document.querySelector('.footer-hidden-menu');

    footerToggle.addEventListener('click', (event) => {

      let target_menu = hiddenMenu;

      if (target_menu === event.target) {
        return;
      } else {
        footerToggle.classList.toggle('is-expanded');
        target_menu.classList.toggle('show');
      }

    })

    hiddenMenu.addEventListener('click', (el) => {
      el.stopPropagation();
    })

});
