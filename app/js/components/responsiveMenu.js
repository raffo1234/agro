export function responsiveMenu() {
  const body = document.querySelector('body');
  const menu = document.querySelector('.responsive-menu');
  const btnOpenMenu = document.querySelector('.btn-hamburger');
  const btnCloseMenu = menu.querySelector('.btn-close');

  btnOpenMenu.addEventListener('click', function(e) {
    body.classList.add('overflow');
    menu.classList.add('active');
  });

  btnCloseMenu.addEventListener('click', function(e) {
    body.classList.remove('overflow');
    menu.classList.remove('active');
  });
}
