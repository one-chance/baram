import React, { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { CommentListState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

import PostTitle from "components/Board/PostTitle";
import PostContent from "components/Board/PostContent";
import PostComment from "components/Board/PostComment";
import PostCommentList from "components/Board/PostCommentList";

import IPost from "interfaces/Board/IPost";
import { getPost, DeletePost } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px auto",
    width: "960px",
  },
  postBox: {
    border: "1px solid lightgray",
    padding: "0 20px",
  },
  editBox: {
    padding: "0 10px",
  },
  dlgBox: {
    minWidth: "400px",
    minHeight: "150px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& h6": {
      width: "100%",
      textAlign: "center",
      fontWeight: "bold",
    },
  },
}));

const duration = 2000;
const category = "tip";

function TipPostView({ match }: any) {
  const classes = useStyles();
  const { seq } = match.params;
  const commentList = useRecoilValue(CommentListState);
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [post, setPost] = useState<IPost>();
  const [writer, setWriter] = useState("");
  const signInUserId = getNowUserInfo().id;

  const _onLoad = async () => {
    const res = await getPost(category, seq);
    if (res) {
      setPost(res);
      setWriter(res.writer.id);
    }
  };

  const _onEdit = () => {
    if (writer === signInUserId) {
      document.location.href = `/board/write/${category}/${seq}`;
    } else {
      alert("권한이 없습니다.");
    }
  };

  const delPost = async () => {
    setMyBackdrop(true);

    const res = await DeletePost(category, seq);
    if (res.code === 200) {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });

      setTimeout(() => (document.location.href = `/board/${category}`), duration);
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });

      setTimeout(() => {
        setMyBackdrop(false);
      }, duration);
    }
  };

  const _onOpenConfirm = () => {
    if (writer !== signInUserId) alert("권한이 없습니다.");
    else setOpenConfirm(true);
  };

  const _onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const _onAgreeConfirm = () => {
    setOpenConfirm(false);
    delPost();
  };

  useEffect(() => {
    _onLoad();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Grid container justify='center' className={classes.root}>
        {post ? (
          <Grid container direction='column' className={classes.postBox}>
            <PostTitle post={post} />
            <Grid container justify='flex-end' className={classes.editBox}>
              <Button onClick={_onEdit}>수정</Button>
              <Button onClick={_onOpenConfirm}>삭제</Button>
            </Grid>
            <PostContent post={post} />
            <PostComment post={post} />
            <PostCommentList post={post} commentList={commentList} />
          </Grid>
        ) : (
          <Container>게시글 내용을 불러오고 있습니다.</Container>
        )}
      </Grid>

      <Dialog open={openConfirm} onClose={_onCloseConfirm}>
        <DialogContent dividers={true} className={classes.dlgBox}>
          <Typography variant='h6'>게시물을 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions style={{ padding: "0" }}>
          <Button onClick={_onCloseConfirm} color='primary' style={{ fontWeight: "bold" }}>
            취소
          </Button>
          <Button onClick={_onAgreeConfirm} color='primary' style={{ fontWeight: "bold" }}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TipPostView;
