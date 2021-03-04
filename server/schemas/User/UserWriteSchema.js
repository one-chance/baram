const mongoose = require('mongoose');

const UserWriteSchema = new mongoose.Schema({
  key: { type: Number, default: 0, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  posts:[
    new mongoose.Schema({
      category: { type: String, required: true },
      seq: { type: Number, required: true },
    })
  ],
  comments: [
    new mongoose.Schema({
      category: { type: String, required: true },
      seq: { type: Number, required: true },
      idx: { type: Number, required: true }
    })
  ],
  recomments: [
    new mongoose.Schema({
      category: { type: String, required: true },
      seq: { type: Number, required: true },
      commentIdx: { type: Number, required: true },
      recommentIdx: { type: Number, required: true },
    })
  ]
});

UserWriteSchema.statics.addPost = function (key, id, postCategory, postSeq) {
  return this.findOneAndUpdate({
    key: key,
    id: id
  }, { 
    $push: { 
      posts: {
        category: postCategory,
        seq: postSeq
      } } 
  }, { 
    upsert: true, 
    new: true
  });
}

UserWriteSchema.statics.deletePost = function (key, id, postCategory, postSeq) {
  return this.findOneAndUpdate({
    key: key,
    id: id
  }, {
    $pull: {
      posts: {
        category: postCategory,
        seq: postSeq
      }
    }
  }, {
    upsert: true, 
    new: true
  })
}

UserWriteSchema.statics.addComment = function (key, id, postCategory, postSeq, commentIdx) {
  return this.findOneAndUpdate({
    key: key,
    id: id
  }, { 
    $push: { 
      comments: {
        category: postCategory,
        seq: postSeq,
        idx: commentIdx
      } } 
  }, { 
    upsert: true, 
    new: true
  });
}

UserWriteSchema.statics.deleteComment = function (key, id, postCategory, postSeq, commentIdx) {
  return this.findOneAndUpdate({
    key: key,
    id: id
  }, {
    $pull: {
      comments: {
        category: postCategory,
        seq: postSeq,
        idx: commentIdx
      }
    }
  }, {
    upsert: true, 
    new: true
  })
}

UserWriteSchema.statics.addRecomment = function (key, id, postCategory, postSeq, commentIdx, recommentIdx) {
  return this.findOneAndUpdate({
    key: key,
    id: id
  }, { 
    $push: { 
      recomments: {
        category: postCategory,
        seq: postSeq,
        commentIdx: commentIdx,
        recommentIdx, recommentIdx
      } } 
  }, { 
    upsert: true, 
    new: true
  });
}

UserWriteSchema.statics.deleteRecomment = function (key, id, postCategory, postSeq, commentIdx, recommentIdx) {
  return this.findOneAndUpdate({
    key: key,
    id: id
  }, {
    $pull: {
      recomments: {
        category: postCategory,
        seq: postSeq,
        commentIdx: commentIdx,
        recommentIdx, recommentIdx
      }
    }
  }, {
    upsert: true, 
    new: true
  })
}

module.exports = mongoose.model("UserWrite", UserWriteSchema, "userWrite");
