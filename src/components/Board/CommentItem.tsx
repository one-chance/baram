import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { CommentListState } from "state/index";
import SignInDialogState from "state/common/SignInDialogState";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import IPost from "interfaces/Board/IPost";
import IComment from "interfaces/Board/IComment";
import IRecomment from "interfaces/Board/IRecomment";
import { getStringByDate, getTitleAccountString } from "utils/CommonUtil";

import { CreateRecomment, DeleteComment, EditComment } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";
import RecommentItem from "components/Board/RecommentItem";

interface IProps {
  post: IPost;
  commentItem: IComment;
}

const useStyles = makeStyles(() => ({
  commentWrapper: {
    borderBottom: "1px solid lightgray",
    backgroundColor: "#f1f3f8",
    padding: "0px 10px",
  },
  recommentWrapper: {
    borderBottom: "1px solid lightgray",
    backgroundColor: "#d6e0f0",
    paddingLeft: "10px",
  },
  textBox: {
    alignItems: "center",
    float: "left",
    "& p": {
      width: "auto",
      fontSize: "0.8rem",
      margin: "2.5px 5px",
      float: "left",
    },
  },
  inputText: {
    backgroundColor: "#ffffff",
    border: "2px",
    margin: "5px 0",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "5px 10px",
    },
  },
  deleteCommentMessage: {
    color: "gray",
  },
  btn: {
    minWidth: "40px",
    padding: "0",
    float: "left",
  },
  recommentBtn: {
    minWidth: "60px",
    padding: "0",
  },
}));

const duration = 2000;

const CommentItem = (props: IProps) => {
  const classes = useStyles();
  const { post, commentItem } = props;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const setCommentList = useSetRecoilState(CommentListState);
  const setIsSignInOpen = useSetRecoilState(SignInDialogState);
  const signInUserKey = getNowUserInfo().key;

  const [comment, setComment] = useState<IComment>();
  const [editCommentMessage, setEditCommentMessage] = useState("");
  const [editCommentIdx, setEditCommentIdx] = useState<number>(999);

  const [recommentCount, setRecommentCount] = useState<number>(0);
  const [recommentIdx, setRecommentIdx] = useState<number>(99); // 답글 달 대상이 될 댓글 인덱스 값
  const [inputRecommentMessage, setInputRecommentMessage] = useState("");
  const [recommentList, setRecommentList] = useState<Array<IRecomment>>([]);

  const _onSubmitRecomment = async () => {
    if (inputRecommentMessage === "") return;

    setMyBackdrop(true);

    if (post.seq && comment) {
      const res = await CreateRecomment(post, comment, recommentCount, inputRecommentMessage);

      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        setRecommentIdx(99);
        setInputRecommentMessage("");
        setRecommentList(recommentList.concat(res.recomment));
        setRecommentCount(res.recommentCount);
        setMyBackdrop(false);
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

  const _onEditComment = async () => {
    setMyBackdrop(true);

    if (comment) {
      const editComment: IComment = {
        ...comment,
        message: editCommentMessage,
      };

      if (post.seq) {
        const res = await EditComment(post, editComment);
        if (res.code === 200) {
          setMyAlert({
            isOpen: true,
            severity: "success",
            duration: duration,
            message: res.message,
          });

          setMyBackdrop(false);
          setEditCommentIdx(999);
          setComment(res.comment);
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
    }
  };

  const _onDeleteComment = async (commentIdx: number) => {
    setMyBackdrop(true);

    const res = await DeleteComment(post, commentIdx);
    if (res.code === 200) {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });

      setMyBackdrop(false);
      setCommentList(res.commentList);
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

  useEffect(() => {
    setComment(commentItem);
  }, [commentItem]);

  useEffect(() => {
    if (comment) {
      if (comment.recommentList && comment.recommentList.length > 0) setRecommentList(comment.recommentList);

      setRecommentCount(comment.recommentCount);
    }
  }, [comment]);

  return (
    <>
      {comment && (
        <>
          <Grid container direction='column' justify='space-between' className={classes.commentWrapper}>
            <Grid container justify='space-between' style={{ margin: "4px 0" }}>
              <div>
                <Typography style={{ width: "auto", fontWeight: "bold", margin: "0 4px", float: "left" }}>
                  {getTitleAccountString(comment.writer.titleAccount)}
                </Typography>

                <div className={classes.textBox}>
                  <Typography>{getStringByDate(comment.writer.lastEditDate, false)}</Typography>
                  <Typography style={{ color: "grey" }}>
                    {comment.isDeleted ? "(삭제)" : comment.writer.createDate !== comment.writer.lastEditDate && "(편집)"}
                  </Typography>
                </div>
              </div>

              <Grid item>
                {!comment.isDeleted && (
                  <>
                    {editCommentIdx === comment.idx ? (
                      <>
                        <Button className={classes.btn} onClick={() => _onEditComment()}>
                          완료
                        </Button>
                        <Button className={classes.btn} onClick={() => setEditCommentIdx(999)}>
                          취소
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className={classes.btn}
                          onClick={() => {
                            if (signInUserKey) {
                              setRecommentIdx(comment.idx);
                            } else {
                              setIsSignInOpen(true);
                            }
                          }}>
                          답글
                        </Button>

                        {comment.writer.key === signInUserKey && (
                          <>
                            <Button
                              className={classes.btn}
                              onClick={() => {
                                setRecommentIdx(99);
                                setEditCommentMessage(comment.message);
                                setEditCommentIdx(comment.idx);
                              }}>
                              수정
                            </Button>

                            <Button className={classes.btn} onClick={() => _onDeleteComment(comment.idx)}>
                              삭제
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>

            {editCommentIdx === comment.idx ? (
              <Grid container>
                <TextField
                  id='edit-comment'
                  variant='outlined'
                  className={classes.inputText}
                  multiline
                  fullWidth
                  placeholder={comment.message}
                  value={editCommentMessage}
                  onChange={e => setEditCommentMessage(e.target.value)}
                />
              </Grid>
            ) : (
              <InputBase
                className={comment.isDeleted ? classes.deleteCommentMessage : ""}
                multiline={true}
                fullWidth
                value={comment.isDeleted ? "삭제된 댓글입니다." : comment.message}
                inputProps={{ readOnly: true }}
                style={{ padding: "0 5px", margin: "10px 5px" }}
              />
            )}
          </Grid>

          {recommentIdx !== 99 && (
            <Grid container direction='row' justify='space-between' className={classes.recommentWrapper}>
              <Typography variant='subtitle1'>
                <SubdirectoryArrowRightIcon />
              </Typography>

              <Grid item style={{ width: `calc(100% - 100px)` }}>
                <TextField
                  variant='outlined'
                  id='input-recomment'
                  className={classes.inputText}
                  multiline
                  rows={3}
                  rowsMax={10}
                  fullWidth
                  placeholder='욕설, 비방, 분란을 조장하는 답글은 제재될 수 있습니다.'
                  value={inputRecommentMessage}
                  onChange={e => setInputRecommentMessage(e.target.value)}
                />
              </Grid>
              <Grid item container alignItems='center' justify='center' direction='row' style={{ width: "70px" }}>
                <Button className={classes.recommentBtn} onClick={() => _onSubmitRecomment()}>
                  등록
                </Button>
                <Button className={classes.recommentBtn} onClick={() => setRecommentIdx(99)}>
                  취소
                </Button>
              </Grid>
            </Grid>
          )}

          {recommentList && recommentList.map(recomment => <RecommentItem key={recomment.idx} post={post} comment={comment} recommentItem={recomment} />)}
        </>
      )}
    </>
  );
};

export default CommentItem;
