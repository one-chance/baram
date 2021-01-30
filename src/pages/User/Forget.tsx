import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FindId from 'components/User/FindId';
import FindPassword from 'components/User/FindPassword';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "10px",
    textAlign: "center",
  },
}));

export default function Forget({match}: any) {
  const classes = useStyles();
  const { mode } = match.params;

  const [tab, setTab] = React.useState("id");
  useEffect(() => {
    if (mode === "password") setTab(mode);
  }, []);

  return (
    <React.Fragment>
      <Container style={{ width: "40%", margin: "10px 30%", float: "left" }}>
        <Typography className={classes.title} variant='subtitle1'>
          <span onClick={() => setTab("id")}>
            아이디
          </span>
          <span>
            &nbsp;/&nbsp;
          </span>
          <span onClick={() => setTab("password")}>
            비밀번호 찾기
          </span>
        </Typography>
      </Container>
			<Grid container spacing={2}>
        <Grid item xs={12}>
          {
            tab === 'password' ?
              <FindPassword />
            :
              <FindId />
          }
        </Grid>
			</Grid>
    </React.Fragment>
  );
}