import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import FindId from "components/User/FindId";
import FindPassword from "components/User/FindPassword";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "340px",
    margin: "100px 0 0 0",
    float: "left",
    flexGrow: 1,
  },
  item: {
    minWidth: "350px",
    padding: "5px",
    border: "1px solid lightgray",
    borderRadius: "10px",
  },
}));

export default function Forget() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} className={classes.item}>
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>아이디 찾기</h2>
          <FindId />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4} className={classes.item}>
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>비밀번호 찾기</h2>
          <FindPassword />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </React.Fragment>
  );
}
