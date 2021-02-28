import React from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { CommentListState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
    marginTop: "40px",
    padding: 0
  },
  input: {
    backgroundColor: "#ffffff",
    border: "2px",
  },
  inputButton: {
    height: "100%",
  },
  footer: {
    marginTop: "50px",
    textAlign: "center",
  },
  table: {
    minWidth: 500,
    padding: "20px",
    backgroundColor: "#ffffff",
    "& .MuiTablePagination-root": {
      textAlign: "center",
      align: "center",
      margin: "auto",
    },
  },
  commentRow: {
    backgroundColor: "#f1f3f8",
  },
  recommentRow: {
    backgroundColor: "#d6e0f0",
  },
  commentButton: {
    spacing: "5",
  },
  tableButton: {
    flexShrink: 0,
    width: "auto",
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
        post.commentIdx = res.commentIdx;
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
    <Container className={classes.root}>
      <Grid container item xs={12}>
        <Grid container item xs={12}>
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
      </Grid>
    </Container>
  );
}

export default PostComment;
