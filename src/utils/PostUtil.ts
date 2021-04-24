import axios from 'axios';

import IPost from 'interfaces/Board/IPost';
import { getSignInUserKey, getSignInUserId, getNowUserInfo } from 'utils/UserUtil';
import * as CommonUtil from 'utils/CommonUtil';

import { CategoryType } from 'interfaces/Board/IPost';
import { ServerType } from 'interfaces/Common/IServer';
import IComment from 'interfaces/Board/IComment';
import IRecomment from 'interfaces/Board/IRecomment';

// NOTE 게시글 생성
export const CreatePost = async (_category: CategoryType, _title: string, _content: string, _server?: ServerType) => {
  let post: IPost = {
    category: _category,
    title: _title,
    content: _content,
    writer: getWriter(),
    viewCount: 0,
    commentCount: 0,
    commentList: [],
    recommendUserList: [],
    server: _server
  }

  const up = await CommonUtil.checkUploadImage(_content);
  if (up) {
    post.content = up?.content;
    post.imgs = up?.imgs;
  }

  const res = await axios.post(`/api/board/${post.category}/post`, {
    post: post
  }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data;
  })
  .catch((e) => {
    console.log(`CREATE POST ERROR > ${e}`);

    return false;
  });

  return res;
}

// NOTE 게시글 수정
export const EditPost = async (_title: string, _content: string, _post?: IPost, _server?: ServerType) => {
  if (_post) {
    const post: IPost = {
      ..._post,
      title: _title,
      content: _content,
      server: _server
    }
  
    const up = await CommonUtil.checkUploadImage(_content);
    if (up) {
      post.content = up?.content;
      post.imgs = up?.imgs;
    }

    const res = await axios.put(`/api/board/${post.category}/post`, {
      post: post
    }, {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      if (CommonUtil.checkServerError(res.data)) return false;
  
      return res.data;
    })
    .catch((e) => {
      console.log(`EDIT POST ERROR > ${e}`);
  
      return false;
    });
  
    return res;
  }
  else {
    alert("올바르지 않은 게시글 정보입니다.");
    return false;
  }
}

// NOTE 게시글 삭제
export const DeletePost = async (_category: CategoryType, _seq: number) => {
  const signInUser = CommonUtil.getNowUser();

  const res = await axios.delete(`/api/board/${_category}/post/${_seq}`, {
    headers: {
      token: CommonUtil.getToken(),
      key: signInUser.key,
      id: signInUser.id
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data;
  })
  .catch((e) => {
    console.log(`DELETE POST ERROR > ${e}`);

    return false;
  });

  return res;
}

// NOTE 게시글 추천
export const RecommendPost = async (_category: CategoryType, _seq: number, _userid: string) => {
  const res = await axios.post(`/api/board/${_category}/post/recommend/${_seq}`, {
    seq: _seq,
    userid: _userid
  }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data;
  })
  .catch((e) => {
    console.log(`RECOMMEND POST ERROR > ${e}`);

    return false;
  });

  return res;
}

// NOTE 게시글 추천해제
export const UnrecommendPost = async (_category: CategoryType, _seq: number, _userid: string) => {
  const res = await axios.post(`/api/board/${_category}/post/unrecommend/${_seq}`, {
    seq: _seq,
    userid: _userid
  },{
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data;
  })
  .catch((e) => {
    console.log(`RECOMMEND POST ERROR > ${e}`);

    return false;
  });

  return res;
}

