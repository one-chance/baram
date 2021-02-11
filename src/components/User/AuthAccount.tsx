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
import IUserInfo from "interfaces/User/IUserInfo";
import { setTitleAccount } from "utils/UserUtil";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  text: {
    margin: "auto",
    fontWeight: "bold",
    verticalAlign: "middle",
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
  const [value, setValue] = useState<string>("");
  const [characterList, setCharacterList] = useState<Array<string>>([]);

  const _clear = () => {
    setServer("");
    setCharacter("");
    setIsDisabled(false);

    setMyBackdrop(false);
  };

  const _onEnterCharacter = (keyCode: number) => {
    if (keyCode === 13) {
      _onAuthRequest();
    }
  };

  const _onAuthRequest = async () => {
    setMyBackdrop(true);
    setIsDisabled(true);

    const res = await checkGameUser(userInfo.id, server, character);

    if (res.code === 200) {
      // Successed Authentication
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });
      setTimeout(() => _clear(), duration);
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

    setIsDisabled(false);

    /*     let chracterAndServer: string[] = characterList;
    chracterAndServer.push(`${character}@${server}`);
    setCharacterList(chracterAndServer); */
    characterList.push(`${character}@${server}`);
    setCharacterList(characterList);
  };

  const _onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const _onSave = async () => {
    const parseValue = value.split("@");
    const res = await setTitleAccount(userInfo.id, parseValue[0], parseValue[1]);

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
  };

  useEffect(() => {
    const titleAccount = userInfo.titleAccount ? `${userInfo.titleAccount.character}@${userInfo.titleAccount.server}` : "";
    setValue(titleAccount);

    let chracterAndServer: string[] = [];
    if (userInfo.accountList) {
      for (let a = 0; a < userInfo.accountList.length; a++) {
        chracterAndServer[a] = `${userInfo.accountList[a].character}@${userInfo.accountList[a].server}`;
      }
    }
    setCharacterList(chracterAndServer);
  }, [userInfo]);

  return (
    <React.Fragment>
      <Typography variant='h5' style={{ margin: "10px 0" }}>
        캐릭터 인증
      </Typography>
      <Grid container spacing={2} style={{ margin: "0" }}>
        <img src={baseUrlForAuth + "auth.png"} alt='예시' style={{ width: "100%", margin: "5px 0" }} />
        <Typography variant='h6' style={{ width: "100%", margin: "5px 0 0 0" }}>
          ① 인증할 캐릭터의 호패 한줄 인사말을 바창 아이디로 저장
        </Typography>
        <Typography variant='h6' style={{ width: "100%", margin: "0" }}>
          ② 서버와 캐릭터명을 입력 후 인증 신청
        </Typography>
        <br />
        <Typography variant='h6' style={{ width: "100%", margin: "0 0 5px 0" }}>
          ③ 인증된 캐릭터 중 하나를 대표 캐릭터로 설정
        </Typography>
        <Divider style={{ width: "100%", height: "3px", margin: "10px 0" }} flexItem />
        <Grid container item xs={12}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3} className={classes.text}>
            서버
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant='outlined'
              required
              fullWidth
              autoFocus={true}
              autoComplete='off'
              size='small'
              name='server'
              id='server'
              value={server}
              onChange={e => setServer(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3} className={classes.text}>
            캐릭터명
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant='outlined'
              required
              fullWidth
              autoComplete='off'
              size='small'
              name='character'
              id='character'
              value={character}
              onChange={e => setCharacter(e.target.value)}
              onKeyUp={e => _onEnterCharacter(e.keyCode)}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={4}>
            <Button variant='contained' color='primary' fullWidth disabled={isDisabled} onClick={_onAuthRequest}>
              {isDisabled ? "인증 중입니다." : "인증 신청"}
            </Button>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Divider style={{ width: "100%", height: "3px", margin: "10px 0" }} flexItem />
        <Grid container item xs={12} style={{ margin: "10px 0 0 0", padding: "0" }}>
          <Grid container item xs={12}>
            <Typography variant='h5' style={{ lineHeight: "36px", margin: "0" }}>
              대표 캐릭터
            </Typography>
            <Button variant='outlined' color='primary' onClick={_onSave} style={{ margin: "0 20px" }}>
              설정
            </Button>
          </Grid>
          <Grid container item xs={12} style={{ margin: "10px 0 0 0", padding: "0 5px" }}>
            {characterList && characterList.length > 0 ? (
              <FormControl component='fieldset'>
                <RadioGroup value={value} onChange={_onChangeAccount} style={{ display: "flex", flexWrap: "nowrap", flexDirection: "row" }}>
                  {characterList.map((acc, index) => (
                    <FormControlLabel
                      value={acc}
                      key={index}
                      control={<Radio style={{ width: "40px", height: "40px" }} />}
                      label={acc}
                      style={{ margin: "0 10px", float: "left" }}
                    />
                  ))}
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
