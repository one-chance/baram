import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  stat: {
    width: "60px",
    margin: "10px",
    "& input": {
      height: "40px",
      padding: "5px",
      textAlign: "center",
    },
  },
});

export default function CharStat() {
  const classes = useStyles();
  const [charStat, setCharStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, sum1: 0, sum2: 0 });
  //const [statusList, setStatusList] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);

  const calCharStat = (val: number, idx: number) => {
    switch (idx) {
      case 1:
        setCharStat({ ...charStat, s1: Math.abs(val) });
        break;
      case 2:
        setCharStat({ ...charStat, s2: Math.abs(val) });
        break;
      case 3:
        setCharStat({ ...charStat, s3: Math.abs(val) });
        break;
      case 4:
        setCharStat({ ...charStat, s4: Math.abs(val) });
        break;
      case 5:
        setCharStat({ ...charStat, s5: Math.abs(val) });
        break;
    }
  };

  useEffect(() => {
    setCharStat({ ...charStat, sum1: charStat.s1 + charStat.s2 + charStat.s3, sum2: charStat.s4 + charStat.s5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charStat.s1, charStat.s2, charStat.s3, charStat.s4, charStat.s5]);

  // 숫자 아닌거 들어오면 입력 막기
  return (
    <React.Fragment>
      <TextField
        variant='outlined'
        type='tel'
        placeholder='&nbsp; 힘'
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            calCharStat(0, 1);
          } else {
            calCharStat(Number(e.target.value), 1);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='tel'
        label='민첩'
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            calCharStat(0, 2);
          } else {
            calCharStat(Number(e.target.value), 2);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='tel'
        label='지력'
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            calCharStat(0, 3);
          } else {
            calCharStat(Number(e.target.value), 3);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='tel'
        label='건강'
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            calCharStat(0, 4);
          } else {
            calCharStat(Number(e.target.value), 4);
          }
        }}
      />
      <TextField
        variant='outlined'
        type='tel'
        label='지혜'
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            calCharStat(0, 5);
          } else {
            calCharStat(Number(e.target.value), 5);
          }
        }}
      />
      <Button variant='contained' color='secondary' style={{ minWidth: "40px", height: "40px", margin: "12.5px 10px" }}>
        ?
      </Button>
    </React.Fragment>
  );
}
