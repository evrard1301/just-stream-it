import html from './html.js';
import carrousel from './carrousel.js';

/**
 * Represent a category containing some movies.
 * @class
 **/
class Category {
    
    /**
     * Construct a new category.
     * @constructor
     * @param {string} name - The name of the new category.
     **/
    constructor(name) {
	this._name = name;
	this._movies = [];
	this._carrousel = new carrousel.Carrousel();
	this._root_element = null;
    }

    /**
     * Initialize the category by generating the corresponding HTML.
     * @method
     **/
    init(modal = null) {
	let category_builder =
	    new html.CategoryHTMLBuilder(this._name,
					 this.onCarrouselLeft.bind(this),
					 this.onCarrouselRight.bind(this));

	if (modal !== null) {
	    category_builder.bindModal(modal);
	}
	
	for (let movie of this._movies) {
	    category_builder.addMovie(movie);
	    this._carrousel.add(movie);
	}

	this._root_element =
	    category_builder.build('categories');
    }

    /**
     * @method
     **/
    get movieListElements() {
	return this._root_element.children[1].children[1];
    }

    /**
     * Add a movie to this category.
     * @param {Movie} mobie- The movie to add.
     * @method
     **/
    addMovie(movie) {
	this._movies.push(movie);
    }

    /**
     * Called when the carrousel is moved left.
     * @method
     **/
    onCarrouselLeft() {
	let anim = new carrousel.CarrouselAnimation(this._carrousel,
						    this._root_element);
	if (anim.canSlideLeft()
	    && this._carrousel.moveLeft()) {
	    anim.slideLeft();
	}
    }

    /**
     * Called when the carrousel is moved right.
     * @method
     **/
    onCarrouselRight() {	
	let anim = new carrousel.CarrouselAnimation(this._carrousel,
						    this._root_element);
	if (anim.canSlideRight()
	    && this._carrousel.moveRight()) {
	    anim.slideRight();
	}
    }
}

export default {
    Category: Category
}
