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
     * @param {string} image_url - The URL of the movie image.
     **/
    constructor(title, image_url='https://via.placeholder.com/256') {
	this.title = title;
	this.image_url = image_url;
    }	
}

export default {
    Movie: Movie
}
