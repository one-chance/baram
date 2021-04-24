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
import { getStringByDate, getTitleAccountString } from "utils/CommonUtil";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  text: {
    width: "90px",
    lineHeight: "40px",
    margin: "0",
    fontWeight: "bolder",
  },
  btn: {
    minWidth: "60px",
    height: "36px",
    margin: "2px 0",
    padding: "0",
  },
  box: {
    width: `calc(100% - 110px)`,
    lineHeight: "40px",
    margin: "0 5px",
  },
  input: {
    width: "290px",
    margin: "0 5px",
    "& input": {
      fontSize: "0.9rem",
      height: "36px",
      padding: "0 10px",
    },
  },
}));

const duration = 3000;

function ViewUserInfo(props: IProps) {
  const classes = useStyles();

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const userInfo: IUserInfo = props.userInfo;
  const [openKakao, setOpenKakao] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const _onSave = async () => {
    setMyBackdrop(true);

    const editUserInfo: IUserInfo = Object.assign(userInfo);
    if (openKakao.split("https://open.kakao.com/o/").length > 1 || openKakao === "") {
      editUserInfo.openKakao = openKakao;
    } else {
      alert("올바른 오픈카톡 형식이 아닙니다.");
      setMyBackdrop(false);
      return;
    }

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
      <Grid container direction='column' style={{ margin: "10px 0", padding: "0" }}>
        <Typography variant='h4' style={{ marginBottom: "30px" }}>
          회원 정보
        </Typography>

        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>아이디</Typography>
          <span className={classes.box}>{userInfo.id}</span>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>이메일</Typography>
          <span className={classes.box}>{userInfo.email}</span>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>오픈카톡</Typography>
          {isEdit ? (
            <React.Fragment>
              <TextField
                className={classes.input}
                variant='outlined'
                required
                name='openKakao'
                id='openKakao'
                value={openKakao}
                onChange={e => setOpenKakao(e.target.value)}
              />
              <Button variant='outlined' color='primary' className={classes.btn} onClick={_onSave}>
                저장
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span style={{ width: "290px", lineHeight: "40px", margin: "0 5px" }}>{userInfo.openKakao}</span>
              <Button
                variant='outlined'
                color='secondary'
                className={classes.btn}
                onClick={() => {
                  setIsEdit(true);
                  setOpenKakao(userInfo.openKakao as string);
                }}>
                수정
              </Button>
            </React.Fragment>
          )}
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>등급</Typography>
          <span className={classes.box}>Level {userInfo.grade}</span>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>포인트</Typography>
          <span className={classes.box}>{userInfo.point}</span>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>대표 캐릭터</Typography>
          <span style={{ width: "290px", margin: "0 5px" }}>
            { getTitleAccountString(userInfo.titleAccount) }
          </span>
          <Button variant='outlined' color='secondary' className={classes.btn} href='/myinfo/auth'>
            변경
          </Button>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>회원 가입일</Typography>
          <span className={classes.box}>{getStringByDate(userInfo.createDate, true)}</span>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 0 0 5px" }}>
          <Typography className={classes.text}>정보 수정일</Typography>
          <span className={classes.box}>{getStringByDate(userInfo.editDate, true)}</span>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ViewUserInfo;
