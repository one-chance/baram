import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

import { SignInUser } from "utils/UserUtil";

export default function SignInForm() {
  const setMyAlert = useSetRecoilState(MyAlertState);

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [autoLogIn, setAutoLogIn] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberId", "rememberPw"]);

  const refId = useRef<any>();
  const refPassword = useRef<any>();

  const verifyCheck = () => {
    if (autoLogIn) {
      setAutoLogIn(false);
      removeCookie("rememberId");
      removeCookie("rememberPw");
    } else {
      setAutoLogIn(true);
    }
  };

  const _onEnterPassword = (keyCode: number) => {
    if (keyCode === 13) {
      _onSignIn();
    }
  };

  const _onSignIn = async () => {
    if (id.length < 1) {
      alert("ID를 입력해주세요.");
      refId.current.focus();

      return false;
    }

    if (password.length < 1) {
      alert("비밀번호를 입력해주세요.");
      refPassword.current.focus();

      return false;
    }

    const res = await SignInUser(id, password);
    if (res) {
      if (res.isReset) {
        document.location.href = "/myinfo/changepassword";
      } else {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: 1500,
          message: `${id}님 환영합니다!`,
        });

        document.location.reload();
      }
    }

    if (autoLogIn && cookies.rememberId === undefined && cookies.rememberPw === undefined) {
      setCookie("rememberId", id, { maxAge: 2000 });
      setCookie("rememberPw", password, { maxAge: 2000 });
    }
  };

  useEffect(() => {
    if (cookies.rememberId !== undefined && cookies.rememberPw !== undefined) {
      setId(cookies.rememberId);
      setPassword(cookies.rememberPw);
      setAutoLogIn(true);
    }
  }, [cookies.rememberId, cookies.rememberPw]);

  return (
    <React.Fragment>
      <form>
        <Grid container direction='column' justify='center' style={{ padding: "10px 20px ", margin: "0" }}>
          <Grid item style={{ maxWidth: "360px", margin: "0" }}>
            <React.Fragment>
              <Checkbox
                checked={autoLogIn}
                color='primary'
                onChange={() => {
                  verifyCheck();
                }}
                style={{ width: "24px", height: "24px" }}
              />
              &nbsp;자동 로그인
            </React.Fragment>
            <TextField
              variant='outlined'
              required
              fullWidth
              autoFocus
              id='id'
              name='id'
              placeholder='아이디를 입력해주세요.'
              autoComplete='dotols-id'
              value={id}
              inputRef={refId}
              onChange={e => setId(e.target.value)}
              inputProps={{ style: { height: "40px", padding: "5px 10px" } }}
              style={{ margin: "10px 0" }}
            />

            <TextField
              variant='outlined'
              required
              fullWidth
              margin='dense'
              name='password'
              placeholder='비밀번호를 입력해주세요.'
              type='password'
              id='password'
              autoComplete='dotols-password'
              value={password}
              inputRef={refPassword}
              onChange={e => setPassword(e.target.value)}
              onKeyUp={e => _onEnterPassword(e.keyCode)}
              inputProps={{ style: { height: "40px", padding: "5px 10px" } }}
              style={{ margin: "10px 0" }}
            />

            <Button
              variant='contained'
              fullWidth
              color='primary'
              onClick={_onSignIn}
              style={{
                height: "50px",
                padding: "0 10px",
                margin: "10px 0",
                textAlign: "center",
              }}>
              로그인
            </Button>
          </Grid>
          <Grid item style={{ maxWidth: "360px", margin: "10px 0", padding: "0 5px" }}>
            <Link href='/forget' variant='body2' style={{ outline: "none", float: "left" }}>
              ID/PW 찾기
            </Link>
            <Link href='/signup' variant='body2' style={{ outline: "none", float: "right" }}>
              회원가입
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
