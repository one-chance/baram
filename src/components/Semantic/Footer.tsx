import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    marginTop: '10px',
  },
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    marginBottom: '10px'
  },
  box: {
    margin: '0 5px'
  },
  boxBottom: {
    margin: '0 5px'
  },
  divider: {
    height: '2px',
    marginBottom: '30px'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.footerWrapper}>
      <Divider className={classes.divider} />
      <Container className={classes.boxWrapper}>
        <h4 className={classes.box}>이용약관</h4>
        <h4 className={classes.box}>|</h4>
        <h4 className={classes.box}>개인정보처리방침</h4>
        <h4 className={classes.box}>|</h4>
        <h4 className={classes.box}>운영정책</h4>
      </Container>
      <Container className={classes.boxWrapper}>
        <h4 className={classes.boxBottom}>이메일 : abced@gmail.com</h4>
      </Container>
    </div>
  );
}
