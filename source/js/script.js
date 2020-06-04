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

const setCustomColor = (textColor = 'white', color = 'transparent') => {
    $('#fp-nav span').each((_, el) => {
        el.style.background = color;
    })
    $('.fp-tooltip').each((_, el) => {
        el.style.color = textColor;
    })
}

const colorizeSlides = (index) => {
    if(index !== 0) {
        navElement.classList.remove('nav-white');
        navElement.classList.add('nav-black');
    } else {
        navElement.classList.remove('nav-black')
        navElement.classList.add('nav-white');
    }
     switch (index) {
        case 0:
            setCustomColor()
            $('#fp-nav .active span').css('background', 'white');
            break;
        default:
            setCustomColor('#499167');
            $('#fp-nav .active span').css('background', '#499167');
            break;
    }
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


const testimonialsSlider = new Swiper('.swiper-container', {
    centeredSlides: true,
    slidesPerView: 1.15,
    loop: true,
    spaceBetween: 0,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 250,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
})

const sliderBtnPrev = document.querySelector('.slider__button--prev');
const sliderBtnNext = document.querySelector('.slider__button--next');

sliderBtnPrev.addEventListener('click', evt => {
    testimonialsSlider.slidePrev();
})

sliderBtnNext.addEventListener('click', evt => {
    testimonialsSlider.slideNext();
})