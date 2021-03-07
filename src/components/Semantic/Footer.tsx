import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    width: "100%",
    padding: "0",
    borderTop: "1px solid lightgray",
    marginTop: "10px",
  },
  boxWrapper: {
    width: "100%",
    margin: "10px 0",
    float: "left",
  },
  box: {
    margin: "0 5px",
    float: "left",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Container className={classes.footerWrapper}>
      <Container className={classes.boxWrapper}>
        <h4 className={classes.box}>이용약관</h4>
        <h4 className={classes.box}>|</h4>
        <h4 className={classes.box}>개인정보처리방침</h4>
        <h4 className={classes.box}>|</h4>
        <h4 className={classes.box}>운영정책</h4>
      </Container>
      <Container className={classes.boxWrapper}>
        <h4 className={classes.box}>이메일 : abced@gmail.com</h4>
      </Container>
    </Container>
  );
}
