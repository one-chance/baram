import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyBackdropState } from "state/index";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { lunaToSolar } from "../../utils/CalUtil";

const useStyles = makeStyles(
  createStyles({
    root: {
      marginTop: "15px",
    },
    btn: {
      minWidth: "30px",
      padding: "0",
      fontSize: "1.2rem",
      margin: "0 10px",
    },
  })
);

export default function Tradition() {
  const classes = useStyles();
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const events = ["설날", "중화절", "삼짇날", "부처님오신날", "단오", "유두", "칠석", "추석", "중양절", "김장철", "동지", "섣달"];
  const start = ["0101", "0201", "0301", "0401", "0501", "0610", "0706", "0801", "0901", "1001", "1101", "1221"];
  const end = ["0125", "0215", "0315", "0410", "0510", "0620", "0721", "0829", "0929", "1029", "1129", "1229"];

  var today = new Date();
  var year = today.getFullYear();
  const [sYear, setSYear] = useState(year);
  const [sStart, setSStart] = useState<Array<string>>([
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
  ]);
  const [sEnd, setSEnd] = useState<Array<string>>([
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
    "00월 00일",
  ]);

  const yearMinus = () => {
    setSYear(sYear - 1);
    convertSolar(sYear - 1);
  };

  const yearPlus = () => {
    setSYear(sYear + 1);
    convertSolar(sYear + 1);
  };

  const strToNum = (str: string) => {
    let date = `${str.substr(0, 2)}월 ${str.substr(2, 2)}일`;
    return date;
  };

  const convertSolar = (pYear: number) => {
    setMyBackdrop(true);
    for (let i = 0; i < 12; i++) {
      lunaToSolar(pYear.toString(), start[i]).then(res => {
        sStart[i] = `${res.data.solMonth}월 ${res.data.solDay}일`;
        setSStart([...sStart]);
      });

      lunaToSolar(pYear.toString(), end[i]).then(res => {
        sEnd[i] = `${res.data.solMonth}월 ${res.data.solDay}일`;
        setSEnd([...sEnd]);
      });
    }
    setTimeout(() => {
      setMyBackdrop(false);
    }, 4000);
  };

  const makePanel = (s: number, e: number) => {
    let panel: JSX.Element[] = [];

    for (let i = s; i < e; i++) {
      panel[i] = (
        <React.Fragment key={i}>
          <Grid container alignItems='center' direction='row'>
            <Typography style={{ minWidth: "120px", fontSize: "1.2rem", fontWeight: "bold", margin: "5px 20px" }}>{events[i]}</Typography>
            <div style={{ margin: "0 20px" }}>
              <Typography style={{ color: "blue" }}>
                음력 : {strToNum(start[i])} ~ {strToNum(end[i])}
              </Typography>
              <Typography style={{ color: "red" }}>
                양력 : {sStart[i]} ~ {sEnd[i]}
              </Typography>
            </div>
          </Grid>
          <Divider style={{ width: "100%", height: "2px", margin: "4px 0" }} />
        </React.Fragment>
      );
    }

    return panel;
  };

  useEffect(() => {
    convertSolar(sYear);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container justify='center' className={classes.root}>
        <Grid item container justify='center' xs={12} style={{ margin: "10px 0 30px 0" }}>
          <Button variant='outlined' className={classes.btn} onClick={yearMinus}>
            ◀
          </Button>
          <Typography style={{ minWidth: "300px", fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>{sYear}년 세시마을 일정</Typography>
          <Button variant='outlined' className={classes.btn} onClick={yearPlus}>
            ▶
          </Button>
        </Grid>

        <Grid item style={{ minWidth: "350px", padding: "0 15px" }}>
          {makePanel(0, 6)}
        </Grid>

        <Grid item style={{ minWidth: "350px", padding: "0 15px" }}>
          {makePanel(6, 12)}
        </Grid>

        <Grid container justify='center'>
          <Typography style={{ margin: "10px 15px" }}>※ 음력이 30일까지 있는 달은 양력도 하루 연장된다 ※</Typography>
        </Grid>
      </Grid>
    </>
  );
}
