import React from "react";

import IPost from "interfaces/Board/IPost";
import IComment from "interfaces/Board/IComment";
import CommentItem from "components/Board/CommentItem";

interface IProps {
  post: IPost;
  commentList: Array<IComment>;
}

const PostCommentList = (props: IProps) => {
  const { post, commentList } = props;

  return (
    <>
      <div style={{ borderTop: "2px solid lightgray" }}>
        {commentList.length > 0 && (
          <div>
            {commentList.map((comment, idx) => (
              <CommentItem key={idx} post={post} commentItem={comment} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostCommentList;
