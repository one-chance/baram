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

const tipSchema = new mongoose.Schema({
  seq: { type: Number, default: 0, required: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writer: { type: writerSchema, required: false },
  viewCount: { type: Number, required: false, default: 0},
  commentIdx: { type: Number, required: false, default: 0},
  commentList: [{ type: commentSchema, required: false, unique: false }]
});

tipSchema.plugin(autoIncrement.plugin, {
  model: "tipBoard",
  field: "seq",
  startAt: 1,
  increment: 1
});

// create new post
tipSchema.statics.create = function (payload) {
  return new this(payload).save();
}

// update post
tipSchema.statics.updateBySeq = function (seq, post) {
  return this.findOneAndUpdate({
    seq: seq
  }, { 
    $set: post 
  }, { 
    upsert: true, 
    new: true 
  });
}

// delete post
tipSchema.statics.deleteBySeq = function (seq, post) {
  return this.deleteOne({seq: seq});
}

// add viewCount
tipSchema.statics.addViewCount = function (seq) {
  return this.findOneAndUpdate({
    seq: seq
  }, { 
    $inc: {viewCount: 1} 
  });
}

// find all
tipSchema.statics.findAll = function () {
  return this.find({});
}

// find by filter
tipSchema.statics.findByFilter = function (filter) {
  return this.find(filter).sort({seq: -1});
}

// Get by seq
tipSchema.statics.findOneBySeq = function (seq) {
  return this.findOne({seq: seq});
}

// Push Comment
tipSchema.statics.createComment = function (postSeq, comment) {
  return this.findOneAndUpdate({
    seq: postSeq
  }, { 
    $inc: { 
      commentIdx: 1 }, 
    $push: { 
      commentList: comment } 
  }, { 
    upsert: true, 
    new: true 
  });
}

// Update Comment
tipSchema.statics.updateComment = function (postSeq, comment) {
  return this.findOneAndUpdate({
    seq: postSeq,
    commentList: {
      $elemMatch: { idx: comment.idx } }
  }, {
    'commentList.$': comment
  }, {
    upsert: true, 
    new: true
  })
}

// Delete Comment
tipSchema.statics.deleteComment = function (postSeq, commentIdx) {
  return this.findOneAndUpdate({
    seq: postSeq,
  }, {
    $pull: {
      commentList: {
        idx: commentIdx
      }
    }
  }, {
    upsert: true, 
    new: true
  })
}

// Push Recomment
tipSchema.statics.createRecomment = function (postSeq, commentIdx, recomment) {
  return this.findOne({
    seq: postSeq,
    commentList: {
      $elemMatch: { idx: commentIdx } }
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

// Update Recomment
tipSchema.statics.updateRecomment = function (postSeq, commentIdx, recommentList) {
  return this.findOneAndUpdate({
    seq: postSeq,
    commentList: {
      $elemMatch: { 
        idx: commentIdx, } }
  }, {
    'commentList.$.recommentList': recommentList
  }, {
    upsert: true, 
    new: true
  })
}

// Delete Recomment
// tipSchema.statics.deleteRecomment = function (postSeq, commentIdx, recommentIdx) {
tipSchema.statics.deleteRecomment = function (postSeq, commentIdx, recommentList) {
  return this.findOneAndUpdate({
    seq: postSeq,
    commentList: {
      $elemMatch: { 
        idx: commentIdx, } }
  }, {
    'commentList.$.recommentList': recommentList
    // 'commentList.$.recommentList': {
    //   $pull: {
    //     recommentList: {
    //       idx: recommentIdx
    //     }
    //   }
    // }
  }, {
    upsert: true, 
    new: true
  })
}

module.exports = mongoose.model("Tip", tipSchema, "tipBoard");