// NOTE 댓글 생성
export const CreateComment = async (post: IPost, _commentMessage: string) => {
  const { category, seq, commentCount } = post;
  const comment: IComment = {
    idx: commentCount,
    message: _commentMessage,
    writer: getWriter(),
    recommentCount: 0,
    recommentList: [],
    isDeleted: false
  }

  const res = await axios.post(`/api/board/${category}/comment`, {
      seq: seq,
      commentCount: commentCount,
      comment: comment
    }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data;
  })
  .catch((e) => {
    console.log(`CREATE COMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}

// NOTE 댓글 수정 
export const EditComment = async (post: IPost, comment: IComment) => {
  comment = {
    ...comment,
    writer: Object.assign(getWriter(), comment.writer)
  }

  const res = await axios.put(`/api/board/${post.category}/comment`, {
    post: post,
    comment: comment
  }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;
    
    return res.data;
  })
  .catch((e) => {
    console.log(`UPDATE COMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}

// NOTE 댓글 삭제
export const DeleteComment = async (post: IPost, commentIdx: number) => {
  const signInUser = CommonUtil.getNowUser();

  const res = await axios.delete(`/api/board/${post.category}/comment/${post.seq}/${commentIdx}`, {
    headers: {
      token: CommonUtil.getToken(),
      key: signInUser.key,
      id: signInUser.id
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;
    
    return res.data;
  })
  .catch((e) => {
    console.log(`DELETE COMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}

// NOTE 답글 생성
export const CreateRecomment = async (post: IPost, comment: IComment, recommentCount: number, recommentMessage: string,) => {
  const recomment: IRecomment = {
    idx: recommentCount,
    message: recommentMessage,
    writer: getWriter(),
    isDeleted: false
  }
  
  const res = await axios.post(`/api/board/${post.category}/recomment`, {
      seq: post.seq,
      commentIdx: comment.idx,
      recommentCount: recommentCount,
      recomment: recomment
    }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;
    
    return res.data;
  })
  .catch((e) => {
    console.log(`CREATE COMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}

// NOTE 답글 수정
export const EditRecomment = async (post: IPost, commentIdx: number, recomment: IRecomment) => {
  recomment = {
    ...recomment,
    writer: Object.assign(getWriter(), recomment.writer)
  }

  const res = await axios.put(`/api/board/${post.category}/recomment`, {
    post: post,
    commentIdx: commentIdx,
    recomment: recomment
  }, {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;
    
    return res.data;
  })
  .catch((e) => {
    console.log(`UPDATE RECOMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}

// NOTE 답글 삭제
export const DeleteRecomment = async (post: IPost, commentIdx: number, recomment: IRecomment) => {
  const signInUser = CommonUtil.getNowUser();

  const res = await axios.put(`/api/board/${post.category}/recomment/${recomment.idx}`, {
    post: post,
    commentIdx: commentIdx,
    recomment: recomment
  }, {
    headers: {
      token: CommonUtil.getToken(),
      key: signInUser.key,
      id: signInUser.id
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;
    
    return res.data;
  })
  .catch((e) => {
    console.log(`DELETE RECOMMENT ERROR > ${e}`);

    return false;
  })

  return res;
}

// NOTE 게시글 리스트 조회
export const getPosts = async (_category: CategoryType, _filterUri?: string) => {
  let posts: Array<IPost> = [];

  await axios.get(`/api/board/${_category}/find?${_filterUri}`)
    .then((res) => {
      if (res.data.code === 200) {
        posts = Object.setPrototypeOf(res.data.posts, posts);
      }
      return true;
    })
    .catch((e) => {
      console.log(`FIND POSTS ERROR > ${e}`);

      return false;
    });

    return posts;
}

// NOTE 게시글 조회
export const getPost = async (_category: CategoryType, _seq: number) => {

  const getUri = `/api/board/${_category}/find/${_seq}`;
  const res = await axios.get(getUri)
    .then((res) => {
      if (res.data.code === 200) {
        return res.data.post as IPost;
      }

      return null;
    })
    .catch((e) => {
      console.log(`FIND POST ERROR > ${e}`);

      return null;
    });

  return res;
}



// NOTE 게시판 목록 이름 조회
export const getCategoryName = (_category: CategoryType) => {
  switch (_category) {
    case "tip":
      return "팁 게시판";
    case "free":
      return "자유 게시판";
    case "screenshot":
      return "스크린 게시판";
    case "server":
      return "서버 게시판";
    case "offer":
      return "구인구직 게시판";
    case "job":
      return "직업 게시판";
    case "trade":
      return "거래 게시판";
    default:
      break;
  }
}

// NOTE 작성자 객체 생성
const getWriter = () => {
  const signInUser = getNowUserInfo();

  return {
    key: getSignInUserKey(),
    id: getSignInUserId(),
    titleAccount: signInUser.titleAccount
  }
}