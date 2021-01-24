import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { FindIdByEmail } from 'utils/CommonUtil';

const useStyles = makeStyles((theme) => ({
}));
const duration = 2000;

export default function FindId() {
  const classes = useStyles();

  const setMyAlert = useSetRecoilState(MyAlertState);
  
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

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

  const _onFindId = async () => {
    const res = await FindIdByEmail(email);
    if (res.result === 'success') {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });

      setId(res.id);
    }
    else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });

      setId("");
    }
  }

  return (
    <React.Fragment>
			<Container component="main" maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={email !== "" && checkEmail === false}
              helperText={email !== "" && checkEmail === false ? "올바른 이메일 형식이 아닙니다." : ""}
              variant='outlined'
              required
              name='email'
              placeholder='가입한 이메일 주소'
              id='email'
              type='email'
              value={email || ""}
              onChange={e => verifyEmail(e.target.value)}
              inputProps={{ style: { height: "40px", padding: "0 10px" } }}
              style={{ width: "300px", margin: "0 5px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              fullWidth
              color="primary"
              style={{ width: "300px", margin: "0 5px" }}
              disabled={!checkEmail}
              onClick={() => {
                _onFindId();
              }}>
              아이디 찾기
            </Button>
          </Grid>
          {
            id &&
              <Grid item xs={12}>
                <Typography>
                  가입한 ID 정보를 찾았습니다.<br/>
                  <b>{id}</b>
                </Typography>
              </Grid>
          }
      </Grid>
			</Container>
    </React.Fragment>
  );
}