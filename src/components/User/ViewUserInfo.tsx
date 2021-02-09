import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import IUserInfo from "interfaces/User/IUserInfo";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  text: {
    margin: "auto",
    paddingLeft: "10px",
    verticalAlign: "middle",
    fontWeight: "bold",
  },
}));

function ViewUserInfo(props: IProps) {
  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  return (
    <React.Fragment>
      <Typography variant='h4' style={{ margin: "10px 0 30px 0" }}>
        회원 정보
      </Typography>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            아이디
          </Grid>
          <Grid item xs={9}>
            {userInfo.id}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            이메일
          </Grid>
          <Grid item xs={9}>
            {userInfo.email}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            오픈카톡
          </Grid>
          <Grid item xs={9}>
            {userInfo.openKakao}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            등급
          </Grid>
          <Grid item xs={9}>
            {userInfo.grade}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            포인트
          </Grid>
          <Grid item xs={9}>
            {userInfo.point}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            대표 캐릭터
          </Grid>
          <Grid item xs={9}>
            {userInfo.titleAccount ? `${userInfo.titleAccount.character}@${userInfo.titleAccount.server}` : ""}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            회원 가입일
          </Grid>
          <Grid item xs={9}>
            {userInfo.createDateString}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3} className={classes.text}>
            정보 수정일
          </Grid>
          <Grid item xs={9}>
            {userInfo.editDateString}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ViewUserInfo;
