import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { getBaseUrlForAuth } from "utils/ConfigUtil";
import { checkGameUser } from "utils/UserUtil";
import { getTitleAccountString } from "utils/CommonUtil";
import IUserInfo from "interfaces/User/IUserInfo";
import { setTitleAccount } from "utils/UserUtil";
import IAccount from "interfaces/User/IAccount";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  text: {
    width: "160px",
    lineHeight: "40px",
    margin: "0 10px",
    padding: "0",
    fontWeight: "bolder",
  },
  input: {
    minWidth: "140px",
    maxWidth: "260px",
    margin: "0 10px",
    "& input": {
      height: "40px",
      padding: "0 10px",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const duration = 3000;

function AuthAccount(props: IProps) {
  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const baseUrlForAuth = getBaseUrlForAuth();

  const [server, setServer] = useState<string>("");
  const [character, setCharacter] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedTitleAccount, setSelectedTitleAccount] = useState<IAccount>();
  const [accountList, setAccountList] = useState<Array<IAccount>>([]);

  useEffect(() => {
    setSelectedTitleAccount(userInfo.titleAccount);

    if (userInfo.accountList) {
      setAccountList(userInfo.accountList); 
    }

  }, [userInfo]);

  const _onEnterCharacter = (keyCode: number) => {
    
    if (keyCode === 13) {
      setIsDisabled(true);
      _onAuthRequest();
    }
  };

  const _onAuthRequest = async () => {
    if (!isDisabled) {
      setMyBackdrop(true);
      setIsDisabled(true);
  
      const res = await checkGameUser(userInfo.key, userInfo.id, server, character);
  
      if (res.code === 200) {
        // Successed Authentication
        
        if (accountList.length < 1) {
          console.log(accountList.length);
          await setTitleAccount(userInfo.id, {
            character, 
            server
          });
        }
  
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });
        
        setTimeout(() => window.location.reload(), duration);
      } else {
        // Failed Authentication
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message,
        });
        
        setIsDisabled(false);
        setMyBackdrop(false);

      }
    }
  };

  const _onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parseValue = (event.target as HTMLInputElement).value.split("@");

    const titleAccount: IAccount = {
      server: parseValue[1],
      character: parseValue[0]
    }
    
    setSelectedTitleAccount(titleAccount);
  };

  const _onSetTitleAccount = async () => {
    if (selectedTitleAccount) {
      const res = await setTitleAccount(userInfo.id, selectedTitleAccount);
  
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });
      } else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message,
        });
      }
    }
    else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: '선택된 대표 캐릭터가 없습니다.',
      });
    }
  }

  return (
    <React.Fragment>
      <Grid container direction='column' style={{ minWidth: "530px", margin: "0" }}>
        <Typography variant='h4' style={{ margin: "10px 0" }}>
          캐릭터 인증
        </Typography>

        <img src={baseUrlForAuth + "auth.png"} alt='예시' style={{ width: "100%", margin: "5px 0" }} />
        <Typography variant='h6' style={{ margin: "2.5px 0" }}>
          ① 인증할 캐릭터의 호패 한줄 인사말을 도톨 아이디로 저장
        </Typography>
        <Typography variant='h6' style={{ margin: "2.5px 0" }}>
          ② 서버와 캐릭터명을 입력 후 인증 신청
        </Typography>
        <Typography variant='h6' style={{ margin: "2.5px 0" }}>
          ③ 인증된 캐릭터 중 하나를 대표 캐릭터로 설정
        </Typography>
        <Divider style={{ width: "100%", height: "3px", margin: "10px 0" }} flexItem />
        <Grid container item alignItems='center' justify='center' style={{ margin: "10px 0" }}>
          <Typography className={classes.text}>서버</Typography>
          <TextField
            className={classes.input}
            variant='outlined'
            fullWidth
            required
            autoFocus={true}
            autoComplete='off'
            value={server}
            onChange={e => setServer(e.target.value)}
          />
        </Grid>
        <Grid container item alignItems='center' justify='center' style={{ margin: "10px 0" }}>
          <Typography className={classes.text}>캐릭터명</Typography>
          <TextField
            className={classes.input}
            variant='outlined'
            required
            fullWidth
            autoComplete='off'
            value={character}
            onChange={e => setCharacter(e.target.value)}
            onKeyUp={e => _onEnterCharacter(e.keyCode)}
          />
        </Grid>
        <Grid container item alignItems='center' justify='center' style={{ margin: "10px 0" }}>
          <Typography className={classes.text}></Typography>
          <Button variant='contained' color='primary' fullWidth disabled={isDisabled} onClick={_onAuthRequest} style={{ maxWidth: "260px", height: "40px" }}>
            {isDisabled ? "인증 중입니다." : "인증 신청"}
          </Button>
        </Grid>
        <Divider style={{ width: "100%", height: "3px", margin: "10px 0" }} flexItem />
        <Grid container item xs={12} style={{ margin: "10px 0 0 0", padding: "0" }}>
          <Grid container item xs={12}>
            <Typography variant='h5' style={{ lineHeight: "40px", margin: "0" }}>
              대표 캐릭터
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              disabled={!accountList || accountList.length === 0}
              onClick={_onSetTitleAccount}
              style={{ height: "40px", margin: "0 20px" }}>
              설정
            </Button>
          </Grid>
          <Grid container item xs={12} style={{ margin: "10px 0", padding: "0 5px" }}>
            {accountList && accountList.length > 0 ? (
              <FormControl component='fieldset'>
                <RadioGroup value={getTitleAccountString(selectedTitleAccount)} onChange={_onChangeAccount} 
                  style={{ display: "flex", flexWrap: "nowrap", flexDirection: "row" }}>
                  {
                    accountList.map((acc, index) => (
                      <FormControlLabel
                        value={getTitleAccountString(acc)}
                        key={index}
                        control={<Radio style={{ width: "40px", height: "40px" }} />}
                        label={getTitleAccountString(acc)}
                        style={{ margin: "0 10px", float: "left" }}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            ) : (
              <Typography style={{ margin: "0", padding: "0 10px", lineHeight: "40px" }}>인증 된 캐릭터가 없습니다.</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AuthAccount;
