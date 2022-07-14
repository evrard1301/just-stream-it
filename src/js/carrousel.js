import html from './html.js';

/**
 * Carrousel manipulation.
 * @module
 **/

/**
 * CarrouselView
 * @class
 * Represents a subset of a Carrousel.
 * @see Carrousel
 **/
class CarrouselView {
    /**
     * Create a view.
     * @constructor
     * @param {array} movies - The list of the movies hold by the
     * view.
     * @param {Movie} prev - The movie preceding the first one of the view if any.
     * @param {Movie} next - The movie following the last one of the view if any.
     **/
    constructor(movies, prev = null, next = null) {
	this.movies = movies;
	this._prev = prev;
	this._next = next;
    }

    /**
     * Get the movie preceding the first one if any.
     * @method
     * @return {Movie} The previous movie or null.
     **/
    prev() {
	return this._prev;
    }

    /**
     * Get the movie following the last one if any.
     * @method
     * @return {Movie} The next movie or null.
     **/
    next() {
	return this._next;
    }
}

/**
 * Represent a carrousel containing movie items.
 * @class
 **/
class Carrousel {

    /**
     * Create an empty carrousel.
     * @constructor
     **/
    constructor() {
	this._movies = [];
	this._position = 0;
    }

    /**
     * Returns the current position of the carrousel.
     * @method
     * @return {number} The current position of the carrousel.
     **/
    get position() { return this._position; }

    /**
     * Defines the current position of the carrousel.
     * @method
     * @param {number} position - The futur position of the carrousel.
     **/
    set position(position) { this._position = position; }

    /**
     * Request a view of the carrousel.
     * @method
     * @param {number} count - The size of the requested view.
     * @return {CarrouselView} - The requested view.
     **/
    requestView(count) {
	let res = [];

	if (this._movies.length == 0) {
	    return new CarrouselView([]);
	}
	
	for (let i=0; i<count; i++) {
	    res.push(this._movies[this._position + i % this._movies.length]);
	}

	let prev = null;
	let next = null;

	if (this._position > 0) {
	    prev = this._movies[this._position - 1];
	} else {
	    prev = this._movies[this._movies.length - 1];
	}
	
	next = this._movies[(this._position + count) % this._movies.length];

	return new CarrouselView(res, prev, next);
    }

    /**
     * Move the carrousel to the left by changing its position.
     * @method
     * @return {bool} - true if the movement is valid, false otherwise.
     **/
    moveLeft() {
	if (this._position - 1 >= 0) {
	    this._position -= 1;
	    return true;
	}
	
	return false;
    }

    /**
     * Move the carrousel to the right by changing its position.
     * @method
     * @return {bool} - true if the movement is valid, false otherwise.
     **/
    moveRight() {
	if (this._position + 1 < this._movies.length) {
	    this._position += 1;
	    return true;
	}

	return false;
    }

    /**
     * Add a new movie in the carrousel.
     * @method
     * @param {Movie} movie - The movie to add to the carrousel.
     **/
    add(movie) {
	this._movies.push(movie);
    }

    /**
     * Returns the number of movies.
     * @return {number} - The number of movies.
     **/
    count() {
	return this._movies.length;
    }
}

/**
 * Manage the animation of the carrousel.
 * @class
 **/
class CarrouselAnimation {

    /**
     * Create a new carrousel animation.     
     * @constructor
     * @param {Carrousel} carrousel - The carrousel to animate.
     * @param {Element} - The root DOM element of the category.
     **/
    constructor(carrousel, root_element) {
	this._carrousel = carrousel;
	this._root = root_element;	
	this._list_element = this._root.children[1].children[1];
	this._list = this._list_element.children;
	this._image = this._list[0].children[0].children[0];
	this._movie_width = this._list_element.offsetHeight;
    }

    /**
     * Animate the carrousel by moving the movies within.    
     * @method
     * @param {number} speed - The speed of the animation in pixel per second.
     * @param {number} count - The amount of carrousel images to slide.
     **/
    slide(speed=512, count=1) {
	const reference = this._list[0];
	let start = reference.offsetLeft;
	
	html.animationLoop(function (dt) {
	    for(let movie of this._list) {
		html.moveElement(movie, speed * dt, 0);
	    }
	    
	    return Math.abs(reference.offsetLeft - start) < this._movie_width * count;
	}.bind(this));
    }

    /**
     * Tells weither or not the carrousel can slide right.
     * @method
     * @return {boolean} True if the carrousel can slide right, false otherwise.
     **/
    canSlideRight() {
	return this._list[this._list.length - 1].offsetLeft
	    + this._list[this._list.length - 1].offsetWidth > this._list_element.offsetWidth;
    }

    /**
     * Slide right the carrousel if allowed.
     * @method
     * @see canSlideRight
     **/
    slideRight() {

	if (this.canSlideRight()) {	

	    this.slide(-512);
	}
    }

    /**
     * Tells weither or not the carrousel can slide left.
     * @method
     * @return {boolean} True if the carrousel can slide left, false otherwise.
     **/
    canSlideLeft() {
	return this._list[0].offsetLeft < 0;
    }

    /**
     * Slide left the carrousel if allowed.
     * @method
     * @see canSlideLeft
     **/
    slideLeft() {
	if (this.canSlideLeft()) {
	    this.slide(512);
	}
    }
}

export default{
    CarrouselView: CarrouselView,
    CarrouselAnimation: CarrouselAnimation,
    Carrousel: Carrousel
};
