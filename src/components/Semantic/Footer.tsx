import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  box: {
    padding: "0 10px",
    margin: "10px 0",
    float: "left",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Divider style={{ height: "2px", margin: "4px 0" }} />
      <Container className={classes.box}>
        <h4 style={{ margin: "0 5px", float: "left" }}>이용약관</h4>
        <h4 style={{ margin: "0 5px", float: "left" }}>|</h4>
        <h4 style={{ margin: "0 5px", float: "left" }}>개인정보처리방침</h4>
        <h4 style={{ margin: "0 5px", float: "left" }}>|</h4>
        <h4 style={{ margin: "0 5px", float: "left" }}>운영정책</h4>
      </Container>
      <Container style={{ padding: "0 10px", marginBottom: "10px", float: "left" }}>
        <h4 style={{ margin: "0 5px" }}>이메일 : abced@gmail.com</h4>
      </Container>
    </React.Fragment>
  );
}
