import fullpage from 'fullpage.js';
import Swiper from 'swiper';

const navLinks = document.querySelectorAll('.nav__link');

const colorizeSlides = (index) => {
    if(index !== 0) {
        navLinks.forEach(el => {
            el.style.color = 'black';
        })
    } else {
        navLinks.forEach(el => {
            el.style.color = 'white';
        })
    }
     switch (index) {
        case 0:
            $('.fp-tooltip').css('color', '#333');
            $('#fp-nav span').css('background', '#333');
            break;
        case 1:
            $('.fp-tooltip').css('color', 'white');
            $('#fp-nav span').css('background', 'white');
            break;
        case 2:
            $('.fp-tooltip').css('color', '#333');
            $('#fp-nav span').css('background', '#333');
            break;
        case 3:
            $('.fp-tooltip').css('color', 'white');
            $('#fp-nav span').css('background', 'white');
            break;
        default:
            $('.fp-tooltip').css('color', 'white');
            $('#fp-nav span').css('background', 'white');
            break;
    }
}


 new fullpage('#fullpage', {
    scrollHorizontally: true,
    navigation: $(document).width() <= 760 ? false : true,
    navigationPosition: 'left',
    navigationTooltips: ['Home', 'Works', 'Our Services', 'Our Story'],
    verticalCentered: false,
    afterLoad(origin, destination, direction) {
        colorizeSlides(destination.index)
    }

});
