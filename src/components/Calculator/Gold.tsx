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

export default function Gold() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);

  var goldVal: number[] = [0, 3, 0.375, 3.75, 3.75, 3.75, 15, 37.5, 60, 100, 100, 100, 60, 37.5, 30, 30, 30, 30, 30];
  const [selValue, setSelValue] = useState<Array<number>>([0, 0, 0]); // 황돋1~3 종류
  const [gold1, setGold1] = useState<number>(0); // 황돋1 수치
  const [gold2, setGold2] = useState<number>(0); // 황돋2 수치
  const [gold3, setGold3] = useState<number>(0); // 황돋3 수치
  const [total, setTotal] = useState<Array<number>>([0, 0, 0]); // 황돋1~3 전투력

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

  const calGold = (val: number, num: number) => {
    let a: number = Math.abs(val);

    if (Math.floor(selValue[num] * a) <= 300) {
      total[num] = Math.floor(selValue[num] * a);
    } else {
      if (num === 0) {
        setGold1(0);
        total[0] = 0;
      } else if (num === 1) {
        setGold2(0);
        total[1] = 0;
      } else {
        setGold3(0);
        total[2] = 0;
      }
    }

    setTotal(total);
  };

  return (
    <React.Fragment>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select
          variant='outlined'
          className={classes.select}
          defaultValue={0}
          onChange={e => {
            selValue[0] = goldVal[Number(e.target.value)];
            setGold1(0);
          }}>
          {abilityList}
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          value={gold1 || ""}
          placeholder='수치'
          type='number'
          onChange={e => {
            setGold1(Number(e.target.value));
            setSelValue(selValue);
            calGold(Number(e.target.value), 0);
          }}
        />
      </Container>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select
          variant='outlined'
          className={classes.select}
          defaultValue={0}
          onChange={e => {
            selValue[1] = goldVal[Number(e.target.value)];
            setGold2(0);
          }}>
          {abilityList}
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          value={gold2 || ""}
          placeholder='수치'
          type='number'
          onChange={e => {
            setGold2(Number(e.target.value));
            setSelValue(selValue);
            calGold(Number(e.target.value), 1);
          }}
        />
      </Container>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select
          variant='outlined'
          className={classes.select}
          defaultValue={0}
          onChange={e => {
            selValue[2] = goldVal[Number(e.target.value)];
            setGold3(0);
          }}>
          {abilityList}
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          value={gold3 || ""}
          placeholder='수치'
          type='number'
          onChange={e => {
            setGold3(Number(e.target.value));
            setSelValue(selValue);
            calGold(Number(e.target.value), 2);
          }}
        />
      </Container>
      <Link className={classes.powerText}>황돋 전투력 : {total[0] + total[1] + total[2]}</Link>
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
