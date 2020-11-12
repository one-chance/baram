import React from "react";
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

  const [id, setId] = React.useState("");
  const refId = React.useRef<any>();
  const [isNewId, setIsNewId] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [isAgree, setIsAgree] = React.useState(false);

  const _onCheckExist = async () => {
    const res = await CheckExistUser(id);

    if (res.code === 200) {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setIsNewId(true);
    } else {
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

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Typography className={classes.title} component="h1" variant="h5">
          회원가입
        </Typography>
        <Container component="div" style={{ margin: "10px", padding: "0" }}>
          <TextField
            variant="outlined"
            autoFocus
            required
            fullWidth
            disabled={isNewId}
            size="small"
            id="id"
            name="id"
            placeholder="아이디"
            inputRef={refId}
            value={id}
            onChange={(e) => setId(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "5px 10px" } }}
            style={{ width: "75%", margin: "10px 0", float: "left" }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.checkButton}
            startIcon={<CheckIcon />}
            onClick={_onCheckExist}
            style={{ width: "25%", height: "40px", margin: "10px 0", padding: "5px", float: "left" }}
          >
            {isNewId ? "완료" : "중복확인"}
          </Button>
          <TextField
            variant="outlined"
            required
            fullWidth
            size="small"
            name="password"
            placeholder="비밀번호"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "5px 10px" } }}
            style={{ width: "100%", margin: "10px 0", float: "left" }}
          />

          <TextField
            error={passwordConfirm !== "" && password !== passwordConfirm}
            helperText={passwordConfirm !== "" && password !== passwordConfirm ? "비밀번호가 일치하지 않습니다." : ""}
            variant="outlined"
            required
            fullWidth
            size="small"
            name="passwordConfrim"
            placeholder="비밀번호 확인"
            id="passwordConfrim"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            inputProps={{ style: { height: "40px", padding: "5px 10px" } }}
            style={{ width: "100%", margin: "10px 0", float: "left" }}
          />
        </Container>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography>인증방식 설명</Typography>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                value="allowExtraEmails"
                color="primary"
                checked={isAgree}
                onChange={() => {
                  setIsAgree(!isAgree);
                }}
              />
            }
            label="내용을 다 읽고 이해하였습니다."
          />
        </Grid>
        <Grid container justify="flex-end" className={classes.signup}>
          <MyButton color="blue" text="가입하기" onClick={_onClickSignUp} />
        </Grid>
      </Container>
    </React.Fragment>
  );
}
