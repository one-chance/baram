import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: "100px",
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

    text: {
      width: "60px",
      padding: "0px",
      margin: "5px",
      float: "left",
      "& input": {
        padding: "0",
        height: "50px",
        textAlign: "center",
        color: "blue",
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

  //const [type, setType] = useState<string>("");
  const [name, setName] = useState<string>("0");
  const [num, setNum] = useState<number>(1);
  const [res, setRes] = useState<string>("");
  let needs = "";

  //const [type2, setType2] = useState<string>("");
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

  return (
    <React.Fragment>
      <Container
        style={{ width: "80%", height: "100%", margin: "10px 10%", padding: "0", textAlign: "center", float: "left" }}
      >
        <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
          <Container style={{ width: "96%", minWidth: "360px", margin: "5px 2%", padding: "0", float: "left" }}>
            <Select className={classes.select} variant="outlined" defaultValue={0}>
              <Menus value={0}>종 류</Menus>
              <Menus value={1}>직조술</Menus>
              <Menus value={2}>벌목술</Menus>
              <Menus value={3}>채광술</Menus>
              <Menus value={4}>조제술</Menus>
            </Select>
            <Select
              className={classes.select}
              variant="outlined"
              defaultValue="0"
              onChange={(e) => {
                setName(String(e.target.value));
              }}
            >
              <Menus value="0">품 목</Menus>
              <Menus value="새끼줄">새끼줄</Menus>
              <Menus value="삼베천">삼베천</Menus>
              <Menus value="황저포">황저포</Menus>
              <Menus value="아마천">아마천</Menus>
              <Menus value="모시천">모시천</Menus>
              <Menus value="무명천">무명천</Menus>
              <Menus value="양모천">양모천</Menus>
              <Menus value="비단">비단</Menus>
              <Menus value="황금비단">황금비단</Menus>
            </Select>
            <TextField
              className={classes.text}
              type="number"
              variant="outlined"
              value={num}
              onChange={(e) => {
                setNum(Number(e.target.value));
              }}
            />
            <Button
              variant="contained"
              color="primary"
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
              style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}
            >
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
            }}
          >
            <h3 style={{ margin: "0", lineHeight: "40px" }}>
              {res || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}
            </h3>
          </Container>
        </Container>
        <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
          <Container style={{ width: "96%", minWidth: "360px", margin: "5px 2%", padding: "0", float: "left" }}>
            <Select className={classes.select} variant="outlined" defaultValue={0}>
              <Menus value={0}>종 류</Menus>
              <Menus value={1}>직조술</Menus>
              <Menus value={2}>벌목술</Menus>
              <Menus value={3}>채광술</Menus>
              <Menus value={4}>조제술</Menus>
            </Select>
            <Select
              className={classes.select}
              variant="outlined"
              defaultValue="0"
              onChange={(e) => {
                setName2(String(e.target.value));
              }}
            >
              <Menus value="0">품 목</Menus>
              <Menus value="새끼줄">새끼줄</Menus>
              <Menus value="삼베천">삼베천</Menus>
              <Menus value="황저포">황저포</Menus>
              <Menus value="아마천">아마천</Menus>
              <Menus value="모시천">모시천</Menus>
              <Menus value="무명천">무명천</Menus>
              <Menus value="양모천">양모천</Menus>
              <Menus value="비단">비단</Menus>
              <Menus value="황금비단">황금비단</Menus>
            </Select>
            <TextField
              className={classes.text}
              type="number"
              variant="outlined"
              value={num}
              onChange={(e) => {
                setNum2(Number(e.target.value));
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (name2 === "0") {
                  setRes2("");
                } else if (num2 > 0) {
                  needs2 = "";
                  setRes2(counting(name2, num2));
                } else {
                  needs2 = "";
                  setNum2(1);
                  setRes2(counting(name2, num2));
                }
              }}
              style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}
            >
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
            }}
          >
            <h3 style={{ margin: "0", lineHeight: "40px" }}>
              {res2 || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}
            </h3>
          </Container>
        </Container>
      </Container>
    </React.Fragment>
  );
}
