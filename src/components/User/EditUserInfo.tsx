import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { setUserInfo } from "utils/UserUtil";
import IUserInfo from "interfaces/User/IUserInfo";

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

function EditUserInfo(props: IProps) {
  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [openKakao, setOpenKakao] = React.useState("");
  const [server, setServer] = React.useState("");
  const [character, setCharacter] = React.useState("");

  useEffect(() => {
    setOpenKakao(userInfo.openKakao ? userInfo.openKakao : "");
    setServer(userInfo.titleAccount ? userInfo.titleAccount.server : "");
    setCharacter(userInfo.titleAccount ? userInfo.titleAccount.character : "");
  }, [userInfo]);

  const clear = () => {
    setOpenKakao(userInfo.openKakao ? userInfo.openKakao : "");
  };

  const _onCancle = () => {
    clear();
  };

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
        정보 수정
      </Typography>
      <Grid container spacing={3}>
        <React.Fragment>
          <Grid container item xs={12}>
            <Grid item xs={3} className={classes.text}>
              아이디
            </Grid>
            <Grid item xs={9}>
              {userInfo.id}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={3} className={classes.text}>
              이메일
            </Grid>
            <Grid item xs={9}>
              {userInfo.email ? userInfo.email : "인증 된 이메일이 없습니다."}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={3} className={classes.text}>
              오픈 카톡
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={3} className={classes.text}>
              대표 캐릭터
            </Grid>
            <Grid item xs={6}>
              {server && character ? `${character}@${server}` : "대표 캐릭터 정보가 없습니다."}
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              <Button variant='outlined' color='secondary' fullWidth onClick={_onCancle}>
                취소
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant='outlined' color='primary' fullWidth onClick={_onSave}>
                저장
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </React.Fragment>
      </Grid>
    </React.Fragment>
  );
}

export default EditUserInfo;
