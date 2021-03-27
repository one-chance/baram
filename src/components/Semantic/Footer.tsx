import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    width: "70vw",
    padding: "0",
    margin: "0 15vw",
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
          <a href='/termsofservice' style={{ textDecoration: "none", color: "black" }}>
            이용약관
          </a>
          <span>|</span>
          <a href='/privacypolicy' style={{ textDecoration: "none", color: "black" }}>
            개인정보처리방침
          </a>
          <span>|</span>
          <span>운영정책</span>
        </div>
        <div className={classes.boxWrapper}>
          <span>E-mail : admin@dotols.com</span>
        </div>
      </div>
    </>
  );
}
