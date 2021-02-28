import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  goldText: {
    width: "120px",
  },
});

export default function GoldStat() {
  const classes = useStyles();
  //const [statusList, setStatusList] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);

  return (
    <React.Fragment>
      <TextField variant='outlined' placeholder='무기' className={classes.goldText} />
      <TextField variant='outlined' placeholder='투구' className={classes.goldText} />
      <TextField variant='outlined' placeholder='갑옷' className={classes.goldText} />
      <TextField variant='outlined' placeholder='오른손' className={classes.goldText} />
      <TextField variant='outlined' placeholder='왼손' className={classes.goldText} />
    </React.Fragment>
  );
}
