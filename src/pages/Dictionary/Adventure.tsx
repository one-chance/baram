import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AdventureList from "components/Dictionary/AdventureList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "90%",
      margin: "10px 5%",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function Adventure() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.container}>
        <AdventureList />
      </Grid>
    </React.Fragment>
  );
}
