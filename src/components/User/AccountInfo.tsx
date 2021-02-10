import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import IUserInfo from "interfaces/User/IUserInfo";

import { setTitleAccount } from "utils/UserUtil";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  list: {
    width: "100%",
    maxWidth: 360,
    marginTop: 10,
    marginLeft: 20,
  },
  noList: {
    marginTop: 10,
    marginLeft: 20,
  },
}));

const duration = 2000;

function AccountInfo(props: IProps) {
  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  const setMyAlert = useSetRecoilState(MyAlertState);

  const [value, setValue] = React.useState("");

  useEffect(() => {
    const titleAccount = userInfo.titleAccount ? `${userInfo.titleAccount.server}-${userInfo.titleAccount.character}` : "";

    setValue(titleAccount);
  }, [userInfo]);

  const _onChangeAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const _onSave = async () => {
    const parseValue = value.split("-");

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

  return (
    <React.Fragment>
      <Grid container direction='row'>
        <Grid item xs={4}>
          <Typography variant='h4' style={{ margin: "10px 0 30px 0" }}>
            대표 캐릭터
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Button variant='outlined' color='primary' onClick={_onSave} style={{ marginTop: "10px" }}>
            설정
          </Button>
        </Grid>
      </Grid>
      {userInfo.accountList && userInfo.accountList.length > 0 ? (
        <Grid container spacing={2} className={classes.list}>
          <FormControl component='fieldset'>
            <RadioGroup aria-label='gender' name='gender1' value={value} onChange={_onChangeAccount}>
              {userInfo.accountList.map((acc, index) => (
                <Grid item xs={12} key={index}>
                  <FormControlLabel value={`${acc.server}-${acc.character}`} control={<Radio />} label={`${acc.character}@${acc.server}`} />
                </Grid>
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      ) : (
        <Typography className={classes.noList}>인증 된 캐릭터가 없습니다.</Typography>
      )}
    </React.Fragment>
  );
}

export default AccountInfo;
