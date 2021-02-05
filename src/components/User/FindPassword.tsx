import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import { sendVerifyEmailById, checkVerifyEmail, resetPassword } from "utils/CommonUtil";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "10px",
    textAlign: "center",
  },
  form: {
    marginTop: 20,
  },
  checkButton: {
    alignItems: "center",
  },
  signup: {
    marginTop: 20,
  },
}));
const duration = 2000;

export default function FindPassword() {
  const classes = useStyles();

  const setMyAlert = useSetRecoilState(MyAlertState);

  const [id, setId] = useState("");
  const refId = React.useRef<any>();
  const [isNewId, setIsNewId] = useState(false);
  const [isConfirmId, setIsConfirmId] = useState(false);
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
    if (res.result === 'success') {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setEmailCode("");
      refEmailCode.current.focus();
    }
    else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });
    }
  }

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
      }
      else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: `인증번호 확인에 실패하였습니다.`,
        });

        setIsVerifiedEmail(false);
      }
    }
  }

  const _onResetPassword = async () => {
    const res = await resetPassword(id, email);
    if (res.result === 'success') {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setEmailCode("");
      
      setTimeout(() => {
        document.location.href="/signin";
      }, duration);
    }
    else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });
    }    
  }

  return (
    <React.Fragment>
      <Container style={{ width: "40%", margin: "10px 30%", float: "left" }}>
        <Container style={{ width: "100%", height: "62px", margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            variant='outlined'
            error={id !== "" && checkId === false}
            helperText={id !== "" && checkId === false ? "아이디에 한글/특수문자가 포함되어 있습니다." : ""}
            autoFocus
            fullWidth
            required
            id='id'
            name='id'
            placeholder='아이디 (6~12자리)'
            inputRef={refId}
            value={id || ""}
            disabled={isConfirmId}
            onChange={e => {
              verifyId(e.target.value);
              setIsNewId(false);
            }}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "100%"}}
          />
        </Container>
        <Container style={{ width: "100%", height: "62px", margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            error={email !== "" && checkEmail === false}
            helperText={email !== "" && checkEmail === false ? "올바른 이메일 형식이 아닙니다." : ""}
            variant='outlined'
            required
            name='email'
            placeholder='이메일 (ID/PW 찾기 제공)'
            id='email'
            type='email'
            value={email || ""}
            disabled={isVerifiedEmail}
            onChange={e => verifyEmail(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "70%"}}
          />
          <Button
            variant='outlined'
            color='primary'
            disabled={!id || checkEmail === false || isVerifiedEmail}
            className={classes.checkButton}
            style={{ width: "25%", height: "40px", marginLeft: '10px'}}
            onClick={() => _onSendEmail()}>
              {
                emailCode === undefined ?
                  "전송" : "재전송"
              }
          </Button>
        </Container>
        { emailCode !== undefined &&
          <Container style={{ width: "100%", height: "62px", margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <TextField
              error={email !== "" && checkEmail === false}
              variant='outlined'
              required
              name='code'
              placeholder='인증번호'
              id='code'
              autoComplete='off'
              value={emailCode || ""}
              inputRef={refEmailCode}
              disabled={isVerifiedEmail}
              onChange={e => setEmailCode(e.target.value.toString())}
              inputProps={{ style: { height: "40px", padding: "0 10px" } }}
              style={{ width: "70%"}}
            />
            <Button
              variant='outlined'
              color='primary'
              disabled={checkEmail === false || isVerifiedEmail}
              className={classes.checkButton}
              style={{ width: "25%", height: "40px", marginLeft: '10px'}}
              onClick={() => _onCheckEmail()}>
                인증
            </Button>
          </Container>
        }
        <Grid container justify='flex-end' className={classes.signup}>
          <Button 
            variant='contained' color="primary" fullWidth
            disabled={!isVerifiedEmail}
            onClick={_onResetPassword} >
            신규 비밀번호 전송
          </Button>
        </Grid>
      </Container>
    </React.Fragment>
  );
}