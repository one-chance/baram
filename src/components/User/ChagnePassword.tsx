import React from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import MyButton from 'elements/Button/MyButton';

import { SignInUser, setChangePassword, LogoutUser} from 'utils/UserUtil';

interface IProps {
  id: string
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
  }
}));

const duration = 3000;

function ChagnePassword(props: IProps) {

  const classes = useStyles();
  const id: string = props.id;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [password, setPassword] = React.useState("");
  const [chgPassword, setChgPassword] = React.useState("");
  const [chgPasswordConfirm, ssetChgPasswordConfirm] = React.useState("");

  const _onEnterPassword = (keyCode: number) => {
		if (keyCode === 13) {
			_onSave();
		}
  }

  const _onSave = async () => {
    setMyBackdrop(true);

    const res = await SignInUser(id, password);

    if (res) {
      const res = await setChangePassword(id, chgPassword);
  
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });
  
        LogoutUser();
        setTimeout(document.location.href="/", duration);
      }
      else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message
        });
      }
    }
    else {
      setPassword("");
    }

    setMyBackdrop(false);
  }

  return (
    <Container>
      <Typography
        variant="h6"
        className={classes.title}>
          비밀번호 변경
      </Typography>
      <Grid container item xs={12} spacing={2}
        className={classes.form}>
        <Grid item xs={3}
          className={classes.text}>
            비밀번호 확인
        </Grid>
        <Grid item xs={9}>
          <TextField
            variant="outlined"
            required
            fullWidth
            autoFocus={true}
            size="small"
            name="password"
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => (setPassword(e.target.value))}
          />
        </Grid>
        <Grid item xs={3}
          className={classes.text}>
            변경 비밀번호
        </Grid>
        <Grid item xs={9}>
          <TextField
            variant="outlined"
            required
            fullWidth
            size="small"
            name="password"
            label="Password"
            id="password"
            type="password"
            value={chgPassword}
            onChange={(e) => (setChgPassword(e.target.value))}
          />
        </Grid>
        <Grid item xs={3}
          className={classes.text}>
            변경 비밀번호 확인
        </Grid>
        <Grid item xs={9}>
          <TextField
            error={((chgPasswordConfirm !== "") && (chgPassword !== chgPasswordConfirm))}
            helperText={(chgPasswordConfirm !== "") && (chgPassword !== chgPasswordConfirm) ? "비밀번호가 일치하지 않습니다." : ""}
            variant="outlined"
            required
            fullWidth
            size="small"
            name="passwordConfrim"
            label="password Confrim"
            id="passwordConfrim"
            type="password"
            value={chgPasswordConfirm}
            onChange={(e) => (ssetChgPasswordConfirm(e.target.value))}
            onKeyUp={(e) => (_onEnterPassword(e.keyCode))}
          />
        </Grid>
        <Grid item xs={12}>
          <MyButton
            color="blue"
            text="저장"
            onClick={_onSave}/>
        </Grid>
      </Grid>
    </Container>
  ); 
}

export default ChagnePassword;