var express = require('express');
var router = express.Router();

var ctrlPosts = require('../controllers/posts');
var ctrlAuth =require('../controllers/authentication');

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


router.get('/posts', ctrlPosts.getPosts);
router.post('/posts', ctrlPosts.postPost);

module.exports = router;
