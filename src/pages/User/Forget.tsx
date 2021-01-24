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
        <Typography className={classes.title} component='h1' variant='h4'>
          <Link href="/forget/id" variant="h6" tabIndex={-1} style={{ float: "left" }}>
            아이디
          </Link>
          <Link variant="h6" tabIndex={-1} style={{ float: "left" }}>
            &nbsp;/&nbsp;
          </Link>
          <Link href="/forget/password" variant="h6" tabIndex={-1} style={{ float: "left" }}>
            비밀번호 찾기
          </Link>
        </Typography>
      </Container>
			<Grid container spacing={2}>
        <Grid item xs={12}>
          {
            mode === 'password' ?
              <FindPassword />
            :
              <FindId />
          }
        </Grid>
			</Grid>
    </React.Fragment>
  );
}