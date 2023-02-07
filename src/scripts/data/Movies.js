import axios from 'axios';

const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3/';

class Movies {
    static async getPopularMovies() {
        try {
            const response = await axios.get(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            return response.data.results;
        } catch (error) {
            return {
                code: error.response.data.status_code,
                message: error.response.data.status_message,
            };
        }
    }

    static async getMovieById(movieId) {
        try {
            const response = await axios.get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,casts&language=en-US`);
            return response.data;
        } catch (error) {
            return {
                code: error.response.data.status_code,
                message: error.response.data.status_message,
            };
        }
    }

    static async getMovieByKeyword(keyword) {
        try {
            const response = await axios.get(
                `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`,
            );
            return response.data.results;
        } catch (error) {
            return {
                code: error.response.data.status_code,
                message: error.response.data.status_message,
            };
        }
    }

    static async discoverMovies(sortBy, page, year, withGenres, init) {
        try {
            const params = {
                api_key: API_KEY,
                language: 'en-US',
                sort_by: sortBy,
                page,
                year,
                with_genres: withGenres,
            };

            const response = await axios.get(`${BASE_URL}discover/movie?${new URLSearchParams(params).toString()}`);
            return { results: response.data.results, init };
        } catch (error) {
            return {
                code: error.response.data.status_code,
                message: error.response.data.status_message,
            };
        }
    }

    static async getGenres() {
        try {
            const response = await axios.get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`);
            return response.data.genres;
        } catch (error) {
            return {
                code: error.response.data.status_code,
                message: error.response.data.status_message,
            };
        }
    }
}

export default Movies;
