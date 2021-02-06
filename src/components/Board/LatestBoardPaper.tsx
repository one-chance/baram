import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

import IPost from "interfaces/Board/IPost";
import { CategoryType } from "interfaces/Board/IPost";

import * as PostUtil from "utils/PostUtil";
import { getMMDDByDate } from 'utils/CommonUtil';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "10px"
  },
  linkListWrapper: {
    marginTop: '10px'
  },
  linkItem: {
    display: 'flex',
    width: '100%',
    margin: '2.5px 0',
    padding: '0 5px',
    justifyContent: 'space-between'
  }
}));

interface IProps {
  category: CategoryType;
  posts: Array<IPost>;
}

const LatestBoardPaper = (props: IProps) => {
  const classes = useStyles();
  const { category, posts } = props;

  return (
    <Paper elevation={0} className={classes.paper}>
      <div style={{ fontSize: "1rem", fontWeight: "bold", margin: "2.5px 0 2.5px 5px" }}>{PostUtil.getCategoryName(category)}</div>
      <Divider style={{ height: "2px", margin: "5px 0" }} />
      <div className={classes.linkListWrapper}>
        {posts ? (
          posts.length > 0 ? (
            posts.map((post: IPost) => (
              <div key={post.seq} className={classes.linkItem}>
                <Link href={`/board/${post.category}/${post.seq}`}>
                  {post.title} {post.commentList ? ` (+${post.commentList.length})` : ``}
                </Link>
                <span>
                  {getMMDDByDate(post.writer.createDateString)}
                </span>
              </div>
            ))
          ) : (
            <div style={{ margin: "2.5px 0", padding: "0 5px" }}>게시글이 존재하지 않습니다.</div>
          )
        ) : (
          <div>최신 게시글을 확인하는 중입니다.</div>
        )}
      </div>
    </Paper>
  );
};

export default LatestBoardPaper;
