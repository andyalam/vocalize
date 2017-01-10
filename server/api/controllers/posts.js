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
      id: doc._id,
      user: doc.user,
      date: doc.date.toUTCString(),
      votes: doc.votes,
      description: doc.description,
      blobbase64: doc.blobbase64
    });
  });

  return posts;
}

module.exports.getPosts = function(req, res) {
  Post
    .find({})
    .limit(30)
    .sort({ date: -1 })
    .exec((err, posts) => {
      if (err) sendJsonResponse(res, 400, err);
      sendJsonResponse(res, 200, parsePosts(posts));
    })
}

module.exports.postPost = function(req, res) {
  const { blob, username, clipName } = req.body;

  console.log('clipname', clipName);

  if (!blob || !username) {
    sendJsonResponse(res, 400, { message: 'No file found.'});
    return;
  }

  const post = new Post({
    blobbase64: blob,
    user: username,
    description: clipName
  });

  post.save((error) => {
    sendJsonResponse(res, 200, {'message': 'file created'});
  });
};

module.exports.getClips = function(req, res) {
  const { user } = req.params;

  Post
    .find({ user })
    .sort({ date: -1 })
    .exec((err, posts) => {
      if (err) sendJsonResponse(res, 400, err);
      sendJsonResponse(res, 200, parsePosts(posts));
    })
};

module.exports.updateClip = function(req, res) {
  const { id } = req.params;
  const { clipName } = req.body;
  console.log('clipName', clipName);

  if (id) {
    Post
      .findById(id)
      .exec((err, post) => {

        if (!post) {
          sendJsonResponse(res, 404, {
            'message': 'Post not found'
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        post.description = clipName;
        post.save((err, post) => {
          err ? sendJsonResponse(res, 404, err) : sendJsonResponse(res, 200, post);
        });
      });
  } else {
    sendJsonResponse(res, 400, {
      'message': 'No id provided'
    });
  }
}

module.exports.deleteClip = function(req, res) {
  const { id } = req.params;

  if (id) {
    Post
      .findByIdAndRemove(id)
      .exec((err, post) => {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        // Return ID here for client to handle deletion locally if needed
        sendJsonResponse(res, 200, { 'id': id });
      });
  } else {
    sendJsonResponse(res, 400, {
      'message': 'No id provided'
    });
  }
}
