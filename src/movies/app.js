// app.js
const express = require('express');
require( './db' );
const path = require("path");
const session = require('express-session');
var uuid = require('node-uuid');
const cookied = require('../cookied/./cookied.js');
const app = express();
var mongoose = require('mongoose');
const MovieModel = mongoose.model('Movie');
const bodyParser = require('body-parser');
const colorOptions = require('../cookied/./colors.js');
const sesh = {
	secret: 'secret for signing session id',
	saveUninitialized: true,
	resave: true,
  cookie: { secure: false },
};
app.use(session(sesh));


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.redirect('/movies')
});

app.get('/movies', function(req, res) {
  var query = req.query.director;
  console.log("THIS is query: "+query)
  MovieModel.find(function(err, m, count) {
    if(err) {
      res.send(err);
    }
    if(query !== undefined){
      var m = m.filter(function(obj) {
         return obj["director"] === query;
       });
    }
    console.log('MM: ', m);
    res.render( 'movies.hbs', {
			Movies: m
    });
  });
});

app.get('/movies/add', function(req, res) {
    res.render( 'add.hbs');
  });

app.get('/mymovies', function(req, res) {
  MovieModel.find({ id: req.session.id },function(err, my, count) {
    if(err) {
      res.send(err);
    }
    console.log('MM: ', my);
    res.render( 'mymovies.hbs', {
      Movies: my
    });
  });
});
app.post('/movies/add', function(req, res) {
  let sesh = req.session;
  const seshId = sesh.id;
  	new MovieModel({
  		title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      id:  seshId,
  	}).save(function(err, movie, count){
  		res.redirect('/movies');
  	});
});

app.listen(3000);
