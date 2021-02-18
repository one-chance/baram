import React, { useState } from "react";
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

    petText: {
      width: "50px",
      height: "40px",
      lineHeight: "40px",
      margin: "5px 0",
      float: "left",
      textAlign: "center",
      color: "black",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    petInput: {
      width: "80px",
      float: "left",
      margin: "5px 25px 5px 0",
      "& input": {
        height: "40px",
        padding: "0",
        textAlign: "center",
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
  power: number;
}

export default function Gold() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);

  // 황돋1~3 종류, 합산 전투력
  const [goldSlotList, setGoldSlotList] = useState<Array<IGoldSlot>>([
    { num: 0, type: 0, power: 0 },
    { num: 1, type: 0, power: 0 },
    { num: 2, type: 0, power: 0 },
  ]);

  const [gold1, setGold1] = useState<string>(""); // 황돋1 수치
  const [gold2, setGold2] = useState<string>(""); // 황돋2 수치
  const [gold3, setGold3] = useState<string>(""); // 황돋3 수치
  const [goldPower, setGoldPower] = useState(0); // 최종 전투력

  // prettier-ignore
  var ability = [ "능력치", "체력/마력", "재생력", "방관/마치/공증/마증", "타흡/마흡/피흡", "시향/회향/직타", "힘/민/지", "명중률/타격치", "마법수준향상", "명중회피/방무/방어",
    "체력/마력(%)", "방무/방어(%)", "힘/민/지(%)","명중회피(%)", "방관/마치/공증/마증(%)", "타흡/마흡/피흡(%)", "시향/회향/직타(%)", "명중률/타격치(%)", "마법수준/재생력(%)", ];

  const abilityList = ability.map((name: string, idx: number) => {
    return (
      <Menus value={idx} key={idx}>
        {name}
      </Menus>
    );
  });

  const calGold = (val: string, num: number) => {
    let a: number = Math.abs((val as unknown) as number);

    switch (num) {
      case 0:
        setGold1(val);
        break;
      case 1:
        setGold2(val);
        break;
      case 2:
        setGold3(val);
        break;
    }

    if (Math.floor(goldSlotList[num].type * a) <= 300) {
      goldSlotList[num].power = Math.floor(goldSlotList[num].type * a);
    } else {
      if (num === 0) {
        setGold1("");
      } else if (num === 1) {
        setGold2("");
      } else {
        setGold3("");
      }
      goldSlotList[num].power = 0;
    }
    setGoldSlotList(goldSlotList);
    setGoldPower(goldSlotList[0].power + goldSlotList[1].power + goldSlotList[2].power);
  };

  const changeSelect = (event: React.ChangeEvent<{ value: unknown }>, num: number) => {
    let goldVal: number[] = [0, 0.003, 0.375, 3.75, 3.75, 3.75, 15, 37.5, 60, 100, 100, 100, 60, 37.5, 30, 30, 30, 30, 30];
    goldSlotList[num].type = goldVal[event.target.value as number];
  };

  return (
    <React.Fragment>
      {goldSlotList.map((goldSlot: IGoldSlot, idx: number) => {
        return (
          <Container key={goldSlot.num} style={{ width: "100%", padding: "0", float: "left" }}>
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
              type='string'
              className={classes.selText}
              value={idx === 0 ? gold1 : idx === 1 ? gold2 : idx === 2 ? gold3 : "" || ""}
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
