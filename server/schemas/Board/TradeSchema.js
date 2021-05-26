const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const writerSchema = new mongoose.Schema({
  key: { type: Number },
  id: { type: String },
  titleAccount: {
    server: { type: String, required: false },
    character: { type: String, required: false },
  },
  createDate: { type: Date, required: false },
  lastEditDate: { type: Date, required: false },
});

const commentSchema = new mongoose.Schema({
  idx: { type: Number },
  message: { type: String },
  writer: { type: writerSchema },
  recommentCount: { type: Number, default: 0 },
  recommentList: [
    {
      idx: { type: Number },
      message: { type: String },
      writer: { type: writerSchema },
      isDeleted: { type: Boolean, default: false },
    },
  ],
  isDeleted: { type: Boolean, default: false },
});

const tradeSchema = new mongoose.Schema({
  seq: { type: Number, default: 0, required: true, unique: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writer: { type: writerSchema, required: true },
  viewCount: { type: Number, required: false, default: 0 },
  commentCount: { type: Number, required: false, default: 0 },
  commentList: [{ type: commentSchema, required: false, unique: false }],
  recommendUserList: [{ type: String, required: false }],
  imgs: [{ type: String }],
  server: { type: String, required: false },
});

tradeSchema.plugin(autoIncrement.plugin, {
  model: "tradeBoard",
  field: "seq",
  startAt: 1,
  increment: 1,
});

// NOTE NOTE create new post
tradeSchema.statics.create = function (payload) {
  return new this(payload).save();
};

// NOTE update post
tradeSchema.statics.updateBySeq = function (seq, post) {
  return this.findOneAndUpdate(
    {
      seq: seq,
    },
    {
      $set: post,
    },
    {
      upsert: true,
      new: true,
    }
  );
};

// NOTE delete post
tradeSchema.statics.deleteBySeq = function (seq, post) {
  return this.deleteOne({ seq: seq });
};

// NOTE add viewCount
tradeSchema.statics.addViewCount = function (seq) {
  return this.findOneAndUpdate(
    {
      seq: seq,
    },
    {
      $inc: { viewCount: 1 },
    }
  );
};

// NOTE recommend
tradeSchema.statics.pushRecommendUser = function (seq, userid) {
  return this.findOneAndUpdate(
    {
      seq: seq,
    },
    {
      $push: {
        recommendUserList: userid,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};
// NOTE unRecommend
tradeSchema.statics.popRecommendUser = function (seq, userid) {
  return this.findOneAndUpdate(
    {
      seq: seq,
    },
    {
      $pull: {
        recommendUserList: userid,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

// NOTE find all
tradeSchema.statics.findAll = function () {
  return this.find({});
};

// NOTE find by filter
tradeSchema.statics.findByFilter = function (filter) {
  return this.find(filter).sort({ seq: -1 });
};

// NOTE Get by seq
tradeSchema.statics.findOneBySeq = function (seq) {
  return this.findOne({ seq: seq });
};

// NOTE Push Comment
tradeSchema.statics.createComment = function (postSeq, comment) {
  return this.findOneAndUpdate(
    {
      seq: postSeq,
    },
    {
      $inc: { commentCount: 1 },
      $push: { commentList: comment },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

// NOTE Update Comment
tradeSchema.statics.updateComment = function (postSeq, comment) {
  return this.findOneAndUpdate(
    {
      seq: postSeq,
      commentList: {
        $elemMatch: { idx: comment.idx },
      },
    },
    {
      "commentList.$": comment,
    },
    {
      upsert: true,
      new: true,
    }
  );
};

// NOTE Delete Comment
tradeSchema.statics.deleteComment = function (postSeq, commentIdx) {
  return this.findOneAndUpdate(
    {
      seq: postSeq,
      commentList: {
        $elemMatch: { idx: commentIdx },
      },
    },
    {
      $set: {
        "commentList.$.message": "DELETED COMMENT",
        "commentList.$.isDeleted": true,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

// NOTE Push Recomment
tradeSchema.statics.createRecomment = function (postSeq, commentIdx, recomment) {
  return this.findOne(
    {
      seq: postSeq,
      commentList: {
        $elemMatch: { idx: commentIdx },
      },
    },
    (err, post) => {
      let idx = 0;
      const comment = post.commentList.filter((comment, _idx) => {
        if (comment.idx === commentIdx) {
          idx = _idx;
          return comment.idx === commentIdx;
        }
      });
      comment.recommentCount++;
      comment.recommentList.push(recomment);
      post.commentList[idx] = comment;

      post.save();
    }
  );
};

// NOTE Update Recomment
tradeSchema.statics.updateRecomment = function (postSeq, commentIdx, recomment) {
  return this.findOne(
    {
      seq: postSeq,
      commentList: {
        $elemMatch: { idx: commentIdx },
      },
    },
    (err, post) => {
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
    }
  );
};

// NOTE Delete Recomment
tradeSchema.statics.deleteRecomment = function (postSeq, commentIdx, recomment) {
  return this.findOne(
    {
      seq: postSeq,
      commentList: {
        $elemMatch: { idx: commentIdx },
      },
    },
    (err, post) => {
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
    }
  );
};

module.exports = mongoose.model("Trade", tradeSchema, "tradeBoard");
