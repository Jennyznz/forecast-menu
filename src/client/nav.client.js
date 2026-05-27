const USER_ID = 17;

const favoritesBtn = document.querySelector('#all-favorites');
favoritesBtn.addEventListener('click', () => {
    try {
        window.location.href = ('/favorites');
    } catch (err) {
        console.error("Failed to load favorites page. ", err);
    }
});

const lightDarkBtn = document.querySelector('#light-dark-mode');
const root = document.documentElement;
lightDarkBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
});

const userProfileBtn = document.querySelector('#user-profile');
userProfileBtn.addEventListener('click', () => {
    try {
        window.location.href = ('/user/login');
    } catch (err) {
        console.error("Failed to load forms or user profile. ", err);
    }
});

const projectName = document.getElementById('project-name');
projectName.addEventListener('click', () => {
    try {
        window.location.href = ('/');
    } catch (err) {
        console.error("Failed to load homepage. ", err);
    }
});
