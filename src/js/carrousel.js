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
	const sz = Math.min(this._movies.length, this._position + count);

	for (let i=this._position; i<sz; i++) {
	    res.push(this._movies[i]);
	}

	let prev = null;
	let next = null;

	if (this._position > 0) {
	    prev = this._movies[this._position - 1];
	}

	if (sz < this._movies.length) {
	    next = this._movies[sz];
	}

	return new CarrouselView(res, prev, next);
    }

    /**
     * Move the carrousel to the left by changing its position.
     * @method
     **/
    moveLeft() {
	this._position -= 1;

	if (this._position < 0) {
	    this._position = 0;
	}
    }

    /**
     * Move the carrousel to the right by changing its position.
     * @method
     **/
    moveRight() {
	this._position += 1;

	if (this._position >= this._movies.length) {
	    this._position = this._movies.length - 1;
	}
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

class CarrouselAnimation {
    constructor(carrousel, root_element) {
	this._carrousel = carrousel;
	this._root = root_element;
	this._list_element = this._root.children[1].children[1];
	this._list = this._list_element.children;
	this._image = this._list[0].children[0].children[0];
	this._movie_width = this._image.scrollWidth;
    }

    slide(speed = 256) {
	const position = this._carrousel.position;
	const origin = this._list_element.getBoundingClientRect().x;
	let target = this._list[position].getBoundingClientRect().x;
	let final_offset = 0;
	
	if (target > origin) {
	    html.animationLoop(function (dt) {
		let incr = -speed * dt;
		
		for (let movie of this._list) {
	    	    html.moveElement(movie, incr, 0);
		}	    

		target = this._list[position].getBoundingClientRect().x;
		
		return target > origin;
		
	    }.bind(this));
	}

	if (target < origin) {
	    html.animationLoop(function (dt) {
		let incr = speed * dt;
		
		for (let movie of this._list) {
	    	    html.moveElement(movie, incr, 0);
		}	    
		
		target = this._list[position].getBoundingClientRect().x;
		
		return target < origin;
		
	    }.bind(this));
	}   
    }
    
    slideRight() {
    	this.slide(128);
    }

    slideLeft() {
    	this.slide(128);
    }
}

export default{
    CarrouselView: CarrouselView,
    CarrouselAnimation: CarrouselAnimation,
    Carrousel: Carrousel
};
