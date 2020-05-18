const express = require('express');

const Populars = require('../models/populars');

const popularRouter = express.Router();

popularRouter.get('/', (req, res, next) => {
    res.write('Use /populars/show to print all the data in \'movies\' database\n\n');
    res.write('Use /populars/show/movieId to fetch the movie with id of movieId in \'movies\' database\n\n');
    res.write('Use /populars/del to delete all the movies in \'movies\' database\n\n');
    res.end('Use /populars/show/movieId to fetch the movie with id of movieId in \'movies\' database');
});


popularRouter.get('/show', (req, res, next) => {
    Populars.find({})
    .then(movies => {
        res.statusCode = 200;
        res.send(movies);
    }, err => console.log(err));    
});


popularRouter.get('/show/:popularId', (req, res, next) => {
    Populars.findById(req.params.popularId)
    .then(movie => {
        res.statusCode = 200;
        res.send(movie);
    }, err => console.log(err));
});


//not works as .delete() but still kinda ok
popularRouter.get('/del', (req, res, next) => {
    Populars.remove({})
    .then(() => {
        res.end('All movies are deleted');
    });
});
//not works as .delete() but still kinda ok
popularRouter.get('/del/:popularId', (req, res, next) => {
    Populars.findByIdAndRemove(req.params.popularId)
    .then(movie => {
        res.statusCode = 200;
        res.send(movie);
    }, err => console.log(err));
});


module.exports = popularRouter;