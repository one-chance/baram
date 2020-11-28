import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
  prodItem.set("새끼줄", ["보리볏짚", 2, "볏짚", 2]);
  prodItem.set("삼베천", ["새끼줄", 1, "삼베실", 1]);
  prodItem.set("황저포", ["삼베천", 1, "황마실", 2]);
  prodItem.set("아마천", ["황저포", 1, "아마실", 3]);
  prodItem.set("모시천", ["아마천", 1, "모시실", 4]);
  prodItem.set("무명천", ["모시천", 1, "무명실", 5]);
  prodItem.set("양모천", ["무명천", 1, "양모실", 5]);
  prodItem.set("비단", ["양모천", 1, "명주실", 5]);
  prodItem.set("황금비단", ["상급비단", 1, "고운금가루", 5]);

  prodItem.set("삼베실", ["삼통나무", 2]);
  prodItem.set("화살나무판자", ["삼베실", 1, "화살통나무", 1]);
  prodItem.set("소나무판자", ["화살나무판자", 1, "소나무쪽", 2]);
  prodItem.set("은행나무판자", ["소나무판자", 1, "은행통나무", 3]);
  prodItem.set("대나무판자", ["은행나무판자", 1, "대나무쪽", 4]);
  prodItem.set("단풍나무판자", ["대나무판자", 1, "단풍통나무", 5]);
  prodItem.set("떡갈나무판자", ["단풍나무판자", 1, "떡갈통나무", 5]);
  prodItem.set("반송판자", ["떡갈나무판자", 1, "반송쪽", 5]);
  prodItem.set("금강송판자", ["반송판자", 1, "금강송쪽", 5]);
  prodItem.set("백송판자", ["금강송판자", 1, "백송쪽", 5]);
  prodItem.set("황금송판자", ["백송판자", 1, "황금송쪽", 5]);
  prodItem.set("묵철판자", ["상급황금송판자", 1, "묵철가루", 5]);

  prodItem.set("연옥", ["연옥석", 2]);
  prodItem.set("황동괴", ["연옥", 2, "황동석", 2]);
  prodItem.set("청동괴", ["황동괴", 1, "청동석", 3]);
  prodItem.set("황옥", ["연옥", 3, "황옥석", 3]);
  prodItem.set("구리조각", ["청동괴", 1, "황동결정", 1]);
  prodItem.set("철괴", ["구리조각", 1, "철광석", 5]);
  prodItem.set("적옥", ["황옥", 1, "적옥석", 5]);
  prodItem.set("강철괴", ["철괴", 1, "철광결정", 1]);
  prodItem.set("강철쇠조각", ["강철괴", 1, "철광결정", 1]);
  prodItem.set("청옥", ["적옥", 1, "연옥", 1, "청옥석", 5]);
  prodItem.set("은괴", ["강철쇠조각", 1, "은광석", 5]);
  prodItem.set("은조각", ["은괴", 1, "은광결정", 1]);
  prodItem.set("백옥", ["청옥", 1, "연옥", 1, "백옥석", 5]);
  prodItem.set("금괴", ["은조각", 1, "금광석", 5]);
  prodItem.set("강철조각", ["강철괴", 1, "은광결정", 1]);
  prodItem.set("황금조각", ["금괴", 1, "은광결정", 1]);
  prodItem.set("찬란한금괴", ["상급금괴", 1, "묵광석결정", 5]);

  prodItem.set("곡물가루", ["보리가루", 1, "흰쌀가루", 1, "밀가루", 1]);
  prodItem.set("독가루", ["독버섯", 2, "뱀독", 3, "곡물가루", 2]);
  prodItem.set("맹독가루", ["맹독버섯", 3, "뱀독", 3, "독가루", 1]);
  prodItem.set("수면제", ["수면가루", 1, "독가루", 1, "곡물가루", 1]);
  prodItem.set("인삼약제", ["어린인삼", 5, "곡물가루", 5, "더덕가루", 1]);
  prodItem.set("해독제", ["인삼약제", 2, "대나무잎", 2, "황기썬것", 1, "연옥", 2]);
  prodItem.set("영지약제", ["인삼약제", 1, "영지버섯", 5]);
  prodItem.set("청심환", ["영지약제", 2, "상급모시천", 1, "잎사귀가루", 1, "인어의심장", 1]);
  prodItem.set("산인삼약제", ["영지약제", 1, "산인삼", 5]);
  prodItem.set("우황청심환", ["산인삼약제", 2, "도삭산묘피", 1, "청옥가루", 1, "상급화살나무판자", 1]);
  prodItem.set("산양삼약제", ["산인삼약제", 1, "산양삼", 5]);
  prodItem.set("산장뇌삼약제", ["산양삼약제", 1, "산장뇌삼", 5]);
  prodItem.set("천뇌삼약제", ["산장뇌삼약제", 1, "천뇌삼", 5]);

  const list1 = ["새끼줄", "삼베천", "황저포", "아마천", "모시천", "무명천", "양모천", "비단", "황금비단"];
  // prettier-ignore
  const list2 = ["삼베실", "화살나무판자", "소나무판자", "은행나뭎나자", "대나무판자", "단풍나무판자", "떡갈나무판자", "반송판자", "금강송판자", "백송판자", "황금송판자", "묵철판자", ];
  // prettier-ignore
  const list3 = ["연옥", "황동괴", "청동괴", "황옥", "구리조각", "철괴", "적옥", "강철괴", "강철쇠조각", "청옥", "은괴", "은조각", "백옥", "금괴", "강철조각", "황금조각", "찬란함금괴", ];
  // prettier-ignore
  const list4 = ["곡물가루", "독가루", "맹독가루", "수면제", "인삼약제", "해독제", "영지약제", "산인삼약제", "우황청심환", "산양삼약제", "산장뇌삼약제", "천뇌삼약제"];

  const menu1 = list1.map(item => <Menus value={item}>{item}</Menus>);
  const menu2 = list2.map(item => <Menus value={item}>{item}</Menus>);
  const menu3 = list3.map(item => <Menus value={item}>{item}</Menus>);
  const menu4 = list4.map(item => <Menus value={item}>{item}</Menus>);

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
