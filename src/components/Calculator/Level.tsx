import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import LevelState from "state/Calculator/LevelState";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallBox: {
      width: "100%",
      height: "50px",
      padding: "0",
      margin: "0",
    },

    powerText: {
      width: "80%",
      height: "40px",
      lineHeight: "40px",
      margin: "5px 0",
      color: "black",
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "center",
      float: "left",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    btn: {
      height: "40px",
      margin: "5px",
      padding: "0",
    },
  })
);

export default function Animal() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);
  let [level, setLevel] = useRecoilState(LevelState);
  const [levelPower, setLevelPower] = useState<number>(0); // 레벨 전투력 (표기)
  const [levelPower2, setLevelPower2] = useState<number>(0); // 레벨 전투력 (실제)

  useEffect(() => {
    calLevel();
  }, [level]);

  const calLevel = () => {
    if (!level) {
      setLevelPower(0);
      setLevelPower2(0);

      return 0;
    }

    let a: number = Math.floor(level / 100);
    let b: number = level % 100;
    let c: number[] = [649.5, 1003, 2056.5, 3810, 6263.5, 9417, 13270.5, 17824];
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

  return (
    <React.Fragment>
      <Container className={classes.smallBox} style={{ margin: "5px 0", textAlign: "center" }}>
        <TextField
          variant='outlined'
          placeholder='99~799'
          value={level || ""}
          onChange={e => {
            setLevel(parseInt(e.target.value));
          }}
          inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
          style={{ width: "150px", margin: "5px 0 5px 5px" }}
        />
        <Button
          variant='contained'
          className={classes.btn}
          color='secondary'
          onClick={() => {
            setOpenHelper(true);
          }}
          style={{ minWidth: "40px" }}>
          ?
        </Button>
      </Container>
      <Container className={classes.smallBox}>
        <Link className={classes.powerText} style={{ width: "100%" }}>
          레벨 전투력 : {levelPower === levelPower2 ? levelPower : levelPower + "(" + levelPower2 + ")"}
        </Link>
      </Container>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>레벨 전투력 TMI</h3>
          </div>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>
          <h3 style={{ color: "red", fontFamily: "BMJUA" }}>★ 레벨 전투력 = 렙업 전투력 + 승급 전투력 ★</h3>
          <h3 style={{ fontFamily: "BMJUA" }}>* Lv.99에 최초 전투력이 부여되며 이후 렙업과 승급마다 전투력이 증가한다.</h3>
          <h4>* 승급퀘를 완료하지 않아도 레벨만 달성하면 승급 전투력이 증가한다.</h4>
          <h4>* 렙업 전투력 = 3.5 x 승급 차수 | 승급 전투력 = 350 x 승급 차수</h4>
          <h5>ex) 699 달성시 3.5 x 6 = 21 증가 </h5>
          <h5>ex) 700 달성시 3.5 x 7 + 350 x 7 = 2474.5 증가 </h5>
          <h4>* 소수점 첫재 자리까지 계산되지만 상태창에는 반올림한 정수로 표시된다.</h4>
          <h4>* 치장 한벌효과인 모든 능력 증가가 반영되지 않는다.</h4>
          <h4>* 8차가 나온다면 Lv.899의 레벨 전투력은 25850일 것이다.</h4>
        </DialogContent>
        <DialogActions>
          <Button
            tabIndex={-1}
            color='primary'
            onClick={() => {
              setOpenHelper(false);
            }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
