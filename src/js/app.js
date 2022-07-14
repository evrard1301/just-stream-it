import '../scss/style.scss';
import movie from './movie.js';
import category from './category.js';

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
	let first = new category.Category('Hello')

	first.addMovie(new movie.Movie('Mad Max I', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kbZMXS_KyjCUFfu2D2UQBAHaLH%26pid%3DApi&f=1'));

	first.addMovie(new movie.Movie('Mad Max II', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9Qn2Dsqm2KQjKThpEq7THwHaKj%26pid%3DApi&f=1'));

	first.addMovie(new movie.Movie('Mad Max III', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.explicit.bing.net%2Fth%3Fid%3DOIP.vL8k_D8CwcUpIYxdjds5JAHaLl%26pid%3DApi&f=1'));

	first.addMovie(new movie.Movie('Mad Max Fury Road', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.xgdtFj4wGf7G5ZHWmD1riAHaLP%26pid%3DApi&f=1'));

	for (let i=0; i<8; i++) {
	    first.addMovie(new movie.Movie('Movie ' + i));
	}
	
	this._categories = [
	    first
	];
    }

    /**
     * Start the app by initializing all the categories.
     * @method
     **/
    start() {
	for (let cat of this._categories) {
	    cat.init();
	}
    }
}


const app = new App();
app.start();
