import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  selectBox: {
    height: "45px",
    margin: "5px 10px",
  },
  select: {
    width: "80px",
    height: "40px",
    textAlignLast: "center",
    fontSize: "0.9rem",
    float: "left",
    "& .MuiSelect-selectMenu": {
      padding: "2px 15px 2px 5px",
      lineHeight: "30px",
      fontSize: "0.9rem",
      color: "blue",
    },
  },
});

const Menus = withStyles({
  root: {
    minHeight: "40px",
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Accuracy() {
  const classes = useStyles();

  const [accuracy, setAccuracy] = useState<number>(0);
  const [acc, setAcc] = useState({
    type: 0,
    grade: 0,
    weaphon: 0,
    helmet: 0,
    armor: 0,
    handL: 0,
    handR: 0,
    neck: 0,
    face: 0,
    shield: 0,
    reinforce: 0,
    addition: 0,
  });

  useEffect(() => {
    if (acc.type === 1) {
      setAccuracy(acc.weaphon + acc.helmet + acc.armor + acc.handL + acc.handR + acc.neck + acc.face + acc.shield + acc.reinforce + acc.addition);
    } else {
      setAccuracy(
        5 * acc.grade + acc.weaphon + acc.helmet + acc.armor + acc.handL + acc.handR + acc.neck + acc.face + acc.shield + acc.reinforce + acc.addition
      );
    }
  }, [acc]);

  return (
    <React.Fragment>
      <Grid item xs={8} style={{ padding: "10px 5px", textAlign: "center" }}>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            환수
          </InputLabel>
          <Select
            label='환수'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, type: Number(e.target.value) });
            }}>
            <Menus value={1}>황룡</Menus>
            <Menus value={2}>청룡</Menus>
            <Menus value={3}>주작</Menus>
            <Menus value={4}>백호</Menus>
            <Menus value={5}>현무</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            등급
          </InputLabel>
          <Select
            label='등급'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, grade: Number(e.target.value) });
            }}>
            <Menus value={2}>6등급</Menus>
            <Menus value={3}>7등급</Menus>
            <Menus value={4}>8등급</Menus>
            <Menus value={5}>9등급</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            무기
          </InputLabel>
          <Select
            label='무기'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, weaphon: Number(e.target.value) });
            }}>
            <Menus value={35}>3성</Menus>
            <Menus value={45}>4성</Menus>
            <Menus value={54}>5성</Menus>
            <Menus value={70}>6성</Menus>
            <Menus value={85}>7성</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            투구
          </InputLabel>
          <Select
            label='투구'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, helmet: Number(e.target.value) });
            }}>
            <Menus value={16}>3성</Menus>
            <Menus value={24}>4성</Menus>
            <Menus value={32}>5성</Menus>
            <Menus value={41}>6성</Menus>
            <Menus value={52}>7성</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            갑옷
          </InputLabel>
          <Select
            label='갑옷'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, armor: Number(e.target.value) });
            }}>
            <Menus value={10}>3성</Menus>
            <Menus value={14}>4성</Menus>
            <Menus value={20}>5성</Menus>
            <Menus value={26}>6성</Menus>
            <Menus value={32}>7성</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            부적
          </InputLabel>
          <Select
            label='부적'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, reinforce: Number(e.target.value) });
            }}>
            <Menus value={5}>고명부</Menus>
            <Menus value={6}>최명부</Menus>
            <Menus value={7}>전명부</Menus>
          </Select>
        </FormControl>

        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            성물
          </InputLabel>
          <Select
            label='성물'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, handL: Number(e.target.value) });
            }}>
            <Menus value={0}>없음</Menus>
            <Menus value={5}>성물</Menus>
            <Menus value={7}>성물'진</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            성물
          </InputLabel>
          <Select
            label='성물'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, handR: Number(e.target.value) });
            }}>
            <Menus value={0}>없음</Menus>
            <Menus value={5}>성물</Menus>
            <Menus value={7}>성물'진</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            신물
          </InputLabel>
          <Select
            label='신물'
            labelId='select-standard'
            id='select-standard'
            className={classes.select}
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, shield: Number(e.target.value) });
            }}>
            <Menus value={0}>없음</Menus>
            <Menus value={5}>1성</Menus>
            <Menus value={10}>2성</Menus>
            <Menus value={20}>3성</Menus>
            <Menus value={31}>4성</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "15px", color: "black" }}>
            목걸이
          </InputLabel>
          <Select
            className={classes.select}
            label='목걸이'
            labelId='select-standard'
            id='select-standard'
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, neck: Number(e.target.value) });
            }}>
            <Menus value={0}>없음</Menus>
            <Menus value={3}>작생목</Menus>
            <Menus value={5}>생목</Menus>
            <Menus value={7}>커생목</Menus>
            <Menus value={10}>극락목</Menus>
          </Select>
        </FormControl>
        <FormControl variant='standard' className={classes.selectBox}>
          <InputLabel id='select-standard' style={{ paddingLeft: "20px", color: "black" }}>
            문양
          </InputLabel>
          <Select
            className={classes.select}
            label='문양'
            labelId='select-standard'
            id='select-standard'
            defaultValue={""}
            onChange={e => {
              setAcc({ ...acc, face: Number(e.target.value) });
            }}>
            <Menus value={0}>없음</Menus>
            <Menus value={10}>문양</Menus>
            <Menus value={20}>문양'진</Menus>
          </Select>
        </FormControl>
        <TextField
          variant='outlined'
          placeholder='기타(돋)'
          onChange={e => {
            setAcc({ ...acc, addition: Number(e.target.value) });
          }}
          inputProps={{
            style: { height: "35px", lineHeight: "30px", textAlign: "center", padding: "0" },
          }}
          style={{
            width: "80px",
            height: "45px",
            margin: "10px 10px 0 10px",
            paddingTop: "10px",
          }}
        />
      </Grid>
      <Grid item xs={4} style={{ padding: "10px 5px", textAlign: "center" }}>
        <h4 style={{ margin: "15px 0", color: "gray" }}>* 각 명중률은 강화석 반영된 최대치 *</h4>
        <h1 style={{ margin: "10px 0" }}>명중률 +{accuracy}</h1>
      </Grid>
    </React.Fragment>
  );
}
