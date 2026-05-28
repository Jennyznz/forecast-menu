const USER_ID = 17;

const favoritesBtn = document.querySelector('#all-favorites');
const lightDarkBtn = document.querySelector('#light-dark-mode');
const root = document.documentElement;
const userProfileBtn = document.querySelector('#user-profile');
const projectName = document.getElementById('project-name');

favoritesBtn?.addEventListener('click', () => {
    try {
        window.location.href = ('/favorites');
    } catch (err) {
        console.error("Failed to load favorites page. ", err);
    }
});

lightDarkBtn?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
});

userProfileBtn?.addEventListener('click', () => {
    try {
        window.location.href = ('/user/login');
    } catch (err) {
        console.error("Failed to load forms or user profile. ", err);
    }
});

projectName?.addEventListener('click', () => {
    try {
        window.location.href = ('/');
    } catch (err) {
        console.error("Failed to load homepage. ", err);
    }
});
