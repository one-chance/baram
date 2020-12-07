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
  const [animalPower, setAnimalPower] = useState<number>(0); // 신수 전투력
  let animals: number[] = [5, 99, 7, 7, 7, 2, 2, 2]; // 신수 : 등급, 레벨, 무기, 투구, 갑옷, 장갑1, 장갑2, 보주

  const calAnimal = () => {
    setAnimalPower(
      animals[0] * 400 +
        animals[1] * 4 +
        (animals[2] * 50 + 250) +
        (animals[3] * 50 + 250) +
        (animals[4] * 50 + 250) +
        animals[5] * 100 +
        animals[6] * 100 +
        animals[7] * 200
    );
  };

  return (
    <React.Fragment>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <TextField
          variant='outlined'
          inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
          defaultValue={5}
          onChange={e => {
            let a = parseInt(e.target.value);
            if (a > 0 && a < 6) {
              animals[0] = a;
            }
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
          defaultValue={99}
          onChange={e => {
            let a = parseInt(e.target.value);
            if (a > 0 && a < 99) {
              animals[1] = a;
            }
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
          onClick={calAnimal}
          style={{
            marginRight: "15px",
            float: "right",
          }}>
          계산
        </Button>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>무기</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={7}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            animals[2] = Number(e.target.value);
          }}>
          <Menus value={5}>5성</Menus>
          <Menus value={6}>6성</Menus>
          <Menus value={7}>7성</Menus>
          <Menus value={8}>8성</Menus>
          <Menus value={9}>9성</Menus>
        </Select>
        <Link className={classes.petText} style={{ marginLeft: "20px" }}>
          손
        </Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={2}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            animals[5] = Number(e.target.value);
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>1단</Menus>
          <Menus value={2}>2단</Menus>
          <Menus value={3}>3단</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>투구</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={7}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            animals[3] = Number(e.target.value);
          }}>
          <Menus value={5}>5성</Menus>
          <Menus value={6}>6성</Menus>
          <Menus value={7}>7성</Menus>
          <Menus value={8}>8성</Menus>
          <Menus value={9}>9성</Menus>
        </Select>
        <Link className={classes.petText} style={{ marginLeft: "20px" }}>
          손
        </Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={2}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            animals[6] = Number(e.target.value);
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>1단</Menus>
          <Menus value={2}>2단</Menus>
          <Menus value={3}>3단</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>갑옷</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={7}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            animals[4] = Number(e.target.value);
          }}>
          <Menus value={5}>5성</Menus>
          <Menus value={6}>6성</Menus>
          <Menus value={7}>7성</Menus>
          <Menus value={8}>8성</Menus>
          <Menus value={9}>9성</Menus>
        </Select>
        <Link className={classes.petText} style={{ marginLeft: "20px" }}>
          보주
        </Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={2}
          MenuProps={{ disableScrollLock: true }}
          onChange={e => {
            animals[7] = Number(e.target.value);
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>1개</Menus>
          <Menus value={2}>2개</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.powerText}>신수 전투력 : {animalPower}</Link>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px", margin: "5px 0" }}>
          ?
        </Button>
      </Container>
    </React.Fragment>
  );
}
