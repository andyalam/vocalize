var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.getPosts = function(req, res) {
  const posts = [
    {
      user: 'randomuser1435',
      audio: 'audio file here',
      date: 'date time',
      upvotes: 12,
      downvotes: 5
    },
    {
      user: 'randomuser2756',
      audio: 'audio file here',
      date: 'date time',
      upvotes: 12,
      downvotes: 5
    },
    {
      user: 'randomuser312',
      audio: 'audio file here',
      date: 'date time',
      upvotes: 12,
      downvotes: 5
    }
  ];

  console.log(res.headers);
  sendJsonResponse(res, 200, posts);
}
