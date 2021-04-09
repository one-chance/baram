import React from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { CommentListState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import IPost from "interfaces/Board/IPost";
import { CreateComment } from "utils/PostUtil";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: "30px 0 5px 0",
    padding: 0,
  },
  input: {
    backgroundColor: "#ffffff",
    border: "2px",
  },
  inputButton: {
    height: "100%",
  },
}));

const duration = 2000;

function PostComment(props: IProps) {
  const classes = useStyles();
  const { post } = props;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const setCommentList = useSetRecoilState(CommentListState);

  const [inputComment, setInputComment] = React.useState("");

  const _onSubmitComment = async () => {
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
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={11}>
        <TextField
          variant='outlined'
          id='input-comment'
          className={classes.input}
          multiline
          fullWidth
          rows={4}
          placeholder='욕설, 비방, 분란을 조장하는 댓글은 제재될 수 있습니다.'
          value={inputComment}
          onChange={e => setInputComment(e.target.value)}
        />
      </Grid>
      <Grid item xs={1}>
        <Button className={classes.inputButton} fullWidth variant='outlined' color='primary' onClick={() => _onSubmitComment()}>
          등록
        </Button>
      </Grid>
    </Grid>
  );
}

export default PostComment;
