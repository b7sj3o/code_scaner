// Функція для відкриття/закриття бокового меню
function toggleMenu() {
    const menu = document.querySelector('.header-mobile__menu');
    menu.classList.toggle('open');
}

// Функція для відкриття/закриття підкатегорій
function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
}
