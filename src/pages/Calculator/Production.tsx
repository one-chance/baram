import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import prodList from "conf/production.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: "100px",
      height: "50px",
      padding: "1px",
      margin: "5px",
      textAlignLast: "center",
      float: "left",
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        textAlign: "center",
      },
    },

    text: {
      width: "60px",
      padding: "0px",
      margin: "5px",
      float: "left",
      "& input": {
        padding: "0",
        height: "50px",
        textAlign: "center",
      },
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
      },
    },
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function CalProduction() {
  const classes = useStyles();

  const [type, setType] = useState<number>(0);
  const [name, setName] = useState<string>("0");
  const [num, setNum] = useState<number>(1);
  const [res, setRes] = useState<string>("");
  let needs = "";

  const [type2, setType2] = useState<number>(0);
  const [name2, setName2] = useState<string>("0");
  const [num2, setNum2] = useState<number>(1);
  const [res2, setRes2] = useState<string>("");
  let needs2 = "";

  let prodItem = new Map();
  for (let i = 0; i < Object.keys(prodList[0]).length; i++) {
    prodItem.set(Object.keys(prodList[0])[i], Object.values(prodList[0])[i]);
  }

  const list1 = ["새끼줄", "삼베천", "황저포", "아마천", "모시천", "무명천", "양모천", "비단", "황금비단"];
  // prettier-ignore
  const list2 = ["삼베실", "화살나무판자", "소나무판자", "은행나뭎나자", "대나무판자", "단풍나무판자", "떡갈나무판자", "반송판자", "금강송판자", "백송판자", "황금송판자", "묵철판자", ];
  // prettier-ignore
  const list3 = ["연옥", "황동괴", "청동괴", "황옥", "구리조각", "철괴", "적옥", "강철괴", "강철쇠조각", "청옥", "은괴", "은조각", "백옥", "금괴", "강철조각", "황금조각", "찬란함금괴", ];
  // prettier-ignore
  const list4 = ["곡물가루", "독가루", "맹독가루", "수면제", "인삼약제", "해독제", "영지약제", "산인삼약제", "우황청심환", "산양삼약제", "산장뇌삼약제", "천뇌삼약제"];

  const menu1 = list1.map(item => (
    <Menus value={item} key={item}>
      {item}
    </Menus>
  ));
  const menu2 = list2.map(item => (
    <Menus value={item} key={item}>
      {item}
    </Menus>
  ));
  const menu3 = list3.map(item => (
    <Menus value={item} key={item}>
      {item}
    </Menus>
  ));
  const menu4 = list4.map(item => (
    <Menus value={item} key={item}>
      {item}
    </Menus>
  ));

  const counting = (arr: string, arr2: number) => {
    if (prodItem.has(arr)) {
      for (let a = 0; a < prodItem.get(arr).length; a += 2) {
        counting(prodItem.get(arr)[a], prodItem.get(arr)[a + 1] * arr2);
      }
    } else {
      needs += arr + arr2 + " ";
    }
    return needs;
  };

  const counting2 = (arr: string, arr2: number) => {
    if (prodItem.has(arr)) {
      for (let a = 0; a < prodItem.get(arr).length; a += 2) {
        counting2(prodItem.get(arr)[a], prodItem.get(arr)[a + 1] * arr2);
      }
    } else {
      needs2 += arr + arr2 + " ";
    }
    return needs2;
  };

  return (
    <React.Fragment>
      <Container style={{ width: "80%", height: "100%", margin: "10px 10%", padding: "0", textAlign: "center", float: "left" }}>
        <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
          <Container style={{ width: "96%", minWidth: "360px", margin: "5px 2%", padding: "0", float: "left" }}>
            <Select
              className={classes.select}
              variant='outlined'
              defaultValue={0}
              onChange={e => {
                setType(Number(e.target.value));
              }}>
              <Menus value={0}>종 류</Menus>
              <Menus value={1}>직조술</Menus>
              <Menus value={2}>벌목술</Menus>
              <Menus value={3}>채광술</Menus>
              <Menus value={4}>조제술</Menus>
            </Select>
            <Select
              className={classes.select}
              variant='outlined'
              defaultValue={0}
              onChange={e => {
                setName(String(e.target.value));
              }}>
              <Menus value={0}>품 목</Menus>
              {type === 1 ? menu1 : type === 2 ? menu2 : type === 3 ? menu3 : type === 4 ? menu4 : null}
            </Select>
            <TextField
              className={classes.text}
              type='number'
              variant='outlined'
              value={num}
              onChange={e => {
                setNum(Number(e.target.value));
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                if (name === "0") {
                  setRes("");
                } else if (num > 0) {
                  needs = "";
                  setRes(counting(name, num));
                } else {
                  needs = "";
                  setNum(1);
                  setRes(counting(name, num));
                }
              }}
              style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
              계산
            </Button>
          </Container>
          <Container
            style={{
              width: "96%",
              minWidth: "360px",
              minHeight: "60px",
              border: "1px solid lightgray",
              borderRadius: "5px",
              margin: "5px 2%",
              padding: "10px",
              float: "left",
            }}>
            <h3 style={{ margin: "0", lineHeight: "40px" }}>{res || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
          </Container>
        </Container>
        <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
          <Container style={{ width: "96%", minWidth: "360px", margin: "5px 2%", padding: "0", float: "left" }}>
            <Select
              className={classes.select}
              variant='outlined'
              defaultValue={0}
              onChange={e => {
                setType2(Number(e.target.value));
              }}>
              <Menus value={0}>종 류</Menus>
              <Menus value={1}>직조술</Menus>
              <Menus value={2}>벌목술</Menus>
              <Menus value={3}>채광술</Menus>
              <Menus value={4}>조제술</Menus>
            </Select>
            <Select
              className={classes.select}
              variant='outlined'
              defaultValue='0'
              onChange={e => {
                setName2(String(e.target.value));
              }}>
              <Menus value={0}>품 목</Menus>
              {type2 === 1 ? menu1 : type2 === 2 ? menu2 : type2 === 3 ? menu3 : type2 === 4 ? menu4 : null}
            </Select>
            <TextField
              className={classes.text}
              type='number'
              variant='outlined'
              value={num2}
              onChange={e => {
                setNum2(Number(e.target.value));
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                if (name2 === "0") {
                  setRes2("");
                } else if (num2 > 0) {
                  needs2 = "";
                  setRes2(counting2(name2, num2));
                } else {
                  needs2 = "";
                  setNum2(1);
                  setRes2(counting2(name2, num2));
                }
              }}
              style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
              계산
            </Button>
          </Container>
          <Container
            style={{
              width: "96%",
              minWidth: "360px",
              minHeight: "60px",
              border: "1px solid lightgray",
              borderRadius: "5px",
              margin: "5px 2%",
              padding: "10px",
              float: "left",
            }}>
            <h3 style={{ margin: "0", lineHeight: "40px" }}>{res2 || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
          </Container>
        </Container>
      </Container>
    </React.Fragment>
  );
}
