import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: "200px",
      height: "50px",
      padding: "1px",
      margin: "5px",
      color: "blue",
      textAlignLast: "center",
      float: "left",
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        textAlign: "center",
        color: "blue",
      },
    },

    selText: {
      width: "80px",
      margin: "5px",
      textAlign: "center",
      float: "left",
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
      },
      "& input": {
        padding: "0",
        height: "50px",
        textAlign: "center",
        color: "blue",
      },
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

    dlgText: {
      height: "30px",
      fontFamily: "Jua",
      margin: "10px 0",
    },
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Gold() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);

  const [goldSlot1, setGoldSlot1] = useState({ num: 0, type: 0, value: "", power: 0 }); // 황돋1 종류, 기준값, 수치, 전투력
  const [goldSlot2, setGoldSlot2] = useState({ num: 0, type: 0, value: "", power: 0 }); // 황돋2 종류, 기준값, 수치, 전투력
  const [goldSlot3, setGoldSlot3] = useState({ num: 0, type: 0, value: "", power: 0 }); // 황돋3 종류, 기준값, 수치, 전투력
  const [goldPower, setGoldPower] = useState(0); // 합산 황돋 전투력

  var iteration: number[] = [0, 1, 2]; // iteration for rendering

  // prettier-ignore
  var ability = [ "능력치", "체력/마력", "재생력", "방관/마치/공증/마증", "타흡/마흡/피흡", "시향/회향/직타", "힘/민/지", "명중률/타격치", "마법수준향상", "명중회피/방무/방어",
    "체력/마력(%)", "방무/방어(%)", "힘/민/지(%)","명중회피(%)", "방관/마치/공증/마증(%)", "타흡/마흡/피흡(%)", "시향/회향/직타(%)", "명중률/타격치(%)", "마법수준/재생력(%)", ];

  const abilityList = ability.map((name: string, idx: number) => {
    return (
      <Menus value={idx} key={idx} disableGutters={true}>
        {name}
      </Menus>
    );
  });

  const calGold = (val: string, num: number) => {
    let gNumber: number, gType: number; // gNumber : 황돋 종류, gType : 황돋 종류별 기준값
    num === 0 ? (gNumber = goldSlot1.num) : num === 1 ? (gNumber = goldSlot2.num) : (gNumber = goldSlot3.num);
    num === 0 ? (gType = goldSlot1.type) : num === 1 ? (gType = goldSlot2.type) : (gType = goldSlot3.type);

    let tempValue: number = Math.abs(Number(val));
    let gValue: number = 0;

    if (gNumber > 9) {
      gValue = tempValue * 100;
    } else {
      val = parseInt(val).toString();
      gValue = tempValue;
    }

    if (Math.floor(gType * gValue) <= 300) {
      switch (num) {
        case 0:
          setGoldSlot1({ ...goldSlot1, value: val, power: Math.floor(gType * gValue) });
          break;
        case 1:
          setGoldSlot2({ ...goldSlot2, value: val, power: Math.floor(gType * gValue) });
          break;
        case 2:
          setGoldSlot3({ ...goldSlot3, value: val, power: Math.floor(gType * gValue) });
          break;
      }
    } else {
      switch (num) {
        case 0:
          setGoldSlot1({ ...goldSlot1, value: "", power: 0 });
          break;
        case 1:
          setGoldSlot2({ ...goldSlot2, value: "", power: 0 });
          break;
        case 2:
          setGoldSlot3({ ...goldSlot3, value: "", power: 0 });
          break;
      }
    }
  };

  useEffect(() => {
    setGoldPower(goldSlot1.power + goldSlot2.power + goldSlot3.power);
  }, [goldSlot1, goldSlot2, goldSlot3, goldPower]);

  const changeSelect = (event: React.ChangeEvent<{ value: unknown }>, num: number) => {
    let goldVal: number[] = [0, 0.003, 0.375, 3.75, 3.75, 3.75, 15, 37.5, 60, 100, 1, 1, 0.6, 0.375, 0.3, 0.3, 0.3, 0.3, 0.3];
    let input: number = event.target.value as number;

    switch (num) {
      case 0:
        setGoldSlot1({ num: input, type: goldVal[input], value: "", power: 0 });
        break;
      case 1:
        setGoldSlot2({ num: input, type: goldVal[input], value: "", power: 0 });
        break;
      case 2:
        setGoldSlot3({ num: input, type: goldVal[input], value: "", power: 0 });
        break;
    }
  };

  return (
    <React.Fragment>
      {iteration.map((idx: number) => {
        return (
          <Container key={idx} style={{ width: "100%", padding: "0", float: "left" }}>
            <Select
              variant='outlined'
              className={classes.select}
              defaultValue={0}
              onChange={e => {
                changeSelect(e, idx);
              }}>
              {abilityList}
            </Select>
            <TextField
              variant='outlined'
              type='number'
              className={classes.selText}
              disabled={idx === 0 ? goldSlot1.num === 0 : idx === 1 ? goldSlot2.num === 0 : goldSlot3.num === 0}
              value={idx === 0 ? goldSlot1.value : idx === 1 ? goldSlot2.value : goldSlot3.value}
              placeholder='수치'
              onChange={e => {
                calGold(e.target.value, idx);
              }}
            />
          </Container>
        );
      })}

      <Link className={classes.powerText}>황돋 전투력 : {goldPower}</Link>
      <Button
        className={classes.btn}
        variant='contained'
        color='secondary'
        style={{ minWidth: "40px" }}
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
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>황돋 전투력 TMI</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 황돋 전투력 = 장비에 감정된 부가 잠재능력들의 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 장비당 2~3가지 종류의 잠재능력이 중복 없이 감정된다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 모든 황돋 전투력은 최대값이 300이므로 장비당 최대는 900이다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 능력별 전투력은 소수점까지 계산되지만, 소수점 이하는 버림 한다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 장비 아이템의 부가 잠재능력도 황돋 전투력으로 계산된다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영된다.
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            tabIndex={-1}
            color='primary'
            onClick={() => {
              setOpenHelper(false);
            }}
            style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
