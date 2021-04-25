import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import AddIcon from "@material-ui/icons/Add";
import IPost from "interfaces/Board/IPost";
import { CategoryType } from "interfaces/Board/IPost";

import * as PostUtil from "utils/PostUtil";
import { getMMDDByDate } from "utils/CommonUtil";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "auto",
    height: "160px",
    margin: "5px",
    padding: "0",
  },
  linkItem: {
    display: "flex",
    width: "100%",
    margin: "2.5px 0",
    padding: "0 5px",
    justifyContent: "space-between",
    "& a": {
      width: "200px",
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& span": {
      width: "40px",
    },
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
    <Grid container direction='column' className={classes.paper}>
      <Grid container justify='space-between' style={{ fontSize: "1rem", fontWeight: "bold", margin: "0 5px" }}>
        {PostUtil.getCategoryName(category)}
        <Button href={`/board/${category}`} style={{ minWidth: "22px", height: "22px", padding: "0", float: "right" }}>
          <AddIcon style={{ width: "20px", height: "20px" }} />
        </Button>
      </Grid>
      <Divider style={{ width: "100%", height: "2px", margin: "4px 0" }} />
      <Grid container justify='space-between'>
        {posts ? (
          posts.length > 0 ? (
            posts.map((post: IPost) => (
              <div key={post.seq} className={classes.linkItem}>
                <Link href={`/board/${post.category}/${post.seq}`}>
                  {post.title} {post.commentList ? ` (+${post.commentList.length})` : ``}
                </Link>
                <span>{getMMDDByDate(post.writer.createDate)}</span>
              </div>
            ))
          ) : (
            <div style={{ margin: "2.5px 0", padding: "0 5px" }}>게시글이 존재하지 않습니다.</div>
          )
        ) : (
          <div>최신 게시글을 확인하는 중입니다.</div>
        )}
      </Grid>
    </Grid>
  );
};

export default LatestBoardPaper;
