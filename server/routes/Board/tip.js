const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth');
const myLogger = require('../../myLogger');

const TipSchema = require('../../schemas/Board/TipSchema');

/*
*    글쓰기
*    TYPE : POST
*    URI : /api/board/tip/post
*    HEADER: { "token": token }
*    BODY: { "post" }
*    RETURN CODES:
*        200: 성공
*        3001: 게시글 DB 생성 오류
*        500: 서버 오류
*/
router.use('/post', authMiddleware);
router.post('/post', (req, res) => {
  const post = new TipSchema({
    category: req.body.post.category,
    title: req.body.post.title,
    content: req.body.post.content,
    writer: {
      ...req.body.post.writer,
      createDateString: new Date().toLocaleString(),
      lastEditDateString: new Date().toLocaleString()
    }
  });
  
  TipSchema.create(post, (err, post) => {
    if (err) {
      myLogger(`[ERROR] : ${post.title} CREATED ERROR`);
      res.status(200).send({
        code: 3001,
        message: "DB 게시글 생성 오류"
      });

      return false;
    }

    return post;
  })
  .then((post) => {
    myLogger(`[SUCCESS] : ${post.title} CREATED SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "게시글이 등록되었습니다.",
      seq: post.seq
    });
  
    return true;
  })
  .catch((e) => {
    myLogger(`POST CREATE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  })
});

/*
*    게시글 수정
*    TYPE : PUT
*    URI : /api/board/tip/post
*    HEADER: { "token": token }
*    BODY: { "post" }
*    RETURN CODES:
*        200: 성공
*        3002: 게시글 DB 수정 오류
*        500: 서버 오류
*/
router.use('/post', authMiddleware);
router.put('/post', (req, res) => {
  const post = {
    ...req.body.post,
    writer: {
      ...req.body.post.writer,
      lastEditDateString: new Date().toLocaleString()
    }
  };
  
  TipSchema.updateBySeq(post.seq, post)
    .then((updatedPost) => {
      if (updatedPost) {
        myLogger(`[SUCCESS] : ${post.title} EDITED SUCCESS`);
        res.status(200).send({
          code: 200,
          message: "게시글이 수정되었습니다.",
          seq: updatedPost.seq
        });

        return true;
      }
      else {
        myLogger(`[ERROR] : ${post.title} EDIT ERROR`);
        res.status(200).send({
          code: 3002,
          message: "DB 게시글 수정 오류"
        });

        return false;
      }
    })
    .catch((e) => {
      myLogger(`POST EDIT ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    })
});

/*
*    게시글 삭제
*    TYPE : DLELTE
*    URI : /api/board/tip/post/${seq}
*    HEADER: { "token": token }
*    RETURN CODES:
*        200: 성공
*        3003: 게시글 DB 삭제 오류
*        500: 서버 오류
*/
router.use('/post/:seq', authMiddleware);
router.delete('/post/:seq', (req, res) => {
  const seq = req.params.seq;

  TipSchema.deleteBySeq(seq)
    .then((deletedCount) => {
      if (deletedCount) {
        myLogger(`[SUCCESS] : POST NUMBER ${seq} DELETED SUCCESS`);
        res.status(200).send({
          code: 200,
          message: "게시글이 삭제되었습니다."
        });

        return true;
      }
      else {
        myLogger(`[ERROR] : POST NUMBER ${seq} DELETE ERROR`);
        res.status(200).send({
          code: 3003,
          message: "DB 게시글 삭제 오류"
        });

        return false;
      }
    })
    .catch((e) => {
      myLogger(`POST DELETE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    })
});

/*
*    댓글쓰기
*    TYPE : POST
*    URI : /api/board/tip/comment
*    HEADER: { "token": token }
*    BODY: { "seq", "comment" }
*    RETURN CODES:
*        200: 성공
*        401: 사용자 인증 오류
*        500: 서버 오류
*/
router.use('/comment', authMiddleware);
router.post('/comment', (req, res) => {
  const seq =  req.body.seq;
  const commentIdx = req.body.commentIdx;
  const comment = Object.assign(req.body.comment, {idx: commentIdx});

  comment.writer.createDateString = new Date().toLocaleString();
  comment.writer.lastEditDateString = new Date().toLocaleString();

  if ( !comment.writer.id || !comment.writer.key ) {
    myLogger(`[ERROR] : COMMENT CREATED ERROR - NOT FOUND USER INFORMATION`);
    res.status(200).send({
      code: 401,
      message: "유효하지 않은 사용자 정보입니다. 로그인 후 다시 작성해주세요.",
      redirectUri: "/signin"
    });

    return false;
  }

  TipSchema.createComment(seq, comment)
  .then((post) => {
    myLogger(`[SUCCESS] : ${post.title} COMMENT CREATED SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "댓글이 등록되었습니다.",
      commentList: post.commentList,
      commentIdx: post.commentIdx
    });
  
    return true;
  })
  .catch((e) => {
    myLogger(`COMMENT CREATE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  })
});

/*
*    댓글수정
*    TYPE : PUT
*    URI : /api/board/tip/comment
*    HEADER: { "token": token }
*    BODY: { "post", "comment" }
*    RETURN CODES:
*        200: 성공
*        401: 사용자 인증 오류
*        500: 서버 오류
*/
router.use('/comment', authMiddleware);
router.put('/comment', (req, res) => {
  const post =  req.body.post;
  const comment = req.body.comment;
  comment.writer.lastEditDateString = new Date().toLocaleString();

  TipSchema.updateComment(post.seq, comment)
  .then((post) => {
    myLogger(`[SUCCESS] : COMMENT UPDATED SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "댓글이 수정되었습니다.",
      commentList: post.commentList,
      comment: comment
    });
  
    return true;
  })
  .catch((e) => {
    myLogger(`COMMENT CREATE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  })
});

/*
*    댓글삭제
*    TYPE : DELETE
*    URI : /api/board/tip/comment/:postSeq/:commentIdx
*    HEADER: { "token": token }
*    RETURN CODES:
*        200: 성공
*        401: 사용자 인증 오류
*        500: 서버 오류
*/
router.delete('/comment/:postSeq/:commentIdx', (req, res) => {
  const postSeq =  req.params.postSeq;
  const commentIdx = req.params.commentIdx;

  TipSchema.deleteComment(postSeq, commentIdx)
  .then((post) => {
    myLogger(`[SUCCESS] : COMMENT DELETED SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "댓글이 삭제되었습니다.",
      commentList: post.commentList
    });
  
    return true;
  })
  .catch((e) => {
    myLogger(`COMMENT CREATE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  })
});

/*
*    답글쓰기
*    TYPE : POST
*    URI : /api/board/tip/recomment
*    HEADER: { "token": token }
*    BODY: { "seq", "commentSeq", "recomment" }
*    RETURN CODES:
*        200: 성공
*        500: 서버 오류
*/
router.use('/recomment', authMiddleware);
router.post('/recomment', (req, res) => {
  const seq =  req.body.seq;
  const commentIdx = req.body.commentIdx;
  const recommentIdx = req.body.recommentIdx;
  // const recomment = req.body.recomment;
  const recomment = Object.assign(req.body.recomment, {idx: recommentIdx});
  recomment.writer.createDateString = new Date().toLocaleString();
  recomment.writer.lastEditDateString = new Date().toLocaleString();
  
  TipSchema.createRecomment(seq, commentIdx, recomment)
  .then((post) => {
    myLogger(`[SUCCESS] : ${post.title}-${commentIdx} RECOMMENT CREATED SUCCESS`);

    const comment = post.commentList.filter((com) => {
      return com.idx === commentIdx;
    })[0];

    res.status(200).send({
      code: 200,
      message: "답글이 등록되었습니다.",
      recomment: recomment,
      commentList: post.commentList,
      recommentIdx: comment.recommentIdx+1
    });
  
    return true;
  })
  .catch((e) => {
    myLogger(`RECOMMENT CREATE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  })
});

/*
*    답글수정
*    TYPE : PUT
*    URI : /api/board/tip/recomment
*    HEADER: { "token": token }
*    BODY: { "post", "commentIdx", "comment", "recomment" }
*    RETURN CODES:
*        200: 성공
*        401: 사용자 인증 오류
*        500: 서버 오류
*/
router.use('/recomment', authMiddleware);
router.put('/recomment', (req, res) => {
  const post =  req.body.post;
  const commentIdx = req.body.commentIdx;
  const comment = req.body.comment;
  const recomment = req.body.recomment;
  recomment.writer.lastEditDateString = new Date().toLocaleString();

  comment.recommentList.map((rec, idx) => {
    if (rec.idx === recomment.idx) {
      Object.assign(comment.recommentList[idx], recomment);
    }
  });

  TipSchema.updateRecomment(post.seq, commentIdx, comment.recommentList)
  .then((post) => {
    myLogger(`[SUCCESS] : RECOMMENT UPDATED SUCCESS`);

    res.status(200).send({
      code: 200,
      message: "답글이 수정되었습니다.",
      commentList: post.commentList,
      recommentList: comment.recommentList
    });
  
    return true;
  })
  .catch((e) => {
    myLogger(`RECOMMENT UPDATE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  })
});

/*
*    답글삭제
*    TYPE : PUT
*    URI : /api/board/tip/recomment/:recommentIdx
*    HEADER: { "token": token }
*    PARAMS: {recommentIdx}
*    BODY : {post, commentIdx}
*    RETURN CODES:
*        200: 성공
*        401: 사용자 인증 오류
*        500: 서버 오류
*/
router.use('/recomment', authMiddleware);
router.put('/recomment/:recommentIdx', (req, res) => {
  const recommentIdx = req.params.recommentIdx;
  const post =  req.body.post;
  const commentIdx = req.body.commentIdx;
  const comment = req.body.comment;

  comment.recommentList.map((recomment, idx) => {
    if (recomment.idx === Number.parseInt(recommentIdx)) {
      comment.recommentList.splice(idx, 1);
    }
  });

  TipSchema.deleteRecomment(post.seq, commentIdx, comment.recommentList)
  .then((post) => {
    myLogger(`[SUCCESS] : RECOMMENT DELETED SUCCESS`);

    res.status(200).send({
      code: 200,
      message: "답글이 삭제되었습니다.",
      commentList: post.commentList,
      recommentList: comment.recommentList
    });
  
    return true;
  })
  .catch((e) => {
    myLogger(`RECOMMENT DELETE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  })
});

/*
*    게시글 전체 조회
*    TYPE : GET
*    URI : /api/board/tip/find
*    HEADER: { "token": token }
*    BODY: { "filter" }
*    RETURN CODES:
*        200: 성공
*        500: 서버 오류
*/
router.get('/find', (req, res) => {
  filter = {};
  if (req.query.title) {
    filter = {
      title: {$regex: req.query.title}
      // title: new RegExp((req.query.title), "i")
    }
  }
  if (req.query.content) {
    filter = {
      content: {$regex: req.query.content}
    }
  }
  if (req.query.writer) {
    filter['writer.id'] = {$regex: req.query.writer}
  }

  TipSchema.findByFilter(filter)
  .then((posts) => {
    myLogger(`[SUCCESS] : POST LIST FIND SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "게시글 조회에 성공하였습니다.",
      posts: posts
    });

    return true;
  })
  .catch((e) => {
    myLogger(`POST LIST FIND ERROR > ${e}`);
    res.status(200).send({
      code: 500,
      message: "게시글 조회 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
    });

    return false;
  })
});


/*
*    게시글 조회
*    TYPE : GET
*    URI : /api/board/tip/find/:seq
*    RETURN CODES:
*        200: 성공
*        500: 서버 오류
*/
router.get('/find/:seq', (req, res) => {
  const seq = req.params.seq;

  addViewCount(seq);

  TipSchema.findOneBySeq(seq)
  .then((post) => {
    myLogger(`[SUCCESS] : ${post.title} POST FIND SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "게시글 조회에 성공하였습니다.",
      post: post
    });

    return true;
  })
  .catch((e) => {
    myLogger(`POST FIND ERROR > ${e}`);
    res.status(200).send({
      code: 500,
      message: "게시글 조회 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
    });

    return false;
  })
});

function addViewCount(seq) {
  TipSchema.addViewCount(seq)
  .then(() => {
    myLogger(`Add ViewCount`);
  });
}
module.exports = router;