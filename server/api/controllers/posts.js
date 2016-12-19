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
  const { payload } = req.body;

  if (!payload) {
      sendJsonResponse(res, 400, { message: 'No file found.'});
      return;
  }

  const post = new Post();
  const recordingPath = path.join(process.env.PWD, '/uploads/file.wav');
  //const recording = req.files.recording;
  console.log(payload);
  var file = new File([payload.blob], filename, {type: payload.blob.contentType, lastModified: Date.now()});
  console.log(file);
  sendJsonResponse(res, 200, file);

  //http://stackoverflow.com/questions/23986953/blob-saved-as-object-object-nodejs

  /*
  { name: '11176317_426886134149031_201767005_n.jpg',
data: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff ed 00 6c 50 68 6f 74 6f 73 68 6f 70 20 33 2e 30 00 38 42 49 4d 04 04 00 00 00 00 00 4f ... >,
encoding: '7bit',
mimetype: 'image/jpeg',
mv: [Function: mv] }

  */

  recording.mv(recordingPath, function(err) {
    if (err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    else {
      sendJsonResponse(res, 200, {'message': 'success'});
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
