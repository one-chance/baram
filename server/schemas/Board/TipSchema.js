const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const writerSchema = new mongoose.Schema({
  key: { type: Number },
  id: { type: String },
  createDate: { type: Date, required: false },
  lastEditDate: { type: Date, required: false }
});

const commentSchema = new mongoose.Schema({
  idx: { type: Number},
  message: { type: String },
  writer: { type: writerSchema },
  recommentCount: { type: Number, default: 0},
  recommentList: [{
    idx: { type: Number},
    message: { type: String },
    writer: { type: writerSchema },
    isDeleted: { type: Boolean, default: false }
  }],
  isDeleted: { type: Boolean, default: false }
});

const tipSchema = new mongoose.Schema({
  seq: { type: Number, default: 0, required: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writer: { type: writerSchema, required: true },
  viewCount: { type: Number, required: false, default: 0},
  commentCount: { type: Number, required: false, default: 0},
  commentList: [{ type: commentSchema, required: false, unique: false }],
  recommendUserList: [{ type: String, required: false }],
  imgs: [{type: String}]
});

tipSchema.plugin(autoIncrement.plugin, {
  model: "tipBoard",
  field: "seq",
  startAt: 1,
  increment: 1
});

// NOTE create new post
tipSchema.statics.create = function (payload) {
  return new this(payload).save();
}

// NOTE update post
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

// NOTE delete post
tipSchema.statics.deleteBySeq = function (seq, post) {
  return this.deleteOne({seq: seq});
}

// NOTE add viewCount
tipSchema.statics.addViewCount = function (seq) {
  return this.findOneAndUpdate({
    seq: seq
  }, { 
    $inc: {viewCount: 1} 
  });
}

// NOTE recommend
tipSchema.statics.pushRecommendUser = function (seq, userid) {
  return this.findOneAndUpdate({
    seq: seq
  }, { 
    $push: { 
      recommendUserList: userid } 
  }, { 
    upsert: true, 
    new: true
  });
}
// NOTE unRecommend
tipSchema.statics.popRecommendUser = function (seq, userid) {
  return this.findOneAndUpdate({
    seq: seq,
  }, {
    $pull: {
      recommendUserList: userid
    }
  }, {
    upsert: true, 
    new: true
  })
}

// NOTE find all
tipSchema.statics.findAll = function () {
  return this.find({});
}

// NOTE find count by filter
tipSchema.statics.findCountByFilter = function (filter) {
  return this.count(filter);
}

// NOTE find by filter
tipSchema.statics.findByFilter = function (filter, page, pageSize) {
  if(page !== -1 && pageSize !== -1) {
    return this.find(filter, 'viewCount commentCount recommendUserList title writer commentList._id seq').sort({seq: -1}).skip(pageSize*page).limit(pageSize);
  }
  return this.find(filter, 'viewCount commentCount recommendUserList title writer commentList._id seq').sort({seq: -1});
}

// NOTE Get by seq
tipSchema.statics.findOneBySeq = function (seq) {
  return this.findOne({seq: seq});
}

// NOTE Push Comment
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

// NOTE Update Comment
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

// NOTE Delete Comment
tipSchema.statics.deleteComment = function (postSeq, commentIdx) {
  return this.findOneAndUpdate({
    seq: postSeq,
    commentList: {
      $elemMatch: { idx: commentIdx } }
  }, {
    $set: {
      'commentList.$.message': 'DELETED COMMENT',
      'commentList.$.isDeleted': true ,
    }
  }, {
    upsert: true, 
    new: true
  })
}

// NOTE Push Recomment
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
    comment.recommentCount++;
    comment.recommentList.push(recomment);
    post.commentList[idx] = comment;

    post.save();
  });
}

// NOTE Update Recomment
tipSchema.statics.updateRecomment = function (postSeq, commentIdx, recomment) {
  return this.findOne({
    seq: postSeq,
    commentList: {
      $elemMatch: { idx: commentIdx, } }
  }, (err, post) => {
    post.commentList.forEach((cm, i) => {
      if (cm.idx === commentIdx) {
        cm.recommentList.forEach((rcm, j) => {
          if (rcm.idx === recomment.idx) {
            post.commentList[i].recommentList[j] = recomment;
            return true;
          }
        });

        return true;
      }
    });
  
    post.save();
  });
}

// NOTE Delete Recomment
tipSchema.statics.deleteRecomment = function (postSeq, commentIdx, recomment) {
  return this.findOne({
    seq: postSeq,
    commentList: {
      $elemMatch: { idx: commentIdx, } }
  }, (err, post) => {
    post.commentList.forEach((cm, i) => {
      if (cm.idx === commentIdx) {
        cm.recommentList.forEach((rcm, j) => {
          if (rcm.idx === recomment.idx) {
            post.commentList[i].recommentList[j] = recomment;
            return true;
          }
        });

        return true;
      }
    });
  
    post.save();
  });
}

module.exports = mongoose.model("Tip", tipSchema, "tipBoard");
