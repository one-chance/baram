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
  const [skillPower, setSkillPower] = useState<number>(0); // 기술능력 전투력

  return (
    <React.Fragment>
      <Container style={{ width: "100%", padding: "0", margin: "0", float: "left" }}>
        <Select
          className={classes.select}
          variant='outlined'
          defaultValue={0}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {}}
          style={{
            width: "120px",
          }}>
          <Menus value={0}>직업</Menus>
          <Menus value={1}>전사</Menus>
          <Menus value={2}>도적</Menus>
          <Menus value={3}>주술사</Menus>
          <Menus value={4}>도사</Menus>
          <Menus value={5}>궁사</Menus>
          <Menus value={6}>천인</Menus>
          <Menus value={7}>마도사</Menus>
          <Menus value={8}>영술사</Menus>
          <Menus value={9}>차사</Menus>
        </Select>
        <Select
          className={classes.select}
          variant='outlined'
          defaultValue={0}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {}}
          style={{
            width: "160px",
          }}>
          <Menus value={0}>아이템 부위</Menus>
          <Menus value={1}>목/어깨장식</Menus>
          <Menus value={2}>투구</Menus>
          <Menus value={3}>무기</Menus>
          <Menus value={4}>갑옷</Menus>
          <Menus value={5}>망토</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select variant='outlined' className={classes.select} defaultValue={0} MenuProps={{ disableScrollLock: true }} onChange={e => {}}>
          <Menus value={0}>기술능력</Menus>
          <Menus value={1}>무영보법-명중회피</Menus>
          <Menus value={2}>투명-피해증가율</Menus>
          <Menus value={3}>전혈-지속시간</Menus>
          <Menus value={4}>전혈-전환율</Menus>
          <Menus value={5}>전혈'첨-지속시간</Menus>
          <Menus value={6}>전혈'첨-전환율</Menus>
          <Menus value={7}>운상미보-이속증가율</Menus>
          <Menus value={8}>은형연막탄-직타저항</Menus>
          <Menus value={9}>은형연막탄-피해흡수</Menus>
          <Menus value={10}>은형연막탄-쿨타임</Menus>
          <Menus value={11}>묵혈광참-피해량</Menus>
          <Menus value={12}>묵혈광참-피해량감소</Menus>
          <Menus value={13}>묵혈광참-방어감소</Menus>
        </Select>
        <TextField variant='outlined' className={classes.selText} placeholder='수치' type='number' onChange={e => {}} />
      </Container>
      <Link className={classes.powerText}>기술능력 전투력 : {skillPower}</Link>
      <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }}
        onClick={() => setOpenHelper(true)}>
        ?
      </Button>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>기술능력 전투력 TMI</h3>
          </div>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>
          내용
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
