import React, { useState, useEffect } from "react";
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

  const [condition, setCondition] = useState({ type: 0, name: "0", quantity: 0 });
  const [res, setRes] = useState<string>("");

  const [condition2, setCondition2] = useState({ type: 0, name: "0", quantity: 0 });
  const [res2, setRes2] = useState<string>("");

  const [condition3, setCondition3] = useState({ type: 0, item: 0, name: "0", quantity: 0 });
  const [res3, setRes3] = useState<string>("");

  const [stateType, setStateType] = useState(0);

  var itemNames: string[] = [];
  var itemQuantities: number[] = [];

  let prodItem = new Map();
  for (let i = 0; i < Object.keys(prodList[0]).length; i++) {
    prodItem.set(Object.keys(prodList[0])[i], Object.values(prodList[0])[i]);
  }
 
  // prettier-ignore
  const list = [
    [],
    ["새끼줄", "삼베천", "황저포", "아마천", "모시천", "무명천", "양모천", "비단", "황금비단"],
    [ "삼베실", "화살나무판자", "소나무판자", "은행나무판자", "대나무판자", "단풍나무판자", "떡갈나무판자", "반송판자", "금강송판자", "백송판자", "황금송판자", "묵철판자", ],
    ["연옥", "황동괴", "청동괴", "황옥", "구리조각", "철괴", "적옥", "강철괴", "강철쇠조각", "청옥", "은괴", "은조각", "백옥", "금괴", "강철조각", "황금조각", "찬란함금괴", ],
    ["곡물가루", "독가루", "맹독가루", "수면제", "인삼약제", "해독제", "영지약제", "청심환", "산인삼약제", "우황청심환", "산양삼약제", "산장뇌삼약제", "천뇌삼약제"]    
  ];

  const stateList = [
    [],
    [], [], [], [], [], [], [], [],
    ["기절저항환약(하)", "기절저항환약(중)", "기절저항환약(상)", "기절저항환약(특상)"],
    ["침묵저항환약(하)", "침묵저항환약(중)", "침묵저항환약(상)", "침묵저항환약(특상)"],
    ["속박저항환약(하)", "속박저항환약(중)", "속박저항환약(상)", "속박저항환약(특상)"],
    ["수면저항환약(하)", "수면저항환약(중)", "수면저항환약(상)", "수면저항환약(특상)"],
    ["절망저항환약(하)", "절망저항환약(중)", "절망저항환약(상)", "절망저항환약(특상)"],
    ["중독저항환약(하)", "중독저항환약(중)", "중독저항환약(상)", "중독저항환약(특상)"],
    ["마비저항환약(하)", "마비저항환약(중)", "마비저항환약(상)", "마비저항환약(특상)"],
    ["도발저항환약(하)", "도발저항환약(중)", "도발저항환약(상)", "도발저항환약(특상)"],
    ["초급기절저항강화부적", "중급기절저항강화부적", "상급기절저항강화부적", "고급기절저항강화부적", "최고기절저항강화부적", "전설기절저항강화부적"],
    ["초급침묵저항강화부적", "중급침묵저항강화부적", "상급침묵저항강화부적", "고급침묵저항강화부적", "최고침묵저항강화부적", "전설침묵저항강화부적"],
    ["초급속박저항강화부적", "중급속박저항강화부적", "상급속박저항강화부적", "고급속박저항강화부적", "최고속박저항강화부적", "전설속박저항강화부적"],
    ["초급수면저항강화부적", "중급수면저항강화부적", "상급수면저항강화부적", "고급수면저항강화부적", "최고수면저항강화부적", "전설수면저항강화부적"],
    ["초급절망저항강화부적", "중급절망저항강화부적", "상급절망저항강화부적", "고급절망저항강화부적", "최고절망저항강화부적", "전설절망저항강화부적"],
    ["초급중독저항강화부적", "중급중독저항강화부적", "상급중독저항강화부적", "고급중독저항강화부적", "최고중독저항강화부적", "전설중독저항강화부적"],
    ["초급마비저항강화부적", "중급마비저항강화부적", "상급마비저항강화부적", "고급마비저항강화부적", "최고마비저항강화부적", "전설마비저항강화부적"],
    ["초급도발저항강화부적", "중급도발저항강화부적", "상급도발저항강화부적", "고급도발저항강화부적", "최고도발저항강화부적", "전설도발저항강화부적"]
  ];

  const menu1 = list[condition.type].map(item => (
    <Menus value={item} key={item} disableGutters={true}>
      {item}
    </Menus>
  ));

  const menu2 = list[condition2.type].map(item => (
    <Menus value={item} key={item} disableGutters={true}>
      {item}
    </Menus>
  ));

  var menu3 = stateList[stateType].map(item => (
    <Menus value={item} key={item} disableGutters={true}>
      {item}
    </Menus>
  ));

  const countMaterials = (arr: string, arr2: number) => {
    if (prodItem.has(arr)) {
      for (let a = 0; a < prodItem.get(arr).length; a += 2) {
        countMaterials(prodItem.get(arr)[a], prodItem.get(arr)[a + 1] * arr2);
      }
    } else {
      saveMaterials(arr, arr2);
    }
  };

  const saveMaterials = (name: string, quantity: number) => {
    if (itemNames.includes(name)) {
      let idx = itemNames.indexOf(name);
      itemQuantities[idx] += quantity;
    } else {
      itemNames.push(name);
      itemQuantities.push(quantity);  
    }
  };

  const getMaterials = (front: string[], back: number[]) => {
    let result = "";
    for (let i = 0; i < back.length; i++){
      result += front[i] + back[i] + " ";
    }
    return result;
  };

  useEffect(() => {
    setStateType(condition3.item * 8 + condition3.type);
  }, [condition3]);

  return (
    <Container style={{ width: "80%", height: "100%", margin: "10px 10%", padding: "0", textAlign: "center", float: "left" }}>
      <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
        <Container style={{ width: "96%", minWidth: "400px", margin: "5px 2%", padding: "0", float: "left" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition.type}
            onChange={e => {
              setRes("");
              setCondition({ type: Number(e.target.value), name:"0", quantity: 0 });
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
            value={condition.name}
            onChange={e => {
              setRes("");
              setCondition({ ...condition, name: String(e.target.value) });
            }}
            style={{ width: "140px" }}>
            <Menus value={0}>품 목</Menus>
            {menu1}
          </Select>
          <TextField
            className={classes.text}
            type='number'
            variant='outlined'
            placeholder="개수"
            value={condition.quantity || ""}
            onChange={e => {
              if (e.target.value === "" || e.target.value === "-" || Number(e.target.value) < 1) {
                setCondition({ ...condition, quantity: 0 });  
              } else {
                setCondition({ ...condition, quantity: Number(e.target.value) });  
              }
            }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              itemNames = [];
              itemQuantities = [];
              countMaterials(condition.name, condition.quantity);
              setRes(getMaterials(itemNames, itemQuantities));

            }}
            style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
            계산
          </Button>
        </Container>
        <Container
          style={{
            width: "96%",
            minWidth: "360px",
            minHeight: "70px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "5px 2%",
            padding: "5px",
            float: "left",
          }}>
          <h3 style={{ margin: "0", padding:"0", lineHeight: "30px" }}>{res || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
        </Container>
      </Container>
      <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
        <Container style={{ width: "96%", minWidth: "400px", margin: "5px 2%", padding: "0", float: "left" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition2.type}
            onChange={e => {
              setRes2("");
              setCondition2({ type: Number(e.target.value), name:"0", quantity: 0 });
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
            value={condition2.name}
            onChange={e => {
              setRes2("");
              setCondition2({ ...condition2, name: String(e.target.value) });
            }}
            style={{ width: "140px" }}>
            <Menus value='0'>품 목</Menus>
            {menu2}
          </Select>
          <TextField
            className={classes.text}
            type='number'
            variant='outlined'
            placeholder="개수"
            value={condition2.quantity || ""}
            onChange={e => {
              if (e.target.value === "" || e.target.value === "-" || Number(e.target.value) < 1) {
                setCondition2({ ...condition2, quantity: 0 });  
              } else {
                setCondition2({ ...condition2, quantity: Number(e.target.value) });  
              }
            }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              itemNames = [];
              itemQuantities = [];
              countMaterials(condition2.name, condition2.quantity);
              setRes2(getMaterials(itemNames, itemQuantities));
            }}
            style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
            계산
          </Button>
        </Container>
        <Container
          style={{
            width: "96%",
            minWidth: "360px",
            minHeight: "70px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "5px 2%",
            padding: "5px",
            float: "left",
          }}>
          <h3 style={{ margin: "0", lineHeight: "30px" }}>{res2 || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
        </Container>
      </Container>

      <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
        <Container style={{ width: "96%", minWidth: "400px", margin: "5px 2%", padding: "0", float: "left" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition3.type}
            onChange={e => {
              setRes3("");
              setCondition3({ ...condition3, type: Number(e.target.value), name:"0", quantity: 0 });
            }}
            style={{ width: "80px" }}
          >
            <Menus value={0}>상 태</Menus>
            <Menus value={1}>기 절</Menus>
            <Menus value={2}>침 묵</Menus>
            <Menus value={3}>속 박</Menus>
            <Menus value={4}>수 면</Menus>
            <Menus value={5}>절 망</Menus>
            <Menus value={6}>중 독</Menus>
            <Menus value={7}>마 비</Menus>
            <Menus value={8}>도 발</Menus>
          </Select>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition3.item}
            onChange={e => {
              setRes3("");
              setCondition3({ ...condition3, item: Number(e.target.value), name:"0", quantity: 0 });
            }}
            style={{ width: "80px" }}>
            <Menus value={0}>종류</Menus>
            <Menus value={1} disableGutters={true}>환약</Menus>
            <Menus value={2} disableGutters={true}>부적</Menus>
          </Select>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition3.name}
            onChange={e => {
              itemNames = [];
              itemQuantities = [];
              setRes3("");
              setCondition3({ ...condition3, name: String(e.target.value) });
            }}
            style={{ width: "180px" }}  
          >
            <Menus value='0'>품 목</Menus>
            {menu3}
          </Select>
          <TextField
            className={classes.text}
            type='number'
            variant='outlined'
            placeholder="개수"
            value={condition3.quantity || ""}
            onChange={e => {
              if (e.target.value === "" || e.target.value === "-" || Number(e.target.value) < 1) {
                setCondition3({ ...condition3, quantity: 0 });  
              } else {
                setCondition3({ ...condition3, quantity: Number(e.target.value) });  
              }
            }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              itemNames = [];
              itemQuantities = [];
              countMaterials(condition3.name, condition3.quantity);
              setRes3(getMaterials(itemNames, itemQuantities));
            }}
            style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
            계산
          </Button>
        </Container>
        <Container
          style={{
            width: "96%",
            minWidth: "360px",
            minHeight: "70px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "5px 2%",
            padding: "5px",
            float: "left",
          }}>
          <h3 style={{ margin: "0", lineHeight: "30px" }}>{res3 || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
        </Container>
      </Container>
    </Container>
  );
}
