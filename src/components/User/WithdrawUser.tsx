import React from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CheckPassword, WithDrawUser, LogoutUser } from "utils/UserUtil";

interface IProps {
  id: string;
}

const useStyles = makeStyles(theme => ({
  text: {
    margin: "0",
    lineHeight: "40px",
    paddingLeft: "10px",
    fontSize: "1rem",
  },
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
  };

  const _onWithdraw = async () => {
    setMyBackdrop(true);

    const checked = await CheckPassword(id, password);

    if (checked) {
      const res = await WithDrawUser(id, password);

      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });

        LogoutUser();
        document.location.href = "/";
      } else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: duration,
          message: res.message,
        });
      }
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: "일치하지 않는 비밀번호입니다.",
      });
    }

    setMyBackdrop(false);
  };

  return (
    <React.Fragment>
      <Typography variant='h4' style={{ margin: "10px 0 30px 0" }}>
        회원 탈퇴
      </Typography>
      <Grid container spacing={3}>
        {id && (
          <React.Fragment>
            <Grid item xs={12}>
              <Typography variant='h6' color='error'>
                ※ 주의 사항 ※
              </Typography>
              <Typography variant='body1' color='error' style={{ padding: "10px" }}>
                탈퇴시 {id}님이 작성한 글은 자동으로 삭제되지 않습니다. <br />
                탈퇴시 계정 정보가 폐기되므로 추후 복구할 수 없습니다.
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={3} className={classes.text}>
                비밀번호 확인
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  autoFocus={true}
                  size='small'
                  name='password'
                  id='password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyUp={e => _onEnterPassword(e.keyCode)}
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Button variant='contained' color='secondary' fullWidth onClick={_onWithdraw}>
                  예, 탈퇴하겠습니다.
                </Button>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default WithdrawUser;
