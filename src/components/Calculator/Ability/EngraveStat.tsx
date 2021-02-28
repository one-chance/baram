import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  engraveText: {
    width: "140px",
  },
});

export default function EngraveStat() {
  const classes = useStyles();
  //const [statusList, setStatusList] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);

  //var statList = ["방어도", "방어구관통", "방어도무시", "공격력증가", "마법치명", "마력증강"];

  return (
    <React.Fragment>
      <TextField variant='outlined' placeholder='무기' className={classes.engraveText} />
      <TextField variant='outlined' placeholder='투구' className={classes.engraveText} />
      <TextField variant='outlined' placeholder='갑옷' className={classes.engraveText} />
    </React.Fragment>
  );
}
