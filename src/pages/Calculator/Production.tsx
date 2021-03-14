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
      padding: "0",
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

  const [condition, setCondition] = useState({ type: 0, grade: 0, name: "0", quantity: 0, materials: "" });
  const [condition2, setCondition2] = useState({ type: 0, grade: 0, name: "0", quantity: 0, materials: "" });
  const [condition3, setCondition3] = useState({ type: 0, grade: 0, name: "0", quantity: 0, materials: "" });

  const [stateType, setStateType] = useState(0);

  var itemNames: string[] = [];
  var itemQuantities: number[] = [];

  let prodItem = new Map();
  for (let i = 0; i < Object.keys(prodList[0]).length; i++) {
    prodItem.set(Object.keys(prodList[0])[i], Object.values(prodList[0])[i]);
  }

  // prettier-ignore
  var list2 = [
    [[""]],
    // 재봉술
    [[], ["미투리", "갈모", "도롱이"], ["사슴뿔", "경원갑옷", "경원갑주"], ["화관", "꽂장식남자갑옷", "꽃장식여자갑옷", "족두리"],
      ["호박비녀족두리", "추사체족자", "해바라기화관"], ["파천갑옷", "파천갑주"], ["묵죽도족자", "적향의환희", "청향의환유"], ["금테족두리", "풍류진향", "풍류인향"],
      ["금강산도족자", "금강갑옷", "금강갑주"], ["검정비녀족두리", "삼화청랑", "삼화홍랑"], ["황금비녀족두리"], [""]],
    // 목공술
    [[], ["황동촛등", "돌화살통"], ["삿갓", "경원방패", "경원고서", "경원신부"], ["토끼귀", "작은창문", "양눈창문"],
      ["작은대나무발", "죽제고비", "죽장함", "죽원방패", "죽원고서", "죽원신부"], ["사각창문", "파천방패", "파천고서", "파천신부"], ["하루기른수염", "산타수염", "삼층책장"],
      ["산양뿔", "반닫이", "연상"], ["육각창문", "삼층장", "금강방패", "금강고서", "금강신부"], ["각게수리", "2단문갑", "루비왕관"], ["빗접"], [""]],
    // 대장술
    [[], ["돌단검", "돌창"], ["경원비검", "경원비도", "경원비봉", "경원비곤", "경원비궁", "경원비포", "경원비단봉", "경원비장", "경원비명도"], ["금테머리띠", "깃발1"],
      ["호박머리띠", "청동단검", "청동장검", "청동명궁"], ["파천비검", "파천비도", "파천비봉", "파천비곤", "파천비궁", "파천비포", "파천비단봉", "파천비장", "파천비명도"],
      ["홍실쌍검장식", "오공머리띠"], ["오색머리띠", "강철단검", "강철장검", "강철명궁"], ["금강비검", "금강비도", "금강비봉", "금강비곤", "금강비궁", "금강비포", "금강비단봉", "금강비장", "금강비명도"],
      ["철투구장식", "선녀머리띠", "갑옷장식1"], ["빛나는갑옷장식"], [""]],
    // 강화술
    [[], ["강화슬롯부적", "초급재료보호부적"], ["초급성공강화부적", "초급공격강화부적"], ["초급방어강화부적", "초급명중강화부적"],
      ["중급재료보호부적", "중급명중강화부적", "중급공격강화부적"], ["중급성공강화부적", "초급필살강화부적", "투구방어강화부적"],
      ["상급명중강화부적", "상급공격강화부적"], ["방패방어강화부적", "중급필살강화부적"], ["고급공격강화부적", "상급필살강화부적", "상급성공강화부적"],
      ["갑옷방어강화부적", "고급명중강화부적"], ["고급필살강화부적"], [""]]
  ];

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
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
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
    ["초급도발저항강화부적", "중급도발저항강화부적", "상급도발저항강화부적", "고급도발저항강화부적", "최고도발저항강화부적", "전설도발저항강화부적"],
  ];

  const menu1 = list[condition.type].map(item => (
    <Menus value={item} key={item} disableGutters={true}>
      {item}
    </Menus>
  ));

  const menu2 = list2[condition2.type][condition2.grade].map(item => (
    <Menus value={item} key={item} disableGutters={true}>
      {item}
    </Menus>
  ));

  var menu3 = stateList[stateType].map(item => (
    <Menus value={item} key={item} disableGutters={true}>
      {item}
    </Menus>
  ));

  const countMaterials = (name: string, quantity: number) => {
    if (prodItem.has(name)) {
      for (let i = 0; i < prodItem.get(name).length; i += 2) {
        countMaterials(prodItem.get(name)[i], prodItem.get(name)[i + 1] * quantity);
      }
    } else {
      saveMaterials(name, quantity);
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
    for (let i = 0; i < back.length; i++) {
      result += front[i] + back[i] + " ";
    }
    return result;
  };

  useEffect(() => {
    setStateType(condition3.grade * 8 + condition3.type);
  }, [condition3]);

  return (
    <Container style={{ width: "80%", height: "100%", margin: "10px 10%", padding: "0", textAlign: "center" }}>
      <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
        <Container style={{ width: "96%", minWidth: "400px", margin: "5px 2%", padding: "0", float: "left" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition.type}
            onChange={e => {
              setCondition({ ...condition, type: Number(e.target.value), name: "0", quantity: 0, materials: "" });
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
              setCondition({ ...condition, name: String(e.target.value), materials: "" });
            }}
            style={{ width: "140px" }}>
            <Menus value={0}>품 목</Menus>
            {menu1}
          </Select>
          <TextField
            className={classes.text}
            type='number'
            variant='outlined'
            label='개수'
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
              setCondition({ ...condition, materials: getMaterials(itemNames, itemQuantities) });
            }}
            style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
            계산
          </Button>
        </Container>
        <Container
          style={{
            width: "96%",
            minWidth: "360px",
            minHeight: "72px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "5px 2%",
            padding: "5px",
            float: "left",
          }}>
          <h3 style={{ margin: "0", padding: "0", lineHeight: "30px" }}>{condition.materials || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
        </Container>
      </Container>
      <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
        <Container style={{ width: "96%", minWidth: "400px", margin: "5px 2%", padding: "0", float: "left" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition2.type}
            onChange={e => {
              setCondition2({ type: Number(e.target.value), grade: 0, name: "0", quantity: 0, materials: "" });
            }}>
            <Menus value={0}>종 류</Menus>
            <Menus value={1}>재봉술</Menus>
            <Menus value={2}>목공술</Menus>
            <Menus value={3}>대장술</Menus>
            <Menus value={4}>강화술</Menus>
          </Select>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition2.grade}
            onChange={e => {
              setCondition2({ ...condition2, grade: Number(e.target.value), name: "0", quantity: 0, materials: "" });
            }}>
            <Menus value={0}>단 계</Menus>
            <Menus value={1}>왕초보</Menus>
            <Menus value={2}>초 보</Menus>
            <Menus value={3}>견 습</Menus>
            <Menus value={4}>도 제</Menus>
            <Menus value={5}>숙 련</Menus>
            <Menus value={6}>전 문</Menus>
            <Menus value={7}>장 인</Menus>
            <Menus value={8}>명장인</Menus>
            <Menus value={9}>대장인</Menus>
            <Menus value={10}>절대장인</Menus>
            <Menus value={11}>전설장인</Menus>
          </Select>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition2.name}
            onChange={e => {
              setCondition2({ ...condition2, name: String(e.target.value), materials: "" });
            }}
            style={{ width: "140px" }}>
            <Menus value='0'>품 목</Menus>
            {menu2}
          </Select>
          <TextField
            className={classes.text}
            type='number'
            variant='outlined'
            label='개수'
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
              setCondition2({ ...condition2, materials: getMaterials(itemNames, itemQuantities) });
            }}
            style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
            계산
          </Button>
        </Container>
        <Container
          style={{
            width: "96%",
            minWidth: "360px",
            minHeight: "72px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "5px 2%",
            padding: "5px",
            float: "left",
          }}>
          <h3 style={{ margin: "0", lineHeight: "30px" }}>{condition2.materials || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
        </Container>
      </Container>

      <Container style={{ margin: "10px 0", padding: "0", float: "left" }}>
        <Container style={{ width: "96%", minWidth: "400px", margin: "5px 2%", padding: "0", float: "left" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition3.type}
            onChange={e => {
              setCondition3({ ...condition3, type: Number(e.target.value), name: "0", quantity: 0, materials: "" });
            }}
            style={{ width: "80px" }}>
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
            value={condition3.grade}
            onChange={e => {
              setCondition3({ ...condition3, grade: Number(e.target.value), name: "0", quantity: 0, materials: "" });
            }}
            style={{ width: "80px" }}>
            <Menus value={0}>종류</Menus>
            <Menus value={1} disableGutters={true}>
              환약
            </Menus>
            <Menus value={2} disableGutters={true}>
              부적
            </Menus>
          </Select>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition3.name}
            onChange={e => {
              itemNames = [];
              itemQuantities = [];
              setCondition3({ ...condition3, name: String(e.target.value), materials: "" });
            }}
            style={{ width: "180px" }}>
            <Menus value='0'>품 목</Menus>
            {menu3}
          </Select>
          <TextField
            className={classes.text}
            type='number'
            variant='outlined'
            label='개수'
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
              setCondition3({ ...condition3, materials: getMaterials(itemNames, itemQuantities) });
            }}
            style={{ minWidth: "60px", height: "50px", margin: "5px", padding: "0", float: "left" }}>
            계산
          </Button>
        </Container>
        <Container
          style={{
            width: "96%",
            minWidth: "360px",
            minHeight: "72px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "5px 2%",
            padding: "5px",
            float: "left",
          }}>
          <h3 style={{ margin: "0", lineHeight: "30px" }}>{condition3.materials || "제작 실패시 재료가 소멸될 수 있으므로 여분을 챙기자"}</h3>
        </Container>
      </Container>
    </Container>
  );
}
