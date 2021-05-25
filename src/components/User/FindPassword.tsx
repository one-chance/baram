import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { sendVerifyEmailById, checkVerifyEmail, resetPassword } from "utils/CommonUtil";

const useStyles = makeStyles({
  text: {
    width: "280px",
    margin: "2px 0 10px 0",
    paddingTop: "8px",
    "& input": {
      height: "40px",
      padding: "0 10px",
    },
  },
  btn: {
    minWidth: "60px",
    height: "40px",
    padding: "0 5px",
    margin: "10px 0",
  },
});

const duration = 2000;

export default function FindPassword() {
  const classes = useStyles();
  const setMyAlert = useSetRecoilState(MyAlertState);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [showEmailCode, setShowEmailCode] = useState<boolean>(false);
  const refId = useRef<any>();
  const refEmailCode = useRef<any>();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

  const [checkId, setCheckId] = useState(true);
  const [checkEmail, setCheckEmail] = useState(false);

  const verifyId = (input: string) => {
    var pattern = /[0-9a-zA-Z]/; // 숫자+문자
    setCheckId(true);
    setId(input);

    for (let i = 0; i < input.length; i++) {
      let letters = input.charAt(i);
      if (!pattern.test(letters)) {
        setCheckId(false);
        return;
      }
    }
  };

  const verifyEmail = (input: string) => {
    var pattern = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    setCheckEmail(false);
    setEmail(input);

    if (pattern.test(input) && input.split(".")[1].length > 1) {
      setCheckEmail(true);
    }
  };

  const _onSendEmail = async () => {
    // 인증 이메일 전송
    const res = await sendVerifyEmailById(id, email);
    if (res.result === "success") {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setShowEmailCode(true);
      setEmailCode("");
      refEmailCode.current.focus();
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });
    }
  };

  const _onCheckEmail = async () => {
    if (showEmailCode) {
      const res = await checkVerifyEmail(email, emailCode);
      if (res) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: `인증번호 확인에 성공하였습니다.`,
        });

        setIsVerifiedEmail(true);
      } else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: `인증번호 확인에 실패하였습니다.`,
        });

        setIsVerifiedEmail(false);
      }
    }
  };

  const _onResetPassword = async () => {
    const res = await resetPassword(id, email);
    if (res.result === "success") {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setEmailCode("");

      setTimeout(() => {
        document.location.href = "/signin";
      }, duration);
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });
    }
  };

  return (
    <React.Fragment>
      <Grid item style={{ width: "100%", height: "280px", textAlign: "center", padding: "0", marginTop: "10px" }}>
        <div style={{ width: "100%", height: "70px", textAlign: "center" }}>
          <TextField
            className={classes.text}
            variant='outlined'
            error={(id.length > 0 && id.length < 6) || checkId === false}
            helperText={id.length > 0 && id.length < 6 ? "최소 6자 이상이어야 합니다." : checkId === false ? "한글/특수문자가 포함되었습니다." : ""}
            required
            id='id'
            name='id'
            label='아이디'
            inputRef={refId}
            autoComplete='off'
            value={id || ""}
            onChange={e => {
              verifyId(e.target.value);
            }}
          />
        </div>
        <div style={{ width: "100%", height: "70px", textAlign: "center" }}>
          <TextField
            className={classes.text}
            variant='outlined'
            error={email !== "" && checkEmail === false}
            helperText={email !== "" && checkEmail === false ? "올바른 이메일 형식이 아닙니다." : ""}
            required
            label='이메일 주소'
            id='email-address'
            type='email'
            value={email || ""}
            disabled={isVerifiedEmail}
            autoComplete='off'
            onChange={e => verifyEmail(e.target.value)}
            style={{ width: "210px", marginRight: "10px" }}
          />
          <Button
            className={classes.btn}
            variant='outlined'
            color='primary'
            disabled={!id || checkEmail === false || isVerifiedEmail}
            onClick={() => _onSendEmail()}>
            {!showEmailCode ? "전송" : "재전송"}
          </Button>
        </div>
        {showEmailCode && (
          <div style={{ width: "100%", height: "65px", textAlign: "center" }}>
            <TextField
              className={classes.text}
              error={email !== "" && checkEmail === false}
              variant='outlined'
              required
              name='code'
              label='인증번호'
              id='code'
              autoComplete='off'
              value={emailCode || ""}
              inputRef={refEmailCode}
              disabled={isVerifiedEmail}
              onChange={e => setEmailCode(e.target.value.toString())}
              style={{ width: "210px", marginRight: "10px" }}
            />
            <Button className={classes.btn} variant='outlined' color='primary' disabled={isVerifiedEmail} onClick={() => _onCheckEmail()}>
              인증
            </Button>
          </div>
        )}

        <Button
          variant='contained'
          color='primary'
          disabled={!isVerifiedEmail}
          onClick={_onResetPassword}
          style={{ width: "280px", height: "40px", marginTop: "10px" }}>
          신규 비밀번호 전송
        </Button>
      </Grid>
    </React.Fragment>
  );
}
