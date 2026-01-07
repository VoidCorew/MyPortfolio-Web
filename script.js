const themeToggleBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  // toggle.checked = true;
}

// toggle.addEventListener('change', () => {
//   document.body.classList.toggle('dark-theme');
//   if (document.body.classList.contains('dark-theme')) {
//     localStorage.setItem('theme', 'dark');
//   } else {
//     localStorage.setItem('theme', 'light');
//   }
// });

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const modal = document.getElementById("modal");
const openBtns = document.querySelectorAll(".openModal");
const closeBtn = modal.querySelector(".close");

openBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();  // чтобы не прыгать вверх страницы
    modal.style.display = "flex";
  });
});

// openBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     modal.style.display = "flex"; // flex для центрирования
// });

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// ------------------------------------------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = lightbox.querySelector('.close-lightbox');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

let currentImageIndex = 0;
let currentImages = [];

document.querySelectorAll('.project-card').forEach(card => {
  const screenshots = card.querySelectorAll('.screenshots img');

  if (screenshots.length > 0) {
    screenshots.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentImages = Array.from(screenshots).map(img => ({
          src: img.src,
          alt: img.alt || 'Application Screenshot'
        }));

        // Устанавливаем текущий индекс
        currentImageIndex = index;

        // Открываем лайтбокс
        openLightbox();
      });
    });
  }
});

function openLightbox() {
  lightbox.style.display = 'block';
  updateLightboxImage();
  document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
}

function updateLightboxImage() {
  if (currentImages.length > 0 && currentImages[currentImageIndex]) {
    lightboxImg.src = currentImages[currentImageIndex].src;
    lightboxImg.alt = currentImages[currentImageIndex].alt;

    const caption = document.querySelector('.caption');
    if (caption) {
      caption.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }
  }
}

function closeLightboxFunc() {
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto'; // Восстанавливаем скролл
  currentImages = []; // Очищаем массив
}

closeLightbox.addEventListener('click', closeLightboxFunc);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
    closeLightboxFunc();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentImages.length > 0) {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxImage();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentImages.length > 0) {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
  }
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'block') {
    e.preventDefault(); // Предотвращаем прокрутку страницы стрелками

    switch (e.key) {
      case 'Escape':
        closeLightboxFunc();
        break;
      case 'ArrowRight':
      case 'Right':
        nextBtn.click();
        break;
      case 'ArrowLeft':
      case 'Left':
        prevBtn.click();
        break;
    }
  }
});

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    // Свайп влево = следующее фото
    nextBtn.click();
  }

  if (touchEndX > touchStartX + swipeThreshold) {
    // Свайп вправо = предыдущее фото
    prevBtn.click();
  }
}

console.log('Lightbox элемент:', lightbox);
console.log('Lightbox изображение:', lightboxImg);
console.log('Скриншоты найдены:', document.querySelectorAll('.screenshots img').length);

// Burger

const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-items ul');
const navItems = document.querySelectorAll('.nav-item');
const body = document.body;

// Создаём оверлей для мобильного меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
  burger.classList.toggle('active');
  navMenu.classList.toggle('active');
  navOverlay.classList.toggle('active');
  body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}

// Открытие/закрытие по клику на бургер
burger.addEventListener('click', toggleMenu);

// Закрытие по клику на оверлей
navOverlay.addEventListener('click', toggleMenu);

// Закрытие по клику на пункт меню
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }

    // Плавный скролл к секции
    const targetId = item.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });

      // Обновляем активный пункт
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });
});

// Закрытие меню при ресайзе окна
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    burger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    body.style.overflow = '';
  }
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && burger.classList.contains('active')) {
    toggleMenu();
  }
});