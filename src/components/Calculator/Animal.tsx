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

    dlgText: {
      height: "30px",
      fontFamily: "Jua",
      marginBottom: "10px",
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
  const [animalPower, setAnimalPower] = useState<number>(0); // 신수 전투력

  // 신수 정보 : 등급, 레벨, 무기, 갑옷, 손, 손, 보주
  const [animalInfo, setAnimalInfo] = useState({ grade: 5, level: 99, weaphon: 7, helmet: 7, armor: 7, handL: 2, handR: 2, orb: 2 });

  useEffect(() => {
    setAnimalInfo(animalInfo);
    setAnimalPower(
      animalInfo.grade * 400 +
        animalInfo.level * 4 +
        (animalInfo.weaphon * 50 + 250) +
        (animalInfo.helmet * 50 + 250) +
        (animalInfo.armor * 50 + 250) +
        animalInfo.handL * 100 +
        animalInfo.handR * 100 +
        animalInfo.orb * 200
    );
  }, [animalInfo]);

  return (
    <React.Fragment>
      <Container style={{ width: "100%", height: "50px", padding: "0 75px", margin: "0" }}>
        <TextField
          variant='outlined'
          inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
          defaultValue={5}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, grade: Number(e.target.value) });
          }}
          style={{ width: "35px", float: "left", margin: "5px 0" }}
        />
        <Link
          style={{
            width: "35px",
            lineHeight: "35px",
            margin: "5px 5px 5px 0",
            float: "left",
            textDecoration: "none",
            textAlign: "center",
            color: "black",
          }}>
          등급
        </Link>
        <TextField
          variant='outlined'
          inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
          defaultValue={99}
          onChange={e => {
            let a = parseInt(e.target.value);
            if (a > 0 && a < 99) {
              setAnimalInfo({ ...animalInfo, level: Number(e.target.value) });
            }
          }}
          style={{ width: "35px", float: "left", margin: "5px 0 5px 5px" }}
        />
        <Link
          style={{
            width: "35px",
            lineHeight: "35px",
            margin: "5px 0",
            float: "left",
            textDecoration: "none",
            textAlign: "center",
            color: "black",
          }}>
          레벨
        </Link>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>무 기</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={7}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, weaphon: Number(e.target.value) });
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
          onChange={e => {
            setAnimalInfo({ ...animalInfo, handL: Number(e.target.value) });
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
          onChange={e => {
            setAnimalInfo({ ...animalInfo, helmet: Number(e.target.value) });
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
          onChange={e => {
            setAnimalInfo({ ...animalInfo, handR: Number(e.target.value) });
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
          onChange={e => {
            setAnimalInfo({ ...animalInfo, armor: Number(e.target.value) });
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
          onChange={e => {
            setAnimalInfo({ ...animalInfo, orb: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>1개</Menus>
          <Menus value={2}>2개</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.powerText}>신수 전투력 : {animalPower}</Link>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px", margin: "5px 0" }} onClick={() => setOpenHelper(true)}>
          ?
        </Button>
      </Container>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        maxWidth='lg'>
        <DialogTitle style={{ padding: " 10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>신수 전투력 TMI</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 신수 전투력 = 기본 전투력 + 신수 장비 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 기본 전투력 = 400 x 등급 + 4 x 레벨
          </Typography>
          <Typography variant='h5' className={classes.dlgText} style={{ margin: "0" }}>
            * 등급업도 레벨업으로 취급된다. 99 &gt; 등급업 &gt; 1
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ paddingLeft: "20px" }}>
            So, 승급 전투력은 따로 없고 렙업 전투력x2
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영되지 않는다.
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
