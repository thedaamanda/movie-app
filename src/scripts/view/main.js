import events from '../events';
import Movies from '../data/Movies';
import '../components/app-bar';
import '../components/top-banner';
import '../components/popular-item';
import '../components/filter-search';
import '../components/movie-list';
import '../components/movie-item';
import '../components/movie-detail-modal';
import '../components/bottom-footer';

const $ = require('jquery');

const getPopularMovies = async () => {
    $('popular-list').html('');

    const renderResult = (movies) => {
        document.querySelector('top-banner').movies = movies;
    };

    const renderError = (message) => {
        document.querySelector('top-banner').renderError = message;
    };

    const movieData = await Movies.getPopularMovies();
    if (movieData.message) {
        renderError(movieData.message);
    } else {
        renderResult(movieData);
    }
};

const getFilter = async () => {
    const renderResult = (genres) => {
        document.querySelector('filter-search').genres = genres;
    };

    const renderError = (message) => {
        document.querySelector('filter-search').renderError = message;
    };

    const movieData = await Movies.getGenres();
    if (movieData.message) {
        renderError(movieData.message);
    } else {
        renderResult(movieData);
    }
};

const discoverMovies = async () => {
    let sortBy = 'popularity.desc';
    let year = '';
    let withGenres = '';

    const resetPage = () => {
        $('#load-more').attr('data-page', 1);
    };

    const renderResult = (movies, init) => {
        if (init) {
            $('movie-list').html('');
            document.querySelector('movie-list').movies = movies;
        } else {
            document.querySelector('movie-list').moreMovies = movies;
        }
    };

    const renderError = (message) => {
        document.querySelector('movie-list').renderError = message;
    };

    const changeDiscover = async (init) => {
        if (init) {
            resetPage();
        }

        const page = $('#load-more').attr('data-page');
        const movieData = await Movies.discoverMovies(
            sortBy,
            page,
            year,
            withGenres,
            init,
        );
        if (movieData.message) {
            renderError(movieData.message);
        } else {
            renderResult(movieData.results, init);
        }
    };

    $('#sort_by').on('change', function () {
        sortBy = $(this).val();
        changeDiscover(true);
    });

    $('#year').on('change', function () {
        year = $(this).val();
        changeDiscover(true);
    });

    $('#with_genres').on('change', function () {
        withGenres = $(this).val();
        changeDiscover(true);
    });

    $('#load-more').on('click', function () {
        let page = parseInt($(this).attr('data-page'), 10);
        page += 1;
        $(this).attr('data-page', page);
        changeDiscover(false);
    });

    const movieData = await Movies.discoverMovies(sortBy, 1, '', '', true);
    if (movieData.message) {
        renderError(movieData.message);
    } else {
        renderResult(movieData.results, movieData.init);
    }
};

const getMovieById = async (movieID) => {
    const renderResult = (movie) => {
        document.querySelector('movie-detail-modal').movie = movie;
    };

    const renderError = (message) => {
        document.querySelector('movie-detail-modal').renderError = message;
    };

    const movieData = await Movies.getMovieById(movieID);
    if (movieData.message) {
        renderError(movieData.message);
    } else {
        renderResult(movieData);
    }
};

const getMovieByKeyword = async (e, keyword) => {
    $('movie-list').html('');

    $('filter-search').css('display', 'none');
    $('#load-more').css('display', 'none');

    const renderResult = (movies) => {
        document.querySelector('movie-list').movies = movies;
    };

    const renderError = (message) => {
        document.querySelector('movie-list').renderError = message;
    };

    e.preventDefault();

    const movieData = await Movies.getMovieByKeyword(keyword);
    if (movieData.message) {
        renderError(movieData.message);
    } else if (movieData.length === 0) {
        renderError(`No movie found with keyword <b>${keyword}</b>`);
    } else {
        renderResult(movieData);
    }
};

const main = () => {
    events();

    window.addEventListener('load', () => {
        getPopularMovies();
        getFilter();
        discoverMovies();
    });

    $('app-bar form#search_form').on('submit', (e) => {
        getMovieByKeyword(e, $('input#keywordSearch').val());
    });

    $('movie-list').on('click', 'movie-item', function () {
        const movieID = $(this).data('movieid');
        getMovieById(movieID);
    });
};

export default main;
