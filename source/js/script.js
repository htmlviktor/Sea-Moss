import fullpage from 'fullpage.js';
import Swiper from 'swiper';

const navElement = document.querySelector('.nav');
const benefitsElements = document.querySelectorAll('.benefits__nav-link');

benefitsElements.forEach(element => {
    element.addEventListener('click', evt => {
        evt.preventDefault();
        benefitsElements.forEach(el => {
            el.classList.remove('benefits__nav-link--active')
        })
        element.classList.add('benefits__nav-link--active')
    })
})

const colorizeSlides = (index) => {
    if(index !== 0) {
        navElement.classList.remove('nav-white');
        navElement.classList.add('nav-black');
    } else {
        navElement.classList.remove('nav-black')
        navElement.classList.add('nav-white');
    }
    //  switch (index) {
    //     case 0:
    //         $('.fp-tooltip').css('color', '#333');
    //         $('#fp-nav span').css('background', '#333');
    //         break;
    //     case 1:
    //         $('.fp-tooltip').css('color', 'white');
    //         $('#fp-nav span').css('background', 'white');
    //         break;
    //     case 2:
    //         $('.fp-tooltip').css('color', '#333');
    //         $('#fp-nav span').css('background', '#333');
    //         break;
    //     case 3:
    //         $('.fp-tooltip').css('color', 'white');
    //         $('#fp-nav span').css('background', 'white');
    //         break;
    //     default:
    //         $('.fp-tooltip').css('color', 'white');
    //         $('#fp-nav span').css('background', 'white');
    //         break;
    // }
}


 new fullpage('#fullpage', {
    scrollHorizontally: true,
    navigation: $(document).width() <= 760 ? false : true,
    navigationPosition: 'left',
    navigationTooltips: ['Home', 'History', 'Recipes', 'Testimonials', 'Special Offers', 'Contact Us'],
    verticalCentered: false,
    afterLoad(origin, destination, direction) {
        colorizeSlides(destination.index)
    }

});
