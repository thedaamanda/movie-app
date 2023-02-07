import image from '../../images/red-icon.png';
import unavailable from '../../images/unavailable.png';

class MovieItem extends HTMLElement {
    set movie(data) {
        this._movie = data;
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="movie-card">
            <div class="movie-card-img">
                <img src="${this.imageCheck()}" alt="${this._movie.name ?? this._movie.original_title}" class="movie-c-img"/>
            </div>
            <div class="movie-card-content">
                <h6>${this._movie.original_title}</h6>
                <p>Release Date: ${this.releaseDate()}</p>
            </div>
            <a href="#!">
                <img class="movie-icon" src="${image}" alt="movie-icon"/>
            </a>
            <div class="rating">
                <div class="card__rate ${this.rateColor()}">
                    ${this._movie.vote_average !== 0 ? parseFloat(this._movie.vote_average).toFixed(1) : 'NR'}
                </div>
            </div>
        </div>
      `;
    }

    imageCheck() {
        if (this._movie.poster_path) {
            return `https://image.tmdb.org/t/p/w500${this._movie.poster_path}`;
        }
        return unavailable;
    }

    releaseDate() {
        const date = new Date(this._movie.release_date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day}/${month}/${year}`;
    }

    rateColor() {
        if (this._movie.vote_average >= 7) {
            return 'card__rate--green';
        } if (this._movie.vote_average >= 4 && this._movie.vote_average < 7) {
            return 'card__rate--yellow';
        }
        return 'card__rate--red';
    }
}

customElements.define('movie-item', MovieItem);
