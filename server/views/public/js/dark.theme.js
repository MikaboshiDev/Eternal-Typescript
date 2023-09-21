/**
 * The above JavaScript code is responsible for handling the side menu, theme toggling, and storing the
 * theme preference in a cookie.
 * @returns The function `getThemePreferenceFromCookie` returns the theme preference value ('claro' or
 * 'oscuro') obtained from the cookie. If no valid theme preference is found in the cookie, it returns
 * the default value 'claro'.
 */
const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');

document.addEventListener('DOMContentLoaded', () => {
    const themePreference = getThemePreferenceFromCookie();
    applyTheme(themePreference);
});

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

themeToggler.addEventListener('click', () => {
    toggleTheme();
});

function getThemePreferenceFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (
            name === 'theme' &&
            (value === 'claro' || value === 'oscuro')
        ) {
            return value;
        }
    }
    return 'claro';
}

function applyTheme(theme) {
    document.body.classList.toggle(
        'dark-theme-variables',
        theme === 'oscuro'
    );
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains(
        'dark-theme-variables'
    )
        ? 'oscuro'
        : 'claro';

    const newTheme = currentTheme === 'claro' ? 'oscuro' : 'claro';

    applyTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/`;
}