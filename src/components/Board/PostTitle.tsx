import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CommentListState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";

import IPost from "interfaces/Board/IPost";
import * as CommonUtil from "utils/CommonUtil";
import { MyAlertState } from "state/index";
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
    marginTop: "10px",
  },
  middleText: {
    margin: "auto",
    verticalAlign: "middle",
  },
  btn: {
    minWidth: "40px",
    padding: "0",
    margin: "0 5px",
    fontSize: "0.8rem",
  },
}));

function PostTitle(props: IProps) {
  const post: IPost = props.post;
  const classes = useStyles();

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
    <>
      <Grid container direction='column' className={classes.form}>
        <Grid container direction='row' style={{ margin: "5px 0" }}>
          <Grid item xs={8}>
            <Typography variant='h6' className={classes.title} style={{ color: "gray", margin: "0 10px", float: "left" }}>
              [{categoryName}]
            </Typography>
            <Typography variant='h5' style={{ float: "left" }}>
              {post.title}
            </Typography>
          </Grid>
          <Grid item container justify='space-around' xs={4}>
            <div>
              <CreateIcon fontSize='small' style={{ height: "32px", margin: "0 5px", float: "left" }} />
              <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
                {post.writer.id}
              </Typography>
            </div>
            <div>
              <VisibilityIcon fontSize='small' style={{ height: "32px", margin: "0 5px", float: "left" }} />
              <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
                {post.viewCount}
              </Typography>
            </div>
            <div>
              <MessageIcon fontSize='small' style={{ height: "32px", margin: "0 5px", float: "left" }} />
              <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
                {count}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <MyGridDivider />

        <Grid container alignItems='center' justify='space-between' style={{ width: "100%", color: "darkgray", padding: "0 10px", margin: "5px 0" }}>
          <div>
            {window.location.href}
            <Button variant='outlined' className={classes.btn} onClick={_onCopyUrl}>
              복사
            </Button>
          </div>
          <Typography variant='h6' style={{ margin: "2px 0", fontSize: "0.8rem" }}>
            {post.writer.createDate && `작성일 : ${CommonUtil.getStringByDate(post.writer.createDate, true)}`}
            {post.writer.lastEditDate && ` / 수정일 : ${CommonUtil.getStringByDate(post.writer.lastEditDate, true)}`}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PostTitle;
