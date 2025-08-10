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