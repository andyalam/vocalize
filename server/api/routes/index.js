const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
// pass auth to any routes that require auth.
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

const ctrlPosts = require('../controllers/posts');
const ctrlAuth =require('../controllers/authentication');

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


router.get('/posts', ctrlPosts.getPosts);
router.post('/posts', auth, ctrlPosts.postClip);
router.get('/:user/clips', ctrlPosts.getClips);
router.put('/clips/:id', auth, ctrlPosts.updateClip);
router.delete('/clips/:id', auth, ctrlPosts.deleteClip);
router.post('/clips/:id/vote', auth, ctrlPosts.vote);

module.exports = router;
