import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { FindIdByEmail } from "utils/CommonUtil";

const useStyles = makeStyles({
  text: {
    width: "280px",
    margin: "2px 5px 10px 5px",
    paddingTop: "8px",
    "& input": {
      height: "40px",
      padding: "0 10px",
    },
  },
  btn: {
    width: "280px",
    height: "40px",
    margin: "10px 5px",
  },
});

const duration = 2000;

export default function FindId() {
  const classes = useStyles();
  const setMyAlert = useSetRecoilState(MyAlertState);

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  const verifyEmail = (input: string) => {
    var pattern = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    setCheckEmail(false);
    setEmail(input);

    if (pattern.test(input) && input.split(".")[1].length > 1) {
      setCheckEmail(true);
    }
  };

  const _onFindId = async () => {
    const res = await FindIdByEmail(email);
    if (res.result === "success") {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });

      setId(res.id);
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });

      setId("");
    }
  };

  return (
    <React.Fragment>
      <Grid item style={{ width: "100%", height: "280px", textAlign: "center", padding: "0" }}>
        <div style={{ width: "100%", height: "70px", textAlign: "center" }}>
          <TextField
            className={classes.text}
            error={email !== "" && checkEmail === false}
            helperText={email !== "" && checkEmail === false ? "올바른 이메일 형식이 아닙니다." : ""}
            variant='outlined'
            required
            name='email'
            id='email'
            type='email'
            label='이메일 주소'
            autoComplete='off'
            value={email || ""}
            onChange={e => verifyEmail(e.target.value)}
          />
        </div>
        <Button
          className={classes.btn}
          variant='contained'
          color='primary'
          disabled={!checkEmail}
          onClick={() => {
            _onFindId();
          }}>
          아이디 찾기
        </Button>
        {id && (
          <div style={{ marginTop: "30px" }}>
            <Typography>
              해당 이메일로 가입된 아이디는
              <br />
              <b>{id}</b> 입니다.
            </Typography>
          </div>
        )}
      </Grid>
    </React.Fragment>
  );
}
