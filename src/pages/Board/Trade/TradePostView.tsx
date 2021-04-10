import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { CommentListState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PostTitle from "components/Board/PostTitle";
import PostContent from "components/Board/PostContent";
import PostComment from "components/Board/PostComment";
import PostCommentList from "components/Board/PostCommentList";

import IPost from "interfaces/Board/IPost";
import { getPost, DeletePost } from "utils/PostUtil";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "10px",
  },
  editBox: {
    padding: "0 10px",
  },
}));

const duration = 2000;
const category = "trade";

function TradeBoardView({ match }: any) {
  const classes = useStyles();
  const { seq } = match.params;
  const [commentList, setCommentList] = useRecoilState(CommentListState);
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [post, setPost] = React.useState<IPost>();

  useEffect(() => {
    _onLoad();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (post && post.commentList && post.commentList.length > 0) setCommentList(post.commentList);
    // eslint-disable-next-line
  }, [post]);

  const _onLoad = async () => {
    const res = await getPost(category, seq);
    if (res) setPost(res);
  };

  const _onEdit = () => {
    document.location.href = `/board/write/${category}/${seq}`;
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
    setOpenConfirm(true);
  };

  const _onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const _onAgreeConfirm = () => {
    setOpenConfirm(false);
    delPost();
  };

  return (
    <React.Fragment>
      <Grid container justify='center' className={classes.root}>
        {post ? (
          <Container style={{ border: "1px solid lightgray", padding: "0 20px" }}>
            <PostTitle post={post} />
            <Grid container justify='flex-end' className={classes.editBox}>
              <Button onClick={_onEdit}>수정</Button>
              <Button onClick={_onOpenConfirm}>삭제</Button>
            </Grid>
            <PostContent post={post} />
            <PostComment post={post} />
            <PostCommentList post={post} commentList={commentList} />
          </Container>
        ) : (
          <Container>게시글 내용을 불러오고 있습니다.</Container>
        )}
      </Grid>

      <Dialog open={openConfirm} onClose={_onCloseConfirm} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{"정말 삭제하시겠습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>삭제한 게시글은 되돌릴 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={_onCloseConfirm} color='primary'>
            취소
          </Button>
          <Button onClick={_onAgreeConfirm} color='primary'>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TradeBoardView;
