/**
 * HTML manipulation.
 * @module
 **/

/**
 * Manipulate the DOM of the movie modal.
 * @class
 **/
class Modal {
    /**
     * Hide the modal by default and bind close button click event.
     * @constructor
     **/
    constructor() {
	const element = document.querySelector('.movie_info__header__close');
	element.addEventListener('click', _ => {
	    this.hide();
	});

	this._root = document.querySelector('.movie_info');
	this._is_visible = false;
    }

    /**
     * Shows the modal for a given movie.
     * @method
     * @param {Movie} movie - The movie to show in the modal.
     **/
    show(movie) {
	if (this._is_visible === false) {
	    this.update(movie);
	    this._is_visible = true;
	    this._root.style.display = 'inline-block';
	}
    }

    /**
     * Hide the modal.
     * @method
     **/
    hide() {
	if (this._is_visible === true) {
	    this._is_visible = false;
	    this._root.style.display = 'none';
	}
    }

    /**
     * Update the modal DOM to display the informations of 
     * a given movie.
     * @method
     * @param {Movie} movie - The movie from where to extract the modal
     * informations.
     **/
    update(movie) {
	const prefix = '#movie_info__content__';
	
	const elements = {
	    'title': document.querySelector('.movie_info__header__title'),
	    'img': document.querySelector('.movie_info__content img'),
	    'genres': document.querySelector(prefix + 'genres ul'),
	    'release': document.querySelector(prefix + 'release_date'),
	    'rated': document.querySelector(prefix + 'rated'),
	    'imdb': document.querySelector(prefix + 'imdb'),
	    'directors': document.querySelector(prefix + 'directors ul'),
	    'actors': document.querySelector(prefix + 'actors ul'),
	    'duration': document.querySelector(prefix + 'duration'),
	    'countries': document.querySelector(prefix + 'countries ul'),
	    'box-office': document.querySelector(prefix + 'box_office'),
	    'summary': document.querySelector(prefix + 'summary')
	};
	
	console.log(prefix + 'release_date');
	elements['title'].innerText = movie.title;
	elements['img'].setAttribute('src', movie.image_url);
	
	this.buildList(elements['genres'], movie.genres);    
	elements['release'].innerText = movie.release_date.toDateString();
	elements['rated'].innerText = movie.rated;
	elements['imdb'].innerText = movie.imdb_score;
	this.buildList(elements['directors'], movie.directors);
	this.buildList(elements['actors'], movie.actors);


	{
	    const hours = Math.floor(movie.duration/60);
	    const mins = movie.duration % 60;
	    let value;

	    if (movie.duration < 60) {
		value = `${movie.duration} min`;
	    } else {
		value = `${hours}h${mins}`;

		if (hours < 10) {
		    value = '0' + value;
		}
	    }
	    
	    elements['duration'].innerText = value;
	}

	
	this.buildList(elements['countries'], movie.countries);
	elements['box-office'].innerText = movie.box_office;
	elements['summary'].innerText = movie.long_description;
    }

    /**
     * Build HTML list items under an unordered list.
     * @method
     * @param {Element} element - The DOM unordered list element.
     * @param {array} values - The inner texts of the list items.
     **/
    buildList(element, values) {
	for (const val of values) {
	    const li = document.createElement('li');
	    li.innerText = val;
	    if (val !== values[values.length - 1]) {
		li.innerText += ',';
	    }
	    element.appendChild(li);
	}
    }
}

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
	this._modal = null;
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
     * Bind a modal to the category which will be built.
     * @method
     * @param {Modal} modal - The modal that must be used during the
     * HTML generation of the category.
     **/
    bindModal(modal) {
	this._modal = modal;
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
	link.setAttribute('href', '');
	
	link.addEventListener('click', event => {
	    event.preventDefault();
	    if (this._modal !== null) {
		this._modal.show(movie);
	    }
	});
	
	let img = document.createElement('img');
	img.setAttribute('src', movie.image_url);

	link.appendChild(img);
	li.appendChild(link);

	return li;
    }
}

/**
 * Manipulate the best movie panel DOM elements.
 * @class
 **/
class BestMovieHTMLBuilder {
    /**
     * @constructor
     * @param {Movie} movie - The movie rendered inside the best movie
     * panel.
     **/
    constructor(movie) {
	this._movie = movie;
    }

    /**
     * Bind a modal to the best movie panel.
     * @method
     * @param {Modal} modal - The modal that must be used during the
     * HTML generation of the best movie image.
     **/
    bindModal(modal) {
	this._modal = modal;
    }
    
    /**
     * Manipulate the best movie panel DOM elements.
     * @method
     **/
    build() {
	const url = this._movie.image_url;

	const best_movie = document.querySelector('.best_movie');
	const best_movie_description = document.querySelector('.best_movie__description');
	best_movie_description.innerText = this._movie.long_description;
	
	best_movie.style.backgroundImage = "url(" + url + "), linear-gradient(to right, black, transparent)";	
	best_movie.style.backgroundRepeat = 'no-repeat';
	best_movie.style.backgroundPosition = 'center';

	const img_link = document.querySelector('.best_movie__image');
	const img = document.querySelector('.best_movie__image img');

	if (this._modal !== null) {
	    best_movie.style.cursor = 'pointer';
	    
	    best_movie.addEventListener('click', _ => {
		this._modal.show(this._movie);
	    });
	}
	
	img.setAttribute('src', url);
	
	const title = document.querySelector('.best_movie__title');
	title.innerText = this._movie.title;
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
 * @param {function} next - The callback called when the animation is stopped.
 **/
function animationLoop(callback, next = function() {}) {

    let previous = null;
    let elapsed = 0.0;
    
    function update(time) {
	if (previous === null) { previous = Date.now(); }
	
	if (!callback(elapsed)) {
	    next();
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
    BestMovieHTMLBuilder: BestMovieHTMLBuilder,
    Modal: Modal,
    moveElement: moveElement,
    setElementPosition: setElementPosition,
    animationLoop: animationLoop
};
