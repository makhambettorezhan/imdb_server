const express = require('express');
const hbs = require('hbs');
const imdb = require('./imdb');
const bodyParser = require('body-parser');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Section'
	});
});

app.post('/submit', (req, res) => {
	var title = req.body.title;

	imdb.getMovie(title, movie => {
		res.render('submit.hbs', {
			title: movie.Title,
			year: movie.Year,
			imdbRating: movie.imdbRating,
			imdbVotes: movie.imdbVotes,
			poster: movie.Poster,
			genre: movie.Genre
		});
	});
});

app.get('/game', (req, res) => {
	var movies_list = ['The Shawshank Redemption', 'Avengers: Endgame', 'The Godfather', 'Pulp Fiction', 'Forrest Gump', 'Jurassic Park', 'Back to the Future', 'Catch Me If You Can', 'Jaws', 'Saw'];

	var temp;

	temp = Math.floor(Math.random() * movies_list.length);
	imdb.getMovie(movies_list[temp], movies => {
		res.render('game.hbs', {
			pageTitle: 'Guess a Movie Section',
			title: movies.Title,
			poster: movies.Poster
		});
	});
});

app.post('/submitGame', (req, res) => {
	var title = req.body.title;
	var correctAnswer = req.body.correctAnswer;
	var message;
	var score = fs.readFileSync('scores.txt');

	if(correctAnswer.toLowerCase() == title.toLowerCase()) {
		message = 'Congratulations! You Won!';
		score++;
	} else {
		message = "Game Over. You Lost.";
		score = 0;
	}

	fs.writeFileSync('scores.txt', score);


	res.render('submitGame.hbs', {
		msg: message,
		score,
		userChoice: title,
		correctAnswer
	});
});

app.get('/game/:id', (req, res) => {
	var count = 0;
	var movies_list = ['The Shawshank Redemption', 'Avengers: Endgame', 'The Godfather', 'Pulp Fiction', 'Forrest Gump', 'Jurassic Park', 'Back to the Future', 'Catch Me If You Can', 'Jaws', 'Saw'];


	imdb.getMovie(movies_list[req.params.id], movie => {
		res.render('submit.hbs', {
			title: movie.Title,
			year: movie.Year,
			imdbRating: movie.imdbRating,
			imdbVotes: movie.imdbVotes,
			poster: movie.Poster,
			genre: movie.Genre
		});
	});
});

app.listen(port, () => {
	console.log('Server is up for port', port);
});