const express = require('express');
const imdb = require('./imdb');
const bodyParser = require('body-parser');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

const popularRouter = require('./routes/popularRouter');

//connect to database using mongoose
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/movies';

const connect = mongoose.connect(url);
connect.then(db => {
    console.log('Connected correctly to server');
}, err => console.log(err));

const Populars = require('./models/populars');

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

	var imdb_250 = fs.readFileSync('./imdb_250.txt').toString('utf8');
	var movies_list =  imdb_250.split("\n"); movies_list.pop();


	var random_movie_index = Math.floor(Math.random() * movies_list.length);
	imdb.getMovie(movies_list[random_movie_index], movies => {
        
        Populars.create({
            title: movies.Title,
            year: movies.Year,
            genre: movies.Genre,
        })
        .then(movie => {
            console.log(movie);
        }, (err) => console.log(err));
        
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

app.use('/populars', popularRouter);

app.listen(port, () => {
	console.log('Server is up for port', port);
});