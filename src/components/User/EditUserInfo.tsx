import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import MyButton from 'elements/Button/MyButton';

import { SignInUser, setUserInfo } from 'utils/UserUtil';

import IUserInfo from 'interfaces/User/IUserInfo';

interface IProps {
  userInfo: IUserInfo,
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

function EditUserInfo(props: IProps) {

  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const [isConfirm, setIsConfirm] = React.useState(false);
  const [server, setServer] = React.useState(props.userInfo.server);
  const [character, setCharacter] = React.useState(props.userInfo.character);
  const [password, setPassword] = React.useState("");
  //TODO 비밀번호 변경 별도 페이지로 분리하기
  const [changePassword, setChangePassword] = React.useState("");
  const [changePasswordConfirm, setChangePasswordConfirm] = React.useState("");
  
  const clear = () => {
    setIsConfirm(false);
    setServer(props.userInfo.server);
    setCharacter(props.userInfo.character);
    setPassword("");
    setChangePassword("");
    setChangePasswordConfirm("");
  }

  const _onEnterPassword = (keyCode: number) => {
		if (keyCode == 13) {
			_onConfirm();
		}
	}
  const _onConfirm = async () => {
    const res = await SignInUser(userInfo.id, password);
    
    if (res) {
      setIsConfirm(true);
    }
    else {
      
      setPassword("");
      setIsConfirm(false);
    }
  }

  const _onCancle = () => {
    clear();
    setIsConfirm(false);
  }

  const _onSave = async () => {
    const editUserInfo: IUserInfo = Object.assign(userInfo);
    editUserInfo.server = server;
    editUserInfo.character = character;

    const res = await setUserInfo(editUserInfo);
    alert(res);
    window.location.replace("/myinfo");
  }

  return (
    <Container>
      <Typography
        variant="h6"
        className={classes.title}>
          정보수정
      </Typography>
      <Grid container spacing={3}
        className={classes.form}>
          {
            isConfirm ?
              <React.Fragment>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      아이디
                  </Grid>
                  <Grid item xs={9}>
                    {userInfo.id}
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      이메일
                  </Grid>
                  <Grid item xs={9}>
                    {userInfo.mail}
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      서버
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      name="server"
                      label="Server"
                      id="server"
                      value={server}
                      onChange={(e) => (setServer(e.target.value))}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      닉네임
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      name="character"
                      label="Character"
                      id="character"
                      value={character}
                      onChange={(e) => (setCharacter(e.target.value))}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                     변경 비밀번호
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      value={changePassword}
                      onChange={(e) => (setChangePassword(e.target.value))}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      변경 비밀번호 확인
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      error={((changePasswordConfirm !== "") && (changePassword !== changePasswordConfirm))}
                      helperText={(changePasswordConfirm !== "") && (changePassword !== changePasswordConfirm) ? "비밀번호가 일치하지 않습니다." : ""}
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      name="passwordConfrim"
                      label="password Confrim"
                      id="passwordConfrim"
                      type="password"
                      value={changePasswordConfirm}
                      onChange={(e) => (setChangePasswordConfirm(e.target.value))}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={6}>
                    <MyButton
                      color="red"
                      text="취소"
                      onClick={_onCancle}/>
                  </Grid>
                  <Grid item xs={6}>
                    <MyButton
                      color="blue"
                      text="저장"
                      onClick={_onSave}/>
                  </Grid>
                </Grid>
              </React.Fragment>
            :
              <React.Fragment>
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
                      onClick={_onConfirm}/>
                  </Grid>
                </Grid>
              </React.Fragment>
            }
      </Grid>
    </Container>
  ); 
}

export default EditUserInfo;