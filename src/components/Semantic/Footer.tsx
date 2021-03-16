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
  },
  text: {
    margin: "0 5px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <div className={classes.footerWrapper}>
        <div className={classes.boxWrapper}>
          <span className={classes.text}>이용약관</span>
          <span className={classes.text}>|</span>
          <span className={classes.text}>개인정보처리방침</span>
          <span className={classes.text}>|</span>
          <span className={classes.text}>운영정책</span>
        </div>
        <div className={classes.boxWrapper}>
          <span className={classes.text}>이메일 : abced@gmail.com</span>
        </div>
      </div>
    </>
  );
}
