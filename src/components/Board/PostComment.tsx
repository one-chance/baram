import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { CommentListState } from "state/index";
import SignInDialogState from "state/common/SignInDialogState";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import IPost from "interfaces/Board/IPost";
import { CreateComment } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles({
  root: {
    margin: "30px 0 5px 0",
    padding: 0,
  },
  input: {
    width: `calc(100% - 75px)`,
    backgroundColor: "#ffffff",
    border: "2px",
    margin: "0 5px",
    "& .MuiOutlinedInput-multiline": {
      padding: "15px",
    },
  },
  inputButton: {
    minWidth: "60px",
    marginRight: "5px",
    height: "100%",
    padding: "0",
  },
});

const duration = 2000;

function PostComment(props: IProps) {
  const classes = useStyles();
  const { post } = props;

  const signInUser = getNowUserInfo();
  const setIsSignInOpen = useSetRecoilState(SignInDialogState);
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const setCommentList = useSetRecoilState(CommentListState);
  const [inputComment, setInputComment] = useState("");

  const _onSubmitComment = async () => {
    if (inputComment === "") return;

    if (!signInUser) {
      setIsSignInOpen(true);
      return;
    } else if (signInUser.grade < 2) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: 3000,
        message: "대표 캐릭터를 인증한 Lv.2 부터 작성할 수 있습니다.",
      });
      return;
    }

    setMyBackdrop(true);

    if (post.seq) {
      const res = await CreateComment(post, inputComment);

      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        setMyBackdrop(false);
        setInputComment("");
        setCommentList(res.commentList);
        post.commentCount = res.commentCount;
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
    }
  };

  return (
    <>
      <Grid container justify='center' direction='row' className={classes.root}>
        <TextField
          variant='outlined'
          id='input-comment'
          className={classes.input}
          multiline={true}
          rows={3}
          rowsMax={10}
          placeholder='욕설, 비방, 분란을 조장하는 댓글은 제재될 수 있습니다.'
          value={inputComment}
          onChange={e => {
            setInputComment(e.target.value);
          }}
        />

        <Button className={classes.inputButton} variant='outlined' color='primary' onClick={() => _onSubmitComment()}>
          등록
        </Button>
      </Grid>
    </>
  );
}

export default PostComment;
