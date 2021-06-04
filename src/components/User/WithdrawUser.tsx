import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CheckPassword, WithDrawUser, LogoutUser } from "utils/UserUtil";

interface IProps {
  id: string;
}

const useStyles = makeStyles({
  text: {
    minWidth: "120px",
    maxWidth: "160px",
    lineHeight: "40px",
    margin: "0 10px",
    padding: "0",
    fontWeight: "bolder",
  },
  input: {
    minWidth: "240px",
    maxWidth: "320px",
    margin: "0 10px",
    "& input": {
      height: "40px",
      padding: "0 10px",
    },
  },
  btn: {
    minWidth: "240px",
    maxWidth: "320px",
    height: "40px",
    margin: "0 10px",
  },
});

const duration = 3000;

function WithdrawUser(props: IProps) {
  const classes = useStyles();
  const { id } = props;
  const [password, setPassword] = useState("");

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const _onEnterPassword = (keyCode: number) => {
    if (keyCode === 13) {
      _onWithdraw();
    }
  };

  const _onWithdraw = async () => {
    setMyBackdrop(true);

    const checked = await CheckPassword(id, password);

    if (checked) {
      const res = await WithDrawUser(id, password);

      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        LogoutUser();
        document.location.href = "/";
      } else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message,
        });
      }
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    setMyBackdrop(false);
  };

  return (
    <React.Fragment>
      <Grid container direction='column' style={{ margin: "10px 0", padding: "0" }}>
        <Typography variant='h4' style={{ marginBottom: "30px" }}>
          회원 탈퇴
        </Typography>

        <Typography variant='h6' color='error'>
          ※ 주의 사항 ※
        </Typography>
        <Typography variant='body1' color='error' style={{ margin: "10px" }}>
          탈퇴시 {id}님이 작성한 글은 자동으로 삭제되지 않습니다. <br />
          탈퇴시 계정 정보가 즉시 삭제되므로 복구할 수 없습니다.
        </Typography>
        <Grid item style={{ height: "50px" }}></Grid>
        <Grid container item style={{ margin: "10px 0" }}>
          <Typography className={classes.text}>비밀번호 확인</Typography>
          <TextField
            className={classes.input}
            variant='outlined'
            required
            fullWidth
            autoFocus={true}
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyUp={e => _onEnterPassword(e.keyCode)}
          />
        </Grid>
        <Grid container style={{ margin: "10px 0" }}>
          <Typography className={classes.text}></Typography>
          <Button variant='contained' color='secondary' fullWidth onClick={_onWithdraw} className={classes.btn}>
            예, 탈퇴하겠습니다.
          </Button>
        </Grid>
        <Grid item style={{ height: "50px" }}></Grid>
      </Grid>
    </React.Fragment>
  );
}

export default WithdrawUser;
