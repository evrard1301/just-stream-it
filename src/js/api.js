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
	    results.push(this.createMovieFromJSON(result));
	}

	if (results.length < count) {
	    await this.findByGenre(name, count, json_movie.next, results);
	}
	
	return results.slice(0, count);
    }

    async findBestMovie() {
	let data = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');
	let json_movie = await data.json();
	return this.createMovieFromJSON(json_movie.results[0]);
    }
    
    createMovieFromJSON(json_movie) {
	console.log(json_movie.image_url);
	return new movie.Movie(json_movie.title, new URL(json_movie.image_url));
    }
}


export default {
    MovieFetcher: MovieFetcher
}
