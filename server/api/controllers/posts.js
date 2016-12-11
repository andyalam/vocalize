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
  if (!req.files) {
      sendJsonResponse(res, 400, { message: 'No files found.'});
      return;
  }

  const post = new Post();
  const recordingPath = path.join(process.env.PWD, '/uploads/file.jpg');
  const recording = req.files.recording;

  recording.mv(recordingPath, function(err) {
    if (err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    else {
      res.send('File uploaded!');
    }
  });


  /*post.attach('attachment', { path }, (error) => {
    // attachment is now attached and post.attachment is populated e.g.:
    // post.attachment.url

    // don't forget to save it..
    post.save((error) => {
      // post is now persisted
    })
  })*/
};
