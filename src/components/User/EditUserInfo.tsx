import React, { useEffect } from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

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

const duration = 3000;

function EditUserInfo(props: IProps) {

  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [isConfirm, setIsConfirm] = React.useState(false);
  const [openKakao, setOpenKakao] = React.useState("");
  const [server, setServer] = React.useState("");
  const [character, setCharacter] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    setOpenKakao(userInfo.openKakao ? userInfo.openKakao : "");
    setServer(userInfo.titleAccount ? userInfo.titleAccount.server : "");
    setCharacter(userInfo.titleAccount ? userInfo.titleAccount.character : "");
  }, [userInfo]);

  const clear = () => {
    setIsConfirm(false);
    setOpenKakao(userInfo.openKakao ? userInfo.openKakao : "");
    setPassword("");
  }

  const _onEnterPassword = (keyCode: number) => {
		if (keyCode === 13) {
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
    setMyBackdrop(true);

    const editUserInfo: IUserInfo = Object.assign(userInfo);
    editUserInfo.openKakao = openKakao;

    const res = await setUserInfo(editUserInfo);

    if (res.code === 200) {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message
      });
    }
    else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message
      });  
    }

    setTimeout(() => {
      setMyBackdrop(false);
      window.location.reload();
    }, duration);
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
                    {
                      userInfo.mail ?
                        userInfo.mail
                      :
                        "인증 된 이메일이 없습니다."
                    }
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      오픈카카오톡 주소
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      name="openKakao"
                      label="Open KakaoTalk"
                      id="openKakao"
                      value={openKakao}
                      onChange={(e) => (setOpenKakao(e.target.value))}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      대표캐릭터 서버
                  </Grid>
                  <Grid item xs={9}>
                    {
                      server ?
                        server
                      :
                        "대표 설정 된 캐릭터 서버 정보가 없습니다."
                    }
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={3}
                    className={classes.text}>
                      대표캐릭터 닉네임
                  </Grid>
                  <Grid item xs={9}>
                    {
                      character ?
                        character
                      :
                        "대표 설정 된 캐릭터 닉네임 정보가 없습니다."
                    }
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