import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import FamilyState from "state/Calculator/Ability/FamilyState";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  btnFamily: {
    width: "120px",
    height: "40px",
    lineHeight: "40px",
    margin: "5px 10px",
    padding: "0",
    textAlign: "center",
    float: "left",
  },
});

export default function FamilyStat() {
  const classes = useStyles();
  const [stat, setStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 });
  const setFamilyStat = useSetRecoilState(FamilyState);

  useEffect(() => {
    const saveStat = () => {
      var temp: number[] = [stat.s1, stat.s2, stat.s3, stat.s4, stat.s5, stat.s6];
      setFamilyStat(temp);
    };

    saveStat();
  }, [stat, setFamilyStat]);

  return (
    <React.Fragment>
      <Button variant='outlined' color='primary' className={classes.btnFamily}>
        방어도 0
      </Button>
      <Button
        variant='outlined'
        color={stat.s2 === 0 ? "primary" : "secondary"}
        className={classes.btnFamily}
        onClick={() => {
          if (stat.s2 === 0) setStat({ ...stat, s2: 40 });
          else setStat({ ...stat, s2: 0 });
        }}>
        방어구관통 40
      </Button>
      <Button
        variant='outlined'
        color={stat.s3 === 0 ? "primary" : "secondary"}
        className={classes.btnFamily}
        onClick={() => {
          if (stat.s3 === 0) setStat({ ...stat, s3: 5 });
          else setStat({ ...stat, s3: 5 });
        }}>
        방어도무시 5
      </Button>
      <Button
        variant='outlined'
        color={stat.s4 === 0 ? "primary" : "secondary"}
        className={classes.btnFamily}
        onClick={() => {
          if (stat.s4 === 0) setStat({ ...stat, s4: 80 });
          else setStat({ ...stat, s4: 0 });
        }}>
        공격력증가 80
      </Button>
      <Button
        variant='outlined'
        color={stat.s5 === 0 ? "primary" : "secondary"}
        className={classes.btnFamily}
        onClick={() => {
          if (stat.s5 === 0) setStat({ ...stat, s5: 40 });
          else setStat({ ...stat, s5: 0 });
        }}>
        마법치명 40
      </Button>
      <Button
        variant='outlined'
        color={stat.s6 === 0 ? "primary" : "secondary"}
        className={classes.btnFamily}
        onClick={() => {
          if (stat.s6 === 0) setStat({ ...stat, s6: 30 });
          else setStat({ ...stat, s6: 0 });
        }}>
        마력증강 30
      </Button>
    </React.Fragment>
  );
}
