import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

import IPost from "interfaces/Board/IPost";
import { CategoryType } from "interfaces/Board/IPost";

import * as PostUtil from "utils/PostUtil";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "10px",
  },
}));

interface IProps {
  category: CategoryType;
  posts: Array<IPost>;
}

const LatestBoardPaper = (props: IProps) => {
  const classes = useStyles();
  const { category, posts } = props;

  return (
    <Paper elevation={3} className={classes.paper}>
      <div style={{ margin: "2.5px 0" }}>{PostUtil.getCategoryName(category)}</div>
      {posts ? (
        posts.length > 0 ? (
          posts.map((post: IPost) => (
            <div key={post.seq} style={{ margin: "2.5px 0" }}>
              <Link href={`/board/${post.category}/${post.seq}`}>
                {post.title} {post.commentList ? ` (+${post.commentList.length})` : ``}
              </Link>
            </div>
          ))
        ) : (
          <div>게시글이 존재하지 않습니다.</div>
        )
      ) : (
        <div>최신 게시글을 확인하는 중입니다.</div>
      )}
    </Paper>
  );
};

export default LatestBoardPaper;
