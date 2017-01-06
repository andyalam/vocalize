const mongoose = require('mongoose');
const crate = require('mongoose-crate');
const LocalFS = require('mongoose-crate-localfs');

const voteSchema = new mongoose.Schema({
  user: String,
  positive: Boolean
});

const postSchema = new mongoose.Schema({
  user: String,
  date: { type: Date, 'default': Date.now },
  blobbase64: { type: String, 'default': '' },
  description: { type: String, 'default': '' },
  votes: [voteSchema]
});

postSchema.plugin(crate, {
  storage: new LocalFS({
    directory: '/uploads'
  }),
  fields: {
    attachment: {}
  }
});


mongoose.model('Post', postSchema);
