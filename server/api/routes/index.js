const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
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
router.post('/posts', ctrlPosts.postPost);

module.exports = router;
