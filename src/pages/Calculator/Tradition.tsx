import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyBackdropState } from "state/index";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { lunaToSolar } from "../../utils/CalUtil";

const useStyles = makeStyles({
  root: {
    marginTop: "15px",
  },
  title: {
    minWidth: "120px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "5px 10px",
  },
  btn: {
    minWidth: "30px",
    padding: "0",
    fontSize: "1.2rem",
    margin: "0",
  },
  btnQuest: {
    minWidth: "30px",
    height: "30px",
    marginLeft: "10px",
    padding: "0",
    backgroundColor: "transparent",
  },
});

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
        var temp = res.data;
        if (Object.keys(temp).length === 2) {
          sStart[i] = `${temp[0].solMonth}월 ${temp[0].solDay}일`;
        } else {
          sStart[i] = `${temp.solMonth}월 ${temp.solDay}일`;
        }
        setSStart([...sStart]);
      });

      lunaToSolar(pYear.toString(), end[i]).then(res => {
        var temp = res.data;
        if (Object.keys(temp).length === 2) {
          sEnd[i] = `${temp[0].solMonth}월 ${temp[0].solDay}일`;
        } else {
          sEnd[i] = `${temp.solMonth}월 ${temp.solDay}일`;
        }
        setSEnd([...sEnd]);
      });
    }
    setTimeout(() => {
      setMyBackdrop(false);
    }, 3000);
  };

  const makePanel = (s: number, e: number) => {
    let panel: JSX.Element[] = [];

    for (let i = s; i < e; i++) {
      panel[i] = (
        <React.Fragment key={i}>
          <Grid container alignItems='center' direction='row'>
            <Typography className={classes.title}>{events[i]}</Typography>
            <div style={{ margin: "0 10px" }}>
              <Typography style={{ color: "blue" }}>
                음력 : {strToNum(start[i])} ~ {strToNum(end[i])}
              </Typography>
              <Typography style={{ color: "red" }}>
                양력 : {sStart[i]} ~ {sEnd[i]}
              </Typography>
            </div>
            {i === 4 ? (
              <Button className={classes.btnQuest} href='/board/tip/20'>
                <HelpOutlineIcon />
              </Button>
            ) : (
              ""
            )}
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
          <Typography style={{ minWidth: "220px", fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>{sYear}년 세시마을</Typography>
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
          <Typography style={{ margin: "10px 15px" }}>※ 음력이 30일까지인 달은 양력도 하루 연장된다 ※</Typography>
        </Grid>
      </Grid>
    </>
  );
}
