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


