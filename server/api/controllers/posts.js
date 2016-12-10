var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}

var parsePosts = function(docs) {
  var posts = [];

  docs.map(doc => {
    posts.push({
      user: doc.user,
      date: Date(doc.date),
      votes: doc.votes
    });
  });

  return posts;
}

module.exports.getPosts = function(req, res) {
  Post.find({}, (err, posts) => {
    if (err) sendJsonResponse(res, 400, err);
    sendJsonResponse(res, 200, parsePosts(posts));
  });
}
