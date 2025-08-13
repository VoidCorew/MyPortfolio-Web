const toggle = document.getElementById('theme-toggle');

// Проверяем сохранённую тему
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  toggle.checked = true;
}

// Обработчик клика
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// модальное окно
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

// Закрытие при клике вне окна
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


// ------------------------------------------------------
// Лайтбокс для скриншотов
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.caption');
const closeLightbox = document.querySelector('.close-lightbox');
const screenshots = document.querySelectorAll('.screenshots img');

screenshots.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt || 'Скриншот приложения';
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// -----------------------------------------------------------
// Обновите JavaScript для слайдера
let currentImageIndex = 0;
const imagesArray = [];

// Инициализация слайдера
document.querySelectorAll('.screenshots img').forEach((img, index) => {
  imagesArray.push({
    src: img.src,
    alt: img.alt || 'Скриншот приложения'
  });

  img.addEventListener('click', (index) => {
    currentImageIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.style.display = 'block';
  updateLightboxImage();
}

function updateLightboxImage() {
  lightboxImg.src = imagesArray[currentImageIndex].src;
  lightboxCaption.textContent = imagesArray[currentImageIndex].alt;
}

// Навигация
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'block') {
    if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
      updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      updateLightboxImage();
    } else if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  }
});

// --------------------------------------------------- prev ---------------------------------------------------
// Lightbox navigation
document.querySelector('.next').addEventListener('click', function () {
  // Логика перехода к следующему изображению
  // Например:
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateLightboxImage();
});

document.querySelector('.prev').addEventListener('click', function () {
  // Логика перехода к предыдущему изображению
  // Например:
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateLightboxImage();
});