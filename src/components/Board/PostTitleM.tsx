import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CommentListState } from "state/index";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import IPost from "interfaces/Board/IPost";
import * as CommonUtil from "utils/CommonUtil";
import { MyAlertState, MyBackdropState } from "state/index";
import { getCategoryName, DeletePost } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";
import MyGridDivider from "elements/Grid/MyGridDivider";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles(theme => ({
  title: {
    padding: "0",
    lineHeight: "30px",
  },
  infoText: {
    lineHeight: "20px",
    fontSize: "0.8rem",
    margin: "0",
    padding: "0",
    float: "left",
  },
  infoIcon: {
    width: "15px",
    height: "15px",
    margin: "2.5px",
    float: "left",
  },
  btn: {
    height: "25px",
    minWidth: "70px",
    padding: "0",
    margin: "5px",
    fontSize: "0.8rem",
  },
  dlgBox: {
    padding: "20px 10px",
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
const category = "free";

function PostTitleM(props: IProps) {
  const classes = useStyles();
  const post: IPost = props.post;
  const seq = post.seq;
  const writer = post.writer.id;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const copyUrl = document.location.href;
  const signInUserId = getNowUserInfo().id;
  const categoryName = getCategoryName(post.category);

  const [count, setCount] = useState(0);
  const [commentList, setCommentList] = useRecoilState(CommentListState);
  const [openConfirm, setOpenConfirm] = useState(false);

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

  const _onEdit = () => {
    if (writer === signInUserId) {
      document.location.href = `/board/write/${category}/${seq}`;
    } else {
      alert("권한이 없습니다.");
    }
  };

  const delPost = async () => {
    setMyBackdrop(true);

    const res = await DeletePost(category, seq as number);
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
      <Grid container>
        <Grid container direction='row' style={{ margin: "5px 0" }}>
          <Grid container style={{ margin: "5px 0", padding: "0 10px" }}>
            <Typography variant='h6' className={classes.title}>
              [{categoryName ? categoryName.split(" ")[0] : ""}] {post.title}
            </Typography>
          </Grid>
          <Grid container style={{ margin: "5px 0", padding: "0 10px" }}>
            <CreateIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{CommonUtil.getTitleAccountString(post.writer.titleAccount)}</Typography>
            <Typography className={classes.infoText} style={{ margin: "0 10px" }}>
              |
            </Typography>
            <VisibilityIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{post.viewCount}</Typography>
            <Typography className={classes.infoText} style={{ margin: "0 10px" }}>
              |
            </Typography>
            <MessageIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{count}</Typography>
          </Grid>
        </Grid>
        <MyGridDivider />

        <Grid container alignItems='center' justify='space-between' style={{ color: "darkgray", padding: "0 10px", margin: "5px 0" }}>
          <Button variant='outlined' className={classes.btn} onClick={_onCopyUrl}>
            URL 복사
          </Button>
          <div>
            <Button onClick={_onEdit} style={{ minWidth: "50px", lineHeight: "25px", padding: "0" }}>
              수정
            </Button>
            <Button onClick={_onOpenConfirm} style={{ minWidth: "50px", lineHeight: "25px", padding: "0" }}>
              삭제
            </Button>
          </div>
          {/*           <Typography variant='h6' style={{ margin: "2px 0", fontSize: "0.8rem" }}>
            {post.writer.createDate && `작성일 : ${CommonUtil.getStringByDate(post.writer.createDate, true)}`}
            {post.writer.lastEditDate && ` / 수정일 : ${CommonUtil.getStringByDate(post.writer.lastEditDate, true)}`}
          </Typography> */}
        </Grid>
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
    </>
  );
}

export default PostTitleM;
