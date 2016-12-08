var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
  user: String,
  positive: Boolean
});

var postSchema = new mongoose.Schema({
  user: String,
  date: { type: Date, 'default': Date.now },
  votes: [voteSchema]
});


mongoose.model('Post', postSchema);
