import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { sendVerifyEmailById, checkVerifyEmail, resetPassword } from "utils/CommonUtil";

const duration = 2000;

export default function FindPassword() {
  const setMyAlert = useSetRecoilState(MyAlertState);

  const [id, setId] = useState("");
  const refId = React.useRef<any>();
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState<string | undefined>(undefined); //메일 전송 전 > undefined
  const refEmailCode = React.useRef<any>();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

  const [checkId, setCheckId] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const verifyId = (input: string) => {
    setCheckId(true);
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자

    if (input === "") {
      setCheckId(true);
      setId("");
      return;
    }

    for (let i = 0; i < input.length; i++) {
      var letters = input.charAt(i);
      if (!pattern1.test(letters) && !pattern2.test(letters) && input.length < 6) {
        setCheckId(false);
      } else {
        setCheckId(true);
      }
      setId(input);
    }
  };

  const verifyEmail = (input: string) => {
    var pattern = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (input !== "") {
      setEmail("");
      setCheckEmail(false);
    }

    setEmail(input);

    if (!pattern.test(input)) {
      setCheckEmail(false);
    } else {
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
    if (emailCode) {
      // 인증번호 확인
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
      <Grid container spacing={2} style={{ height: "250px", textAlign: "center" }}>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            error={id !== "" && checkId === false}
            helperText={id !== "" && checkId === false ? "아이디에 한글/특수문자가 포함되어 있습니다." : ""}
            required
            id='id'
            name='id'
            label='아이디'
            inputRef={refId}
            value={id || ""}
            onChange={e => {
              verifyId(e.target.value);
            }}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "300px", margin: "2px 0 10px 0", paddingTop: "8px" }}
          />
          <div style={{ width: "100%", height: "60px", textAlign: "center" }}>
            <TextField
              error={email !== "" && checkEmail === false}
              helperText={email !== "" && checkEmail === false ? "올바른 이메일 형식이 아닙니다." : ""}
              variant='outlined'
              required
              name='email'
              label='이메일 주소'
              id='email'
              type='email'
              value={email || ""}
              disabled={isVerifiedEmail}
              onChange={e => verifyEmail(e.target.value)}
              inputProps={{ style: { height: "40px", padding: "0 10px" } }}
              style={{ width: "230px", margin: "2px 10px 10px 0", paddingTop: "8px" }}
            />
            <Button
              variant='outlined'
              color='primary'
              disabled={!id || checkEmail === false || isVerifiedEmail}
              style={{ minWidth: "60px", height: "40px", padding: "0 5px", margin: "10px 0" }}
              onClick={() => _onSendEmail()}>
              {emailCode === undefined ? "전송" : "재전송"}
            </Button>
          </div>
          {emailCode !== undefined && (
            <div style={{ width: "100%", height: "60px", textAlign: "center" }}>
              <TextField
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
                inputProps={{ style: { height: "40px", padding: "0 10px" } }}
                style={{ width: "230px", margin: "2px 10px 10px 0", paddingTop: "8px" }}
              />
              <Button
                variant='outlined'
                color='primary'
                disabled={checkEmail === false || isVerifiedEmail}
                style={{ minWidth: "60px", height: "40px", padding: "0 5px", margin: "10px 0" }}
                onClick={() => _onCheckEmail()}>
                인증
              </Button>
            </div>
          )}

          <Button
            variant='contained'
            color='primary'
            disabled={!isVerifiedEmail}
            onClick={_onResetPassword}
            style={{ width: "300px", height: "40px", marginTop: "10px" }}>
            신규 비밀번호 전송
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
