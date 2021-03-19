import React from "react";
import Grid from "@material-ui/core/Grid";

import AdventureList from "components/Dictionary/AdventureList";

export default function Adventure() {
  return (
    <React.Fragment>
      <Grid container spacing={3} alignItems='center' justify='center' style={{ margin: "10px 0" }}>
        <AdventureList />
      </Grid>
    </React.Fragment>
  );
}
