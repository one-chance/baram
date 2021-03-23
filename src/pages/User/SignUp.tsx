import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import CheckIcon from "@material-ui/icons/Check";
import RightIcon from "@material-ui/icons/SentimentVerySatisfied";
import WrongIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Privacy from "components/Privacy";

import { CheckExistUser, SignUpUser } from "utils/UserUtil";
import { sendVerifyEmail, checkVerifyEmail } from "utils/CommonUtil";

const useStyles = makeStyles({
  contents: {
    width: "240px",
    margin: "0 5px",
    "& input": {
      height: "40px",
      padding: "0 10px",
    },
  },
  btnCheck: {
    width: "90px",
    height: "40px",
    margin: "0 5px",
    padding: "5px",
    alignItems: "center",
  },
  btnClose: {
    minWidth: 10,
    fontSize: "1rem",
    padding: "0",
    position: "absolute",
    top: 5,
    right: 10,
  },
  text: {
    width: "130px",
    height: "35px",
    lineHeight: "35px",
    fontSize: "20px",
    margin: "5px 20px 22px 0",
  },
  text2: {
    width: "210px",
    height: "35px",
    lineHeight: "35px",
    fontSize: "18px",
    margin: "5px 0 22px 30px",
    color: "gray",
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

  const [checkId, setCheckId] = useState(true);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const [openHelper, setOpenHelper] = useState(false);

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

    var pattern = /[0-9a-zA-Z]/; // 숫자+문자

    if (input === "") {
      setCheckId(true);
      setId("");
      return;
    }

    setId(input);

    if (input.length < 6) {
      setCheckId(false);
      return;
    }

    for (let i = 0; i < input.length; i++) {
      var letters = input.charAt(i);
      if (!pattern.test(letters)) {
        setCheckId(false);
        return;
      }
    }
    setIsNewId(false);
    setCheckId(true);
    return;
  };

  const verifyPassword = (input: string) => {
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[`~!@#$%^&*()_+|<>?:{},./ ]/; // 특수문자
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
      <Grid container direction='column' justify='center' style={{ padding: "0", margin: "10px 0" }}>
        <Typography style={{ margin: "10px 0 40px 0", textAlign: "center", fontSize: "2rem" }}>회원가입</Typography>
        <Grid item container justify='center' style={{ minHeight: "62px", margin: "5px 0" }}>
          <Typography className={classes.text}>아이디</Typography>
          <TextField
            variant='outlined'
            error={(id.length > 0 && id.length < 6) || checkId === false}
            helperText={id.length > 0 && id.length < 6 ? "최소 6자 이상이어야 합니다." : checkId === false ? "한글/특수문자가 포함되었습니다." : ""}
            required
            id='id'
            name='id'
            placeholder=' 최소 6자'
            autoComplete='off'
            inputRef={refId}
            value={id || ""}
            disabled={isConfirmId}
            onChange={e => {
              verifyId(e.target.value);
            }}
            className={classes.contents}
          />
          <Button
            variant={isNewId ? "contained" : "outlined"}
            color='primary'
            disabled={checkId === false || id.length < 6 || isConfirmId}
            className={classes.btnCheck}
            startIcon={isNewId ? <CheckIcon /> : ""}
            onClick={_onCheckExist}
            style={{ marginBottom: "22px" }}>
            {isNewId ? "완료" : "중복확인"}
          </Button>
          <Typography className={classes.text2}>영문자, 숫자만 사용 가능</Typography>
        </Grid>
        <Grid item container justify='center' style={{ minHeight: "62px", margin: "5px 0" }}>
          <Typography className={classes.text}>비밀번호</Typography>
          <TextField
            error={password !== "" && checkPassword === false}
            helperText={password !== "" && checkPassword === false ? "숫자/문자/특수문자를 모두 포함해야 합니다." : ""}
            variant='outlined'
            required
            name='password'
            placeholder=' 최소 8자'
            id='password'
            type='password'
            value={password || ""}
            onChange={e => verifyPassword(e.target.value)}
            className={classes.contents}
          />
          <Button disabled={true} style={{ width: "90px", height: "40px", margin: "0 5px", padding: "0" }}>
            {password !== "" && checkPassword === true ? <RightIcon color='primary' fontSize='large' /> : <WrongIcon color='secondary' fontSize='large' />}
          </Button>
          <Typography className={classes.text2}>문자, 숫자, 특수문자 필수</Typography>
        </Grid>
        <Grid item container justify='center' style={{ height: "62px", margin: "5px 0", padding: "0" }}>
          <Typography className={classes.text}>비밀번호 확인</Typography>
          <TextField
            error={passwordConfirm !== "" && password !== passwordConfirm}
            helperText={passwordConfirm !== "" && password !== passwordConfirm ? "비밀번호와 일치하지 않습니다." : ""}
            variant='outlined'
            required
            name='passwordConfrim'
            placeholder=' 비밀번호 재입력'
            id='passwordConfrim'
            type='password'
            value={passwordConfirm || ""}
            onChange={e => setPasswordConfirm(e.target.value)}
            className={classes.contents}
          />
          <Button disabled={true} style={{ width: "90px", height: "40px", margin: "0 5px", padding: "0" }}>
            {passwordConfirm !== "" && password === passwordConfirm ? (
              <RightIcon color='primary' fontSize='large' />
            ) : (
              <WrongIcon color='secondary' fontSize='large' />
            )}
          </Button>
          <Typography className={classes.text2}></Typography>
        </Grid>
        <Grid item container justify='center' style={{ minHeight: "62px", margin: "5px 0" }}>
          <Typography className={classes.text}>E-mail 인증</Typography>
          <TextField
            error={email !== "" && checkEmail === false}
            helperText={email !== "" && checkEmail === false ? "올바른 이메일 형식이 아닙니다." : ""}
            variant='outlined'
            required
            name='email'
            placeholder=' 이메일 주소'
            id='email'
            type='email'
            value={email || ""}
            disabled={isVerifiedEmail}
            onChange={e => verifyEmail(e.target.value)}
            className={classes.contents}
          />
          <Button
            variant='outlined'
            color='primary'
            disabled={checkEmail === false || isVerifiedEmail}
            className={classes.btnCheck}
            onClick={() => _onSendEmail()}>
            {emailCode === undefined ? "전송" : "재전송"}
          </Button>
          <Typography className={classes.text2}></Typography>
        </Grid>
        <Grid item container justify='center' style={{ minHeight: "62px", margin: "5px 0" }}>
          {emailCode !== undefined && (
            <React.Fragment>
              <Typography className={classes.text}></Typography>
              <TextField
                error={email !== "" && checkEmail === false}
                variant='outlined'
                required
                name='code'
                placeholder=' 인증번호'
                id='code'
                autoComplete='off'
                value={emailCode || ""}
                inputRef={refEmailCode}
                disabled={isVerifiedEmail}
                onChange={e => setEmailCode(e.target.value.toString())}
                className={classes.contents}
              />
              <Button
                variant='outlined'
                color='primary'
                disabled={checkEmail === false || isVerifiedEmail}
                className={classes.btnCheck}
                onClick={() => _onCheckEmail()}>
                인증
              </Button>
              <Typography className={classes.text2}></Typography>
            </React.Fragment>
          )}
        </Grid>

        <Divider style={{ width: "70%", margin: "10px 15%" }} />
        <Grid item container justify='center' style={{ margin: "10px 0" }}>
          <Typography className={classes.text} style={{ marginBottom: "0" }}>
            약관 동의
          </Typography>
          <Button
            variant='outlined'
            color={isAgree ? "primary" : "secondary"}
            startIcon={isAgree ? <CheckIcon /> : ""}
            onClick={() => {
              setOpenHelper(true);
            }}
            style={{ minWidth: "180px", height: "40px", padding: "5px 0", marginRight: "20px" }}>
            이용약관
          </Button>
          <Button
            variant='outlined'
            color={isAgree ? "primary" : "secondary"}
            startIcon={isAgree ? <CheckIcon /> : ""}
            onClick={() => {
              setOpenHelper(true);
            }}
            style={{ minWidth: "180px", height: "40px", padding: "5px 0", marginLeft: "20px" }}>
            개인정보처리방침
          </Button>
          <Typography className={classes.text2} style={{ width: "150px", marginBottom: "0" }}></Typography>
        </Grid>
        <Divider style={{ width: "70%", margin: "10px 15%" }} />

        <Grid item container justify='center' style={{ margin: "20px 0" }}>
          <Button variant='outlined' color='default' href='/' style={{ width: "300px", height: "50px", fontSize: "1.2rem", margin: "0 10px" }}>
            취소
          </Button>
          <Button variant='contained' color='primary' onClick={_onClickSignUp} style={{ width: "300px", height: "50px", fontSize: "1.2rem", margin: "0 10px" }}>
            가입하기
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        maxWidth='lg'>
        <DialogContent style={{ padding: "10px" }}>
          <Privacy />
          <Divider />
          <FormControlLabel
            control={
              <Checkbox
                value='allowExtraEmails'
                color='primary'
                checked={isAgree}
                onChange={() => {
                  setIsAgree(!isAgree);
                  setOpenHelper(false);
                }}
              />
            }
            label='개인정보처리방침에 동의합니다.'
            style={{ margin: "10px 30px", textAlign: "center", fontWeight: "bold" }}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
