import HomePage from './pages/home-page';

const homePage = new HomePage('.home-page');

homePage.init()


const toggleMenu = document.querySelector('.nav__toggle');
const navElement = document.querySelector('.nav');

toggleMenu.addEventListener('click', () => {
    navElement.classList.toggle('nav--open')
})