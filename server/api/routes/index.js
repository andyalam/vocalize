var express = require('express');
var router = express.Router();

var ctrlPosts = require('../controllers/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', ctrlPosts.getPosts);
router.post('/posts', ctrlPosts.postPost);

module.exports = router;
