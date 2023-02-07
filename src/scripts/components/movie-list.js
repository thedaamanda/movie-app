class MovieList extends HTMLElement {
    set moreMovies(data) {
        this._moreMovies = data;
        this.renderMoreMovies();
    }

    set movies(data) {
        this._movies = data;
        this.render();
    }

    render() {
        this.innerHTML = `
            <section class="movie-section">
                <div class="row movie-sec-t">
                    <div class="col s12">
                        <div class="row row-flex movie-list">
                        </div>
                    </div>
                </div>
            </section>
        `;

        const movieList = this.querySelector('.movie-list');
        movieList.classList.add('modal-trigger');
        movieList.setAttribute('data-target', 'detailMovieModal');
        this._movies.forEach((movie) => {
            const movieItemElement = document.createElement('movie-item');
            movieItemElement.setAttribute('data-movieid', movie.id);
            movieItemElement.movie = movie;
            const movieCard = document.createElement('div');
            movieCard.classList.add('col', 's6', 'm4', 'l3', 'xl2');
            movieCard.appendChild(movieItemElement);
            movieList.appendChild(movieCard);
        });
    }

    renderMoreMovies() {
        const movieList = this.querySelector('.movie-list');
        movieList.classList.add('modal-trigger');
        movieList.setAttribute('data-target', 'detailMovieModal');
        this._moreMovies.forEach((movie) => {
            const movieItemElement = document.createElement('movie-item');
            movieItemElement.setAttribute('data-movieid', movie.id);
            movieItemElement.movie = movie;
            const movieCard = document.createElement('div');
            movieCard.classList.add('col', 's6', 'm4', 'l3', 'xl2');
            movieCard.appendChild(movieItemElement);
            movieList.appendChild(movieCard);
        });
    }

    set renderError(message) {
        this.innerHTML = '';
        this.innerHTML = `
            <div class="alert card red lighten-4 red-text text-darken-4">
                <div class="card-content">
                    <p><i class="material-icons">report</i>${message}</p>
                </div>
            </div>
        `;
    }
}

customElements.define('movie-list', MovieList);
