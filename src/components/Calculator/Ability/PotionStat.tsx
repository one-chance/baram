import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import PotionState from "state/Calculator/Ability/PotionState";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  stat: {
    width: "100px",
    margin: "5px 10px",
    textAlignLast: "center",
    "& input": {
      height: "40px",
      padding: "0 5px",
      textAlign: "center",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
});

export default function PotionStat() {
  const classes = useStyles();
  const [stat, setStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 });
  const setPotionState = useSetRecoilState(PotionState);

  const inputStat = (val: number, idx: number) => {
    switch (idx) {
      case 1:
        setStat({ ...stat, s1: val });
        break;
      case 2:
        setStat({ ...stat, s2: Math.abs(val) });
        break;
      case 3:
        setStat({ ...stat, s3: Math.abs(val) });
        break;
      case 4:
        setStat({ ...stat, s4: Math.abs(val) });
        break;
      case 5:
        setStat({ ...stat, s5: Math.abs(val) });
        break;
      case 6:
        setStat({ ...stat, s6: Math.abs(val) });
        break;
    }
  };

  useEffect(() => {
    const saveStat = () => {
      // 방어도, 방어구관통, 방어도무시, 공격력증가, 마법치명, 마력증강
      var temp: number[] = [stat.s1, stat.s2, stat.s3, stat.s4, stat.s5, stat.s6];
      setPotionState(temp);
    };
    saveStat();
  }, [stat, setPotionState]);

  return (
    <React.Fragment>
      <TextField
        variant='outlined'
        type='number'
        color='primary'
        className={classes.stat}
        placeholder='방어도'
        value={stat.s1 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 1);
          } else {
            inputStat(Number(e.target.value), 1);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        color='primary'
        className={classes.stat}
        placeholder='방어구관통'
        value={stat.s2 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 2);
          } else {
            inputStat(Number(e.target.value), 2);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        color='primary'
        className={classes.stat}
        placeholder='방어도무시'
        value={stat.s3 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 3);
          } else {
            inputStat(Number(e.target.value), 3);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        color='primary'
        className={classes.stat}
        placeholder='공격력증가'
        value={stat.s4 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 4);
          } else {
            inputStat(Number(e.target.value), 4);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        color='primary'
        className={classes.stat}
        placeholder='마법치명'
        value={stat.s5 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 5);
          } else {
            inputStat(Number(e.target.value), 5);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        color='primary'
        className={classes.stat}
        placeholder='마력증강'
        value={stat.s6 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 6);
          } else {
            inputStat(Number(e.target.value), 6);
          }
        }}
      />
    </React.Fragment>
  );
}
