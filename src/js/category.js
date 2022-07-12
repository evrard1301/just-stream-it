import html from './html.js';
import carrousel from './carrousel.js';

class Category {
    constructor(name) {
	this._name = name;
	this._movies = [];
	this._carrousel = new carrousel.Carrousel();
	this._root_element = null;
    }

    init() {
	let category_builder =
	    new html.CategoryHTMLBuilder(this._name,
					 this.onCarrouselLeft.bind(this),
					 this.onCarrouselRight.bind(this));

	for (let movie of this._movies) {
	    category_builder.addMovie(movie);
	    this._carrousel.add(movie);
	}

	this._root_element =
	    category_builder.build('categories');
    }

    get movieListElements() {
	return this._root_element.children[1].children[1];
    }

    addMovie(movie) {
	this._movies.push(movie);
    }

    onCarrouselLeft() {
    }

    onCarrouselRight() {
    }
}

export default {
    Category: Category
}
