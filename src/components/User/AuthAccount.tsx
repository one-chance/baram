import React from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { checkGameUser } from 'utils/UserUtil';
import IUserInfo from 'interfaces/User/IUserInfo';

import MyButton from 'elements/Button/MyButton';

interface IProps {
  userInfo: IUserInfo,
}

const useStyles = makeStyles((theme) => ({
  title: {
    
  },
  form: {
    marginTop: 10,
  },
  text: {
    margin: "auto",
    verticalAlign: "middle"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const duration = 3000;

function AuthAccount(props: IProps) {

  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [server, setServer] = React.useState("");
  const [character, setCharacter] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  
  const _clear = () => {
    setServer("");
    setCharacter("");
    setIsDisabled(false);
    
    setMyBackdrop(false);
  }

  const _onEnterCharacter = (keyCode: number) => {
		if (keyCode === 13) {
			_onAuthRequest();
		}
  }

  const _onAuthRequest = async () => {
    setMyBackdrop(true);

    const res = await checkGameUser(userInfo.id, server, character);
    
    if (res.code === 200) {
      // Successed Authentication
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message
      });
      setTimeout(() => _clear(), duration);
    }
    else {
      // Failed Authentication
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message
      });

      setTimeout(() => setMyBackdrop(false), duration);
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        className={classes.title}>
          캐릭터 인증
      </Typography>
      <Grid container spacing={2}
        className={classes.form}>
        <Grid container item xs={12}>
          <Grid item xs={3}
            className={classes.text}>
              서버
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              required
              fullWidth
              autoFocus={true}
              autoComplete="off"
              size="small"
              name="server"
              label="Server"
              id="server"
              value={server}
              onChange={(e) => (setServer(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}
            className={classes.text}>
              닉네임
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              required
              fullWidth
              autoComplete="off"
              size="small"
              name="character"
              label="Character"
              id="character"
              value={character}
              onChange={(e) => (setCharacter(e.target.value))}
              onKeyUp={(e) => (_onEnterCharacter(e.keyCode))}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <MyButton
            disabled={isDisabled}
            color="blue"
            text={isDisabled ? "인증 중입니다." : "인증신청"}
            onClick={_onAuthRequest}/>
        </Grid>
      </Grid>
    </Container>
  ); 
}

export default AuthAccount;