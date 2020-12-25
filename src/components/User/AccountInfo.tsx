import React, { useEffect } from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import IUserInfo from 'interfaces/User/IUserInfo';

import { setTitleAccount } from 'utils/UserUtil';

interface IProps {
  userInfo: IUserInfo,
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: 360,
    marginTop: 10,
    marginLeft: 20
  },
  noList: {
    marginTop: 10,
    marginLeft: 20
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
    const parseValue = value.split('-');

    const res = await setTitleAccount(userInfo.id, parseValue[0], parseValue[1]);

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
  }
  
  return (
    <Container>
      <Grid container direction="row">
        <Grid item>
          <Typography
            variant="h6">
              캐릭터 관리
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" onClick={_onSave}>저장</Button>
        </Grid>
      </Grid>
      {
        userInfo.accountList && userInfo.accountList.length > 0 ?
          <Grid container spacing={2}
            className={classes.list}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={_onChangeAccount}>
                  {
                    userInfo.accountList.map((acc, index) => (
                      <Grid item xs={12} key={index}>
                        <FormControlLabel value={`${acc.server}-${acc.character}`} control={<Radio />} label={`${acc.server}-${acc.character}`} />
                      </Grid>
                    ))
                  }
                </RadioGroup>
              </FormControl>
          </Grid>
        :
          <Typography
            className={classes.noList}>
              현재 인증 된 바람의 나라 계정이 없습니다.
          </Typography>
      }
    </Container>
  ); 
}

export default AccountInfo;