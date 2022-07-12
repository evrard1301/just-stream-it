/**
 * Movie module.
 * @module
 **/

/**
 * Represent a movie available on "just stream it".
 * @class
 **/
class Movie {
    /**
     * Create a new movie.
     * @constructor
     * @param {string} title - The title of the movie.
     **/
    constructor(title) {
	this.title = title;
	this.image_url = 'https://via.placeholder.com/256';
    }	
}

export default {
    Movie: Movie
}
