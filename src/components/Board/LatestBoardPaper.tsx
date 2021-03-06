import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import AddIcon from "@material-ui/icons/Add";
import IPost from "interfaces/Board/IPost";
import { CategoryType } from "interfaces/Board/IPost";

import * as PostUtil from "utils/PostUtil";
import { getMMDDByDate } from "utils/CommonUtil";

const useStyles = makeStyles({
  paper: {
    width: "auto",
    height: "158px",
    margin: "4px 12px",
    padding: "0",
  },
  linkItem: {
    display: "flex",
    width: "100%",
    margin: "0",
    padding: "0 4px",
    justifyContent: "space-between",
    "& a": {
      width: "200px",
      lineHeight: "24px",
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& span": {
      width: "40px",
      lineHeight: "24px",
    },
  },
});

interface IProps {
  category: CategoryType;
  posts: Array<IPost>;
}

const LatestBoardPaper = (props: IProps) => {
  const classes = useStyles();
  const { category, posts } = props;

  return (
    <Grid container direction='column' className={classes.paper}>
      <Grid container justify='space-between' style={{ padding: "0 4px", marginTop: "4px" }}>
        <Typography style={{ lineHeight: "24px", fontSize: "1rem", fontWeight: "bold" }}>{PostUtil.getCategoryName(category)}</Typography>
        <Button href={`/board/${category}`} style={{ minWidth: "22px", height: "22px", padding: "0", float: "right" }} aria-label='Board-Button'>
          <AddIcon style={{ width: "20px", height: "20px" }} />
        </Button>
      </Grid>
      <Divider style={{ width: "100%", height: "2px", margin: "4px 0" }} />
      <Grid container justify='space-between'>
        {posts ? (
          posts.length > 0 ? (
            posts.map((post: IPost) => (
              <div key={post.seq} className={classes.linkItem}>
                <Link href={`/board/${category}/${post.seq}`} aria-label={`post-${post.seq}`}>
                  {post.title}
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
