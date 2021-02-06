const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth");
const logger = require('../../winston');

const FreeSchema = require("../../schemas/Board/FreeSchema");

/*
 *    NOTE 글쓰기
 *    TYPE : POST
 *    URI : /api/board/free/post
 *    HEADER: { "token": token }
 *    BODY: { "post" }
 *    RETURN CODES:
 *        200: 성공
 *        3001: 게시글 DB 생성 오류
 *        500: 서버 오류
 */
router.use("/post", authMiddleware);
router.post("/post", (req, res) => {
  const post = new FreeSchema({
    ...req.body.post,
    writer: {
      ...req.body.post.writer,
      createDateString: new Date(),
      lastEditDateString: new Date(),
    },
  });

  FreeSchema.create(post, (err, post) => {
    if (err) {
      logger.error(`[ERROR] : ${post.title} CREATED ERROR`);
      res.status(200).send({
        code: 3001,
        message: "DB 게시글 생성 오류",
      });

      return false;
    }

    return post;
  })
    .then(post => {
      logger.info(`[SUCCESS] : ${post.title} CREATED SUCCESS`);
      res.status(200).send({
        code: 200,
        message: "게시글이 등록되었습니다.",
        seq: post.seq,
      });

      return true;
    })
    .catch(e => {
      logger.error(`POST CREATE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 게시글 수정
 *    TYPE : PUT
 *    URI : /api/board/free/post
 *    HEADER: { "token": token }
 *    BODY: { "post" }
 *    RETURN CODES:
 *        200: 성공
 *        3002: 게시글 DB 수정 오류
 *        500: 서버 오류
 */
router.use("/post", authMiddleware);
router.put("/post", (req, res) => {
  const post = {
    ...req.body.post,
    writer: {
      ...req.body.post.writer,
      lastEditDateString: new Date()
    },
  };

  FreeSchema.updateBySeq(post.seq, post)
    .then(updatedPost => {
      if (updatedPost) {
        logger.info(`[SUCCESS] : ${post.title} EDITED SUCCESS`);
        res.status(200).send({
          code: 200,
          message: "게시글이 수정되었습니다.",
          seq: updatedPost.seq,
        });

        return true;
      } else {
        logger.error(`[ERROR] : ${post.title} EDIT ERROR`);
        res.status(200).send({
          code: 3002,
          message: "DB 게시글 수정 오류",
        });

        return false;
      }
    })
    .catch(e => {
      logger.error(`POST EDIT ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 게시글 삭제
 *    TYPE : DLELTE
 *    URI : /api/board/free/post/${seq}
 *    HEADER: { "token": token }
 *    RETURN CODES:
 *        200: 성공
 *        3003: 게시글 DB 삭제 오류
 *        500: 서버 오류
 */
router.use("/post/:seq", authMiddleware);
router.delete("/post/:seq", (req, res) => {
  const seq = req.params.seq;

  FreeSchema.deleteBySeq(seq)
    .then(deletedCount => {
      if (deletedCount) {
        logger.info(`[SUCCESS] : POST NUMBER ${seq} DELETED SUCCESS`);
        res.status(200).send({
          code: 200,
          message: "게시글이 삭제되었습니다.",
        });

        return true;
      } else {
        logger.error(`[ERROR] : POST NUMBER ${seq} DELETE ERROR`);
        res.status(200).send({
          code: 3003,
          message: "DB 게시글 삭제 오류",
        });

        return false;
      }
    })
    .catch(e => {
      logger.error(`POST DELETE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 게시글 추천
 *    TYPE : POST
 *    URI : /api/board/free/post/recommend/
 *    HEADER: { "token": token }
 * *    BODY: { "seq", "userid" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.use("/post/recommend/:seq", authMiddleware);
router.post("/post/recommend/:seq", (req, res) => {
  const seq = req.body.seq;
  const userid = req.body.userid;

  FreeSchema.pushRecommendUser(seq, userid)
    .then(() => {
      logger.info(`[SUCCESS] : POST ${seq} RECOMMNED SUCCESS BY ${userid}`);
      res.status(200).send({
        code: 200,
        message: "게시글을 추천하였습니다.",
      });

      return true;
    })
    .catch(e => {
      logger.error(`POST RECOMMEND ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 게시글 추천해제
 *    TYPE : POST
 *    URI : /api/board/free/post/unrecommend/
 *    HEADER: { "token": token }
 * *    BODY: { "seq", "userid" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.use("/post/unrecommend/:seq", authMiddleware);
router.post("/post/unrecommend/:seq", (req, res) => {
  const seq = req.body.seq;
  const userid = req.body.userid;

  FreeSchema.popRecommendUser(seq, userid)
    .then(() => {
      logger.info(`[SUCCESS] : POST ${seq} UNRECOMMNED SUCCESS BY ${userid}`);
      res.status(200).send({
        code: 200,
        message: "게시글 추천을 취소하였습니다.",
      });

      return true;
    })
    .catch(e => {
      logger.error(`POST UNRECOMMEND ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 댓글쓰기
 *    TYPE : POST
 *    URI : /api/board/free/comment
 *    HEADER: { "token": token }
 *    BODY: { "seq", "comment" }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.use("/comment", authMiddleware);
router.post("/comment", (req, res) => {
  const seq = req.body.seq;
  const commentIdx = req.body.commentIdx;
  const comment = Object.assign(req.body.comment, { idx: commentIdx });

  comment.writer.createDateString = new Date();
  comment.writer.lastEditDateString = new Date();

  if (!comment.writer.id || !comment.writer.key) {
    logger.info(`[FAILED] : COMMENT CREATED ERROR - NOT FOUND USER INFORMATION`);
    res.status(200).send({
      code: 401,
      message: "유효하지 않은 사용자 정보입니다. 로그인 후 다시 작성해주세요.",
      redirectUri: "/signin",
    });

    return false;
  }

  FreeSchema.createComment(seq, comment)
    .then(post => {
      logger.info(`[SUCCESS] : ${post.title} COMMENT CREATED SUCCESS`);
      res.status(200).send({
        code: 200,
        message: "댓글이 등록되었습니다.",
        commentList: post.commentList,
        commentIdx: post.commentIdx,
      });

      return true;
    })
    .catch(e => {
      logger.error(`COMMENT CREATE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 댓글수정
 *    TYPE : PUT
 *    URI : /api/board/free/comment
 *    HEADER: { "token": token }
 *    BODY: { "post", "comment" }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.use("/comment", authMiddleware);
router.put("/comment", (req, res) => {
  const post = req.body.post;
  const comment = req.body.comment;
  comment.writer.lastEditDateString = new Date();

  FreeSchema.updateComment(post.seq, comment)
    .then(post => {
      logger.info(`[SUCCESS] : COMMENT UPDATED SUCCESS`);
      res.status(200).send({
        code: 200,
        message: "댓글이 수정되었습니다.",
        commentList: post.commentList,
        comment: comment,
      });

      return true;
    })
    .catch(e => {
      logger.error(`COMMENT CREATE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 댓글삭제
 *    TYPE : DELETE
 *    URI : /api/board/free/comment/:postSeq/:commentIdx
 *    HEADER: { "token": token }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.delete("/comment/:postSeq/:commentIdx", (req, res) => {
  const postSeq = req.params.postSeq;
  const commentIdx = req.params.commentIdx;

  FreeSchema.deleteComment(postSeq, commentIdx)
    .then(post => {
      logger.info(`[SUCCESS] : COMMENT DELETED SUCCESS`);
      res.status(200).send({
        code: 200,
        message: "댓글이 삭제되었습니다.",
        commentList: post.commentList,
      });

      return true;
    })
    .catch(e => {
      logger.error(`COMMENT CREATE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 답글쓰기
 *    TYPE : POST
 *    URI : /api/board/free/recomment
 *    HEADER: { "token": token }
 *    BODY: { "seq", "commentSeq", "recomment" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.use("/recomment", authMiddleware);
router.post("/recomment", (req, res) => {
  const seq = req.body.seq;
  const commentIdx = req.body.commentIdx;
  const recommentIdx = req.body.recommentIdx;
  // const recomment = req.body.recomment;
  const recomment = Object.assign(req.body.recomment, { idx: recommentIdx });
  recomment.writer.createDateString = new Date();
  recomment.writer.lastEditDateString = new Date();

  FreeSchema.createRecomment(seq, commentIdx, recomment)
    .then(post => {
      logger.info(`[SUCCESS] : ${post.title}-${commentIdx} RECOMMENT CREATED SUCCESS`);

      const comment = post.commentList.filter(com => {
        return com.idx === commentIdx;
      })[0];

      res.status(200).send({
        code: 200,
        message: "답글이 등록되었습니다.",
        recomment: recomment,
        commentList: post.commentList,
        recommentIdx: comment.recommentIdx + 1,
      });

      return true;
    })
    .catch(e => {
      logger.error(`RECOMMENT CREATE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 답글수정
 *    TYPE : PUT
 *    URI : /api/board/free/recomment
 *    HEADER: { "token": token }
 *    BODY: { "post", "commentIdx", "comment", "recomment" }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.use("/recomment", authMiddleware);
router.put("/recomment", (req, res) => {
  const post = req.body.post;
  const commentIdx = req.body.commentIdx;
  const comment = req.body.comment;
  const recomment = req.body.recomment;
  recomment.writer.lastEditDateString = new Date();

  comment.recommentList.map((rec, idx) => {
    if (rec.idx === recomment.idx) {
      Object.assign(comment.recommentList[idx], recomment);
    }
  });

  FreeSchema.updateRecomment(post.seq, commentIdx, comment.recommentList)
    .then(post => {
      logger.info(`[SUCCESS] : RECOMMENT UPDATED SUCCESS`);

      res.status(200).send({
        code: 200,
        message: "답글이 수정되었습니다.",
        commentList: post.commentList,
        recommentList: comment.recommentList,
      });

      return true;
    })
    .catch(e => {
      logger.error(`RECOMMENT UPDATE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 답글삭제
 *    TYPE : PUT
 *    URI : /api/board/free/recomment/:recommentIdx
 *    HEADER: { "token": token }
 *    PARAMS: {recommentIdx}
 *    BODY : {post, commentIdx}
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.use("/recomment", authMiddleware);
router.put("/recomment/:recommentIdx", (req, res) => {
  const recommentIdx = req.params.recommentIdx;
  const post = req.body.post;
  const commentIdx = req.body.commentIdx;
  const comment = req.body.comment;

  comment.recommentList.map((recomment, idx) => {
    if (recomment.idx === Number.parseInt(recommentIdx)) {
      comment.recommentList.splice(idx, 1);
    }
  });

  FreeSchema.deleteRecomment(post.seq, commentIdx, comment.recommentList)
    .then(post => {
      logger.info(`[SUCCESS] : RECOMMENT DELETED SUCCESS`);

      res.status(200).send({
        code: 200,
        message: "답글이 삭제되었습니다.",
        commentList: post.commentList,
        recommentList: comment.recommentList,
      });

      return true;
    })
    .catch(e => {
      logger.error(`RECOMMENT DELETE ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 게시글 전체 조회
 *    TYPE : GET
 *    URI : /api/board/free/find
 *    HEADER: { "token": token }
 *    BODY: { "filter" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/find", (req, res) => {
  filter = {};
  if (req.query.title) {
    filter = {
      title: { $regex: req.query.title },
    };
  }
  if (req.query.content) {
    filter = {
      content: { $regex: req.query.content },
    };
  }
  if (req.query.writer) {
    filter["writer.id"] = { $regex: req.query.writer };
  }

  FreeSchema.findByFilter(filter)
    .then(posts => {
      logger.info(`[SUCCESS] : POST LIST FIND SUCCESS`);
      // 최신 조회 개수가 존재하면
      let postList = req.query.latestCount ?
          posts.slice(0, req.query.latestCount)
        : posts;

      res.status(200).send({
        code: 200,
        message: "게시글 조회에 성공하였습니다.",
        posts: postList,
      });

      return true;
    })
    .catch(e => {
      logger.error(`POST LIST FIND ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "게시글 조회 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
      });

      return false;
    });
});

/*
 *    NOTE 게시글 조회
 *    TYPE : GET
 *    URI : /api/board/free/find/:seq
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/find/:seq", (req, res) => {
  const seq = req.params.seq;

  addViewCount(seq);

  FreeSchema.findOneBySeq(seq)
    .then(post => {
      logger.info(`[SUCCESS] : ${post.title} POST FIND SUCCESS`);
      res.status(200).send({
        code: 200,
        message: "게시글 조회에 성공하였습니다.",
        post: post,
      });

      return true;
    })
    .catch(e => {
      logger.error(`POST FIND ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "게시글 조회 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
      });

      return false;
    });
});

function addViewCount(seq) {
  FreeSchema.addViewCount(seq).then(() => {
    logger.info(`Add ViewCount`);
  });
}
module.exports = router;
