const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Category = mongoose.model('Category');


const sendJsonResponse = function(res, status, content) {
  res.status(status).json(content);
}


const parsePosts = function(docs, user) {
  const posts = [];

  docs.map(doc => {
    const voteAmount = doc.votes.reduce((a, b) => {
      const value = b.positive ? 1 : -1;
      return a + value;
    }, 0);

    // vote history if user has voted on this post before
    let voteHistory = {
      user: '',
      positive: '',
      _id: ''
    };
    if (user) {
      doc.votes.map(vote => {
        if (vote.user === user) {
          voteHistory = vote;
        }
      })
    }

    posts.push({
      id: doc._id,
      user: doc.user,
      date: doc.date.toUTCString(),
      votes: voteAmount,
      description: doc.description,
      blobbase64: doc.blobbase64,
      category: doc.category,
      voteHistory
    });
  });

  return posts;
}


module.exports.getPosts = function(req, res) {
  // in this controller
  // check if user was passed into params, if so make sure vote history
  // is returned from post parser

  const { user } = req.params;

  Post
    .find({})
    .populate('category')
    .limit(30)
    .sort({ date: -1 })
    .exec((err, posts) => {
      if (err) sendJsonResponse(res, 400, err);
      sendJsonResponse(res, 200, parsePosts(posts, user));
    })
}


module.exports.postClip = function(req, res) {
  const { blob, username, clipName } = req.body;

  if (!blob || !username) {
    sendJsonResponse(res, 400, { message: 'No file found.'});
    return;
  }

  Category
    .findOne({ category: 'v', title: 'Vocals' })
    .exec((err, category) => {
      if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      console.log(category);

      const post = new Post({
        blobbase64: blob,
        user: username,
        description: clipName,
        category: category._id
      });

      post.save((err) => {
        if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        sendJsonResponse(res, 200, {'message': 'file created'});
      });
    });
};


module.exports.getCategories = function(req, res) {
  Category
    .find({})
    .exec((err, categories) => {
      if (err) sendJsonResponse(res, 400, err);
      sendJsonResponse(res, 200, categories);
    });
};


module.exports.getCategoryPosts = function(req, res) {

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


function doAddVote(req, res, post, user, voteValue) {
  if (!post) {
    sendJsonResponse(res, 404, {
      'message': 'id not found'
    });
    return;
  }

  let voteAlreadyExists = false;
  let preexistingVoteIndex;
  // find out if a pre-existing vote by the user exists
  for (var i = 0; i < post.votes.length; i++) {
    const vote = post.votes[i];
    if (vote.user === user) {
      // update the pre-existing vote;
      voteAlreadyExists = true;
      vote.positive = voteValue;
      preexistingVoteIndex = i;
    }
  }

  if (!voteAlreadyExists) {
    // if the user hasn't voted yet, apply the vote
    post.votes.push({
      positive: voteValue,
      user
    });
  }

  // save and send the response to the client
  post.save(
    (err, post) => {
      if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      let vote = post.votes[preexistingVoteIndex ? preexistingVoteIndex : post.votes.length-1]
      arrangedVote = {
        positive: vote.positive,
        user: vote.user,
        postID: post.id
      };
      console.log('a user', arrangedVote.user);
      sendJsonResponse(res, 201, arrangedVote);
    }
  )

}


module.exports.vote = function(req, res) {
  const { id } = req.params;
  const { voteValue } = req.body;
  const user = req.payload.name;

  if (id && user && voteValue.toString() !== '') {
    Post
      .findById(id)
      .select('votes')
      .exec(
        (err, post) => {
          if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }
          doAddVote(req, res, post, user, voteValue);
        }
      )
  } else {
    sendJsonResponse(res, 400, {
      'message': 'Invalid params or post body'
    });
  }
}
