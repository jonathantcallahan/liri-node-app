require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('spotify');

var keys = require('./keys.js')

console.log(keys.twitter)

var spotify = new Spotify(keys.spotify)
var twitter = new Twitter(keys.twitter)

var command = process.argv[2];
console.log(command)