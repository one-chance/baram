import React from "react";
import Grid from "@material-ui/core/Grid";
import ArcheologyList from "components/Dictionary/ArcheologyList";

function Archeology() {
  return (
    <React.Fragment>
      <Grid container alignItems='center' justify='center' style={{ margin: "10px 0", padding: "0" }}>
        <ArcheologyList />
      </Grid>
    </React.Fragment>
  );
}

export default Archeology;
