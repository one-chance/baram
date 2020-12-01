import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

  const [gold1, setGold1] = useState<number>(0); // 황돋1 종류
  const [gold2, setGold2] = useState<number>(0); // 황돋1 수치
  const [gold3, setGold3] = useState<number>(0); // 황돋2 종류
  const [gold4, setGold4] = useState<number>(0); // 황돋2 수치
  const [gold5, setGold5] = useState<number>(0); // 황돋3 종류
  const [gold6, setGold6] = useState<number>(0); // 황돋3 수치
  const [gold7, setGold7] = useState<number>(0); // 황돋1 투력
  const [gold8, setGold8] = useState<number>(0); // 황돋2 투력
  const [gold9, setGold9] = useState<number>(0); // 황돋3 투력
  let goldVal: number[] = [0, 3, 0.375, 3.75, 3.75, 3.75, 15, 37.5, 60, 100, 100, 100, 60, 37.5, 30, 30, 30, 30, 30];

  const calGold = (val: number, num: number) => {
    let a: number = Math.abs(val);

    switch (num) {
      case 1:
        if (Math.floor(gold1 * a) <= 300) {
          setGold7(Math.floor(gold1 * a));
        } else {
          setGold2(0);
        }
        break;
      case 2:
        if (Math.floor(gold3 * a) <= 300) {
          setGold8(Math.floor(gold3 * a));
        } else {
          setGold4(0);
        }
        break;
      case 3:
        if (Math.floor(gold5 * a) <= 300) {
          setGold9(Math.floor(gold5 * a));
        } else {
          setGold6(0);
        }
        break;
    }
  };

  return (
    <React.Fragment>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select
          variant='outlined'
          className={classes.select}
          defaultValue={0}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            setGold1(goldVal[Number(e.target.value)]);
            setGold2(0);
          }}>
          <Menus value={0}>능력치</Menus>
          <Menus value={1}>체력/마력</Menus>
          <Menus value={2}>재생력</Menus>
          <Menus value={3}>방관/마치/공증/마증</Menus>
          <Menus value={4}>타흡/마흡/피흡</Menus>
          <Menus value={5}>시향/회향/직타</Menus>
          <Menus value={6}>힘/민/지</Menus>
          <Menus value={7}>명중률/타격치</Menus>
          <Menus value={8}>마법수준향상</Menus>
          <Menus value={9}>명중회피/방무/방어</Menus>
          <Menus value={10}>체력/마력(%)</Menus>
          <Menus value={11}>방무/방어(%)</Menus>
          <Menus value={12}>힘/민/지(%)</Menus>
          <Menus value={13}>명중회피(%)</Menus>
          <Menus value={14}>방관/마치/공증/마증(%)</Menus>
          <Menus value={15}>타흡/마흡/피흡(%)</Menus>
          <Menus value={16}>시향/회향/직타(%)</Menus>
          <Menus value={17}>명중률/타격치(%)</Menus>
          <Menus value={18}>마법수준/재생력(%)</Menus>
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          value={gold2 || ""}
          placeholder='수치'
          type='number'
          onChange={e => {
            setGold2(Number(e.target.value));
            calGold(Number(e.target.value), 1);
          }}
        />
      </Container>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select
          variant='outlined'
          className={classes.select}
          defaultValue={0}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            setGold3(goldVal[Number(e.target.value)]);
            setGold4(0);
          }}>
          <Menus value={0}>능력치</Menus>
          <Menus value={1}>체력/마력</Menus>
          <Menus value={2}>재생력</Menus>
          <Menus value={3}>방관/마치/공증/마증</Menus>
          <Menus value={4}>타흡/마흡/피흡</Menus>
          <Menus value={5}>시향/회향/직타</Menus>
          <Menus value={6}>힘/민/지</Menus>
          <Menus value={7}>명중률/타격치</Menus>
          <Menus value={8}>마법수준향상</Menus>
          <Menus value={9}>명중회피/방무/방어</Menus>
          <Menus value={10}>체력/마력(%)</Menus>
          <Menus value={11}>방무/방어(%)</Menus>
          <Menus value={12}>힘/민/지(%)</Menus>
          <Menus value={13}>명중회피(%)</Menus>
          <Menus value={14}>방관/마치/공증/마증(%)</Menus>
          <Menus value={15}>타흡/마흡/피흡(%)</Menus>
          <Menus value={16}>시향/회향/직타(%)</Menus>
          <Menus value={17}>명중률/타격치(%)</Menus>
          <Menus value={18}>마법수준/재생력(%)</Menus>
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          value={gold4 || ""}
          placeholder='수치'
          type='number'
          onChange={e => {
            setGold4(Number(e.target.value));
            calGold(Number(e.target.value), 2);
          }}
        />
      </Container>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select
          variant='outlined'
          className={classes.select}
          defaultValue={0}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            setGold5(goldVal[Number(e.target.value)]);
            setGold6(0);
          }}>
          <Menus value={0}>능력치</Menus>
          <Menus value={1}>체력/마력</Menus>
          <Menus value={2}>재생력</Menus>
          <Menus value={3}>방관/마치/공증/마증</Menus>
          <Menus value={4}>타흡/마흡/피흡</Menus>
          <Menus value={5}>시향/회향/직타</Menus>
          <Menus value={6}>힘/민/지</Menus>
          <Menus value={7}>명중률/타격치</Menus>
          <Menus value={8}>마법수준향상</Menus>
          <Menus value={9}>명중회피/방무/방어</Menus>
          <Menus value={10}>체력/마력(%)</Menus>
          <Menus value={11}>방무/방어(%)</Menus>
          <Menus value={12}>힘/민/지(%)</Menus>
          <Menus value={13}>명중회피(%)</Menus>
          <Menus value={14}>방관/마치/공증/마증(%)</Menus>
          <Menus value={15}>타흡/마흡/피흡(%)</Menus>
          <Menus value={16}>시향/회향/직타(%)</Menus>
          <Menus value={17}>명중률/타격치(%)</Menus>
          <Menus value={18}>마법수준/재생력(%)</Menus>
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          value={gold6 || ""}
          placeholder='수치'
          type='number'
          onChange={e => {
            setGold6(Number(e.target.value));
            calGold(Number(e.target.value), 3);
          }}
        />
      </Container>
      <Link className={classes.powerText}>황돋 전투력 : {gold7 + gold8 + gold9}</Link>
      <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }}>
        ?
      </Button>
    </React.Fragment>
  );
}
