import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import { MyAlertState, MyBackdropState } from "state/index";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import IUserInfo from "interfaces/User/IUserInfo";
import { setUserInfo } from "utils/UserUtil";
import { getStringByDate } from "utils/CommonUtil";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  text: {
    width: "90px",
    lineHeight: "40px",
    margin: "0 5px",
    fontWeight: "bolder",
  },
  btn: {
    width: "90px",
    height: "36px",
    margin: "2px 5px",
    padding: "0",
  },
  box: {
    width: `calc(100% - 110px)`,
    margin: "0 5px",
  },
  input: {
    width: `calc(100% - 210px)`,
    margin: "0 5px",
    "& input": {
      height: "40px",
      padding: "0 10px",
    },
  },
}));

const duration = 3000;

function ViewUserInfo(props: IProps) {
  const classes = useStyles();

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [openKakao, setOpenKakao] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const userInfo: IUserInfo = props.userInfo;

  const _onSave = async () => {
    setMyBackdrop(true);

    const editUserInfo: IUserInfo = Object.assign(userInfo);
    editUserInfo.openKakao = openKakao;

    const res = await setUserInfo(editUserInfo);

    if (res.code === 200) {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });
    }

    setTimeout(() => {
      setMyBackdrop(false);
      window.location.reload();
    }, duration);
  };

  return (
    <React.Fragment>
      <Grid container direction='column' style={{ minWidth: "480px", margin: "10px 0", padding: "0" }}>
        <Typography variant='h4' style={{ marginBottom: "30px" }}>
          회원 정보
        </Typography>

        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>아이디</Typography>
          <Grid item xs={6} className={classes.box}>
            {userInfo.id}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>이메일</Typography>
          <Grid item xs={6} className={classes.box}>
            {userInfo.email}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>오픈카톡</Typography>
          <Grid item xs={6}>
            {isEdit ? (
              <TextField
                className={classes.input}
                variant='outlined'
                required
                fullWidth
                name='openKakao'
                id='openKakao'
                value={openKakao}
                onChange={e => setOpenKakao(e.target.value)}
              />
            ) : (
              userInfo.openKakao
            )}
          </Grid>
          {isEdit ? (
            <Button variant='outlined' color='primary' className={classes.btn} onClick={_onSave}>
              저장
            </Button>
          ) : (
            <Button
              variant='outlined'
              color='secondary'
              className={classes.btn}
              onClick={() => {
                setIsEdit(true);
              }}>
              수정
            </Button>
          )}
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>등급</Typography>
          <Grid item xs={6} className={classes.box}>
            {userInfo.grade}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>포인트</Typography>
          <Grid item xs={6} className={classes.box}>
            {userInfo.point}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>대표 캐릭터</Typography>
          <Grid item xs={6} style={{ maxWidth: `calc(100%-210px)` }}>
            {userInfo.titleAccount ? `${userInfo.titleAccount.character}@${userInfo.titleAccount.server}` : ""}
          </Grid>
          <Button variant='outlined' color='secondary' className={classes.btn} fullWidth href='/myinfo/auth'>
            변경
          </Button>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>회원 가입일</Typography>
          <Grid item xs={6} className={classes.box}>
            {getStringByDate(userInfo.createDate, true)}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Typography className={classes.text}>정보 수정일</Typography>
          <Grid item xs={6} className={classes.box}>
            {getStringByDate(userInfo.editDate, true)}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ViewUserInfo;
