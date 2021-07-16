import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import MainCarousel from "components/MainCarousel";
import Shortcuts from "components/Shortcuts";

const useStyles = makeStyles({
  secondSection: {
    margin: "10px 0",
    border: "1px solid lightgray",
    borderRadius: "10px",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid container justify='center' style={{ margin: "10px 0" }}>
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <MainCarousel />
        </Grid>
        <Grid item container alignItems='flex-end' justify='space-around' xs={10} className={classes.secondSection}>
          <Shortcuts />
        </Grid>
      </Grid>
    </>
  );
}
