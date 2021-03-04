import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import GoldState1 from "state/Calculator/Ability/GoldState1";
import GoldState2 from "state/Calculator/Ability/GoldState2";

import TextField from "@material-ui/core/TextField";

// %돋을 저장하는 recoil 변수 하나 더 생성

const useStyles = makeStyles({
  stat: {
    width: "100px",
    margin: "5px 10px",
    textAlignLast: "center",
    "& input": {
      height: "40px",
      padding: "0",
      textAlign: "center",
      fontSize: "1rem",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
});

export default function GoldStat() {
  const classes = useStyles();
  const [stat, setStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0, s11: 0, s12: 0 });
  const setGoldState1 = useSetRecoilState(GoldState1);
  const setGoldState2 = useSetRecoilState(GoldState2);

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
      case 7:
        setStat({ ...stat, s7: Math.abs(val) });
        break;
      case 8:
        setStat({ ...stat, s8: Math.abs(val) });
        break;
      case 9:
        setStat({ ...stat, s9: Math.abs(val) });
        break;
      case 10:
        setStat({ ...stat, s10: Math.abs(val) });
        break;
      case 11:
        setStat({ ...stat, s11: Math.abs(val) });
        break;
      case 12:
        setStat({ ...stat, s12: Math.abs(val) });
        break;
    }
  };

  useEffect(() => {
    const saveStat = () => {
      // 방어도, 방어구관통, 방어도무시, 공격력증가, 마법치명, 마력증강 돋
      var temp1: number[] = [stat.s1, stat.s2, stat.s3, stat.s4, stat.s5, stat.s6];
      // 방어도, 방어구관통, 방어도무시, 공격력증가, 마법치명, 마력증강 %돋
      var temp2: number[] = [stat.s7, stat.s8, stat.s9, stat.s10, stat.s11, stat.s12];
      setGoldState1(temp1);
      setGoldState2(temp2);
    };
    saveStat();
  }, [stat, setGoldState1, setGoldState2]);

  return (
    <React.Fragment>
      <TextField
        variant='outlined'
        type='number'
        placeholder='방어도'
        className={classes.stat}
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
        placeholder='방어구관통'
        className={classes.stat}
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
        placeholder='방어도무시'
        className={classes.stat}
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
        placeholder='공격력증가'
        className={classes.stat}
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
        placeholder='마법치명'
        className={classes.stat}
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
        placeholder='마력증강'
        className={classes.stat}
        value={stat.s6 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 6);
          } else {
            inputStat(Number(e.target.value), 6);
          }
        }}
      />

      <br />
      <TextField
        variant='outlined'
        type='number'
        placeholder='(%)'
        className={classes.stat}
        value={stat.s7 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 7);
          } else {
            inputStat(Number(e.target.value), 7);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        placeholder='(%)'
        className={classes.stat}
        value={stat.s8 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 8);
          } else {
            inputStat(Number(e.target.value), 8);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        placeholder='(%)'
        className={classes.stat}
        value={stat.s9 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 9);
          } else {
            inputStat(Number(e.target.value), 9);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        placeholder='(%)'
        className={classes.stat}
        value={stat.s10 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 10);
          } else {
            inputStat(Number(e.target.value), 10);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        placeholder='(%)'
        className={classes.stat}
        value={stat.s11 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 11);
          } else {
            inputStat(Number(e.target.value), 11);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='number'
        placeholder='(%)'
        className={classes.stat}
        value={stat.s12 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 12);
          } else {
            inputStat(Number(e.target.value), 12);
          }
        }}
      />
    </React.Fragment>
  );
}
