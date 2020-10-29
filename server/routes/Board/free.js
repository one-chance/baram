const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth');
const myLogger = require('../../myLogger');

const FreeSchema = require('../../schemas/Board/FreeSchema');

/*
*    글쓰기
*    TYPE : POST
*    URI : /api/board/free/create
*    HEADER: { "token": token }
*    BODY: { "post" }
*    RETURN CODES:
*        200: 성공
*        3001: 게시글 DB 생성 오류
*        500: 서버 오류
*/
router.use('/create', authMiddleware);
router.post('/create', (req, res) => {
  const post = new FreeSchema({
    category: req.body.post.category,
    title: req.body.post.title,
    content: req.body.post.content,
    writer: {
      ...req.body.post.writer,
      createDateString: new Date().toLocaleString(),
      lastEditDateString: new Date().toLocaleString()
    }
  });
  
  FreeSchema.create(post, (err, post) => {
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
*    URI : /api/board/free/edit
*    HEADER: { "token": token }
*    BODY: { "post" }
*    RETURN CODES:
*        200: 성공
*        3002: 게시글 DB 수정 오류
*        500: 서버 오류
*/
router.use('/edit', authMiddleware);
router.put('/edit', (req, res) => {
  const post = {
    ...req.body.post,
    writer: {
      ...req.body.post.writer,
      lastEditDateString: new Date().toLocaleString()
    }
  };
  
  FreeSchema.updateBySeq(post.seq, post)
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
*    URI : /api/board/free/delete/${seq}
*    HEADER: { "token": token }
*    RETURN CODES:
*        200: 성공
*        3003: 게시글 DB 삭제 오류
*        500: 서버 오류
*/
router.use('/delete/:seq', authMiddleware);
router.delete('/delete/:seq', (req, res) => {
  const seq = req.params.seq;

  FreeSchema.deleteBySeq(seq)
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
*    URI : /api/board/free/comment/create
*    HEADER: { "token": token }
*    BODY: { "seq", "comment" }
*    RETURN CODES:
*        200: 성공
*        401: 사용자 인증 오류
*        500: 서버 오류
*/
router.use('/comment/create', authMiddleware);
router.post('/comment/create', (req, res) => {
  const seq =  req.body.seq;
  const comment = req.body.comment;
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

  FreeSchema.createComment(seq, comment)
  .then((post) => {
    myLogger(`[SUCCESS] : ${post.title} COMMENT CREATED SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "댓글이 등록되었습니다. 잠시 후 새로고침 됩니다.",
      seq: post.seq
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
*    URI : /api/board/free/recomment/create
*    HEADER: { "token": token }
*    BODY: { "seq", "commentSeq", "recomment" }
*    RETURN CODES:
*        200: 성공
*        500: 서버 오류
*/
router.use('/recomment/create', authMiddleware);
router.post('/recomment/create', (req, res) => {
  const seq =  req.body.seq;
  const commentIdx = req.body.commentIdx;
  const recomment = req.body.recomment;
  recomment.writer.createDateString = new Date().toLocaleString();
  recomment.writer.lastEditDateString = new Date().toLocaleString();

  FreeSchema.createRecomment(seq, commentIdx, recomment)
  .then((post) => {
    myLogger(`[SUCCESS] : ${post.title}-${commentIdx} RECOMMENT CREATED SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "답글이 등록되었습니다. 잠시 후 새로고침 됩니다.",
      seq: post.seq
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
*    게시글 전체 조회
*    TYPE : GET
*    URI : /api/board/free/find
*    HEADER: { "token": token }
*    BODY: { "category", "title", "content", "writer", "createDateString" }
*    RETURN CODES:
*        200: 성공
*        500: 서버 오류
*/
router.get('/find', (req, res) => {
  const category = req.query.category;
  const title = req.query.title;
  const content = req.query.content;
  const writer = req.query.writer;
  const createDateString = req.query.createDateString;

  let filter = {};

  if (category) {
    filter = {
      ...filter,
      category: category
    }  
  }
  if (title) {
    filter = {
      ...filter,
      title: title
    }  
  }
  if (content) {
    filter = {
      ...filter,
      content: content
    }  
  }
  if (writer) {
    filter = {
      ...filter,
      writer: {
        id: writer
      }
    }  
  }
  if (createDateString) {
    filter = {
      ...filter,
      writer: {
        createDateString: createDateString
      }
    }  
  }

  FreeSchema.findByFilter(filter)
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
*    URI : /api/board/free/find/:seq
*    RETURN CODES:
*        200: 성공
*        500: 서버 오류
*/
router.get('/find/:seq', (req, res) => {
  const seq = req.params.seq;

  addViewCount(seq);

  FreeSchema.findOneBySeq(seq)
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
  FreeSchema.addViewCount(seq)
  .then(() => {
    myLogger(`Add ViewCount`);
  });
}
module.exports = router;