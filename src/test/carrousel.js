import assert from 'assert';
import carrousel from '../js/carrousel.js';
import movie from '../js/movie.js';

describe('carrousel', function() {
    describe('add new element', function() {
	let my_carrousel = new carrousel.Carrousel();
	
	it('should increment the carrousel counter', function() {
	    assert.equal(0, my_carrousel.count());
	    my_carrousel.add(new movie.Movie('my movie'));
	    assert.equal(1, my_carrousel.count());
	});
    });

    describe('move the carrousel to the left', function() {
	let my_carrousel = new carrousel.Carrousel();
	my_carrousel.add(new movie.Movie('my movie I'));
	my_carrousel.add(new movie.Movie('my movie II'));
	my_carrousel.add(new movie.Movie('my movie III'));
	
	describe('at first position', function() {
	    it('should not change the current position', function() {
		assert.equal(0, my_carrousel.position);
		my_carrousel.move_left();
		assert.equal(0, my_carrousel.position);
	    });
	});

	describe('at second position', function() {
	    it('should change the current position', function() {
		my_carrousel.position = 1;
		my_carrousel.move_left();
		assert.equal(0, my_carrousel.position);
	    });
	});
    });

    describe('move the carrousel to the right', function() {
	let my_carrousel = new carrousel.Carrousel();
	my_carrousel.add(new movie.Movie('my movie I'));
	my_carrousel.add(new movie.Movie('my movie II'));
	my_carrousel.add(new movie.Movie('my movie III'));
	
	describe('at last position', function() {
	    it('should not change the current position', function() {
		my_carrousel.position = 2;
		my_carrousel.move_right();
		assert.equal(2, my_carrousel.position);
	    });
	});

	describe('at penultimate position', function() {
	    it('should change the current position', function() {
		my_carrousel.position = 1;
		my_carrousel.move_right();
		assert.equal(2, my_carrousel.position);
	    });
	});
    });

    describe('get current movies', function() {
	describe('when the carrousel is empty', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    
	    it('should return an empty array', function() {
		assert.equal(0, my_carrousel.request_view(2).movies.length);
	    });
	});

	describe('when the carrousel has less movies than requested size', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    my_carrousel.add(new movie.Movie('First Movie'));
	    my_carrousel.add(new movie.Movie('Second Movie'));
	    my_carrousel.add(new movie.Movie('Third Movie'));
	    
	    const currents = my_carrousel.request_view(4);

	    it('should return less movies than requested size', function() {
		assert.equal(3, currents.movies.length);
	    });

	    it('should contain all the movies', function() {
		assert.equal('First Movie', currents.movies[0].title);
		assert.equal('Second Movie', currents.movies[1].title);
		assert.equal('Third Movie', currents.movies[2].title);
	    });	    
	});

	describe('when the carrousel has not been moved', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    my_carrousel.add(new movie.Movie('First Movie'));
	    my_carrousel.add(new movie.Movie('Second Movie'));
	    my_carrousel.add(new movie.Movie('Third Movie'));
	    
	    const currents = my_carrousel.request_view(2);

	    it('should contain the requested movies', function() {
		assert.equal(2, currents.movies.length);
		assert.equal('First Movie', currents.movies[0].title);
		assert.equal('Second Movie', currents.movies[1].title);
	    });	    
	});

	describe('when the carrousel has been moved right', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    my_carrousel.add(new movie.Movie('First Movie'));
	    my_carrousel.add(new movie.Movie('Second Movie'));
	    my_carrousel.add(new movie.Movie('Third Movie'));

	    my_carrousel.move_right();
	    
	    const currents = my_carrousel.request_view(2);

	    it('should contain the requested movies starting by the second one', function() {
		assert.equal(2, currents.movies.length);
		assert.equal('Second Movie', currents.movies[0].title);
		assert.equal('Third Movie', currents.movies[1].title);
	    });	    
	});
    });
    
    describe('get previous movie', function() {
	describe('when the carrousel has not been moved', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    
	    my_carrousel.add(new movie.Movie('First Movie'));
	    my_carrousel.add(new movie.Movie('Second Movie'));
	    my_carrousel.add(new movie.Movie('Third Movie'));

	    const currents = my_carrousel.request_view(3);
	    
	    it('should return null', function() {
		assert.equal(null, currents.prev());
	    });
	});

	describe('when the carrousel has been moved right', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    
	    my_carrousel.add(new movie.Movie('First Movie'));
	    my_carrousel.add(new movie.Movie('Second Movie'));
	    my_carrousel.add(new movie.Movie('Third Movie'));
	    my_carrousel.move_right();

	    const currents = my_carrousel.request_view(3);
	    
	    it('should return the first movie', function() {
		assert.equal('First Movie', currents.prev().title);
	    });
	});
    });

    describe('get next movie', function() {
	describe('when the carrousel has not been moved', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    
	    my_carrousel.add(new movie.Movie('First Movie'));
	    my_carrousel.add(new movie.Movie('Second Movie'));
	    my_carrousel.add(new movie.Movie('Third Movie'));

	    const currents = my_carrousel.request_view(2);
	    
	    it('should return the last', function() {
		assert.equal('Third Movie', currents.next().title);
	    });
	});

	describe('when the carrousel has been moved right', function() {
	    let my_carrousel = new carrousel.Carrousel();
	    
	    my_carrousel.add(new movie.Movie('First Movie'));
	    my_carrousel.add(new movie.Movie('Second Movie'));
	    my_carrousel.add(new movie.Movie('Third Movie'));
	    my_carrousel.move_right();

	    const currents = my_carrousel.request_view(2);
	    
	    it('should return null', function() {
		assert.equal(null, currents.next());
	    });
	});
    });

});
