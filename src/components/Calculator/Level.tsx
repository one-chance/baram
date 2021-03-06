import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import LevelState from "state/Calculator/LevelState";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  powerText: {
    width: "240px",
    height: "40px",
    lineHeight: "40px",
    margin: "5px 0",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    float: "left",
  },
  btn: {
    minWidth: "40px",
    height: "40px",
    margin: "5px",
    padding: "0",
  },
  dlgText: {
    fontFamily: "Jua",
    marginBottom: "8px",
  },
});

export default function Level() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);
  let [level, setLevel] = useRecoilState(LevelState);
  const [levelPower, setLevelPower] = useState<number>(0); // 레벨 전투력 (표기)
  const [levelPower2, setLevelPower2] = useState<number>(0); // 레벨 전투력 (실제)

  const switchDlg = () => {
    setOpenHelper(!openHelper);
  };

  useEffect(() => {
    const calLevel = () => {
      if (!level) {
        setLevelPower(0);
        setLevelPower2(0);

        return 0;
      }

      let a: number = Math.floor(level / 100);
      let b: number = level % 100;
      let c: number[] = [649.5, 1003, 2056.5, 3810, 6263.5, 9417, 13270.5, 17824, 20249.5];
      let res: number = 0;

      if (level.toString().length === 3 && level < 800) {
        res = a * 3.5 * b + c[a];
        setLevelPower(Math.round(res));
        setLevelPower2(res);
      } else if (level === 99) {
        res = 649.5;
        setLevelPower(Math.round(res));
        setLevelPower2(res);
      } else if (level.toString().length > 3) {
        setLevel(0);
        setLevelPower(0);
        setLevelPower2(0);
      }
    };

    calLevel();
  }, [level, setLevel]);

  return (
    <React.Fragment>
      <Grid item container justify='center' style={{ padding: "0", margin: "0" }}>
        <TextField
          variant='outlined'
          placeholder='99~899'
          value={level || ""}
          onChange={e => {
            setLevel(parseInt(e.target.value));
          }}
          inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
          style={{ width: "150px", margin: "2.5px 0" }}
        />
      </Grid>
      <Grid container>
        <Typography className={classes.powerText}>레벨 전투력 : {levelPower === levelPower2 ? levelPower : `${levelPower} (${levelPower2})`}</Typography>
        <Button variant='contained' className={classes.btn} color='secondary' onClick={switchDlg}>
          ?
        </Button>
      </Grid>

      <Dialog open={openHelper} onClose={switchDlg} maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center", color: "blue" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem" }}>레벨 전투력 TMI</Typography>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 레벨 전투력 = 렙업 전투력 + 승급 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * Lv.99에 최초로 부여되며 이후 렙업/승급마다 증가한다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 승급하지 않아도 레벨만 달성하면 승급 전투력이 증가한다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 소수점 첫재 자리까지 계산되지만, s창에는 올림하여 표시한다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영되지 않는다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 렙업 전투력 = 3.5 x 승급 차수 // 승급 전투력 = 350 x 승급 차수
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            ex) 700 달성시 3.5 x 7 + 350 x 7 = 2474.5 증가
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            ex) 800 렙업시 3.5 x 8 + 350 x 8 = 2828 증가
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={switchDlg} style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
