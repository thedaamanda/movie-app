import M from 'materialize-css';
import unavailable from '../../images/unavailable.png';

const $ = require('jquery');

class MovieDetailModal extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set movie(movie) {
        this._movie = movie;
        this.renderMovieDetail();
    }

    objectData(data) {
        let temp = '';
        data.forEach((item) => {
            temp += `<div class="chip">${item.name}</div>`;
        });
        return temp;
    }

    toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
    }

    releaseDate() {
        const date = new Date(this._movie.release_date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day}/${month}/${year}`;
    }

    casts() {
        let temp = '';
        this._movie.casts.cast.forEach((cast) => {
            temp += `${cast.name} (${cast.character}), `;
        });
        return temp;
    }

    render() {
        this.innerHTML = `
            <div id="detailMovieModal" class="modal modal-fixed-footer">
                <div class="modal-content">
                </div>
                <div class="modal-footer">
                    <button class="modal-action modal-close btn-flat">Close</button>
                </div>
            </div>
        `;
    }

    renderMovieDetail() {
        this.openModal();

        $('movie-detail-modal .modal-title').html(
            this._movie.original_title || 'Error Encountered!',
        );
        $('movie-detail-modal .modal-content').html('');
        $('movie-detail-modal .modal-content').append(`
            <div class="row">
                <div class="col l12">
                    <div class="row">
                        <div class="col l4 m12 s12">
                            <div class="modal-movie-img">
                                <div class="movie-card-img">
                                    <img src="${this.imageCheck()}" alt="${this._movie.name ?? this._movie.original_title}" class="responsive-img"/>
                                </div>
                            </div>
                        </div>
                        <div class="col l8 m12 s12">
                            <div class="video-container">
                                <iframe width="560" height="100%" src="${this.loadVideo()}" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col l12">
                    <div class="modal-tit-sec">
                        <div class="modal-tt-1">
                            <p>
                                <i class="inline-icon material-icons">date_range</i>
                                ${this.releaseDate()}
                            </p>
                            <p>
                                <i class="inline-icon material-icons">access_time</i>
                                ${this.toHoursAndMinutes(this._movie.runtime).hours}h ${this.toHoursAndMinutes(this._movie.runtime).minutes}m
                            </p>

                        </div>
                        <h2 class="modal-title">${this._movie.original_title}</h2>
                        <div class="modal-btmic">
                            ${this.objectData(this._movie.genres) || '<div class="chip">-</div>'}
                        </div>
                    </div>
                    <div class="modal-desc">
                        <h5 class="modal-desc-tit">Overview</h5>
                        <p>${this._movie.overview}</p>
                        <h5 class="modal-desc-tit">Cast</h5>
                        <p class="p-vidsec">
                            ${this.casts()}
                        </p>
                    </div>
                </div>
            </div>
        `);
    }

    imageCheck() {
        if (this._movie.poster_path) {
            return `https://image.tmdb.org/t/p/w500${this._movie.poster_path}`;
        }
        return unavailable;
    }

    loadVideo() {
        if (this._movie.videos.results.length > 0) {
            return `https://www.youtube.com/embed/${this._movie.videos.results[0].key}`;
        }
        return 'https://www.youtube.com/embed/not-found';
    }

    openModal() {
        const options = {
            dismissible: false,
            opacity: 0.8,
        };
        const modal = document.querySelector('#detailMovieModal');
        M.Modal.init(modal, options).open();
    }
}

customElements.define('movie-detail-modal', MovieDetailModal);
