import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import IPost from "interfaces/Board/IPost";
import IComment from "interfaces/Board/IComment";
import IRecomment from "interfaces/Board/IRecomment";
import * as CommonUtil from "utils/CommonUtil";
import MyGridDivider from 'elements/Grid/MyGridDivider';

import { EditRecomment, DeleteRecomment } from "utils/PostUtil";

interface IProps {
  post: IPost,
  comment: IComment,
  recommentItem: IRecomment
}

const useStyles = makeStyles(() => ({
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
    width: '80px',
    height: 'auto'
  },
  inputText: {
    backgroundColor: "#ffffff",
    border: "2px",
    margin: '5px'
  },
  editNotice: {
    color: 'grey',
    fontSize: '8px',
    marginLeft: '3px'
  },
  deleteCommentMessage: {
    fontStyle: 'italic',
    textDecoration: 'underline'
  }
}));

const duration = 2000;

const RecommentItem = (props: IProps) => {
  const classes = useStyles();
  const { post, comment, recommentItem } = props;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [recomment, setRecomment] = useState<IRecomment>();
  const [editRecommentMessage, setEditRecommentMessage] = useState("");
  const [editRecommentIdx, setEditRecommentIdx] = useState<number | undefined>(undefined);

  useEffect(() => {
    setRecomment(recommentItem);
  }, [recommentItem]);

  const _onEditRecomment = async () => {
    setMyBackdrop(true);

    if (recomment !== undefined) {
      const editRecomment = {
        ...recomment,
        message: editRecommentMessage,
      };

      if (recomment && recomment.idx !== undefined && comment.idx !== undefined) {
        const res = await EditRecomment(post, comment.idx, editRecomment);
        if (res.code === 200) {
          setMyAlert({
            isOpen: true,
            severity: "success",
            duration: duration,
            message: res.message,
          });

          setMyBackdrop(false);
          setEditRecommentIdx(undefined);
          setRecomment(res.recomment);
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

  const _onDeleteRecomment = async () => {
    setMyBackdrop(true);

    if (recomment && recomment.idx !== undefined && comment.idx !== undefined) {
      const res = await DeleteRecomment(post, comment.idx, recomment);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        setMyBackdrop(false);
        setRecomment(res.recomment);
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
    {
      recomment !== undefined &&
      <>
      <Grid container direction='row' className={classes.recommentWrapper}>
        <Grid item className={classes.writerWrapper}>
            {recomment.writer.id}
            <span className={classes.editNotice}>
              { recomment.isDeleted ? '(삭제됨)'
              : recomment.writer.createDate !== recomment.writer.lastEditDate && '(편집됨)'}
            </span>
            <br />
            {CommonUtil.getStringByDate(recomment.writer.lastEditDate, true)}
          </Grid>
          {
            editRecommentIdx === recomment.idx ?
              <Grid item className={classes.messageWrapper}>
                <TextField
                  id='edit-comment'
                  variant='outlined'
                  className={classes.inputText}
                  multiline
                  fullWidth
                  rows={4}
                  placeholder={recomment.message}
                  value={editRecommentMessage}
                  onChange={e => setEditRecommentMessage(e.target.value)}
                />
              </Grid>
            :
              <Grid item className={classes.messageWrapper}>
                <Typography className={recomment.isDeleted ? classes.deleteCommentMessage : ''}>
                  { recomment.isDeleted ? '삭제된 답글입니다.' : recomment.message}
                </Typography>
              </Grid>
          }
          <Grid item className={classes.buttonWrapper}>
            {
              !recomment.isDeleted &&
              <>
                {editRecommentIdx === recomment.idx ?
                  <Grid container direction='column' className={classes.buttonWrapper}>
                    <Grid item>
                      <Button onClick={() => _onEditRecomment()}>완료</Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => setEditRecommentIdx(undefined)}>취소</Button>
                    </Grid>
                  </Grid>
                :
                  <Grid container direction='column' className={classes.buttonWrapper}>
                    {
                      recomment.writer.key === CommonUtil.getNowKey() &&
                      <>
                        <Grid item>
                          <Button onClick={() => {
                            setEditRecommentMessage(recomment.message);
                            setEditRecommentIdx(recomment.idx);
                          }}>
                            수정
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button onClick={() => _onDeleteRecomment()}>
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
      </>
    }
    </>
  );
}

export default RecommentItem;