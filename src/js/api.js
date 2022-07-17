/**
 * API fetching module.
 * @module
 **/
import movie from './movie.js';

/**
 * Fetch movies from the API.
 * @class
 **/
class MovieFetcher {

    constructor() {
    }

    /**
     * Find a given number of movies by genre name.
     * @method
     * @param {string} name - The name of the genre of the requested movies.
     * @param {number} count - The amount of movie to fetch.
     * @param {string} url - The request URL of the API.
     * @param {array} results - The initial array of movies.
     * @return {array} - The final array of movies.
     **/
    async findByGenre(name, count=7, url = null, results = []) {
	if (url === null) {
	    url = `http://localhost:8000/api/v1/titles/?genre=${name}&sort_by=-imdb_score`;
	}
	
	const data = await fetch(url);
	const json_movie = await data.json();

	for (let result of json_movie.results) {
	    const movie_result = await this.findByID(result.id);
	    results.push(this.createMovieFromJSON(movie_result));
	}

	if (results.length < count) {
	    await this.findByGenre(name, count, json_movie.next, results);
	}
	
	return results.slice(0, count);
    }

    /**
     * Find a movie by its ID.
     * @method
     * @param {number} id - The ID of the movie to fetch.
     * @return {Movie} - The movie having the right ID.
     **/
    async findByID(id) {
	const url = `http://localhost:8000/api/v1/titles/${id}`;
	const data = await fetch(url);
	const result = await data.json();
	
	return result;
    }

    /**
     * Find the best movie according to the IMDB score from the API.
     * @method
     * @return {Movie} - The movie having the highest IMDB score.
     */
    async findBestMovie() {
	const data = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');
	const json = await data.json();
	const json_movie = await this.findByID(json.results[0].id);
	return this.createMovieFromJSON(json_movie);
    }

    /**
     * Create a movie object given a JSON one.
     * @method
     * @param {object} json_movie - A JSON object containing all the movie informations.
     * @return {Movie} - A movie built given the JSON object properties.
     **/
    createMovieFromJSON(json_movie) {
	return new movie.Movie(json_movie.title,
			       new URL(json_movie.image_url),
			       json_movie.genres,
			       json_movie.date_published,
			       json_movie.rated,
			       json_movie.imdb_score,
			       json_movie.directors,
			       json_movie.actors,
			       json_movie.duration,
			       json_movie.countries,
			       json_movie.reviews_from_critics,			       
			       json_movie.description,
			       json_movie.long_description);
    }
}


export default {
    MovieFetcher: MovieFetcher
}
