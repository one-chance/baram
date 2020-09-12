import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
}));

function ViewUserInfo(props: IProps) {

  const classes = useStyles();
  const userInfo: IUserInfo = props.userInfo;

  return (
    <Container>
      <Typography
        variant="h6"
        className={classes.title}>
          회원정보
      </Typography>
      <Grid container spacing={2}
        className={classes.form}>
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
            {userInfo.mail}
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
            서버
          </Grid>
          <Grid item xs={9}>
            {userInfo.server}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            닉네임
          </Grid>
          <Grid item xs={9}>
            {userInfo.character}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            인증정보
          </Grid>
          <Grid item xs={9}>
            {
              userInfo.isAuth 
              ? "인증"
              : "미인증"
            }
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            생성일
          </Grid>
          <Grid item xs={9}>
            {userInfo.createDateString}
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            인증일
          </Grid>
          <Grid item xs={9}>
            {userInfo.authDateString}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  ); 
}

export default ViewUserInfo;