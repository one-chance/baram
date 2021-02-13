import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  box: {
    minWidth: "100%",
    height: "30px",
    padding: "0 20px",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Divider style={{ height: "2px", margin: "4px 0" }} />
      <Container className={classes.box}>
        <Typography variant='h6'>이용약관</Typography>
        <Typography variant='h6'>개인정보처리방침</Typography>
        <Typography variant='h6'>운영정책</Typography>
      </Container>
      <Container style={{ minWidth: "100%", height: "40px", padding: "0 20px" }}>
        <Typography variant='h6'>이메일 : abced@gmail.com</Typography>
      </Container>
    </React.Fragment>
  );
}
