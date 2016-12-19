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
  // TODO: when adding auth replace user here with actual user
  const user = 'testuser';
  const { payload } = req.body;

  if (!payload) {
      sendJsonResponse(res, 400, { message: 'No file found.'});
      return;
  }

  const post = new Post();

  // decode
  const buf = new Buffer(req.body.payload.blob, 'base64');

  fs.writeFile(`uploads/${user}/file.ogg`, buf, function(err) {
    if(err) {
      console.log("err", err);
    } else {
      sendJsonResponse(res, 200, {'message': 'file created'});
      return;
    }
  })


  /*post.attach('attachment', { path }, (error) => {
    // attachment is now attached and post.attachment is populated e.g.:
    // post.attachment.url

    // don't forget to save it..
    post.save((error) => {
      // post is now persisted
    })
  })*/
};
