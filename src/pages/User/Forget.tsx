import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import FindId from "components/User/FindId";
import FindPassword from "components/User/FindPassword";

const useStyles = makeStyles({
  root: {
    width: "auto",
    minHeight: "65vh",
    margin: "0 auto",
  },
  item: {
    width: "350px",
    height: "350px",
    margin: "10px",
    padding: "0",
    border: "1px solid lightgray",
    borderRadius: "10px",
  },
});

export default function Forget() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container alignItems='center' justify='space-around' className={classes.root}>
        <Grid container alignItems='center' className={classes.item}>
          <h2 style={{ width: "100%", textAlign: "center", margin: "20px 0 10xp 0" }}>아이디 찾기</h2>
          <FindId />
        </Grid>

        <Grid container alignItems='center' className={classes.item}>
          <h2 style={{ width: "100%", textAlign: "center", margin: "20px 0 10px 0" }}>비밀번호 찾기</h2>
          <FindPassword />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
