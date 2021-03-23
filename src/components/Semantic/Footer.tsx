import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    width: "70%",
    padding: "0",
    margin: "0 15%",
  },
  boxWrapper: {
    display: "block",
    width: "100%",
    marginTop: "10px",
    "& span, a": {
      margin: "0 5px",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <div className={classes.footerWrapper}>
        <div className={classes.boxWrapper}>
          <span>이용약관</span>
          <span>|</span>
          <a href='/privacy' style={{ textDecoration: "none", color: "black" }}>
            개인정보처리방침
          </a>
          <span>|</span>
          <span>운영정책</span>
        </div>
        <div className={classes.boxWrapper}>
          <span>이메일 : abced@gmail.com</span>
        </div>
      </div>
    </>
  );
}
