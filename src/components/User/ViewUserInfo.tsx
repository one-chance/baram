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
    width: `calc(100% - 100px)`,
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
        <Grid item style={{ padding: "0" }}>
          <Typography variant='h4' style={{ marginBottom: "30px" }}>
            회원 정보
          </Typography>
        </Grid>

        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            아이디
          </Grid>
          <Grid item className={classes.box}>
            {userInfo.id}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            이메일
          </Grid>
          <Grid item className={classes.box}>
            {userInfo.email}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            오픈카톡
          </Grid>
          <Grid item xs={6} style={{ minWidth: `calc(100%-200px)` }}>
            {isEdit ? (
              <TextField
                variant='outlined'
                required
                fullWidth
                size='small'
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
          <Grid item xs={1}></Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            등급
          </Grid>
          <Grid item xs={9}>
            {userInfo.grade}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            포인트
          </Grid>
          <Grid item xs={9}>
            {userInfo.point}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            대표 캐릭터
          </Grid>
          <Grid item xs={6}>
            {userInfo.titleAccount ? `${userInfo.titleAccount.character}@${userInfo.titleAccount.server}` : ""}
          </Grid>
          <Grid item xs={2} style={{ paddingLeft: "5px" }}>
            <Button variant='outlined' color='secondary' className={classes.btn} fullWidth href='/myinfo/auth'>
              변경
            </Button>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            회원 가입일
          </Grid>
          <Grid item xs={9}>
            {getStringByDate(userInfo.createDate, true)}
          </Grid>
        </Grid>
        <Grid item container alignItems='center' style={{ lineHeight: "40px", padding: "0 5px" }}>
          <Grid item className={classes.text}>
            정보 수정일
          </Grid>
          <Grid item xs={9}>
            {getStringByDate(userInfo.editDate, true)}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ViewUserInfo;
