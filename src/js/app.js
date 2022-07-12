import '../scss/style.scss';
import movie from './movie.js';
import category from './category.js';

class App {
    constructor() {
	let first = new category.Category('Hello')

	for (let i=0; i<16; i++) {
	    first.addMovie(new movie.Movie('Mad Max ' + i));
	}
	
	this._categories = [
	    first
	];
    }

    start() {
	for (let cat of this._categories) {
	    cat.init();
	}
    }
}


const app = new App();
app.start();
