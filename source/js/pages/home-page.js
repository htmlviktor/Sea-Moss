import fullpage from 'fullpage.js';
import Swiper from 'swiper';


export default class HomePage {
    constructor(pageClass) {
        this._page = document.querySelector(pageClass);

        this._navElement = document.querySelector('.nav');
        this._benefitsElements = document.querySelectorAll('.benefits__nav-link');
        this._benefitsInfoElements = document.querySelectorAll('.benefits__info-item');
        this._recipesList = document.querySelectorAll('.recipes__list-item');
        
        this._colorizeSlides = this._colorizeSlides.bind(this);
    }

    init() {
        if (this._page) {
            this._initFullPage();
            this._initSwiperSlider();

            this._setBenefitsListeners();
            this._setRecipesListeners();
            this._initSpecialOffers();
        } else {
            this._navElement.classList.add('nav-black');
        }
    }

    _setBenefitsListeners() {
        const closeModalHandler = (evt) => {
            evt.target.parentElement.classList.remove('benefits__info-item--active');
            evt.target.removeEventListener('click', closeModalHandler);
        }
        
        this._benefitsElements.forEach((element, i) => {
            element.addEventListener('click', evt => {
                evt.preventDefault();
                this._benefitsElements.forEach((el, i) => {
                    el.classList.remove('benefits__nav-link--active')
                    this._benefitsInfoElements[i].classList.remove('benefits__info-item--active')
                })
                element.classList.add('benefits__nav-link--active')
                this._benefitsInfoElements[i].classList.add('benefits__info-item--active')
                this._benefitsInfoElements[i]
                    .querySelector('.benefits__info-close')
                    .addEventListener('click', closeModalHandler)
            })
        })

        if (window.innerWidth < 768) {
            this._benefitsInfoElements.forEach(el => {
                el.classList.remove('benefits__info-item--active')
            })
        }

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

    _initSpecialOffers() {
        const items = document.querySelectorAll('.offer__list-item');
        const offers = document.querySelectorAll('.offers_wc-item');

        items.forEach((el, i) => {
            el.addEventListener('click', () => {
                offers.forEach((el) => {
                    el.classList.remove('offers_wc-item--active');
                })
                offers[i].classList.add('offers_wc-item--active');
            })
        })
    }

    _initFullPage() {
        const colorizeSlides = this._colorizeSlides;
        new fullpage('#fullpage', {
            scrollHorizontally: true,
            navigation: $(document).width() <= 760 ? false : true,
            navigationPosition: 'left',
            navigationTooltips: ['Home', 'History', 'Recipes', 'Testimonials', 'Special Offers', 'Contact Us'],
            verticalCentered: false,
            normalScrollElements: '.benefits__info-item',
            afterLoad(origin, destination, direction) {
                colorizeSlides(destination.index)
            }
        });

        const innerNavigationLinks = document.querySelectorAll('.nav__inner-item a');
        innerNavigationLinks.forEach((el, i) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                fullpage_api.moveTo(i + 2);
            })
        })
    }

    _setRecipesListeners() {
        const modal = document.querySelector('.recipes__modal');
        const modalClose = document.querySelector('.recipes__modal-close');

        this._recipesList.forEach((el, i) => {
            el.addEventListener('click', () => {
                modal.classList.add('recipes__modal--show')
            })
        })

        modalClose.addEventListener('click', () => {
            modal.classList.remove('recipes__modal--show');
        })
    }

    _initSwiperSlider() {
        const testimonialsSlider = new Swiper('.testimonials__swiper-wrapper', {
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

        if (window.innerWidth <= 800) {
            const recipesSlider = new Swiper('.swiper-init-recipes', {
                slidesPerView: 1,
                slidesPerColumn: 2,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination-recipes',
                    clickable: true,
                },
                breakpoints: {
                    700: {
                        slidesPerView: 2,
                    }
                }
            })
        } else {
            document.querySelector('.recipes .swiper-container').classList.remove('swiper-container');
        }
    }


}







