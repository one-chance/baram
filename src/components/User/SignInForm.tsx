import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { SignInUser } from "utils/UserUtil";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 0,
  },
  signin: {
    marginTop: 20,
  },
}));

export default function SignInForm() {
  const classes = useStyles();

  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const refId = React.useRef<any>();
  const refPassword = React.useRef<any>();

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
      }
      else {
        document.location.href = "/";
      }
    }
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <form noValidate className={classes.form}>
          <Container component="div" style={{ margin: "10px 0", float: "left" }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              autoFocus
              id="id"
              name="id"
              placeholder="아이디를 입력해주세요."
              autoComplete="id"
              value={id}
              inputRef={refId}
              onChange={(e) => setId(e.target.value)}
              inputProps={{ style: { height: "40px", padding: "5px 10px" } }}
              style={{ margin: "10px 0", float: "left" }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              inputRef={refPassword}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => _onEnterPassword(e.keyCode)}
              inputProps={{ style: { height: "40px", padding: "5px 10px" } }}
              style={{ margin: "10px 0", float: "left" }}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={_onSignIn}
              style={{
                height: "50px",
                padding: "0 10px",
                margin: "10px 0",
                textAlign: "center",
                float: "left",
              }}
            >
              로그인
            </Button>
          </Container>
          <Container component="div" style={{ margin: "10px 0 15px 0", float: "left" }}>
            <Link href="/forget/id" variant="body2" tabIndex={-1} style={{ float: "left" }}>
              아이디
            </Link>
            <Link variant="body2" tabIndex={-1} style={{ float: "left" }}>
              &nbsp;/&nbsp;
            </Link>
            <Link href="/forget/password" variant="body2" tabIndex={-1} style={{ float: "left" }}>
              비밀번호 찾기
            </Link>
            <Link href="/signup" variant="body2" tabIndex={-1} style={{ float: "right" }}>
              회원가입
            </Link>
          </Container>
        </form>
      </Container>
    </React.Fragment>
  );
}
