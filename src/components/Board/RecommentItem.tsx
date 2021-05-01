import React, { useState, useEffect } from "react";
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
import MyGridDivider from "elements/Grid/MyGridDivider";

import { EditRecomment, DeleteRecomment } from "utils/PostUtil";
import { getSignInUserKey } from "utils/UserUtil";

interface IProps {
  post: IPost;
  comment: IComment;
  recommentItem: IRecomment;
}

const useStyles = makeStyles(() => ({
  recommentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#d6e0f0",
    padding: "0 20px",
  },
  writerWrapper: {
    width: "auto",
    margin: "5px",
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
  messageWrapper: {
    margin: "5px 10px 20px 10px",
    width: "auto",
    flexGrow: 1,
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
      padding: "15px",
    },
  },
  deleteCommentMessage: {
    width: "100%",
    fontStyle: "italic",
    textAlign: "center",
  },
  btn: {
    minWidth: "40px",
    padding: "0",
    float: "left",
  },
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
      {recomment !== undefined && (
        <>
          <Grid container direction='column' className={classes.recommentWrapper}>
            <Grid container justify='space-between' className={classes.writerWrapper}>
              <div>
                <Typography style={{ width: "auto", fontWeight: "bold", marginRight: "5px", float: "left" }}>
                  {CommonUtil.getTitleAccountString(recomment.writer.titleAccount)}
                </Typography>

                <div className={classes.textBox}>
                  <Typography>{CommonUtil.getStringByDate(recomment.writer.lastEditDate, true)}</Typography>
                  <Typography style={{ color: "grey" }}>
                    {recomment.isDeleted ? "(삭제됨)" : recomment.writer.createDate !== recomment.writer.lastEditDate && "(편집됨)"}
                  </Typography>
                </div>
              </div>

              <Grid item container justify='flex-end' className={classes.buttonWrapper}>
                {!recomment.isDeleted && (
                  <>
                    {editRecommentIdx === recomment.idx ? (
                      <Grid container direction='row' className={classes.buttonWrapper}>
                        <Button className={classes.btn} onClick={() => _onEditRecomment()}>
                          완료
                        </Button>

                        <Button className={classes.btn} onClick={() => setEditRecommentIdx(undefined)}>
                          취소
                        </Button>
                      </Grid>
                    ) : (
                      <Grid container direction='row' className={classes.buttonWrapper}>
                        {recomment.writer.key === getSignInUserKey() && (
                          <>
                            <Button
                              className={classes.btn}
                              onClick={() => {
                                setEditRecommentMessage(recomment.message);
                                setEditRecommentIdx(recomment.idx);
                              }}>
                              수정
                            </Button>

                            <Button className={classes.btn} onClick={() => _onDeleteRecomment()}>
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

            {editRecommentIdx === recomment.idx ? (
              <Grid container className={classes.messageWrapper}>
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
            ) : (
              <Grid container className={classes.messageWrapper}>
                <Typography className={recomment.isDeleted ? classes.deleteCommentMessage : ""}>
                  {recomment.isDeleted ? "삭제된 답글입니다." : recomment.message}
                </Typography>
              </Grid>
            )}
            <MyGridDivider />
          </Grid>
        </>
      )}
    </>
  );
};

export default RecommentItem;
