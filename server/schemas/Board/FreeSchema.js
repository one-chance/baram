const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const writerSchema = new mongoose.Schema({
  key: { type: Number },
  id: { type: String },
  titleAccount: {
    server: { type: String, required: false },
    character: { type: String, required: false }
  },
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

const freeSchema = new mongoose.Schema({
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

freeSchema.plugin(autoIncrement.plugin, {
  model: "freeBoard",
  field: "seq",
  startAt: 1,
  increment: 1
});

// NOTE NOTE create new post
freeSchema.statics.create = function (payload) {
  return new this(payload).save();
}

// NOTE update post
freeSchema.statics.updateBySeq = function (seq, post) {
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
freeSchema.statics.deleteBySeq = function (seq, post) {
  return this.deleteOne({seq: seq});
}

// NOTE add viewCount
freeSchema.statics.addViewCount = function (seq) {
  return this.findOneAndUpdate({
    seq: seq
  }, { 
    $inc: {viewCount: 1} 
  });
}

// NOTE recommend
freeSchema.statics.pushRecommendUser = function (seq, userid) {
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
freeSchema.statics.popRecommendUser = function (seq, userid) {
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
freeSchema.statics.findAll = function () {
  return this.find({});
}

// NOTE find count by filter
freeSchema.statics.findCountByFilter = function (filter) {
  return this.count(filter);
}

// NOTE find by filter
freeSchema.statics.findByFilter = function (filter, page, pageSize) {
  if(page !== -1 && pageSize !== -1) {
    return this.find(filter, 'viewCount commentCount recommendUserList title writer commentList._id seq').sort({seq: -1}).skip(pageSize*page).limit(pageSize);
  }
  return this.find(filter, 'viewCount commentCount recommendUserList title writer commentList._id seq').sort({seq: -1});
}

// NOTE Get by seq
freeSchema.statics.findOneBySeq = function (seq) {
  return this.findOne({seq: seq});
}

// NOTE Push Comment
freeSchema.statics.createComment = function (postSeq, comment) {
  return this.findOneAndUpdate({
    seq: postSeq
  }, { 
    $inc: { commentCount: 1 }, 
    $push: { commentList: comment } 
  }, { 
    upsert: true, 
    new: true 
  });
}

// NOTE Update Comment
freeSchema.statics.updateComment = function (postSeq, comment) {
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
freeSchema.statics.deleteComment = function (postSeq, commentIdx) {
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
freeSchema.statics.createRecomment = function (postSeq, commentIdx, recomment) {
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
freeSchema.statics.updateRecomment = function (postSeq, commentIdx, recomment) {
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
freeSchema.statics.deleteRecomment = function (postSeq, commentIdx, recomment) {
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

module.exports = mongoose.model("Free", freeSchema, "freeBoard");
