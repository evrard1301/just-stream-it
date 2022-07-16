import movie from './movie.js';

class MovieFetcher {
    constructor() {
    }

    async findByGenre(name, count=7, url = null, results = []) {
	if (url === null) {
	    url = `http://localhost:8000/api/v1/titles/?genre=${name}&sort_by=-imdb_score`;
	}
	
	const data = await fetch(url);
	const json_movie = await data.json();

	for (let result of json_movie.results) {
	    const movie_result = await this.findByID(result.id);
	    results.push(this.createMovieFromJSON(movie_result));
	}

	if (results.length < count) {
	    await this.findByGenre(name, count, json_movie.next, results);
	}
	
	return results.slice(0, count);
    }

    async findByID(id) {
	const url = `http://localhost:8000/api/v1/titles/${id}`;
	const data = await fetch(url);
	const result = await data.json();
	
	return result;
    }
    
    async findBestMovie() {
	const data = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');
	const json = await data.json();
	const json_movie = await this.findByID(json.results[0].id);
	return this.createMovieFromJSON(json_movie);
    }
    
    createMovieFromJSON(json_movie) {
	return new movie.Movie(json_movie.title,
			       new URL(json_movie.image_url),
			       json_movie.genres,
			       json_movie.date_published,
			       json_movie.rated,
			       json_movie.imdb_score,
			       json_movie.directors,
			       json_movie.actors,
			       json_movie.duration,
			       json_movie.countries,
			       json_movie.reviews_from_critics,			       
			       json_movie.description,
			       json_movie.long_description);
    }
}


export default {
    MovieFetcher: MovieFetcher
}
