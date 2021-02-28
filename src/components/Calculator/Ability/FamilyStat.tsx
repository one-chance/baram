import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  btnFamily: {
    width: "120px",
    height: "40px",
    lineHeight: "40px",
    margin: "10px",
    padding: "0",
    textAlign: "center",
    float: "left",
  },
});

export default function FamilyStat() {
  const classes = useStyles();
  //const [statusList, setStatusList] = useState<Array<number>>([0, 40, 5, 80, 40, 30]);

  return (
    <React.Fragment>
      <Button variant='outlined' color='primary' className={classes.btnFamily}>
        방어도 0
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnFamily}>
        방어구관통 40
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnFamily}>
        방어도무시 5
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnFamily}>
        공격력증가 80
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnFamily}>
        마법치명 40
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnFamily}>
        마력증강 30
      </Button>
    </React.Fragment>
  );
}
