import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "75vh",
  },
});

export default function Ability() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container alignItems='center' justify='center' className={classes.root}>
        <Typography>PC 환경에서만 제공되는 기능입니다.</Typography>
      </Grid>
    </React.Fragment>
  );
}
