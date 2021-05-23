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
import MyGridDivider from "elements/Grid/MyGridDivider";

import { CreateRecomment, DeleteComment, EditComment } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";
import RecommentItem from "components/Board/RecommentItem";

interface IProps {
  post: IPost;
  commentItem: IComment;
}

const useStyles = makeStyles(() => ({
  commentWrapper: {
    backgroundColor: "#f1f3f8",
    padding: "0px 10px",
  },
  recommentWrapper: {
    backgroundColor: "#d6e0f0",
    padding: "0px 10px",
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
  buttonWrapper: {
    width: "auto",
    height: "auto",
  },
  inputText: {
    backgroundColor: "#ffffff",
    border: "2px",
    margin: "5px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "5px",
    },
  },
  deleteCommentMessage: {
    fontStyle: "italic",
  },
  btn: {
    minWidth: "40px",
    padding: "0",
    float: "left",
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
  const [editCommentIdx, setEditCommentIdx] = useState<number | undefined>(undefined);

  const [recommentCount, setRecommentCount] = useState<number>(0);
  const [recommentIdx, setRecommentIdx] = useState<number | undefined>(undefined); // 답글 달 대상이 될 댓글 인덱스 값
  const [inputRecommentMessage, setInputRecommentMessage] = useState("");
  const [recommentList, setRecommentList] = useState<Array<IRecomment>>([]);

  const _onSubmitRecomment = async () => {
    setMyBackdrop(true);

    if (post.seq && comment && comment.idx !== undefined) {
      const res = await CreateRecomment(post, comment, recommentCount, inputRecommentMessage);

      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        setRecommentIdx(undefined);
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
          setEditCommentIdx(undefined);
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

  const _onDeleteComment = async (commentIdx?: number) => {
    setMyBackdrop(true);

    if (commentIdx !== undefined) {
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
    }
  };

  useEffect(() => {
    setComment(commentItem);
  }, [commentItem]);

  useEffect(() => {
    if (comment !== undefined) {
      if (comment.recommentList && comment.recommentList.length > 0) setRecommentList(comment.recommentList);

      setRecommentCount(comment.recommentCount);
    }
  }, [comment]);

  return (
    <>
      {comment !== undefined && (
        <>
          <Grid container direction='column' justify='space-between' className={classes.commentWrapper}>
            <Grid container justify='space-between' style={{ margin: "5px 0" }}>
              <div>
                <Typography style={{ width: "auto", fontWeight: "bold", margin: "0 5px", float: "left" }}>
                  {getTitleAccountString(comment.writer.titleAccount)}
                </Typography>

                <div className={classes.textBox}>
                  <Typography>{getStringByDate(comment.writer.lastEditDate, true)}</Typography>
                  <Typography style={{ color: "grey" }}>
                    {comment.isDeleted ? "(삭제됨)" : comment.writer.createDate !== comment.writer.lastEditDate && "(편집됨)"}
                  </Typography>
                </div>
              </div>

              <Grid item container justify='flex-end' className={classes.buttonWrapper}>
                {!comment.isDeleted && (
                  <>
                    {editCommentIdx === comment.idx ? (
                      <Grid container direction='row' className={classes.buttonWrapper}>
                        <Button className={classes.btn} onClick={() => _onEditComment()}>
                          완료
                        </Button>
                        <Button className={classes.btn} onClick={() => setEditCommentIdx(undefined)}>
                          취소
                        </Button>
                      </Grid>
                    ) : (
                      <Grid container direction='row' className={classes.buttonWrapper}>
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
                                setRecommentIdx(undefined);
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
                      </Grid>
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
                  rows={3}
                  placeholder={comment.message}
                  value={editCommentMessage}
                  onChange={e => setEditCommentMessage(e.target.value)}
                />
              </Grid>
            ) : (
              <InputBase
                className={comment.isDeleted ? classes.deleteCommentMessage : ""}
                multiline={true}
                rows={3}
                fullWidth
                value={comment.isDeleted ? "===== 삭제된 댓글입니다 =====" : comment.message}
                inputProps={{ readOnly: true }}
                style={{ padding: "0 5px", margin: "10px 5px" }}
              />
            )}

            <MyGridDivider />
          </Grid>

          <Grid container direction='row' justify='space-between' className={classes.recommentWrapper}>
            {recommentIdx !== undefined && (
              <>
                <Grid item style={{ margin: "5px" }}>
                  <Typography variant='subtitle1'>
                    <SubdirectoryArrowRightIcon />
                  </Typography>
                </Grid>
                <Grid item style={{ width: "800px" }}>
                  <TextField
                    variant='outlined'
                    id='input-recomment'
                    className={classes.inputText}
                    multiline
                    fullWidth
                    rows={4}
                    placeholder='욕설, 비방, 분란을 조장하는 답글은 제재될 수 있습니다.'
                    value={inputRecommentMessage}
                    onChange={e => setInputRecommentMessage(e.target.value)}
                  />
                </Grid>
                <Grid container alignItems='center' direction='column' className={classes.buttonWrapper} style={{ padding: "15px 0" }}>
                  <Button onClick={() => _onSubmitRecomment()} style={{ padding: "5px" }}>
                    등록
                  </Button>
                  <Button onClick={() => setRecommentIdx(undefined)} style={{ padding: "5px" }}>
                    취소
                  </Button>
                </Grid>
                <MyGridDivider />
              </>
            )}
          </Grid>
          {recommentList &&
            recommentList.length > 0 &&
            recommentList.map(recomment => <RecommentItem key={recomment.idx} post={post} comment={comment} recommentItem={recomment} />)}
        </>
      )}
    </>
  );
};

export default CommentItem;
