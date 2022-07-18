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
     * @param {array} genres - The genre.
     * @param {Date} release_date - The release date.
     * @param {string} rated - The rated value.
     * @param {number} imdb_score - The IMDB score.
     * @param {array} directors - All the directors of the movie.
     * @param {array} actors - All the actors of the movie.
     * @param {string} duration - The duration of the movie in minutes.
     * @param {array} countries - The countries where the movie is available.
     * @param {string} box_office - The box office.
     * @param {string} description - The short description of a movie.
     * @param {string} long description - The long description of a movie.     
     **/
    constructor(title,
		image_url='https://via.placeholder.com/256',
		genres,
		release_date,
		rated,
		imdb_score,
		directors,
		actors,
		duration,
		countries,
		box_office,		
		description,
		long_description) {
	this.title = title;
	this.image_url = image_url;
	this.genres = genres;
	this.release_date = release_date;
	this.rated = rated;
	this.imdb_score = imdb_score;
	this.directors = directors;
	this.actors = actors;
	this.duration = duration;
	this.countries = countries;
	this.box_office = box_office;
	this.description = description,
	this.long_description = long_description;
    }
}

export default {
    Movie: Movie
}
