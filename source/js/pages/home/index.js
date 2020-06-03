import fullpage from 'fullpage.js';
import Swiper from 'swiper';
import ReactDOM from 'react-dom';
import React from 'react';
import Cart from '../../components/cart';
import { createStore } from 'redux';
import { reducer } from '../../store/store';
import { ActionCreators } from '../../store/store';

const store = createStore(reducer);

window.store = store;

export default class HomePage {
    constructor() {
        this._pageId = document.querySelector('.nav__list-item--active a').textContent.toLowerCase();
        this._fullPage = null;
        this._testimonialsSlider = null;

        this._benefitsElements = null;
        this._navElement = null;

        this._colorizeSlides = this._colorizeSlides.bind(this);
        store.subscribe(this._renderDom);
    }

    init() {
        if (this._pageId === 'home') {
            this._navElement = document.querySelector('.nav');
            this._benefitsElements = document.querySelectorAll('.benefits__nav-link');

            this._benefitsChanged();
            this._initializeFullPage();
            this._initializeTestimonialsSLider();

            this._renderDom();
            this._addListenersOnSpecialOffers();
        }
    }

    _renderDom() {
        const products = store.getState().products;
        ReactDOM.render(
            <Cart items={products} />,
            document.querySelector('.cart')
        )
    }

    _addListenersOnSpecialOffers() {
        const offerList = document.querySelectorAll('.offer__list-item');
        offerList.forEach(el => {
            el.addEventListener('click', (evt) => {
                const product = el.dataset.product;
                store.dispatch(ActionCreators.addProduct({title: product}))
                console.log(store.getState())
            })
        })
    }

    _benefitsChanged() {
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

    _colorizeSlides(index) {
        if (index !== 0) {
            this._navElement.classList.remove('nav-white');
            this._navElement.classList.add('nav-black');
        } else {
            this._navElement.classList.remove('nav-black')
            this._navElement.classList.add('nav-white');
        }
    }

    _initializeFullPage() {
        const colorizeSlides = this._colorizeSlides;

        this._fullPage = new fullpage('#fullpage', {
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

    _initializeTestimonialsSLider() {
        this._testimonialsSlider = new Swiper('.swiper-container', {
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
            this._testimonialsSlider.slidePrev();
        })

        sliderBtnNext.addEventListener('click', evt => {
            this._testimonialsSlider.slideNext();
        })
    }
}
