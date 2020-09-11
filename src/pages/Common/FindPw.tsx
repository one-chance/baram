import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
  context: {
    textAlign: "center",
    justifyContent: "flex-center",
  },
	signup: {
		marginTop: 20,
	}
}));

export default function FindPw() {
  const classes = useStyles();
  
  const [mail, setMail] = React.useState("");
  const [id, setId] = React.useState("");
  const [isSendPasswordMail, setIsSendPasswordMail] = React.useState(false);

  const _onSendAuthMail = () => {
    setMail("");
    setId("");

    setIsSendPasswordMail(true);
  }

  return (
    <React.Fragment>
			<Container component="main" maxWidth="xs">
        <Typography
          variant="h6" gutterBottom
          className={classes.title}>
            비밀번호 찾기
        </Typography>
        <form
          noValidate 
          className={classes.form}>
            <Grid container spacing={2}>
              <Grid container item xs={12}
                className={classes.context}>
                {
                  isSendPasswordMail ?
                    <Grid item xs={12}>
                      <Typography
                        variant="h5">
                        임시 비밀번호 발송 완료
                      </Typography>
                    </Grid>
                  :
                    <Grid container item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        margin="dense"
                        id="id"
                        name="id"
                        label="아이디"
                        autoComplete="id"
                        value={id}
                        onChange={(e) => {setId(e.target.value)}}
                      />
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
                    </Grid>
                }
              </Grid>
              <Grid item xs={12}
                justify="flex-end"
                className={classes.signup}>
                  {
                    !isSendPasswordMail &&
                      <MyButton
                        color="blue"
                        text="임시 비밀번호 발급"
                        onClick={_onSendAuthMail}/>
                  }
              </Grid>
          </Grid>
        </form>
			</Container>
    </React.Fragment>
  );
}