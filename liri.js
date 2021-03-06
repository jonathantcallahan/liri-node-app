require("dotenv").config();
//What does .config() do?

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request')
var inquirer = require('inquirer');
var fs = require('fs');

var command = process.argv[2];
var search = process.argv[2];
// console.log(command)


var keys = require('./keys.js')  
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
})

// var spotifyApi = new SpotifyWebApi();

// console.log(keys.spotify)

//var spotify = new Spotify(keys.spotify)
//console.log(spotify)
var twitter = new Twitter(keys.twitter)
//How does the twitter constructor work

// var spotify = new Spotify(keys.spotify)

let searchTerm;

inquirer.prompt([
    {
        type: 'list',
        message: 'What are you looking for?',
        choices: ['Tweets','Movie Data','Song Data'],
        name: 'search'
    }
]).then(function(answer){
    searchTerm = answer.search;
    if(answer.search==='Tweets'){
        tweets()
    } else {
        inquirer.prompt([
            {
            type: 'input',
            name: 'query',
            message: 'What title you like to search for?'    
            }
        ]).then(function(answer){
            console.log(answer.search)
            if(searchTerm==='Movie Data'){
                console.log(answer.query)
                movie(answer.query)
            }
            if(searchTerm==='Song Data'){
                spotifySearch(answer.query)
            }
        })
    }
})

function logResponse(content){
    fs.appendFile('log.txt', content, function(err){
    })
}

function tweets(){
    var params = {screen_name: 'Account for Class'}
    //not sure how get works
    //not sure how the parameters are being passed into the function
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
       
        
        if(error){console.log(error)}
        else {
            for(var i = 0; i<tweets.length; i++){
                console.log(`* ${tweets[i].created_at} Tweet: ${tweets[i].text}`)
                logResponse(tweets[i].text)
             
            }
        }; 

    });
}


function spotifySearch(search){
    spotify.search(
        {
          type: "track",
          query: search
        },
        function(err, data) {
          if (err) {
            console.log("Error occurred: " + err);
            return;
          }
    
          var songs = data.tracks.items;
          console.log(songs);
        }
      );
}


// function spotifySearch(search){ 
//     spotify
//   .search({ 
//     type: 'track', 
//     query: 'All the Small Things' 
//     })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// }


function movie(search){
    request(`http://www.omdbapi.com/?t=${search}&apikey=trilogy`, function (error, response, body){
    if(error){
        console.log(error)
    } else { 
        var movie = JSON.parse(body)
        console.log(`### ${movie.Title} ### 
            \n - Released in ${movie.Year} 
            \n - IMDB Rating: ${movie.imdbRating} 
            \n - Rotten Tomatoes Rating: ${movie.Ratings[1].Value}
            \n - Country of Production: ${movie.Country}
            \n - Language: ${movie.Language}
            \n - Plot: ${movie.Plot}
            \n - Actors: ${movie.Actors}`)
        logResponse(JSON.stringify(movie))
    }
});
}