const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
  votes: [voteSchema],
  category: {type: Schema.ObjectId, ref: 'Category'}
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

/*
NOTE: Misc info about models.

Posts store an ID reference to their corresponding Category.

Most important query to realize exists: Post.findOne({}).populate('category')

_______________________________________________________________________________


Current intended default Category objs

{
	"category" : "v",
	"title" : "Vocals"
}
{
	"category" : "s",
	"title" : "Social"
}
{
	"category" : "st",
	"title" : "Shower Thoughts"
}


_______________________________________________________________________________


Example queries/creation for Schema's that have Schema.ObjectId / ref.

var newSubdomain = new SubdomainSchema({name: 'Example Domain'})
newSubdomain.save()

var newCustphone = new CustphoneSchema({
  phone: '123-456-7890',
  subdomain: newSubdomain._id
})
newCustphone.save()

CustphoneSchema.findOne({}).populate('subdomain').exec(function(err, custPhone) {
  // Your callback code where you can access subdomain directly
  //through custPhone.subdomain.name
})

_______________________________________________________________________________


*/
