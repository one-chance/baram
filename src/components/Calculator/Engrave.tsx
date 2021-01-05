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

export default function Animal() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [engravePower, setEngravePower] = useState<number>(0); // 각인 전투력
  const [engrave1, setEngrave1] = useState<number>(0); // 각인1 종류
  const [engrave2, setEngrave2] = useState<number>(0); // 각인1 수치
  const [engrave3, setEngrave3] = useState<number>(0); // 각인2 종류
  const [engrave4, setEngrave4] = useState<number>(0); // 각인2 수치

  const calEngrave = () => {
    setEngravePower(engrave1 * engrave2 + engrave3 * engrave4);
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
            setEngrave1(Number(e.target.value));
          }}>
          <Menus value={0}>능력치</Menus>
          <Menus value={1}>체력/마력(0.4%)</Menus>
          <Menus value={2}>체력/마력(0.5%)</Menus>
          <Menus value={3}>방어구관통</Menus>
          <Menus value={4}>방어도무시</Menus>
          <Menus value={5}>마법치명</Menus>
          <Menus value={6}>공격력증가</Menus>
          <Menus value={7}>마력증가</Menus>
          <Menus value={8}>방어도</Menus>
          <Menus value={9}>직타저항</Menus>
          <Menus value={10}>시전향상</Menus>
          <Menus value={11}>피해흡수</Menus>
          <Menus value={11}>피해흡수무시</Menus>
          <Menus value={11}>치명타(1%)</Menus>
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          placeholder='수치'
          type='number'
          value={engrave2 || ""}
          onChange={e => {
            setEngrave2(parseInt(e.target.value));
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
            setEngrave3(Number(e.target.value));
          }}>
          <Menus value={0}>능력치</Menus>
          <Menus value={1}>체력/마력(0.4%)</Menus>
          <Menus value={2}>체력/마력(0.5%)</Menus>
          <Menus value={3}>방어구관통</Menus>
          <Menus value={4}>방어도무시</Menus>
          <Menus value={5}>마법치명</Menus>
          <Menus value={6}>공격력증가</Menus>
          <Menus value={7}>마력증가</Menus>
          <Menus value={8}>방어도</Menus>
          <Menus value={9}>직타저항</Menus>
          <Menus value={10}>시전향상</Menus>
          <Menus value={11}>피해흡수</Menus>
          <Menus value={12}>피해흡수무시</Menus>
          <Menus value={13}>치명타(1%)</Menus>
        </Select>
        <TextField
          variant='outlined'
          className={classes.selText}
          placeholder='수치'
          type='number'
          value={engrave4 || ""}
          onChange={e => {
            setEngrave4(parseInt(e.target.value));
          }}
        />
      </Container>
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
