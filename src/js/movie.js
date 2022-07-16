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
