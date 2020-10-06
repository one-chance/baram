const mongoose = require('mongoose');
const autoIncrement = requrie('mongoose-auto-increment');

const writerSchema = new mongoose.Schema({
  creator: { type: String },
  createDateString: { type: String },
  editer: { type: String },
  lastEditDateString: { type: String },
});

const commentSchema = new mongoose.Schema({
  seq: { type: Number },
  id: { type: String },
  message: { type: String },
  writer: writerSchema,
  recommentList: {
    seq: { type: Number },
    id: { type: String },
    message: { type: String },
    writer: writerSchema,
  }
});

commentSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "seq",
  startAt: 1,
  increment: 1
});

const postSchema = new mongoose.Schema({
  seq: { type: Number, auto: true, unique: true },
  section: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writer: writerSchema,
  viewCount: { type: Number, required: true },
  commentList: [
    commentSchema
  ]
});

postSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "seq",
  startAt: 1,
  increment: 1
});

// create new post
postSchema.statics.create = function (payload) {
  return new this(payload).save();
}

// find all
postSchema.statics.findAll = function () {
  return this.find({});
}

// Get by seq
postSchema.statics.findOneBySeq = function (postSeq) {
  return this.findOne({seq: postSeq});
}

// Push Comment
postSchema.statics.createComment = function (postSeq, payload) {
  return this.findOneAndUpdate({seq: postSeq}, { $push: { commentList: payload } }, { upsert: true, new: true });
}

// Push Recomment
postSchema.statics.createRecomment = function (postSeq, commentSeq, payload) {
  return this.findOneAndUpdate({
      seq: postSeq, 
      commentListseq: {
        seq: commentSeq
      }
    }, { $push: { recommentList: payload }}, { upsert: true, new: true});
}

module.exports = mongoose.model("Post", postSchema, "post");
