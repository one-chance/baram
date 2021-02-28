import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  btnAwak: {
    width: "120px",
    height: "40px",
    lineHeight: "40px",
    margin: "10px",
    padding: "0",
    textAlign: "center",
    float: "left",
  },
});

export default function AwakStat() {
  const classes = useStyles();
  //const [statusList, setStatusList] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);

  return (
    <React.Fragment>
      <Button variant='outlined' color='primary' className={classes.btnAwak}>
        방어도 -98
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnAwak}>
        방어구관통 210
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnAwak}>
        방어도무시 21
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnAwak}>
        공격력증가 140
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnAwak}>
        마법치명 112
      </Button>
      <Button variant='outlined' color='primary' className={classes.btnAwak}>
        마력증강 140
      </Button>
    </React.Fragment>
  );
}
