import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";

import RightIcon from "@material-ui/icons/SentimentVerySatisfied";
import WrongIcon from "@material-ui/icons/SentimentVeryDissatisfied";

import { CheckExistUser, SignUpUser } from "utils/UserUtil";
import { sendVerifyEmail, checkVerifyEmail } from "utils/CommonUtil";

const useStyles = makeStyles({
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
});

interface IProps {
  mode: "create" | "edit";
}

interface IState {
  id: string;
  password: string;
  passwordConfirm: string;
  mail: string;
  mailAuth: string;
}

const duration = 2000;

export default function SignUp(props: IProps) {
  const classes = useStyles();

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [id, setId] = useState("");
  const refId = React.useRef<any>();
  const [isNewId, setIsNewId] = useState(false);
  const [isConfirmId, setIsConfirmId] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState<string | undefined>(undefined); //메일 전송 전 > undefined
  const refEmailCode = React.useRef<any>();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const [checkId, setCheckId] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const _onCheckExist = async () => {
    const res = await CheckExistUser(id);

    if (isNewId) {
      // ID 고정
      setIsConfirmId(true);
    } else {
      if (res.code === 200 && id !== "") {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });
        setIsNewId(true);
      } else if (id !== "") {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message,
        });
        setIsNewId(false);
        refId.current.focus();
      }
    }
  };

  const _onClickSignUp = async () => {
    if (!isNewId) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: "ID 중복확인 후 진행 가능합니다.",
      });
      refId.current.focus();
      return 0;
    }

    if (!isVerifiedEmail) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: "이메일 인증 완료 후 진행 가능합니다.",
      });
      return 0;
    }

    if (!isAgree) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: "동의 후 진행 가능합니다.",
      });
      return 0;
    }

    setMyBackdrop(true);
    const res = await SignUpUser(id, password, email);
    if (res.code === 200) {
      // Successed Authentication
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setTimeout(() => (document.location.href = "/signin"), duration);
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
  };

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
    const res = await sendVerifyEmail(email);
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

  return (
    <React.Fragment>
      <Container style={{ width: "40%", margin: "10px 30%", float: "left" }}>
        <Typography className={classes.title} component='h1' variant='h4'>
          회원가입
        </Typography>
        <Container style={{ width: "100%", height: "62px", margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            variant='outlined'
            error={id !== "" && checkId === false}
            helperText={id !== "" && checkId === false ? "아이디에 한글/특수문자가 포함되어 있습니다." : ""}
            autoFocus
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
            style={{ width: "300px", margin: "0 5px" }}
          />
          <Button
            variant={isNewId ? "contained" : "outlined"}
            color='primary'
            disabled={checkId === false || id.length < 6 || isConfirmId}
            className={classes.checkButton}
            startIcon={isNewId ? <CheckIcon /> : ""}
            onClick={_onCheckExist}
            style={{ width: "90px", height: "40px", margin: "0 5px", padding: "5px" }}>
            {isNewId ? "완료" : "중복확인"}
          </Button>
        </Container>
        <Container style={{ width: "100%", height: "62px", margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            error={password !== "" && checkPassword === false}
            helperText={password !== "" && checkPassword === false ? "숫자/문자/특수문자를 모두 포함해야 합니다." : ""}
            variant='outlined'
            required
            name='password'
            placeholder='비밀번호 (8~12자리)'
            id='password'
            type='password'
            value={password || ""}
            onChange={e => verifyPassword(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "300px", margin: "0 5px" }}
          />
          <Button disabled={true} style={{ width: "90px", height: "40px", margin: "0 5px", padding: "0" }}>
            {password !== "" && checkPassword === true ? <RightIcon color='primary' fontSize='large' /> : <WrongIcon color='secondary' fontSize='large' />}
          </Button>
        </Container>
        <Container style={{ width: "100%", height: "62px", margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            error={passwordConfirm !== "" && password !== passwordConfirm}
            helperText={passwordConfirm !== "" && password !== passwordConfirm ? "비밀번호와 일치하지 않습니다." : ""}
            variant='outlined'
            required
            name='passwordConfrim'
            placeholder='비밀번호 확인 (8~12자리)'
            id='passwordConfrim'
            type='password'
            value={passwordConfirm || ""}
            onChange={e => setPasswordConfirm(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "300px", margin: "0 5px" }}
          />
          <Button disabled={true} style={{ width: "90px", height: "40px", margin: "0 5px", padding: "0" }}>
            {passwordConfirm !== "" && password === passwordConfirm ? (
              <RightIcon color='primary' fontSize='large' />
            ) : (
              <WrongIcon color='secondary' fontSize='large' />
            )}
          </Button>
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
            style={{ width: "300px", margin: "0 5px" }}
          />
          <Button
            variant='outlined'
            color='primary'
            disabled={checkEmail === false || isVerifiedEmail}
            className={classes.checkButton}
            style={{ width: "90px", height: "40px", margin: "0 5px", padding: "5px" }}
            onClick={() => _onSendEmail()}>
            {emailCode === undefined ? "전송" : "재전송"}
          </Button>
        </Container>
        {emailCode !== undefined && (
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
              style={{ width: "300px", margin: "0 5px" }}
            />
            <Button
              variant='outlined'
              color='primary'
              disabled={checkEmail === false || isVerifiedEmail}
              className={classes.checkButton}
              style={{ width: "90px", height: "40px", margin: "0 5px", padding: "5px" }}
              onClick={() => _onCheckEmail()}>
              인증
            </Button>
          </Container>
        )}
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography>인증방식 설명</Typography>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                value='allowExtraEmails'
                color='primary'
                checked={isAgree}
                onChange={() => {
                  setIsAgree(!isAgree);
                }}
              />
            }
            label='내용을 다 읽고 이해하였습니다.'
          />
        </Grid>
        <Grid container justify='flex-end' className={classes.signup}>
          <Button variant='contained' color='primary' fullWidth onClick={_onClickSignUp}>
            가입하기
          </Button>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
