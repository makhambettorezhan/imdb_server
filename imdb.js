
const getMovie = (title, callback) => {
	var unirest = require("unirest");

var req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");


req.headers({
	"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
	"x-rapidapi-key": "8ed411b6c6msh6da23a5719ea603p154f6fjsn10c332c3e72a"
});


	req.query({
		"i": "tt4154796",
		"r": "json",
		"t": title
	});

	req.end(res => {
		if (res.error) throw new Error(res.error);
		callback(res.body)
	});
};

module.exports = {
	getMovie
};
