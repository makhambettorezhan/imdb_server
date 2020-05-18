const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popularSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
});

const Populars = mongoose.model('Popular', popularSchema);

module.exports = Populars;