const imdb = require('./imdb');

imdb.getMovie('Avengers: Endgame', (movies) => {
	console.log(movies);
});