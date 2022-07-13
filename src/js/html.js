/**
 * HTML manipulation.
 * @module
 **/

/**
 * Build the HTML representation of a category.
 * @class
 **/
class CategoryHTMLBuilder {
    /**
     * Create a HTML builder.
     * @constructor
     * @param {string} title - the title of the category.
     * @param {function} left_callback - The callback called when the
     * left arrow of the carrousel is clicked.
     * @param {function} right_callback - The callback called when the
     * right arrow of the carrousel is clicked.
     **/
    constructor(title,
		left_callback = function() {},
		right_callback = function() {}) {
	this._title = title;
	this._movies = [];
	this._left_callback = left_callback
	this._right_callback = right_callback;
    }

    /**
     * Add a movie aimed at being added to the generated HTML.
     * @method
     * @param {Movie} movie - A movie to render within the category.
     **/
    addMovie(movie) {
	this._movies.push(movie);
    }

    /**
     * Build the DOM elements of the category.
     * @method
     * @param {string} root_id - The ID of the DOM element where the category will be added.
     * @return {object} The category DOM element generated.
     **/
    build(root_id) {
	let root = document.getElementById(root_id);
	let section = this.buildSection();
	root.appendChild(section);

	return section;
    }

    /**
     * Build the top level section of the category.
     * @method
     * @return {object} - The section generated.
     **/
    buildSection() {
	let section = document.createElement('section');
	section.classList.add('category');
	
	let h2 = document.createElement('h2');
	h2.innerText = this._title;
	section.appendChild(h2);

	section.appendChild(this.buildCategoryContent());
	
	return section;
    }

    /**
     * Build the content of the category (ie. the arrows and movies).
     * @method
     * @return {object} - The category content div.
     **/
    buildCategoryContent() {
	let content = document.createElement('div');
	content.classList.add('category__content');

	let left_arrow = this.buildArrow('left');
	left_arrow.addEventListener('click', this._left_callback);
	content.appendChild(left_arrow);
	
	let ul = document.createElement('ul');
	
	for (let movie of this._movies) {
	    ul.appendChild(this.buildMovie(movie));
	}
	
	content.appendChild(ul);

	let right_arrow = this.buildArrow('right');
	right_arrow.addEventListener('click', this._right_callback);
	content.appendChild(right_arrow);
	
	return content;
    }

    /**
     * Build the left or right arrow of the carrousel.
     * @method
     * @param {string} direction - Tells weither or not the arrow is a "left" or a "right" arrow.
     * @return {object} - The div element representing an arrow.
     **/
    buildArrow(direction) {
	let arrow = document.createElement('div');
	arrow.classList.add('arrow');
	arrow.classList.add('arrow--' + direction);

	let img = document.createElement('img');
	img.setAttribute('src', 'images/arrow.png');

	arrow.appendChild(img);
	
	return arrow;
    }

    /**
     * Build the DOM element for a single movie.
     * @method
     * @param {Movie} movie - The movie de render.
     * @see addMovie
     **/
    buildMovie(movie) {
	let li = document.createElement('li');

	let link = document.createElement('a');
	link.setAttribute('href', '#');

	let img = document.createElement('img');
	img.setAttribute('src', movie.image_url);

	link.appendChild(img);
	li.appendChild(link);

	return li;
    }
}

/**
 * Return the pixel number value given a string.
 * @function
 * @param {string} str - The string representing a pixel number.
 * @return {number} - The number value of the string.
 **/
function getPixelValue(str) {
    if (str == '') {
	return 0;
    }

    return parseInt(str.substr(0, str.length - 2));
}

/**
 * Move a DOM element.
 * @function
 * @param {object} element - The DOM element to move.
 * @param {number} x - The horizontal displacement in pixel.
 * @param {number} y - The vertical displacement in pixel.
 **/
function moveElement(element, x, y) {
    let x_pos = getPixelValue(element.style.left);
    let y_pos = getPixelValue(element.style.top);
    
    element.style.left = (x_pos + x).toString() + 'px';
    element.style.top = (y_pos + y).toString() + 'px';
}

/**
 * Move a DOM element at a given position.
 * @function
 * @param {object} element - The DOM element to move.
 * @param {number} x - The new x coordinate in pixel.
 * @param {number} y - The new y coordinate in pixel.
 **/
function setElementPosition(element, x, y) {
    element.style.left = x.toString() + 'px';
    element.style.top = y.toString() + 'px';
}

/**
 * Loop over a callback at a given framerate using requestAnimationFrame.
 * @function
 * @param {function} callback - The callback called.
 * @param {number} framerate - The framerate of the animation in seconds.
 **/
function animationLoop(callback) {

    let previous = null;
    let elapsed = 0.0;
    
    function update(time) {
	if (previous === null) { previous = Date.now(); }
	
	if (!callback(elapsed)) {
	    return;
	}		

	requestAnimationFrame(update);
	
	elapsed = (Date.now() - previous)/1000.0;
	previous = Date.now();	
    }

    requestAnimationFrame(update);
}

export default {
    CategoryHTMLBuilder: CategoryHTMLBuilder,
    moveElement: moveElement,
    setElementPosition: setElementPosition,
    animationLoop: animationLoop,
};
