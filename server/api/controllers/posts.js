const fs = require('fs');
const path = require('path');
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
      blobbase64: doc.blobbase64,
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
  const { blob, username } = req.body;

  if (!blob || !username) {
      sendJsonResponse(res, 400, { message: 'No file found.'});
      return;
  }

  const post = new Post({
    blobbase64: blob,
    user: username
  });
  
  post.save((error) => {
    sendJsonResponse(res, 200, {'message': 'file created'});
  });
};

module.exports.getClips = function(req, res) {

};
