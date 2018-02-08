var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: '961388854249971714-rVip7RrYCAb6a2ZOL19HS9bwX2tyJRU',
  access_token_secret: 'yfKc0o3xHDd5XYkRWJyjboNgllb6ttqVHjCk4LiiVXqiE'
});

console.log(client.options)
console.log(process.env)
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});