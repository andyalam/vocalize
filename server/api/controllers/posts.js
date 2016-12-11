const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const sendJsonResponse = function(res, status, content) {
  res.status(status).json(content);
}

const parsePosts = function(docs) {
  const posts = [];

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

module.exports.postPost = function(req, res) {
  const post = new Post();

  // TODO: save file to server and then save the correct path
  //       to its corresponding document in the db.
  const path = '';
  post.attach('attachment', { path }, (error) => {
      // attachment is now attached and post.attachment is populated e.g.:
      // post.attachment.url

      // don't forget to save it..
      post.save((error) => {
          // post is now persisted
      })
  })
};
