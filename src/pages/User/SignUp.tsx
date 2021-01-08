import React, { useState } from "react";
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

import MyButton from "elements/Button/MyButton";

import RightIcon from "@material-ui/icons/SentimentVerySatisfied";
import WrongIcon from "@material-ui/icons/SentimentVeryDissatisfied";

import { CheckExistUser, SignUpUser } from "utils/UserUtil";

const useStyles = makeStyles({
  title: {
    margin: "20px 10px",
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
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const [checkId, setCheckId] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);

  const _onCheckExist = async () => {
    const res = await CheckExistUser(id);

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
    const res = await SignUpUser(id, password);
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
    var pattern = /[`~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    if (input === "") {
      setId("");
      return;
    }

    for (let i = 0; i < input.length; i++) {
      var letters = input.charAt(i);
      if (pattern.test(letters)) {
        setCheckId(false);
      } else {
        setCheckId(true);
        setId(input);
      }
    }
  };

  /*
  const verifyPassword = (input: string) => {
    setCheckPassword(true);
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    if (input === "") {
      setPassword("");
      return;
    }

    for (let i = 0; i < input.length; i++) {
      if (!pattern1.test(input) && !pattern2.test(input) && !pattern3.test(input)) {
        setCheckPassword(false);
      } else {
        setCheckPassword(true);
        setPassword(input);
      }
    }
  };
  */

  return (
    <React.Fragment>
      <Container style={{ width: "40%", margin: "10px 30%", float: "left" }}>
        <Typography className={classes.title} component='h1' variant='h4'>
          회원가입
        </Typography>
        <Container style={{ width: "100%", margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            variant='outlined'
            error={checkId === false}
            helperText={checkId === false ? "아이디에 특수문자가 포함되어 있습니다." : ""}
            autoFocus
            required
            id='id'
            name='id'
            placeholder='아이디(6~8자리)'
            inputRef={refId}
            value={id || ""}
            onChange={e => {
              verifyId(e.target.value);
              setIsNewId(false);
            }}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "300px", margin: "10px 5px" }}
          />
          <Button
            variant={isNewId ? "contained" : "outlined"}
            color='primary'
            disabled={checkId === false}
            className={classes.checkButton}
            startIcon={isNewId ? <CheckIcon /> : ""}
            onClick={_onCheckExist}
            style={{ width: "90px", height: "40px", margin: "10px 5px", padding: "5px" }}>
            {isNewId ? "완료" : "중복확인"}
          </Button>
        </Container>
        <Container style={{ width: "100%", margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            error={checkPassword === false}
            helperText={checkPassword === false ? "숫자/문자/특수문자를 합해 8자리 이상이어야 합니다." : ""}
            variant='outlined'
            required
            name='password'
            placeholder='비밀번호'
            id='password'
            type='password'
            value={password || ""}
            onChange={e => setPassword(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "300px", margin: "10px 5px" }}
          />
          <Button disabled={true} style={{ width: "90px", height: "40px", margin: "10px 5px", padding: "0" }}>
            {checkPassword === false ? <RightIcon color='primary' fontSize='large' /> : <WrongIcon color='secondary' fontSize='large' />}
          </Button>
        </Container>
        <Container style={{ width: "100%", margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
          <TextField
            error={passwordConfirm !== "" && password !== passwordConfirm}
            helperText={passwordConfirm !== "" && password !== passwordConfirm ? "비밀번호가 일치하지 않습니다." : ""}
            variant='outlined'
            required
            name='passwordConfrim'
            placeholder='비밀번호 확인'
            id='passwordConfrim'
            type='password'
            value={passwordConfirm || ""}
            onChange={e => setPasswordConfirm(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "0 10px" } }}
            style={{ width: "300px", margin: "10px 5px" }}
          />
          <Button disabled={true} style={{ width: "90px", height: "40px", margin: "10px 5px", padding: "0" }}>
            {passwordConfirm !== "" && password === passwordConfirm ? (
              <RightIcon color='primary' fontSize='large' />
            ) : (
              <WrongIcon color='secondary' fontSize='large' />
            )}
          </Button>
        </Container>
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
          <MyButton color='blue' text='가입하기' onClick={_onClickSignUp} />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
