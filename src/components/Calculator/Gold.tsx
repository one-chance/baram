import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
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
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

interface IGoldSlot {
  num: number;
  type: number;
  value: string;
  power: number;
}

export default function Gold() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);

  // 황돋 1~3 종류, 기준값, 수치, 전투력
  const [goldSlot1, setGoldSlot1] = useState({ num: 0, type: 0, value: "", power: 0 });
  const [goldSlot2, setGoldSlot2] = useState({ num: 0, type: 0, value: "", power: 0 });
  const [goldSlot3, setGoldSlot3] = useState({ num: 0, type: 0, value: "", power: 0 });
  const [goldSlotList, setGoldSlotList] = useState<Array<IGoldSlot>>([goldSlot1, goldSlot2, goldSlot3]);

  const [goldPower, setGoldPower] = useState(0); // 합산 황돋 전투력

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
    let goldNumber: number = goldSlotList[num].num;
    let goldType: number = goldSlotList[num].type;
    let tempValue: number = Math.abs(Number(val));
    let goldValue: number = 0;

    if (goldNumber > 9) {
      goldValue = tempValue * 100;
    } else {
      val = parseInt(val).toString();
      goldValue = tempValue;
    }

    if (Math.floor(goldType * goldValue) <= 300) {
      switch (num) {
        case 0:
          setGoldSlot1({ ...goldSlot1, value: val, power: Math.floor(goldType * goldValue) });
          break;
        case 1:
          setGoldSlot2({ ...goldSlot2, value: val, power: Math.floor(goldType * goldValue) });
          break;
        case 2:
          setGoldSlot3({ ...goldSlot3, value: val, power: Math.floor(goldType * goldValue) });
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
    setGoldSlotList(goldSlotList);
    setGoldPower(goldSlot1.power + goldSlot2.power + goldSlot3.power);
  }, [goldSlotList, goldSlot1, goldSlot2, goldSlot3, goldPower]);

  const changeSelect = (event: React.ChangeEvent<{ value: unknown }>, num: number) => {
    let goldVal: number[] = [0, 0.003, 0.375, 3.75, 3.75, 3.75, 15, 37.5, 60, 1, 1, 1, 0.6, 0.375, 0.3, 0.3, 0.3, 0.3, 0.3];
    //let goldVal: number[] = [0, 0.003, 0.375, 3.75, 3.75, 3.75, 15, 37.5, 60, 100, 100, 100, 60, 37.5, 30, 30, 30, 30, 30];
    //let select: number = goldVal[event.target.value as number];

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
    goldSlotList[num].num = event.target.value as number;
    goldSlotList[num].type = goldVal[event.target.value as number];
  };

  return (
    <React.Fragment>
      {goldSlotList.map((goldSlot: IGoldSlot, idx: number) => {
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
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "BMDOHYEON", margin: "0" }}>황돋 전투력 TMI</span>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>내용</DialogContent>
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
