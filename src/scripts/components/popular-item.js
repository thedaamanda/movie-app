class PopularItem extends HTMLElement {
    set movie(data) {
        this._movie = data;
        this.render();
    }

    render() {
        this.innerHTML = `
        <a href="#"><img src="${`https://image.tmdb.org/t/p/w500${this._movie.poster_path}`}" alt="${this._movie.name ?? this._movie.original_title}" class="hed-img-b"/></a>
        <h6>${this._movie.original_title}</h6>
      `;
    }
}

customElements.define('popular-item', PopularItem);
