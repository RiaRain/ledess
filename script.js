// Слайдер истории изделий
const storiesSwiper = new Swiper('.stories__slider', {
  slidesPerView: 1,
  spaceBetween: 20,

  loop: false,

  navigation: {
    nextEl: '.stories__button--next',
    prevEl: '.stories__button--prev',
  },

  pagination: {
    el: '.stories__pagination',
    clickable: true,
  },

  grabCursor: true,

  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    }
  }
});

// Слайдер отзывы

const reviewsSlider = new Swiper('.reviews__slider', {
  slidesPerView: 1,
  spaceBetween: 20,

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  navigation: {
    nextEl: '.reviews__button--next',
    prevEl: '.reviews__button--prev',
  },

  pagination: {
    el: '.reviews__pagination',
    clickable: true,
  },
});

// Меню бургер

const burger = document.querySelector('.burger');
const closeButton = document.querySelector('.menu-close');
const header = document.querySelector('.header');
const menuLinks = document.querySelectorAll('.header__navigation a');

function openMenu() {
  header.classList.add('menu-open');
  document.documentElement.classList.add('menu-open');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  header.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
}

burger.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Закрепление меню
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Если меню открыто — шапку не скрываем
  if (header.classList.contains('menu-open')) {
    header.classList.remove('header--hidden');
    lastScrollY = currentScrollY;
    return;
  }

  // В самом верху шапка всегда видна
  if (currentScrollY <= 0) {
    header.classList.remove('header--hidden');
  }

  // Скроллим вниз
  else if (currentScrollY > lastScrollY) {
    header.classList.add('header--hidden');
  }

  // Скроллим вверх
  else if (currentScrollY < lastScrollY) {
    header.classList.remove('header--hidden');
  }

  lastScrollY = currentScrollY;
});
