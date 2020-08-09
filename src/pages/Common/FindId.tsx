import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MyButton from 'elements/MyButton';

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: 20,
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "flex-center",
  },
  form: {
    marginTop: 20,
  },
  back: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
	signup: {
		marginTop: 20,
	}
}));

export default function FindId() {
  const classes = useStyles();

  const [mail, setMail] = React.useState("");
  const [mailAuth, setMailAuth] = React.useState("");

  const [isSendAuthMail, setIsSendAuthMail] = React.useState(false);

  const _onSendAuthMail = () => {
    setIsSendAuthMail(true);
  }

  const _onMoveToMailForm = () => {
    setIsSendAuthMail(false);
  }

  return (
    <React.Fragment>
			<Container component="main" maxWidth="xs">
        <Typography
          variant="h6" gutterBottom
          className={classes.title}>
            아이디 찾기
        </Typography>
          <form
            noValidate 
            className={classes.form}>
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                {
                  isSendAuthMail ?
                    <Grid container item xs={12}>
                      <Link
                        component="button"
                        className={classes.back}
                        onClick={_onMoveToMailForm}>
                          뒤로
                      </Link>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        margin="dense"
                        id="auth"
                        name="auth"
                        label="인증번호"
                        value={mailAuth}
                        onChange={(e) => {setMailAuth(e.target.value)}}
                      />
                    </Grid>
                  :
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="dense"
                      id="mail"
                      name="mail"
                      label="가입메일"
                      autoComplete="mail"
                      value={mail}
                      onChange={(e) => {setMail(e.target.value)}}
                    />
                }
              </Grid>
              <Grid item xs={12}
                justify="flex-end"
                className={classes.signup}>
                  {
                    isSendAuthMail ?
                      <MyButton
                        color="red"
                        text="인증 완료"
                        onClick={() => {
                          alert("인증 완료");
                        }}/>
                    :
                      <MyButton
                        color="blue"
                        text="인증번호 받기"
                        onClick={_onSendAuthMail}/>
                    }
              </Grid>
          </Grid>
        </form>
			</Container>
    </React.Fragment>
  );
}