import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import CharState from "state/Calculator/Ability/CharState";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  stat: {
    width: "60px",
    margin: "5px 10px",
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

export default function CharStat() {
  const classes = useStyles();
  const [stat, setStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 });
  const setCharactorStat = useSetRecoilState(CharState);

  const inputStat = (val: number, idx: number) => {
    switch (idx) {
      case 1:
        setStat({ ...stat, s1: Math.abs(val) });
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
    }
  };

  useEffect(() => {
    const saveStat = (a: number, b: number) => {
      // 방어도, 방어구관통, 방어도무시, 공격력증가, 마법치명, 마력증강
      var temp: number[] = [0, Math.floor(a / 100), Math.floor(a / 250), Math.floor(a / 50), Math.floor(b / 50), 0];
      setCharactorStat(temp);
    };
    saveStat(stat.s1 + stat.s2 + stat.s3, stat.s4 + stat.s5);
  }, [stat, setCharactorStat]);

  return (
    <React.Fragment>
      <TextField
        variant='outlined'
        type='number'
        className={classes.stat}
        label='&nbsp; 힘'
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
        className={classes.stat}
        label='민첩'
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
        className={classes.stat}
        label='지력'
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
        className={classes.stat}
        label='건강'
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
        className={classes.stat}
        label='지혜'
        value={stat.s5 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 5);
          } else {
            inputStat(Number(e.target.value), 5);
          }
        }}
      />
      <Button variant='contained' color='secondary' style={{ minWidth: "40px", height: "40px", margin: "10px" }}>
        ?
      </Button>
    </React.Fragment>
  );
}
