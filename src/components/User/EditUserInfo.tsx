import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
  title: {},
  form: {
    marginTop: 10,
  },
  text: {
    margin: "auto",
    verticalAlign: "middle",
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
    <Container>
      <Typography variant='h6' className={classes.title}>
        정보수정
      </Typography>
      <Grid container spacing={3} className={classes.form}>
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
              오픈카카오톡 주소
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant='outlined'
                required
                fullWidth
                size='small'
                name='openKakao'
                label='Open KakaoTalk'
                id='openKakao'
                value={openKakao}
                onChange={e => setOpenKakao(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={3} className={classes.text}>
              대표캐릭터 서버
            </Grid>
            <Grid item xs={9}>
              {server ? server : "대표 설정 된 캐릭터 서버 정보가 없습니다."}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={3} className={classes.text}>
              대표캐릭터 닉네임
            </Grid>
            <Grid item xs={9}>
              {character ? character : "대표 설정 된 캐릭터 닉네임 정보가 없습니다."}
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <Button variant='contained' color='secondary' fullWidth onClick={_onCancle}>
                취소
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' color='primary' fullWidth onClick={_onSave}>
                저장
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
    </Container>
  );
}

export default EditUserInfo;
