const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth");
const logger = require("../../winston");

const VideoSchema = require("../../schemas/Board/VideoSchema");
const UserWriteSchema = require("../../schemas/User/UserWriteSchema");

const { PlusPointByKey, MinusPointByKey } = require("../../util/userUtil");

/*
 *    NOTE 게시글 생성
 *    TYPE : POST
 *    URI : /api/board/video/post
 *    HEADER: { "token": token }
 *    BODY: { "post" }
 *    RETURN CODES:
 *        200: 성공
 *        3001: 게시글 DB 생성 오류
 *        500: 서버 오류
 */
router.use("/post", authMiddleware);
router.post("/post", (req, res) => {
  const post = new VideoSchema({
    ...req.body.post,
    writer: {
      ...req.body.post.writer,
      createDate: new Date(),
      lastEditDate: new Date(),
    },
  });

  VideoSchema.create(post, (err, post) => {
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
      const { key, id } = req.body.post.writer;
      const { category, seq } = post;
      UserWriteSchema.addPost(key, id, category, seq)
        .then(() => {
          logger.info(`[SUCCESS] : ADD USERWRITE POST : [${key}]${id} - ${category} : ${seq}`);
        })
        .catch(e => {
          logger.error(`[ERROR] : ADD USERWRITE POST ERROR [${key}]${id} - ${category} : ${seq} > ${e}`);
        });

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
 *    URI : /api/board/video/post
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
      lastEditDate: new Date(),
    },
  };

  VideoSchema.updateBySeq(post.seq, post)
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
 *    URI : /api/board/video/post/${seq}
 *    HEADER: { "token": token }
 *    RETURN CODES:
 *        200: 성공
 *        3003: 게시글 DB 삭제 오류
 *        500: 서버 오류
 */
router.use("/post/:seq", authMiddleware);
router.delete("/post/:seq", (req, res) => {
  const { key, id } = req.headers;
  const seq = req.params.seq;

  VideoSchema.deleteBySeq(seq)
    .then(deletedCount => {
      if (deletedCount) {
        UserWriteSchema.deletePost(key, id, "video", seq)
          .then(() => {
            logger.info(`[SUCCESS] : DELETE USERWRITE POST [${key}]${id} - : video : ${seq}`);
          })
          .catch(e => {
            logger.error(`[ERROR] : DELETE USERWRITE POST ERROR [${key}]${id} - video : ${seq} > ${e}`);
          });

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
 *    URI : /api/board/video/post/recommend/
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

  VideoSchema.pushRecommendUser(seq, userid)
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
 *    URI : /api/board/video/post/unrecommend/
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

  VideoSchema.popRecommendUser(seq, userid)
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
 *    URI : /api/board/video/comment
 *    HEADER: { "token": token }
 *    BODY: { "seq", "comment" }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.use("/comment", authMiddleware);
router.post("/comment", (req, res) => {
  const { seq, commentCount, comment } = req.body;
  comment.idx = commentCount;
  comment.writer.createDate = new Date();
  comment.writer.lastEditDate = new Date();

  VideoSchema.createComment(seq, comment)
    .then(post => {
      const { key, id } = comment.writer;

      UserWriteSchema.addComment(key, id, "video", seq, commentCount)
        .then(() => {
          logger.info(`[SUCCESS] : ADD USERWRITE COMMENT : [${key}]${id} - video : ${seq} : ${commentCount}`);
        })
        .catch(e => {
          logger.error(`[ERROR] : ADD USERWRITE COMMENT ERROR [${key}]${id} - video : ${seq} : ${commentCount}> ${e}`);
        });

      logger.info(`[SUCCESS] : ${post.title} COMMENT CREATED SUCCESS`);
      res.status(200).send({
        code: 200,
        message: "댓글이 등록되었습니다.",
        commentList: post.commentList,
        commentCount: commentCount + 1,
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
 *    URI : /api/board/video/comment
 *    HEADER: { "token": token }
 *    BODY: { "post", "comment" }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.use("/comment", authMiddleware);
router.put("/comment", (req, res) => {
  const { post, comment } = req.body;
  comment.writer.lastEditDate = new Date();

  VideoSchema.updateComment(post.seq, comment)
    .then(post => {
      logger.info(`[SUCCESS] : COMMENT UPDATED SUCCESS`);
      res.status(200).send({
        code: 200,
        message: "댓글이 수정되었습니다.",
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
 *    URI : /api/board/video/comment/:postSeq/:commentIdx
 *    HEADER: { "token": token }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.delete("/comment/:postSeq/:commentIdx", (req, res) => {
  const { key, id } = req.headers;
  const seq = req.params.postSeq;
  const commentIdx = req.params.commentIdx;

  VideoSchema.deleteComment(seq, commentIdx)
    .then(post => {
      // 사용자 작성 댓글 삭제
      UserWriteSchema.deleteComment(key, id, "video", seq, commentIdx)
        .then(() => {
          logger.info(`[SUCCESS] : DELETE USERWRITE COMMENT : [${key}]${id} - video : ${seq} : ${commentIdx}`);
        })
        .catch(e => {
          logger.error(`[ERROR] : DELETE USERWRITE COMMENT ERROR [${key}]${id} - video : ${seq} : ${commentIdx}> ${e}`);
        });

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
 *    URI : /api/board/video/recomment
 *    HEADER: { "token": token }
 *    BODY: { "seq", "commentSeq", "recomment" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.use("/recomment", authMiddleware);
router.post("/recomment", (req, res) => {
  const { seq, commentIdx, recommentCount, recomment } = req.body;
  recomment.idx = recommentCount;
  recomment.writer.createDate = new Date();
  recomment.writer.lastEditDate = new Date();

  VideoSchema.createRecomment(seq, commentIdx, recomment)
    .then(post => {
      const { key, id } = recomment.writer;
      UserWriteSchema.addRecomment(key, id, "video", seq, commentIdx, recommentCount)
        .then(() => {
          logger.info(`[SUCCESS] : ADD USERWRITE RECOMMENT : [${key}]${id} - video : ${seq} : ${commentIdx} : ${recommentCount}`);
        })
        .catch(e => {
          logger.error(`[ERROR] : ADD USERWRITE RECOMMENT ERROR [${key}]${id} - video : ${seq} : ${commentIdx} : ${recommentCount}> ${e}`);
        });

      logger.info(`[SUCCESS] : ${post.title}-${commentIdx} RECOMMENT CREATED SUCCESS`);

      res.status(200).send({
        code: 200,
        message: "답글이 등록되었습니다.",
        recomment: recomment,
        recommentCount: recommentCount + 1,
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
 *    URI : /api/board/video/recomment
 *    HEADER: { "token": token }
 *    BODY: { "post", "commentIdx", "comment", "recomment" }
 *    RETURN CODES:
 *        200: 성공
 *        401: 사용자 인증 오류
 *        500: 서버 오류
 */
router.use("/recomment", authMiddleware);
router.put("/recomment", (req, res) => {
  const { post, commentIdx, recomment } = req.body;
  recomment.writer.lastEditDate = new Date();

  VideoSchema.updateRecomment(post.seq, commentIdx, recomment)
    .then(post => {
      logger.info(`[SUCCESS] : RECOMMENT UPDATED SUCCESS`);

      res.status(200).send({
        code: 200,
        message: "답글이 수정되었습니다.",
        recomment: recomment,
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
 *    URI : /api/board/video/recomment/:recommentIdx
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
  const { key, id } = req.headers;
  const recommentIdx = req.params.recommentIdx;
  const { post, commentIdx, recomment } = req.body;
  recomment.message = "DELETED COMMENT";
  recomment.isDeleted = true;

  VideoSchema.deleteRecomment(post.seq, commentIdx, recomment)
    .then(post => {
      const { seq } = post;
      UserWriteSchema.deleteRecomment(key, id, "video", seq, commentIdx, recommentIdx)
        .then(() => {
          logger.info(`[SUCCESS] : DELETE USERWRITE RECOMMENT : [${key}]${id} - video : ${seq} : ${commentIdx} : ${recommentIdx}`);
        })
        .catch(e => {
          logger.error(`[ERROR] : DELETE USERWRITE RECOMMENT ERROR [${key}]${id} - video : ${seq} : ${commentIdx} : ${recommentIdx}> ${e}`);
        });

      logger.info(`[SUCCESS] : RECOMMENT DELETED SUCCESS`);

      res.status(200).send({
        code: 200,
        message: "답글이 삭제되었습니다.",
        recomment: recomment,
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
 *    NOTE 게시글 카운트
 *    TYPE : GET
 *    URI : /api/board/video/count
 *    HEADER: { "token": token }
 *    BODY: { "filter" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/count", (req, res) => {
  let filter = {};
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
    filter["writer.titleAccount.character"] = req.query.writer;
  }

  VideoSchema.findCountByFilter(filter)
    .then(count => {
      logger.info(`[SUCCESS] : POST COUNT FIND SUCCESS`);
      // 최신 조회 개수가 존재하면

      res.status(200).send({
        code: 200,
        message: "카운트 조회에 성공하였습니다.",
        count: count,
      });

      return true;
    })
    .catch(e => {
      logger.error(`POST COUNT FIND ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "카운트 조회 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
      });

      return false;
    });
});

/*
 *    NOTE 게시글 전체 조회
 *    TYPE : GET
 *    URI : /api/board/video/find
 *    HEADER: { "token": token }
 *    BODY: { "filter" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/find", (req, res) => {
  let filter = {};
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
    filter["writer.titleAccount.character"] = req.query.writer;
  }
  if (req.query.server) {
    filter = {
      server: { $regex: req.query.server },
    };
  }

  VideoSchema.findByFilter(filter)
    .then(posts => {
      logger.info(`[SUCCESS] : POST LIST FIND SUCCESS`);
      // 최신 조회 개수가 존재하면
      let postList = req.query.latestCount ? posts.slice(0, req.query.latestCount) : posts;

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
 *    URI : /api/board/video/find/:seq
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/find/:seq", (req, res) => {
  const seq = req.params.seq;

  if (isNaN(seq)) {
    return;
  }

  addViewCount(seq);

  VideoSchema.findOneBySeq(seq)
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
  VideoSchema.addViewCount(seq).then(() => {
    logger.info(`Add ViewCount`);
  });
}
module.exports = router;
