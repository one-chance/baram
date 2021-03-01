import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  stat: {
    width: "100px",
    margin: "5px 10px",
    textAlignLast: "center",
    "& input": {
      height: "40px",
      padding: "5px",
      textAlign: "center",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
});

export default function EngraveStat() {
  const classes = useStyles();
  const [tempStat, setTempStat] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);

  //var statList = ["방어도", "방어구관통", "방어도무시", "공격력증가", "마법치명", "마력증강"];

  return (
    <React.Fragment>
      <TextField variant='outlined' type='number' placeholder='방어도' className={classes.stat} />
      <TextField variant='outlined' type='number' placeholder='방어구관통' className={classes.stat} />
      <TextField variant='outlined' type='number' placeholder='방어도무시' className={classes.stat} />
      <TextField variant='outlined' type='number' placeholder='공격력증가' className={classes.stat} />
      <TextField variant='outlined' type='number' placeholder='마법치명' className={classes.stat} />
      <TextField variant='outlined' type='number' placeholder='마력증강' className={classes.stat} />
    </React.Fragment>
  );
}
