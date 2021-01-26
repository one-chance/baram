import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CommentListState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import VisibilityIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";

import { MyAlertState } from "state/index";

import IPost from "interfaces/Board/IPost";

import { getCategoryName } from "utils/PostUtil";
import MyGridDivider from "elements/Grid/MyGridDivider";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles(theme => ({
  title: {
    padding: "0",
    lineHeight: "30px",
  },
  form: {
    margin: "20px 0 0 0",
    float: "left",
  },
  middleText: {
    margin: "auto",
    verticalAlign: "middle",
  },
}));

function PostTitle(props: IProps) {
  const classes = useStyles();
  const post: IPost = props.post;

  const categoryName = getCategoryName(post.category);
  const [count, setCount] = useState(0);
  const [commentList, setCommentList] = useRecoilState(CommentListState);

  const setMyAlert = useSetRecoilState(MyAlertState);
  const copyUrl = document.location.href;

  const _onCopyUrl = () => {
    var ta = document.createElement("textarea");
    ta.value = copyUrl;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);

    setMyAlert({
      isOpen: true,
      severity: "success",
      duration: 2000,
      message: "클립보드에 복사되었습니다.",
    });
  };

  //NOTE 최초 로딩 시
  useEffect(() => {
    if (post.commentList) {
      setCount(post.commentList.length);
      setCommentList(post.commentList);
    }
    // eslint-disable-next-line
  }, []);

  //NOTE 댓글 목록 변경 시
  useEffect(() => {
    setCount(commentList.length);
  }, [commentList]);

  return (
    <Container>
      <Grid container item xs={12} spacing={1} className={classes.form}>
        <Grid item xs={8}>
          <Typography variant='h6' className={classes.title} style={{ color: "gray", margin: "0 5px", float: "left" }}>
            [{categoryName}]
          </Typography>
          <Typography variant='h5' style={{ float: "left" }}>
            {post.title}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
            {post.writer.id}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <VisibilityIcon fontSize='small' style={{ height: "32px", margin: "0 5px", float: "left" }} />
          <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
            {post.viewCount}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <MessageIcon fontSize='small' style={{ height: "32px", margin: "0 5px", float: "left" }} />
          <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
            {count}
          </Typography>
        </Grid>
        <MyGridDivider />
        <Grid item xs={12} style={{ color: "darkgray", padding: "0 10px", margin: "2px 0" }}>
          {window.location.href}
          <Button variant='outlined' color='default' style={{ minWidth: "40px", padding: "0", margin: "0 5px", fontSize: "0.8rem" }} onClick={_onCopyUrl}>
            복사
          </Button>
          <Typography variant='h6' style={{ margin: "2px 0", fontSize: "0.8rem", float: "right" }}>
            작성 [{post.writer.createDateString}] | 수정 [{post.writer.lastEditDateString}]
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PostTitle;
