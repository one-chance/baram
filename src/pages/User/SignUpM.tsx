import React, { useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import CheckIcon from "@material-ui/icons/Check";
import RightIcon from "@material-ui/icons/SentimentVerySatisfied";
import WrongIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Privacy from "components/PrivacyPolicy";
import Terms from "components/TermsOfService";

import { CheckExistUser, SignUpUser } from "utils/UserUtil";
import { sendVerifyEmail, checkVerifyEmail } from "utils/CommonUtil";

const useStyles = makeStyles({
  contents: {
    width: "200px",
    height: "62px",
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
    height: "30px",
    lineHeight: "30px",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "5px",
  },
  text2: {
    height: "30px",
    lineHeight: "30px",
    fontSize: "16px",
    margin: "5px",
    color: "gray",
  },
});

const duration = 2000;

export default function SignUp() {
  const classes = useStyles();

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [id, setId] = useState("");
  const refId = useRef<any>();
  const [isNewId, setIsNewId] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState<string>("");
  const [showEmailCode, setShowEmailCode] = useState<boolean>(false);
  const refEmailCode = useRef<any>();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [checkId, setCheckId] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkEmail, setCheckEmail] = useState(false);

  const [openService, setOpenService] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const _onCheckExist = async () => {
    const res = await CheckExistUser(id);

    if (res.code === 200 && id !== "") {
      alertSuccess(res.message);
      setIsNewId(true);
    } else if (id !== "") {
      alertError(res.message);
      setIsNewId(false);
      refId.current.focus();
    }
  };

  const _onClickSignUp = async () => {
    if (!isNewId) {
      alertError("아이디 중복검사를 진행해야 합니다.");
      refId.current.focus();
      return 0;
    }

    if (password.length < 8 || password !== passwordConfirm || checkPassword === false) {
      alertError("비밀번호가 올바르게 설정되지 않았습니다.");
      return 0;
    }

    if (!isVerifiedEmail) {
      alertError("이메일 인증을 완료해야 합니다.");
      return 0;
    }

    if (!agreePrivacy || !agreeService) {
      alertError("모든 약관에 동의해야 합니다.");
      return 0;
    }

    setMyBackdrop(true);
    const res = await SignUpUser(id, password, email);

    if (res.code === 200) {
      // Successed Authentication
      alertSuccess(res.message);
      document.location.href = "/myinfo/auth";
    } else {
      // Failed Authentication
      alertError(res.message);
      setTimeout(() => setMyBackdrop(false), duration);
    }
  };

  const alertSuccess = (sentence: string) => {
    if (sentence !== "") {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: sentence,
      });
    }
  };

  const alertError = (sentence: string) => {
    if (sentence !== "") {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: sentence,
      });
    }
  };

  const verifyId = (input: string) => {
    var pattern = /[0-9a-zA-Z]/; // 숫자+문자
    setIsNewId(false);
    setCheckId(true);
    setId(input);

    for (let i = 0; i < input.length; i++) {
      var letters = input.charAt(i);
      if (!pattern.test(letters)) {
        setCheckId(false);
        return;
      }
    }
    setIsNewId(false);
  };

  const verifyPassword = (input: string) => {
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[`~!@#$%^&*()_+|<>?:{},./]/; // 특수문자
    var pa1 = false;
    var pa2 = false;
    var pa3 = false;

    if (input === "") {
      setPassword("");
      setCheckPassword(true);
      return;
    }
    setCheckPassword(true);
    setPassword(input);

    for (let i = 0; i < input.length; i++) {
      let letters = input.charAt(i);
      if (pattern1.test(letters)) pa1 = true;
      if (pattern2.test(letters)) pa2 = true;
      if (pattern3.test(letters)) pa3 = true;
    }

    if (pa1 === true && pa2 === true && pa3 === true) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
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
    const res = await sendVerifyEmail(email);
    if (res.result === "success") {
      alertSuccess(res.message);
      setShowEmailCode(true);
      setEmailCode("");
      refEmailCode.current.focus();
    } else {
      alertError(res.message);
    }
  };

  const _onCheckEmail = async () => {
    if (showEmailCode) {
      const res = await checkVerifyEmail(email, emailCode);
      if (res) {
        alertSuccess("인증번호 확인에 성공하였습니다.");
        setIsVerifiedEmail(true);
      } else {
        alertError("인증번호 확인에 실패하였습니다.");
        setIsVerifiedEmail(false);
      }
    }
  };

  return (
    <React.Fragment>
      <form>
        <Grid container direction='column' justify='center' style={{ padding: "0", margin: "10px auto" }}>
          <Typography style={{ margin: "15px 0", textAlign: "center", fontSize: "2rem" }}>회원가입</Typography>
          <Grid item container justify='center' style={{ margin: "5px 0" }}>
            <Grid container justify='space-between' style={{ width: "300px" }}>
              <Typography className={classes.text}>* 아이디</Typography>
              <Typography className={classes.text2}>영문자, 숫자</Typography>
            </Grid>
            <Grid container justify='center'>
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
                onChange={e => {
                  verifyId(e.target.value);
                }}
                className={classes.contents}
              />
              <Button
                variant='outlined'
                color='primary'
                disabled={id.length < 6 || checkId === false}
                className={classes.btnCheck}
                startIcon={isNewId ? <CheckIcon /> : ""}
                onClick={_onCheckExist}
                style={{ marginBottom: "22px" }}>
                {isNewId ? "통과" : "중복확인"}
              </Button>
            </Grid>
          </Grid>
          <Grid item container justify='center' style={{ margin: "5px 0" }}>
            <Grid container justify='space-between' style={{ width: "300px" }}>
              <Typography className={classes.text}>* 비밀번호</Typography>
              <Typography className={classes.text2}>숫자, 문자, 특수문자</Typography>
            </Grid>
            <Grid container justify='center'>
              <TextField
                error={(password.length > 0 && password.length < 8) || checkPassword === false}
                helperText={password.length > 0 && password.length < 8 ? "최소 8자 이상" : checkPassword === false ? "숫자/문자/특수문자가 필요합니다." : ""}
                variant='outlined'
                required
                name='password'
                placeholder=' 최소 8자'
                id='password'
                type='password'
                autoComplete='new-password'
                value={password || ""}
                onChange={e => verifyPassword(e.target.value)}
                className={classes.contents}
              />
              <Button disabled={true} style={{ width: "90px", height: "40px", margin: "0 5px", padding: "0" }}>
                {password !== "" && checkPassword === true ? <RightIcon color='primary' fontSize='large' /> : <WrongIcon color='secondary' fontSize='large' />}
              </Button>
            </Grid>
          </Grid>
          <Grid item container justify='center' style={{ margin: "5px 0" }}>
            <Grid container justify='space-between' style={{ width: "300px" }}>
              <Typography className={classes.text}>* 비밀번호 확인</Typography>
            </Grid>
            <Grid container justify='center'>
              <TextField
                error={passwordConfirm !== "" && password !== passwordConfirm}
                helperText={passwordConfirm !== "" && password !== passwordConfirm ? "비밀번호와 일치하지 않습니다." : ""}
                variant='outlined'
                required
                name='passwordConfrim'
                placeholder=' 비밀번호 재입력'
                id='passwordConfrim'
                type='password'
                autoComplete='new-password'
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
            </Grid>
          </Grid>
          <Grid item container justify='center' style={{ margin: "5px 0" }}>
            <Grid container justify='space-between' style={{ width: "300px" }}>
              <Typography className={classes.text}>* 이메일 인증</Typography>
            </Grid>
            <TextField
              error={email !== "" && checkEmail === false}
              helperText={email !== "" && checkEmail === false ? "올바른 이메일 형식이 아닙니다." : ""}
              variant='outlined'
              required
              name='email'
              placeholder=' 이메일 주소'
              id='email'
              type='email'
              autoComplete='off'
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
              {!showEmailCode ? "전송" : "재전송"}
            </Button>
          </Grid>
          <Grid item container justify='center' style={{ margin: "5px 0" }}>
            {showEmailCode && (
              <React.Fragment>
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
                  style={{ height: "40px" }}
                />
                <Button
                  variant='outlined'
                  color='primary'
                  disabled={checkEmail === false || isVerifiedEmail}
                  className={classes.btnCheck}
                  onClick={() => _onCheckEmail()}>
                  인증
                </Button>
              </React.Fragment>
            )}
          </Grid>

          <Divider style={{ width: "96%", margin: "10px 2%" }} />
          <Grid item container justify='center' style={{ margin: "5px 0" }}>
            <Grid container justify='space-between' style={{ width: "300px" }}>
              <Typography className={classes.text}>* 약관 동의</Typography>
            </Grid>
            <Button
              variant='outlined'
              color={agreeService ? "primary" : "default"}
              startIcon={agreeService ? <CheckIcon /> : ""}
              onClick={() => {
                setOpenService(true);
              }}
              style={{ width: "140px", height: "40px", padding: "0", margin: "5px" }}>
              서비스 이용약관
            </Button>
            <Button
              variant='outlined'
              color={agreePrivacy ? "primary" : "default"}
              startIcon={agreePrivacy ? <CheckIcon /> : ""}
              onClick={() => {
                setOpenPrivacy(true);
              }}
              style={{ width: "140px", height: "40px", padding: "0", margin: "5px" }}>
              개인정보처리방침
            </Button>
          </Grid>
          <Divider style={{ width: "96%", margin: "10px 2%" }} />

          <Grid item container justify='center' style={{ margin: "10px 0" }}>
            <Button
              variant='outlined'
              color='default'
              href='/'
              style={{ width: "300px", height: "40px", fontSize: "1.2rem", margin: "5px 10px", padding: "0" }}>
              취소
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={_onClickSignUp}
              style={{ width: "300px", height: "40px", fontSize: "1.2rem", margin: "5px 10px", padding: "0" }}>
              가입하기
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog
        open={openService}
        onClose={() => {
          setOpenService(false);
        }}
        maxWidth='lg'>
        <DialogContent style={{ padding: "10px" }}>
          <Terms />
          <Divider />
          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                checked={agreeService}
                onChange={() => {
                  setAgreeService(!agreeService);
                  setOpenService(false);
                }}
              />
            }
            label='서비스 이용약관에 동의합니다.'
            style={{ margin: "10px 30px", textAlign: "center", fontWeight: "bold" }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openPrivacy}
        onClose={() => {
          setOpenPrivacy(false);
        }}
        maxWidth='lg'>
        <DialogContent style={{ padding: "10px" }}>
          <Privacy />
          <Divider />
          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                checked={agreePrivacy}
                onChange={() => {
                  setAgreePrivacy(!agreePrivacy);
                  setOpenPrivacy(false);
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
