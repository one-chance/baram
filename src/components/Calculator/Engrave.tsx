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

export default function Engrave() {
  const classes = useStyles();

  var iteration = [0, 1];
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [engravePower, setEngravePower] = useState<number>(0); // 각인 전투력
  const [engraveSlot1, setEngraveSlot1] = useState({ num: 0, type: 0, value: "", power: 0 }); // 각인1 종류, 수치, 전투력
  const [engraveSlot2, setEngraveSlot2] = useState({ num: 0, type: 0, value: "", power: 0 }); // 각인2 종류, 수치, 전투력

  const calEngrave = (val: string, num: number) => {
    let eNumber: number, eType: number, eValue: number;
    num === 0 ? (eNumber = engraveSlot1.num) : (eNumber = engraveSlot2.num);
    num === 0 ? (eType = engraveSlot1.type) : (eType = engraveSlot2.type);

    if (val === "") {
      switch (num) {
        case 0:
          setEngraveSlot1({ ...engraveSlot1, value: "", power: 0 });
          break;
        case 1:
          setEngraveSlot2({ ...engraveSlot2, value: "", power: 0 });
          break;
      }
      return;
    }

    if (eNumber === 1) {
      switch (num) {
        case 0:
          setEngraveSlot1({ ...engraveSlot1, value: val, power: Math.floor(eType * Number(val)) });
          break;
        case 1:
          setEngraveSlot2({ ...engraveSlot2, value: val, power: Math.floor(eType * Number(val)) });
          break;
      }
    } else {
      eValue = parseInt(val);
      switch (num) {
        case 0:
          setEngraveSlot1({ ...engraveSlot1, value: eValue.toString(), power: Math.floor(eType * Math.abs(eValue)) });
          break;
        case 1:
          setEngraveSlot2({ ...engraveSlot2, value: eValue.toString(), power: Math.floor(eType * Math.abs(eValue)) });
          break;
      }
    }
  };

  const changeSelect = (event: React.ChangeEvent<{ value: unknown }>, num: number) => {
    let eVal: number[] = [0, 11.075, 54.5, 45.5, 11.075, 8.76, 8.64, 8.1, 5.15, 5.15, 4.175, 4.175, 71, 0, 0, 0];
    let input: number = event.target.value as number;

    switch (num) {
      case 0:
        setEngraveSlot1({ num: input, type: eVal[input], value: "", power: 0 });
        break;
      case 1:
        setEngraveSlot2({ num: input, type: eVal[input], value: "", power: 0 });
        break;
    }
  };

  useEffect(() => {
    setEngravePower(engraveSlot1.power + engraveSlot2.power);
  }, [engraveSlot1, engraveSlot2]);

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
              <Menus value={0}>능력치</Menus>
              <Menus value={1}>체력/마력(%)</Menus>
              <Menus value={2}>방어도</Menus>
              <Menus value={3}>방어도무시</Menus>
              <Menus value={4}>시전향상</Menus>
              <Menus value={5}>방어구관통</Menus>
              <Menus value={6}>마력증강</Menus>
              <Menus value={7}>마법치명</Menus>
              <Menus value={8}>공격력증가</Menus>
              <Menus value={9}>직타저항</Menus>
              <Menus value={11}>피해흡수</Menus>
              <Menus value={12}>피해흡수무시</Menus>
              <Menus value={13}>치명타</Menus>
              <Menus value={14}>힘/민/지</Menus>
              <Menus value={15}>명중회피</Menus>
              <Menus value={15}>체력/마력</Menus>
            </Select>
            <TextField
              variant='outlined'
              type='number'
              className={classes.selText}
              placeholder='수치'
              disabled={idx === 0 ? engraveSlot1.num === 0 : engraveSlot2.num === 0}
              value={idx === 0 ? engraveSlot1.value : engraveSlot2.value}
              onChange={e => {
                calEngrave(e.target.value, idx);
              }}
            />
          </Container>
        );
      })}

      <Link className={classes.powerText}>각인 전투력 : {engravePower}</Link>
      <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }} onClick={() => setOpenHelper(true)}>
        ?
      </Button>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "BMDOHYEON", margin: "0" }}>각인 전투력 TMI</span>
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
