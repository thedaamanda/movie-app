const $ = require('jquery');

class FilterSearch extends HTMLElement {
    connectedCallback() {
        this.render();
        this.loadYear();
    }

    set genres(data) {
        this._genres = data;
        this.loadGenres();
    }

    render() {
        this.innerHTML = `
        <section class="filter-section">
            <div class="filter-card">
                <div class="row">
                    <div class="col s12">
                        <div class="row">
                            <form>
                                <div class="input-field col s12 m12 l4">
                                    <div class="filter-title">
                                        <p>Sort By</p>
                                    </div>
                                    <select id="sort_by" class="browser-default">
                                        <option value="popularity.desc" selected>Popularity Descending</option>
                                        <option value="popularity.asc">Popularity Ascending</option>
                                        <option value="vote_average.desc">Rating Descending</option>
                                        <option value="vote_average.asc">Rating Ascending</option>
                                        <option value="primary_release_date.desc">Release Date Descending</option>
                                        <option value="primary_release_date.asc">Release Date Ascending</option>
                                        <option value="title.asc">Title (A-Z)</option>
                                        <option value="title.desc">Title (Z-A)</option>
                                    </select>
                                </div>
                                <div class="input-field col s12 m12 l4">
                                    <div class="filter-title">
                                        <p>Genre</p>
                                    </div>
                                    <select id="with_genres" class="browser-default">
                                    </select>
                                </div>
                                <div class="input-field col s12 m12 l4">
                                    <div class="filter-title">
                                        <p>Year</p>
                                    </div>
                                    <select id="year" class="browser-default">
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      `;
    }

    set renderError(message) {
        const selectGenres = document.getElementById('with_genres');
        selectGenres.style.color = '#B71C1C';
        selectGenres.innerHTML = `<option value="" disabled selected>${message}</option>`;
    }

    loadGenres() {
        const selectGenres = document.getElementById('with_genres');
        let option = '';
        this._genres.forEach((genre) => {
            option += `<option value="${genre.id}">${genre.name}</option>`;
        });
        selectGenres.innerHTML = option;
    }

    loadYear() {
        const now = new Date().getUTCFullYear();
        const years = Array(now - (now - 40)).fill('').map((v, idx) => now - idx);
        years.forEach((val) => {
            $('#year').append(`<option value="${val}">${val}</option>`);
        });
    }
}

customElements.define('filter-search', FilterSearch);
