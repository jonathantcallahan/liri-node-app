require("dotenv").config();
//What does .config() do?

var Twitter = require('twitter');
var Spotify = require('spotify');

var command = process.argv[2];
console.log(command)


var keys = require('./keys.js')

console.log(keys.twitter)

//var spotify = new Spotify(keys.spotify)
//console.log(spotify)
var twitter = new Twitter(keys.twitter)
//How does the twitter constructor work
console.log('full twitter console log', twitter)

var command = process.argv[2];
console.log(command)


if(command==='my-tweets'){
    var params = {screen_name: 'Account for Class'}
    //not sure how get works
    //not sure how the parameters are being passed into the function
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
       
        
        if(error){console.log(error)}
        else {
            for(var i = 0; i<tweets.length; i++){
                console.log(tweets[i].text)
            }
        }; 

    });
}