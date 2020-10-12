import React from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import MyButton from 'elements/Button/MyButton';

import { CheckPassword, WithDrawUser, LogoutUser } from 'utils/UserUtil';

interface IProps {
  id: string
}

const useStyles = makeStyles((theme) => ({
  title: {
    
  },
  form: {
    marginTop: 10,
  },
  text: {
    margin: "auto",
    verticalAlign: "middle"
  }
}));

const duration = 3000;

function WithdrawUser(props: IProps) {

  const classes = useStyles();
  const { id } = props;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [password, setPassword] = React.useState("");

  const _onEnterPassword = (keyCode: number) => {
		if (keyCode === 13) {
			_onWithdraw();
		}
  }
  
  const _onWithdraw = async () => {
    setMyBackdrop(true);

    const checked = true; //await CheckPassword(id, password);

    if (checked) {
      const res = await WithDrawUser(id, password);

      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });

        LogoutUser();
        document.location.href="/";
      }
      else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message
        });  
      }
    }
    else { 
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: "일치하지 않는 비밀번호입니다."
      }); 
    }

    setMyBackdrop(false);
  }

  return (
    <Container>
      <Typography
        variant="h6"
        className={classes.title}>
          회원 탈퇴
      </Typography>
      <Grid container spacing={3}
        className={classes.form}>
          {
            id &&
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="h6" color="error">
                    주의!
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {id} 회원 탈퇴를 진행합니다. <br/>
                    탈퇴 후에도 작성한 글은 지워지지 않습니다. <br/>
                    탈퇴한 정보는 보관하지 않으며 따라서 복구할 수 없습니다. <br/>
                    비밀번호 입력 후 탈퇴를 진행합니다.
                  </Typography>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      비밀번호 확인
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      autoFocus={true}
                      size="small"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => (setPassword(e.target.value))}
                      onKeyUp={(e) => (_onEnterPassword(e.keyCode))}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <MyButton
                      color="blue"
                      text="확인"
                      onClick={_onWithdraw}/>
                  </Grid>
                </Grid>
              </React.Fragment>
          }
      </Grid>
    </Container>
  ); 
}

export default WithdrawUser;