import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import AwakState from "state/Calculator/Ability/AwakState";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  btnAwak: {
    width: "120px",
    height: "50px",
    lineHeight: "50px",
    margin: "5px 10px",
    padding: "0",
    textAlign: "center",
  },
});

export default function AwakStat() {
  const classes = useStyles();
  const [stat, setStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 });
  const setAwakeningState = useSetRecoilState(AwakState);

  useEffect(() => {
    const saveStat = () => {
      var temp: number[] = [stat.s1, stat.s2, stat.s3, stat.s4, stat.s5, stat.s6];
      setAwakeningState(temp);
    };

    saveStat();
  }, [stat, setAwakeningState]);

  // check 변수를 두고 체크시 color 변경
  return (
    <React.Fragment>
      <Button
        variant='outlined'
        color={stat.s1 === 0 ? "primary" : "secondary"}
        className={classes.btnAwak}
        onClick={() => {
          if (stat.s1 === 0) setStat({ ...stat, s1: -98 });
          else setStat({ ...stat, s1: 0 });
        }}>
        방어도 -98
      </Button>
      <Button
        variant='outlined'
        color={stat.s2 === 0 ? "primary" : "secondary"}
        className={classes.btnAwak}
        onClick={() => {
          if (stat.s2 === 0) setStat({ ...stat, s2: 210 });
          else setStat({ ...stat, s2: 0 });
        }}>
        방어구관통 210
      </Button>
      <Button
        variant='outlined'
        color={stat.s3 === 0 ? "primary" : "secondary"}
        className={classes.btnAwak}
        onClick={() => {
          if (stat.s3 === 0) setStat({ ...stat, s3: 21 });
          else setStat({ ...stat, s1: 0 });
        }}>
        방어도무시 21
      </Button>
      <Button
        variant='outlined'
        color={stat.s4 === 0 ? "primary" : "secondary"}
        className={classes.btnAwak}
        onClick={() => {
          if (stat.s4 === 0) setStat({ ...stat, s4: 140 });
          else setStat({ ...stat, s4: 0 });
        }}>
        공격력증가 140
      </Button>
      <Button
        variant='outlined'
        color={stat.s5 === 0 ? "primary" : "secondary"}
        className={classes.btnAwak}
        onClick={() => {
          if (stat.s5 === 0) setStat({ ...stat, s5: 112 });
          else setStat({ ...stat, s5: 0 });
        }}>
        마법치명 112
      </Button>
      <Button
        variant='outlined'
        color={stat.s6 === 0 ? "primary" : "secondary"}
        className={classes.btnAwak}
        onClick={() => {
          if (stat.s6 === 0) setStat({ ...stat, s6: 140 });
          else setStat({ ...stat, s6: 0 });
        }}>
        마력증강 140
      </Button>
    </React.Fragment>
  );
}
