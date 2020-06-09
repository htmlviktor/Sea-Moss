import fullpage from 'fullpage.js';
import Swiper from 'swiper';


export default class HomePage {
    constructor(pageClass) {
        this._page = document.querySelector(pageClass);

        this._navElement = document.querySelector('.nav');
        this._benefitsElements = document.querySelectorAll('.benefits__nav-link');

        this._colorizeSlides = this._colorizeSlides.bind(this);
    }

    init() {
        if (this._page) {
            this._initFullPage();
            this._initSwiperSlider();

            this._setBenefitsListeners();
        }
    }

    _setBenefitsListeners() {
        this._benefitsElements.forEach(element => {
            element.addEventListener('click', evt => {
                evt.preventDefault();
                this._benefitsElements.forEach(el => {
                    el.classList.remove('benefits__nav-link--active')
                })
                element.classList.add('benefits__nav-link--active')
            })
        })
    }

    _setCustomColor(textColor = 'white', color = 'transparent') {
        $('#fp-nav span').each((_, el) => {
            el.style.background = color;
        })
        $('.fp-tooltip').each((_, el) => {
            el.style.color = textColor;
        })
    }

    _colorizeSlides(index) {
        if (index !== 0) {
            this._navElement.classList.remove('nav-white');
            this._navElement.classList.add('nav-black');
        } else {
            this._navElement.classList.remove('nav-black')
            this._navElement.classList.add('nav-white');
        }
        switch (index) {
            case 0:
                this._setCustomColor()
                $('#fp-nav .active span').css('background', 'white');
                break;
            default:
                this._setCustomColor('#499167');
                $('#fp-nav .active span').css('background', '#499167');
                break;
        }
    }

    _initFullPage() {
        const colorizeSlides = this._colorizeSlides;
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
    }

    _initSwiperSlider() {
        const testimonialsSlider = new Swiper('.swiper-container', {
            centeredSlides: true,
            slidesPerView: 1,
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
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.15
                }
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
    }
}







