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
    margin: "auto",
    paddingLeft: "10px",
    verticalAlign: "middle",
    fontWeight: "bold",
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
      <Typography variant='h4' style={{ margin: "10px 0 30px 0" }}>
        회원 정보
      </Typography>
      <Grid container spacing={2} style={{ lineHeight: "40px" }}>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
            아이디
          </Grid>
          <Grid item xs={9}>
            {userInfo.id}
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
            이메일
          </Grid>
          <Grid item xs={9}>
            {userInfo.email}
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
            오픈카톡
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={2} style={{ paddingLeft: "5px" }}>
            {isEdit ? (
              <Button variant='outlined' color='primary' fullWidth onClick={_onSave}>
                저장
              </Button>
            ) : (
              <Button
                variant='outlined'
                color='secondary'
                fullWidth
                onClick={() => {
                  setIsEdit(true);
                }}>
                수정
              </Button>
            )}
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
            등급
          </Grid>
          <Grid item xs={9}>
            {userInfo.grade}
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
            포인트
          </Grid>
          <Grid item xs={9}>
            {userInfo.point}
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
            대표 캐릭터
          </Grid>
          <Grid item xs={6}>
            {userInfo.titleAccount ? `${userInfo.titleAccount.character}@${userInfo.titleAccount.server}` : ""}
          </Grid>
          <Grid item xs={2} style={{ paddingLeft: "5px" }}>
            <Button variant='outlined' color='secondary' fullWidth href='/myinfo/auth'>
              변경
            </Button>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
            회원 가입일
          </Grid>
          <Grid item xs={9}>
            {getStringByDate(userInfo.createDate, true)}
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{ padding: "0 10px" }}>
          <Grid item xs={3} className={classes.text}>
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
