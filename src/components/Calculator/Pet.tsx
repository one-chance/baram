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
    select2: {
      width: "80px",
      height: "40px",
      padding: "1px",
      margin: "5px 2.5px",
      color: "blue",
      textAlignLast: "center",
      float: "left",
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        fontSize: "0.9rem",
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

export default function Pet() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [petPower, setPetPower] = useState<number>(0); // 환수 전투력
  let pets: number[] = [9, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 환수 : 등급, 레벨, 무기, 투구, 갑옷, 성물1, 성물2, 목걸이, 문양, 세트옷, 신물

  const calPet = () => {
    setPetPower(pets[0] * 200 + pets[1] * 2 + pets[2] + pets[3] + pets[4] + pets[5] + pets[6] + pets[7] * 100 + pets[8] * 100 + pets[9] * 100 + pets[10] * 100);
  };

  return (
    <React.Fragment>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <TextField
          variant='outlined'
          value={9}
          inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
          onChange={e => {
            pets[0] = parseInt(e.target.value);
          }}
          style={{ width: "35px", float: "left", margin: "5px 0 5px 10px" }}
        />
        <Link
          style={{
            width: "35px",
            height: "40px",
            lineHeight: "40px",
            margin: "5px 0",
            float: "left",
            textDecoration: "none",
            textAlign: "center",
            color: "black",
          }}>
          등급
        </Link>
        <TextField
          variant='outlined'
          inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
          value={99}
          onChange={e => {
            pets[1] = parseInt(e.target.value);
          }}
          style={{ width: "35px", float: "left", margin: "5px 0 5px 5px" }}
        />
        <Link
          style={{
            width: "35px",
            height: "40px",
            lineHeight: "40px",
            margin: "5px 0",
            float: "left",
            textDecoration: "none",
            textAlign: "center",
            color: "black",
          }}>
          레벨
        </Link>
        <Button
          className={classes.btn}
          variant='contained'
          color='primary'
          onClick={calPet}
          style={{
            marginRight: "15px",
            float: "right",
          }}>
          계산
        </Button>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>무 기</Link>
        <TextField
          variant='outlined'
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            pets[2] = parseInt(e.target.value);
          }}
        />
        <Link className={classes.petText}>목걸이</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            pets[7] = Number(e.target.value);
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>작생목</Menus>
          <Menus value={2}>생목</Menus>
          <Menus value={3}>커생목</Menus>
          <Menus value={4}>극락목</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>투 구</Link>
        <TextField
          variant='outlined'
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            pets[3] = parseInt(e.target.value);
          }}
        />
        <Link className={classes.petText}>문 양</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            pets[8] = Number(e.target.value);
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={2}>문양</Menus>
          <Menus value={4}>문양'진</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>갑 옷</Link>
        <TextField
          variant='outlined'
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            pets[4] = parseInt(e.target.value);
          }}
        />
        <Link className={classes.petText}>세트옷</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            pets[9] = Number(e.target.value);
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={3}>환수神</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>성 물</Link>
        <TextField
          variant='outlined'
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            pets[5] = parseInt(e.target.value);
          }}
        />
        <Link className={classes.petText}>신 물</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            pets[10] = Number(e.target.value);
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={3}>1성</Menus>
          <Menus value={4}>2성</Menus>
          <Menus value={5}>3성</Menus>
          <Menus value={6}>4성</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>성 물</Link>
        <TextField
          variant='outlined'
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            pets[6] = parseInt(e.target.value);
          }}
        />
        <Link className={classes.petText} style={{ width: "130px", color: "gray", fontSize: "0.8rem" }}>
          * 신물은 강화 적용됨 *
        </Link>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.powerText}>환수 전투력 : {petPower}</Link>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }} onClick={() => setOpenHelper(true)}>
          ?
        </Button>
      </Container>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "BMDOHYEON", margin: "0" }}>환수 전투력 TMI</span>
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
