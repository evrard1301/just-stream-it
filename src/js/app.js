import '../scss/style.scss';
import movie from './movie.js';
import category from './category.js';
import api from './api.js';
import html from './html.js';

/**
 * Main front-end class of just-stream-it.
 * @class
**/
class App {
    /**
     * Construct a new app by creating categories.
     * @constructor
     **/
    constructor() {
	this._best_movie = null
	this._categories = [];
	this._modal = new html.Modal();
    }

    /**
     * Intialize the app.
     * @method
     **/
    async init() {
	await Promise.all([
	    this.initBestMovie(),
	    this.initAllCategories()
	]);
    }

    /**
     * Initialize a category by creating the HTML 
     * and binding events.
     * @method
     * @param {string} name - The name of the category.
     * @param {string} genre - The API genre name where to find movies for this category.
     **/
    async initCategory(name, genre) {
	let cat = new category.Category(name)

	const fetcher = new api.MovieFetcher();
	const movies = await fetcher.findByGenre(genre);

	for (let movie of movies) {
	    cat.addMovie(movie);
	}

	this._categories.push(cat);	
    }

    /**
     * Initliaze three arbitrary categories.
     * @method
     **/
    async initAllCategories() {
	await Promise.all([	   
	    this.initCategory('Biographies', 'Biography'),
	    this.initCategory('Film-Noir', 'Film-Noir'),
	    this.initCategory('Historique', 'History')
	]);
    }

    /**
     * Initialize the best movie panel by
     * modifying the DOM.
     * @method
     **/
    async initBestMovie() {
	const fetcher = new api.MovieFetcher();
	const movie = await fetcher.findBestMovie();
	const builder = new html.BestMovieHTMLBuilder(movie);
	builder.bindModal(this._modal);
	builder.build();
    }

    /**
     * Add a new category to the app.
     * @method
     * @param {Category} cat - The category to add.
     **/
    addCategory(cat) {
	this._categories.push(cat);
    }
    
    /**
     * Start the app by initializing all the categories.
     * @method
     **/
    start() {
	for (let cat of this._categories) {
	    cat.init(this._modal);
	}
    }
}

const app = new App();

app.init().then(function(cat) {
    app.start();
});
