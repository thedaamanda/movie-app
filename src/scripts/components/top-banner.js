import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';
import background from '../../images/header.png';

const $ = require('jquery');

class TopBanner extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set movies(data) {
        this._movies = data;
        this.loadMovies(this._movies);
    }

    render() {
        this.innerHTML = `
            <section>
                <div class="hed-sec">
                    <div class="hed-img">
                        <div class="hed-cont-sec">
                            <h6>Programming &#124; Frontend &#124; Dicoding</h6>
                            <h3>MTA Movies</h3>
                            <p class="hed-b-pp">
                                2022 &#124; <span>Created By</span>: Muhammad Theda Amanda
                            </p>
                            <p>
                                MTA Movies hadir untuk membantu Anda dalam mencari informasi mengenai daftar film agar Anda tidak perlu lagi mencari informasi mengenai film yang Anda sukai di berbagai situs web lainnya.
                            </p>
                            <div class="hed-ban-btns">
                                <div class="ban2-c2">
                                    <a href="#" class="ban2-btn waves-effect waves-light">Watch Movie</a>
                                    <a href="#" class="ban2-btn2 waves-effect waves-light">Watch Trailer</a>
                                </div>
                            </div>
                        </div>
                        <div class="hed-tt1">
                            <h6>Popular Movies</h6>
                        </div>
                        <div class="hed-card">
                            <div class="swiper-container4">
                                <div class="swiper-wrapper">
                                </div>
                                <i class="material-icons next_sli3">navigate_next</i>
                                <i class="material-icons prev_sli3">navigate_before</i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.background();
        this.loadSwiper();
    }

    set renderError(message) {
        this.querySelector('.swiper-wrapper').style.display = 'block';
        const alert = `
            <div class="render-error">
                <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                        <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="1s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
                    </path>
                </svg>
            </div>
            <div class="center">
                <p>${message}</p>
            </div>
        `;

        this.querySelector('.swiper-wrapper').innerHTML = alert;
    }

    background() {
        $('.hed-img').css('background', `linear-gradient(90.15deg, rgba(0, 0, 0, 0.89) 25.63%, rgba(0, 0, 0, 0) 100.06%), url(${background}) no-repeat`);
        $('.hed-img').css('background-size', 'cover');
    }

    loadMovies(movies) {
        movies.forEach((movie) => {
            const movieItemElement = document.createElement('popular-item');
            movieItemElement.classList.add('swiper-slide');
            movieItemElement.movie = movie;
            this.querySelector('.swiper-wrapper').appendChild(movieItemElement);
        });
    }

    loadSwiper() {
        Swiper.use([Autoplay, Navigation, Pagination]);

        const swiper = new Swiper('.swiper-container4', {
            slidesPerView: 4,
            spaceBetween: 14,
            freeMode: false,
            autoplay: {
                delay: 3500,
                disableOnInteraction: true,
            },
            navigation: {
                nextEl: '.next_sli3',
                prevEl: '.prev_sli3',
            },
            breakpoints: {
                360: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                1000: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                },
            },
        });

        swiper.cubeEffect = {
            slideShadows: false,
            shadow: false,
            shadowOffset: 20,
            shadowScale: 0.94,
        };
    }
}

customElements.define('top-banner', TopBanner);
