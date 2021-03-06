import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import IPost from "interfaces/Board/IPost";
import IComment from "interfaces/Board/IComment";
import IRecomment from "interfaces/Board/IRecomment";
import * as CommonUtil from "utils/CommonUtil";

import { EditRecomment, DeleteRecomment } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";

interface IProps {
  post: IPost;
  comment: IComment;
  recommentItem: IRecomment;
}

const useStyles = makeStyles(() => ({
  recommentWrapper: {
    width: `calc(100% - 44px)`,
    backgroundColor: "#d6e0f0",
    padding: "0",
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
    margin: "5px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "5px",
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
}));

const duration = 2000;

const RecommentItem = (props: IProps) => {
  const classes = useStyles();
  const { post, comment, recommentItem } = props;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const signInUserKey = getNowUserInfo().key;

  const [recomment, setRecomment] = useState<IRecomment>();
  const [editRecommentMessage, setEditRecommentMessage] = useState("");
  const [editRecommentIdx, setEditRecommentIdx] = useState<number>(99);

  useEffect(() => {
    setRecomment(recommentItem);
  }, [recommentItem]);

  const _onEditRecomment = async () => {
    setMyBackdrop(true);

    if (recomment) {
      const editRecomment = {
        ...recomment,
        message: editRecommentMessage,
      };

      const res = await EditRecomment(post, comment.idx, editRecomment);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        setMyBackdrop(false);
        setEditRecommentIdx(99);
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

  const _onDeleteRecomment = async () => {
    setMyBackdrop(true);

    if (recomment) {
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
      {recomment && (
        <>
          <Grid container direction='row' style={{ backgroundColor: "#d6e0f0", borderBottom: "1px solid lightgray" }}>
            <Grid item style={{ padding: "4px 4px 4px 12px", color: "gray" }}>
              <Typography variant='subtitle1'>
                <SubdirectoryArrowRightIcon />
              </Typography>
            </Grid>
            <Grid item container direction='column' justify='space-between' className={classes.recommentWrapper}>
              <Grid container justify='space-between' style={{ margin: "4px 0" }}>
                <div>
                  <Typography style={{ width: "auto", fontWeight: "bold", margin: "0 4px", float: "left" }}>
                    {CommonUtil.getTitleAccountString(recomment.writer.titleAccount)}
                  </Typography>

                  <div className={classes.textBox}>
                    <Typography>{CommonUtil.getStringByDate(recomment.writer.lastEditDate, false)}</Typography>
                    <Typography style={{ color: "grey" }}>
                      {recomment.isDeleted ? "(삭제)" : recomment.writer.createDate !== recomment.writer.lastEditDate && "(편집)"}
                    </Typography>
                  </div>
                </div>

                <Grid item>
                  {!recomment.isDeleted && (
                    <>
                      {editRecommentIdx === recomment.idx ? (
                        <>
                          <Button className={classes.btn} onClick={() => _onEditRecomment()}>
                            완료
                          </Button>

                          <Button className={classes.btn} onClick={() => setEditRecommentIdx(99)}>
                            취소
                          </Button>
                        </>
                      ) : (
                        <>
                          {recomment.writer.key === signInUserKey && (
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
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>

              {editRecommentIdx === recomment.idx ? (
                <Grid container>
                  <TextField
                    id='edit-comment'
                    variant='outlined'
                    className={classes.inputText}
                    multiline
                    fullWidth
                    placeholder={recomment.message}
                    value={editRecommentMessage}
                    onChange={e => setEditRecommentMessage(e.target.value)}
                  />
                </Grid>
              ) : (
                <InputBase
                  className={recomment.isDeleted ? classes.deleteCommentMessage : ""}
                  multiline
                  fullWidth
                  value={recomment.isDeleted ? "삭제된 답글입니다." : recomment.message}
                  inputProps={{ readOnly: true }}
                  style={{ padding: "0 5px", margin: "10px 5px" }}
                />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default RecommentItem;
