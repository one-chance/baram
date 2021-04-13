import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import PostWrite from "components/Board/PostWrite";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "10px",
  },
}));

function Write({ match }: any) {
  const classes = useStyles();
  const { tab, seq } = match.params;

  return (
    <React.Fragment>
      <Container maxWidth='md' className={classes.root}>
        <PostWrite tab={tab} seq={seq} />
      </Container>
    </React.Fragment>
  );
}

export default Write;
