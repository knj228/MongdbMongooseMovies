// db.js
var mongoose = require('mongoose');

// my schema goes here!


const MovieSchema = new mongoose.Schema({
	title: String,
	director: String,
  year: Number,
	id: String,
});

mongoose.model('Movie', MovieSchema);

mongoose.connect('mongodb://localhost/hw05');
