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

if (burger) {
  burger.addEventListener('click', openMenu);
}

if (closeButton) {
  closeButton.addEventListener('click', closeMenu);
}

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


// Фильтр работ + кнопка «Показать ещё»

const filterButtons = document.querySelectorAll('.works__filter-btn');
const workCards = document.querySelectorAll('.work__card');
const moreButton = document.querySelector('.works__more-btn');

const ITEMS_PER_PAGE = 4;

let currentFilter = 'all';
let visibleCount = ITEMS_PER_PAGE;


function updateWorks() {
  const filteredCards = Array.from(workCards).filter(card => {
    return (
      currentFilter === 'all' ||
      card.dataset.category === currentFilter
    );
  });

  // Скрываем все карточки
  workCards.forEach(card => {
    card.classList.add('hidden');
  });

  // Показываем нужные карточки
  filteredCards.slice(0, visibleCount).forEach(card => {
    card.classList.remove('hidden');
  });

  // Показываем / скрываем кнопку
  if (moreButton) {
    if (filteredCards.length > visibleCount) {
      moreButton.classList.remove('hidden');
    } else {
      moreButton.classList.add('hidden');
    }
  }
}


// Фильтры

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    // При смене категории снова показываем 4 карточки
    visibleCount = ITEMS_PER_PAGE;

    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    updateWorks();
  });
});


// Кнопка «Показать ещё»

if (moreButton) {
  moreButton.addEventListener('click', () => {
    visibleCount += ITEMS_PER_PAGE;

    updateWorks();
  });
}


// Запуск фильтра

updateWorks();

// Галерея работ

const gallery = document.querySelector('#gallery');
const galleryImage = document.querySelector('.gallery__image');
const galleryCloseButton = document.querySelector('.gallery__close');
const galleryPrevButton = document.querySelector('.gallery__prev');
const galleryNextButton = document.querySelector('.gallery__next');
const galleryOverlay = document.querySelector('.gallery__overlay');

const galleryCards = document.querySelectorAll('.work__card[data-gallery]');

let currentPhotos = [];
let currentPhotoIndex = 0;

// Обновление фотографии

function updateGallery() {
  if (!galleryImage || currentPhotos.length === 0) {
    return;
  }

  galleryImage.src = currentPhotos[currentPhotoIndex];

  if (currentPhotoIndex === 0) {
    galleryPrevButton.classList.add('gallery__button--disabled');
  } else {
    galleryPrevButton.classList.remove('gallery__button--disabled');
  }

  if (currentPhotoIndex === currentPhotos.length - 1) {
    galleryNextButton.classList.add('gallery__button--disabled');
  } else {
    galleryNextButton.classList.remove('gallery__button--disabled');
  }
}

// Открытие галереи

function openGallery(card) {
  if (!gallery || !card) {
    return;
  }

  try {
    currentPhotos = JSON.parse(card.dataset.gallery);
  } catch (error) {
    console.error('Ошибка в data-gallery:', error);
    return;
  }

  if (!Array.isArray(currentPhotos) || currentPhotos.length === 0) {
    return;
  }

  currentPhotoIndex = 0;

  updateGallery();

  gallery.classList.add('active');
  gallery.setAttribute('aria-hidden', 'false');

  document.documentElement.classList.add('gallery-open');
  document.body.classList.add('gallery-open');
}


// Закрытие галереи

function closeGallery() {
  if (!gallery) {
    return;
  }

  gallery.classList.remove('active');
  gallery.setAttribute('aria-hidden', 'true');

  document.documentElement.classList.remove('gallery-open');
  document.body.classList.remove('gallery-open');
}

function showNext() {
  if (currentPhotoIndex < currentPhotos.length - 1) {
    currentPhotoIndex++;
    updateGallery();
  }
}

function showPrev() {
  if (currentPhotoIndex > 0) {
    currentPhotoIndex--;
    updateGallery();
  }
}

// Открытие галереи у всех карточек с data-gallery

galleryCards.forEach(card => {
  card.addEventListener('click', () => {
    openGallery(card);
  });
});


// Кнопка закрытия

if (galleryCloseButton) {
  galleryCloseButton.addEventListener('click', closeGallery);
}


// Закрытие по клику на фон

if (galleryOverlay) {
  galleryOverlay.addEventListener('click', closeGallery);
}


// Следующее фото

if (galleryNextButton) {
  galleryNextButton.addEventListener('click', showNext);
}


// Предыдущее фото

if (galleryPrevButton) {
  galleryPrevButton.addEventListener('click', showPrev);
}


// Управление клавиатурой

document.addEventListener('keydown', event => {
  if (!gallery || !gallery.classList.contains('active')) {
    return;
  }

  if (event.key === 'Escape') {
    closeGallery();
  }

  if (event.key === 'ArrowRight') {
    showNext();
  }

  if (event.key === 'ArrowLeft') {
    showPrev();
  }
});


// попап истории

const storyPopup = document.querySelector('#storyPopup');
const storyPopupClose = document.querySelector('.story-popup__close');
const storyPopupOverlay = document.querySelector('.story-popup__overlay');
const storyLinks = document.querySelectorAll('.stories__link');

function openStoryPopup(event) {
  event.preventDefault();

  storyPopup.classList.add('active');
  storyPopup.setAttribute('aria-hidden', 'false');
}

function closeStoryPopup() {
  storyPopup.classList.remove('active');
  storyPopup.setAttribute('aria-hidden', 'true');
}

storyLinks.forEach(link => {
  link.addEventListener('click', openStoryPopup);
});

storyPopupClose.addEventListener('click', closeStoryPopup);
storyPopupOverlay.addEventListener('click', closeStoryPopup);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeStoryPopup();
  }
});
