import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { CommentListState } from "state/index";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import IPost from 'interfaces/Board/IPost';
import IComment from 'interfaces/Board/IComment';
import * as CommonUtil from "utils/CommonUtil";
import MyGridDivider from 'elements/Grid/MyGridDivider';

import { CreateRecomment, DeleteComment, EditComment, EditRecomment, DeleteRecomment } from "utils/PostUtil";
import RecommentItem from 'components/Board/RecommentItem';

interface IProps {
  post: IPost
  comment: IComment
}

const useStyles = makeStyles(() => ({
  commentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: "#f1f3f8",
    padding: '0px 10px',
  },
  recommentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: "#d6e0f0",
    padding: '0px 10px',
  },
  writerWrapper: {
    width: '130px',
    marginTop: '20px',
    marginBottom: '20px'
  },
  editNotice: {
    color: 'grey',
    fontSize: '8px',
    marginLeft: '3px'
  },
  messageWrapper: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '30px',
    width: 'auto',
    flexGrow: 1
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: 'auto'
  },
  inputText: {
    backgroundColor: "#ffffff",
    border: "2px",
    margin: '5px'
  },
  deleteCommentMessage: {
    fontStyle: 'italic',
    textDecoration: 'underline'
  }
}));

const duration = 2000;

const CommentItem = (props: IProps) => {
  const classes = useStyles();
  const { post, comment } = props;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const setCommentList = useSetRecoilState(CommentListState);

  const [editCommentMessage, setEditCommentMessage] = useState("");
  const [editCommentIdx, setEditCommentIdx] = useState<number | undefined>(undefined);
  
  const [recommentIdx, setRecommentIdx] = useState<number | undefined>(undefined); // 답글 달 대상이 될 댓글 인덱스 값
  const [inputRecomment, setInputRecomment] = useState("");
  const [recommentList, setRecommentList] = useState<Array<IComment>>([]);

  useEffect(() => {
    if (comment.recommentList && comment.recommentList.length > 0)
      setRecommentList(comment.recommentList);
  }, [comment]);

  const _onSubmitRecomment = async () => {
    setMyBackdrop(true);

    if (post.seq && comment && comment.idx !== undefined) {
      const res = await CreateRecomment(post, comment.idx, inputRecomment, comment.recommentIdx);

      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        setRecommentIdx(undefined);
        setInputRecomment("");
        setRecommentList(recommentList.concat(res.recomment));
        
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
  }

  const _onEditComment = async () => {
    setMyBackdrop(true);

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

  }

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
  }

  return (
    <>
    <Grid container direction='row' className={classes.commentWrapper}>
      <Grid item className={classes.writerWrapper}>
        {comment.writer.id}
        <span className={classes.editNotice}>
          { comment.isDeleted ? '(삭제됨)'
          : comment.writer.createDate !== comment.writer.lastEditDate && '(편집됨)'}
        </span>
        <br />
        {CommonUtil.getStringByDate(comment.writer.lastEditDate, true)}
      </Grid>
      {
        editCommentIdx === comment.idx ?
          <Grid item className={classes.messageWrapper}>
            <TextField
              id='edit-comment'
              variant='outlined'
              className={classes.inputText}
              multiline
              fullWidth
              rows={4}
              placeholder={comment.message}
              value={editCommentMessage}
              onChange={e => setEditCommentMessage(e.target.value)}
            />
            
          </Grid>
        :
          <Grid item className={classes.messageWrapper}>
            <Typography className={comment.isDeleted ? classes.deleteCommentMessage : ''}>
              { comment.isDeleted ? '삭제된 댓글입니다.' : comment.message}
            </Typography>
          </Grid>
      }
      <Grid item className={classes.buttonWrapper}>
        {
          !comment.isDeleted &&
          <>
            {editCommentIdx === comment.idx ?
              <Grid container direction='column' className={classes.buttonWrapper}>
                <Grid item>
                  <Button onClick={() => _onEditComment()}>완료</Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => setEditCommentIdx(undefined)}>취소</Button>
                </Grid>
              </Grid>
            :
              <Grid container direction='column' className={classes.buttonWrapper}>
                <Grid item>
                  <Button
                    onClick={() => setRecommentIdx(comment.idx)}>
                    답글
                  </Button>
                </Grid>
                {
                  comment.writer.key === CommonUtil.getNowKey() &&
                  <>
                    <Grid item>
                      <Button onClick={() => {
                        setRecommentIdx(undefined);
                        setEditCommentMessage(comment.message);
                        setEditCommentIdx(comment.idx);
                      }}>
                        수정
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => _onDeleteComment(comment.idx)}>
                        삭제
                      </Button>
                    </Grid>
                  </>
                }
              </Grid>
            }
          </>
        }
      </Grid>
      <MyGridDivider/>
    </Grid>
    <Grid container direction='row' className={classes.recommentWrapper}>
      {
        recommentIdx !== undefined &&
        <>
        <Grid item className={classes.writerWrapper}>
          <Typography variant='subtitle1'>
            <SubdirectoryArrowRightIcon /> 답글 달기
          </Typography>
        </Grid>
        <Grid item className={classes.messageWrapper}>
          <TextField
            variant='outlined'
            id='input-recomment'
            className={classes.inputText}
            multiline
            fullWidth
            rows={4}
            placeholder='욕설, 비방, 분란을 조장하는 답글은 제재될 수 있습니다.'
            value={inputRecomment}
            onChange={e => setInputRecomment(e.target.value)}
          />
        </Grid>
        <Grid container direction='column' className={classes.buttonWrapper}>
          <Grid item>
            <Button onClick={() => _onSubmitRecomment()}>등록</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setRecommentIdx(undefined)}>취소</Button>
          </Grid>
        </Grid>
        <MyGridDivider/>
        </>
      }
    </Grid>
    { recommentList && recommentList.length > 0 &&
      recommentList.map(recomment => (
        <RecommentItem 
          post={post}
          comment={comment}
          recomment={recomment} />
      ))
    }
    </>
  )
}

export default CommentItem;