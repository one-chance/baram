import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  petText: {
    width: "100px",
    margin: "5px 10px",
    float: "left",
    "& input": {
      height: "40px",
      lineHeight: "40px",
      padding: "0",
      textAlign: "center",
    },
  },
});

export default function PetStat() {
  const classes = useStyles();
  //const [statusList, setStatusList] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);

  return (
    <React.Fragment>
      <TextField variant='outlined' color='primary' className={classes.petText} placeholder='방어도' />
      <TextField variant='outlined' color='primary' className={classes.petText} placeholder='방어구관통' />
      <TextField variant='outlined' color='primary' className={classes.petText} placeholder='방어도무시' />
      <TextField variant='outlined' color='primary' className={classes.petText} placeholder='공격력증가' />
      <TextField variant='outlined' color='primary' className={classes.petText} placeholder='마법치명' />
      <TextField variant='outlined' color='primary' className={classes.petText} placeholder='마력증강' />
    </React.Fragment>
  );
}
