import React from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { SignInUser, setChangePassword, LogoutUser } from "utils/UserUtil";

interface IProps {
  id: string;
}

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: 10,
  },
  text: {
    margin: "auto",
    verticalAlign: "middle",
  },
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
  };

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
          message: res.message,
        });

        LogoutUser();
        setTimeout((document.location.href = "/signin"), duration);
      } else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message,
        });
      }
    } else {
      setPassword("");
    }

    setMyBackdrop(false);
  };

  return (
    <React.Fragment>
      <Typography variant='h4' style={{ margin: "10px 0 30px 0" }}>
        비밀번호 변경
      </Typography>
      <Grid container item xs={12} spacing={2} className={classes.form}>
        <Grid item xs={3} className={classes.text}>
          기존 비밀번호
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            autoFocus={true}
            size='small'
            name='password'
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3} className={classes.text}>
          신규 비밀번호
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            size='small'
            name='password'
            id='password'
            type='password'
            value={chgPassword}
            onChange={e => setChgPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3} className={classes.text}>
          신규 비밀번호 확인
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={chgPasswordConfirm !== "" && chgPassword !== chgPasswordConfirm}
            helperText={chgPasswordConfirm !== "" && chgPassword !== chgPasswordConfirm ? "비밀번호가 일치하지 않습니다." : ""}
            variant='outlined'
            required
            fullWidth
            size='small'
            name='passwordConfrim'
            id='passwordConfrim'
            type='password'
            value={chgPasswordConfirm}
            onChange={e => ssetChgPasswordConfirm(e.target.value)}
            onKeyUp={e => _onEnterPassword(e.keyCode)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Button variant='contained' color='primary' fullWidth onClick={_onSave}>
            변경
          </Button>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ChagnePassword;
