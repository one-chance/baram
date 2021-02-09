import React, { useState } from "react";
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
  text: {
    marginBottom: "11px",
    lineHeight: "40px",
    verticalAlign: "middle",
  },
}));

const duration = 3000;

function ChagnePassword(props: IProps) {
  const classes = useStyles();
  const id: string = props.id;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [password, setPassword] = useState("");
  const [chgPassword, setChgPassword] = useState("");
  const [chgPasswordConfirm, ssetChgPasswordConfirm] = useState("");

  const [checkPassword, setCheckPassword] = useState(false);
  const [checkChgPassword, setCheckChgPassword] = useState(false);

  const verifyPassword = (input: string) => {
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[`~!@#$%^&*()_+|<>?:{} ]/; // 특수문자
    var pa1 = false;
    var pa2 = false;
    var pa3 = false;

    if (input === "") {
      setPassword("");
      setCheckPassword(true);
      return;
    }

    setPassword(input);

    for (let i = 0; i < input.length; i++) {
      let letters = input.charAt(i);
      if (pattern1.test(letters)) pa1 = true;
      if (pattern2.test(letters)) pa2 = true;
      if (pattern3.test(letters)) pa3 = true;
    }

    if (pa1 === true && pa2 === true && pa3 === true && input.length > 7) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const verifyChangePassword = (input: string) => {
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[`~!@#$%^&*()_+|<>?:{} ]/; // 특수문자
    var pa1 = false;
    var pa2 = false;
    var pa3 = false;

    if (input === "") {
      setChgPassword("");
      setCheckChgPassword(true);
      return;
    }

    setChgPassword(input);

    for (let i = 0; i < input.length; i++) {
      let letters = input.charAt(i);
      if (pattern1.test(letters)) pa1 = true;
      if (pattern2.test(letters)) pa2 = true;
      if (pattern3.test(letters)) pa3 = true;
    }

    if (pa1 === true && pa2 === true && pa3 === true && input.length > 7) {
      setCheckChgPassword(true);
    } else {
      setCheckChgPassword(false);
    }
  };

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
      <Grid container spacing={2} style={{ margin: "0", padding: "0" }}>
        <Grid container item xs={12} spacing={2} style={{ height: "60px", margin: "5px 0", padding: "0 10px", float: "left" }}>
          <Grid item xs={3} className={classes.text}>
            기존 비밀번호
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              error={password !== "" && checkPassword === false}
              helperText={password !== "" && checkPassword === false ? "숫자/문자/특수문자를 모두 포함해야 합니다." : ""}
              required
              fullWidth
              autoFocus={true}
              size='small'
              name='password'
              id='password'
              type='password'
              value={password}
              onChange={e => verifyPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container item xs={12} spacing={2} style={{ height: "60px", margin: "5px 0", padding: "0 10px", float: "left" }}>
          <Grid item xs={3} className={classes.text}>
            신규 비밀번호
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              error={chgPassword !== "" && checkChgPassword === false}
              helperText={chgPassword !== "" && checkChgPassword === false ? "숫자/문자/특수문자를 모두 포함해야 합니다." : ""}
              required
              fullWidth
              size='small'
              name='password'
              id='password'
              type='password'
              value={chgPassword}
              onChange={e => verifyChangePassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container item xs={12} spacing={2} style={{ height: "60px", margin: "5px 0", padding: "0 10px", float: "left" }}>
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
        </Grid>
        <Grid container item xs={12} spacing={2} style={{ margin: "10px 0 0 0", padding: "0 10px", float: "left" }}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Button variant='contained' color='primary' fullWidth onClick={_onSave}>
              변경
            </Button>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ChagnePassword;
