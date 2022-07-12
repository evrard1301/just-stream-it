let ctx = {
    CarrouselView: class {
	constructor(movies, prev = null, next = null) {
	    this.movies = movies;
	    this._prev = prev;
	    this._next = next;
	}

	prev() {
	    return this._prev;
	}

	next() {
	    return this._next;
	}
    },

    Carrousel: class {	
	constructor(size = 7) {
	    this._movies = [];
	    this._position = 0;
	}

	get position() { return this._position; }	
	set position(position) { this._position = position; }

	request_view(count) {
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

	    return new ctx.CarrouselView(res, prev, next);
	}
	
	move_left() {
	    this._position -= 1;

	    if (this._position < 0) {
		this._position = 0;
	    }		
	}

	move_right() {
	    this._position += 1;

	    if (this._position >= this._movies.length) {
		this._position = this._movies.length - 1;
	    }
	}
	
	add(movie) {
	    this._movies.push(movie);
	}
	
	count() {
	    return this._movies.length;
	}
    }
};

export default ctx;
