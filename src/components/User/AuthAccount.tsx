import React from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import { getBaseUrlForAuth } from "utils/ConfigUtil";
import { checkGameUser } from "utils/UserUtil";
import IUserInfo from "interfaces/User/IUserInfo";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  text: {
    margin: "auto",
    paddingLeft: "10px",
    fontWeight: "bold",
    verticalAlign: "middle",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const duration = 3000;

function AuthAccount(props: IProps) {
  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const baseUrlForAuth = getBaseUrlForAuth();

  const [server, setServer] = React.useState("");
  const [character, setCharacter] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);

  const _clear = () => {
    setServer("");
    setCharacter("");
    setIsDisabled(false);

    setMyBackdrop(false);
  };

  const _onEnterCharacter = (keyCode: number) => {
    if (keyCode === 13) {
      _onAuthRequest();
    }
  };

  const _onAuthRequest = async () => {
    setMyBackdrop(true);
    setIsDisabled(true);

    const res = await checkGameUser(userInfo.id, server, character);

    if (res.code === 200) {
      // Successed Authentication
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setTimeout(() => _clear(), duration);
    } else {
      // Failed Authentication
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });

      setTimeout(() => setMyBackdrop(false), duration);
    }

    setIsDisabled(false);
  };

  return (
    <React.Fragment>
      <Typography variant='h4' style={{ margin: "10px 0 30px 0" }}>
        캐릭터 인증
      </Typography>
      <Grid container spacing={2} style={{ margin: "0" }}>
        <img src={baseUrlForAuth + "auth.png"} alt='예시' style={{ width: "100%" }} />
        <Divider style={{ width: "100%", height: "3px", margin: "10px 0" }} flexItem />
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            서버
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              required
              fullWidth
              autoFocus={true}
              autoComplete='off'
              size='small'
              name='server'
              id='server'
              value={server}
              onChange={e => setServer(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            닉네임
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              required
              fullWidth
              autoComplete='off'
              size='small'
              name='character'
              id='character'
              value={character}
              onChange={e => setCharacter(e.target.value)}
              onKeyUp={e => _onEnterCharacter(e.keyCode)}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Button variant='contained' color='primary' fullWidth disabled={isDisabled} onClick={_onAuthRequest}>
              {isDisabled ? "인증 중입니다." : "인증신청"}
            </Button>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Divider style={{ width: "100%", height: "3px", margin: "10px 0" }} flexItem />
      </Grid>
    </React.Fragment>
  );
}

export default AuthAccount;
