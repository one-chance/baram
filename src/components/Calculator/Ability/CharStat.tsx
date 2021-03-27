import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import CharState from "state/Calculator/Ability/CharState";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles({
  stat: {
    width: "50px",
    margin: "5px 10px",
    "& input": {
      height: "40px",
      padding: "0",
      textAlign: "center",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },

  btnQuestion: {
    minWidth: "40px",
    height: "40px",
    margin: "5px 10px",
    boxShadow: "none",
  },

  dlgText: {
    height: "30px",
    marginBottom: "10px",
  },
});

export default function CharStat() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [stat, setStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 });
  const setCharactorState = useSetRecoilState(CharState);

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

  const switchDlg = () => {
    setOpenHelper(!openHelper);
  };

  useEffect(() => {
    const saveStat = (a: number, b: number) => {
      // 방어도, 방어구관통, 방어도무시, 공격력증가, 마법치명, 마력증강
      var temp: number[] = [0, Math.floor(a / 100), Math.floor(a / 250), Math.floor(a / 50), Math.floor(b / 50), 0];
      setCharactorState(temp);
    };
    saveStat(stat.s1 + stat.s2 + stat.s3, stat.s4 + stat.s5);
  }, [stat, setCharactorState]);

  return (
    <React.Fragment>
      <TextField
        variant='outlined'
        type='number'
        className={classes.stat}
        placeholder='힘'
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
        placeholder='민첩'
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
        placeholder='지력'
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
        placeholder='건강'
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
        placeholder='지혜'
        value={stat.s5 || ""}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 5);
          } else {
            inputStat(Number(e.target.value), 5);
          }
        }}
      />
      <Button variant='contained' color='secondary' className={classes.btnQuestion} onClick={switchDlg}>
        ?
      </Button>

      <Dialog open={openHelper} onClose={switchDlg} maxWidth='lg'>
        <DialogContent style={{ padding: "20px 30px" }}>
          <Typography variant='h6' className={classes.dlgText}>
            과거와 다르게 각 능력치별 영향력은 미비하다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            직업별로 수치는 다르지만 상승하는 능력치는 비슷하다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            신수변신시 등급과 레벨에 비례하여 힘민지가 추가 상승한다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            공격력증가=힘민지/50, 방어구관통=힘민지/100, 방어도무시=힘민지/250
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ margin: "0" }}>
            시전향상, 마법치명=건혜/50, 명중회피=건혜/200, 명중률=건혜/250
          </Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
