import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import AnimalState from "state/Calculator/Ability/AnimalState";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles({
  stat: {
    width: "60px",
    margin: "5px 0",
    textAlignLast: "center",
    "& input": {
      height: "40px",
      padding: "0",
      textAlign: "center",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },

  dlgText: {
    height: "30px",
    marginBottom: "10px",
  },
});

export default function AnimalStat() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [stat, setStat] = useState({ s1: 0, s2: 0, s3: 0, s4: 0 });
  const setAnimalState = useSetRecoilState(AnimalState);

  var weaphon = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 7, 2, 10, 0, 0],
    [0, 15, 5, 25, 0, 0],
    [0, 30, 10, 50, 0, 0],
  ];
  var helmet = [
    [0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0],
    [-2, 0, 0, 0, 0, 0],
    [-3, 0, 0, 0, 0, 0],
    [-5, 0, 0, 0, 0, 0],
    [-7, 0, 0, 0, 0, 0],
    [-9, 0, 0, 0, 0, 0],
    [-11, 0, 1, 10, 20, 0],
    [-13, 0, 3, 20, 30, 0],
    [-15, 0, 5, 30, 50, 0],
  ];
  var armor = [
    [0, 0, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0],
    [-2, 0, 0, 0, 0, 0],
    [-3, 0, 0, 0, 0, 0],
    [-5, 0, 0, 0, 0, 0],
    [-12, 0, 0, 0, 0, 0],
    [-15, 0, 0, 0, 0, 0],
    [-20, 0, 5, 0, 0, 0],
    [-25, 0, 8, 0, 0, 0],
    [-30, 0, 13, 0, 0, 0],
  ];
  var gloves = [0, -1, -2];

  const inputStat = (val: number, idx: number) => {
    if (val < 0 || val > 9) {
      switch (idx) {
        case 1:
          setStat({ ...stat, s1: 0 });
          break;
        case 2:
          setStat({ ...stat, s2: 0 });
          break;
        case 3:
          setStat({ ...stat, s3: 0 });
          break;
        case 4:
          setStat({ ...stat, s4: 0 });
          break;
      }
    } else {
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
      }
    }
  };

  useEffect(() => {
    const saveStat = () => {
      // 방어도, 방어구관통, 방어도무시, 공격력증가, 마법치명, 마력증강 돋
      var temp: number[] = [
        weaphon[stat.s1][0] + helmet[stat.s2][0] + armor[stat.s3][0] + gloves[stat.s4],
        weaphon[stat.s1][1] + helmet[stat.s2][1] + armor[stat.s3][1],
        weaphon[stat.s1][2] + helmet[stat.s2][2] + armor[stat.s3][2],
        weaphon[stat.s1][3] + helmet[stat.s2][3] + armor[stat.s3][3],
        0,
        0,
      ];
      setAnimalState(temp);
    };
    saveStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stat, setAnimalState]);

  return (
    <React.Fragment>
      <Link style={{ lineHeight: "40px", margin: "5px 10px", textDecoration: "none", color: "black", fontSize: "1rem" }}>무기</Link>
      <TextField
        variant='outlined'
        type='number'
        placeholder='등급'
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
      <Link style={{ lineHeight: "40px", margin: "5px 10px", textDecoration: "none", color: "black", fontSize: "1rem" }}>투구</Link>
      <TextField
        variant='outlined'
        type='number'
        placeholder='등급'
        value={stat.s2 || ""}
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 2);
          } else {
            inputStat(Number(e.target.value), 2);
          }
        }}
      />
      <Link style={{ lineHeight: "40px", margin: "5px 10px", textDecoration: "none", color: "black", fontSize: "1rem" }}>갑옷</Link>
      <TextField
        variant='outlined'
        type='number'
        placeholder='등급'
        value={stat.s3 || ""}
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 3);
          } else {
            inputStat(Number(e.target.value), 3);
          }
        }}
      />
      <Link style={{ lineHeight: "40px", margin: "5px 10px", textDecoration: "none", color: "black", fontSize: "1rem" }}>장갑</Link>
      <TextField
        variant='outlined'
        type='number'
        placeholder='개수'
        value={stat.s4 || ""}
        className={classes.stat}
        onChange={e => {
          if (e.target.value === "" || e.target.value === "-") {
            inputStat(0, 4);
          } else {
            inputStat(Number(e.target.value), 4);
          }
        }}
      />
      <Button
        variant='contained'
        color='secondary'
        style={{ minWidth: "40px", height: "40px", margin: "5px 10px 5px 15px", boxShadow: "none" }}
        onClick={() => {
          setOpenHelper(true);
        }}>
        ?
      </Button>

      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        maxWidth='lg'>
        <DialogContent style={{ padding: "20px 30px" }}>
          <Typography variant='h6' className={classes.dlgText}>
            신수 종류에 관계 없이 등급에 따라 능력치는 동일하다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            무기/투구/갑옷은 등급, 장갑은 개수를 입력한다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            보주로 증가하는 공격력증가, 마법치명은 적용하지 않으므로
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            계산을 원하면 다른 곳에 더해야 한다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText}>
            5등급 99레벨 기준으로 변신시 힘민지가 50씩 상승한다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ margin: "0" }}>
            신수 장갑 착용시 힘민지가 1~2 오른다.
          </Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
