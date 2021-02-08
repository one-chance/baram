import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import IUserInfo from "interfaces/User/IUserInfo";

interface IProps {
  userInfo: IUserInfo;
}

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: 10,
  },
}));

function ViewUserInfo(props: IProps) {
  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  return (
    <Container>
      <Typography variant='h6'>회원정보</Typography>
      <Grid container spacing={2} className={classes.form}>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            아이디
          </Grid>
          <Grid item xs={9}>
            {userInfo.id}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            이메일
          </Grid>
          <Grid item xs={9}>
            {userInfo.email}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            오픈카톡
          </Grid>
          <Grid item xs={9}>
            {userInfo.openKakao}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            등급
          </Grid>
          <Grid item xs={9}>
            {userInfo.grade}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            포인트
          </Grid>
          <Grid item xs={9}>
            {userInfo.point}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            대표 캐릭터
          </Grid>
          <Grid item xs={9}>
            {userInfo.titleAccount ? `${userInfo.titleAccount.character}@${userInfo.titleAccount.server}` : ""}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            회원가입일
          </Grid>
          <Grid item xs={9}>
            {userInfo.createDateString}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            정보수정일
          </Grid>
          <Grid item xs={9}>
            {userInfo.editDateString}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewUserInfo;
