const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const writerSchema = new mongoose.Schema({
  key: { type: Number },
  id: { type: String },
  createDateString: { type: String, required: false },
  lastEditDateString: { type: String, required: false }
});

const commentSchema = new mongoose.Schema({
  idx: { type: Number},
  message: { type: String },
  writer: { type: writerSchema },
  recommentIdx: { type: Number, default: 0},
  recommentList: [{
    idx: { type: Number},
    message: { type: String },
    writer: { type: writerSchema },
  }]
});

const freeSchema = new mongoose.Schema({
  seq: { type: Number, default: 0, required: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writer: { type: writerSchema, required: false },
  viewCount: { type: Number, required: false, default: 0},
  commentIdx: { type: Number, required: false, default: 0},
  commentList: [{ type: commentSchema, required: false, unique: false }]
});

freeSchema.plugin(autoIncrement.plugin, {
  model: "freeBoard",
  field: "seq",
  startAt: 1,
  increment: 1
});

// create new post
freeSchema.statics.create = function (payload) {
  return new this(payload).save();
}

// update post
freeSchema.statics.updateBySeq = function (seq, post) {
  return this.findOneAndUpdate({seq: seq}, { $set: post }, { upsert: true, new: true });
}

// delete post
freeSchema.statics.deleteBySeq = function (seq, post) {
  return this.deleteOne({seq: seq});
}

// add viewCount
freeSchema.statics.addViewCount = function (seq) {
  return this.findOneAndUpdate({seq: seq}, { $inc: {viewCount: 1} });
}

// find all
freeSchema.statics.findAll = function () {
  return this.find({});
}

// find by filter
freeSchema.statics.findByFilter = function (filter) {
  return this.find(filter).sort({seq: -1});
}

// Get by seq
freeSchema.statics.findOneBySeq = function (seq) {
  return this.findOne({seq: seq});
}

// Push Comment
freeSchema.statics.createComment = function (postSeq, comment) {
  return this.findOneAndUpdate({seq: postSeq}, { $inc: { commentIdx: 1 }, $push: { commentList: comment } }, { upsert: true, new: true });
}

// Push Recomment
freeSchema.statics.createRecomment = function (postSeq, commentIdx, recomment) {
  return this.findOne({
    seq: postSeq,
    commentList: {
      $elemMatch: { idx: commentIdx }
    }
  }, (err, post) => {
    let idx = 0;
    const comment = post.commentList.filter((comment, _idx) => {
      if (comment.idx === commentIdx) {
        idx = _idx;
        return comment.idx === commentIdx;
      }
    })[0];
    comment.recommentIdx++;
    comment.recommentList.push(recomment);
    post.commentList[idx] = comment;

    post.save();
  });
}

module.exports = mongoose.model("Free", freeSchema, "freeBoard");
