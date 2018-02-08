console.log('this is loaded')
 
var Twitter = require('twitter');
console.log(Twitter)
var Spotify = require('spotify');
console.log(Spotify)


exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: '961388854249971714-rVip7RrYCAb6a2ZOL19HS9bwX2tyJRU',
  access_token_secret: 'yfKc0o3xHDd5XYkRWJyjboNgllb6ttqVHjCk4LiiVXqiE'
};

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}


