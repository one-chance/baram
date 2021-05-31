import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import PostWrite from "components/Board/PostWrite";

const useStyles = makeStyles({
  root: {
    margin: "10px 0",
    padding: "0 5px",
  },
});

function Write({ match }: any) {
  const classes = useStyles();
  const { tab, seq } = match.params;

  return (
    <React.Fragment>
      <Grid container justify='center' className={classes.root}>
        <PostWrite tab={tab} seq={seq} />
      </Grid>
    </React.Fragment>
  );
}

export default Write;
