const mongoose = require('mongoose');
const crate = require('mongoose-crate');
const LocalFS = require('mongoose-crate-localfs');

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true }
});

const voteSchema = new mongoose.Schema({
  user: { type: String, required: true },
  positive: { type: Boolean, required: true }
});

const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
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

mongoose.model('Category', categorySchema);
mongoose.model('Post', postSchema);
