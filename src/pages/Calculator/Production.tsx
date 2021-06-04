import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import prodList from "conf/production.json";

const useStyles = makeStyles({
  itemChip: {
    height: "30px",
    margin: "2.5px",
    borderRadius: "10px",
    fontSize: "1rem",
    float: "left",
    "& .MuiChip-label": {
      padding: "0 10px",
    },
  },
  select: {
    width: "90px",
    height: "50px",
    padding: "0",
    margin: "5px",
    textAlignLast: "center",
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
  btn: {
    minWidth: "60px",
    height: "50px",
    margin: "5px",
    padding: "0",
    float: "left",
  },
  resultBox: {
    minHeight: "82px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    margin: "5px",
    padding: "5px 10px",
  },
});

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    padding: "6px 0",
    justifyContent: "center",
  },
})(MenuItem);

interface con {
  type: number;
  grade: number;
  name: string;
  quantity: number;
  materials: JSX.Element[];
}

export default function CalProduction() {
  var prodItem = new Map();
  for (let i = 0; i < Object.keys(prodList[0]).length; i++) {
    prodItem.set(Object.keys(prodList[0])[i], Object.values(prodList[0])[i]);
  }

  const classes = useStyles();
  const [menu1, setMenu1] = useState<Array<JSX.Element>>([]); // 채집술
  const [menu2, setMenu2] = useState<Array<JSX.Element>>([]); // 제작술
  const [menu3, setMenu3] = useState<Array<JSX.Element>>([]); // 상태저항

  const [itemList, setItemList] = useState([[""], [""], [""]]);
  const [condition, setCondition] = useState<con>({ type: 0, grade: 0, name: "0", quantity: 0, materials: [] });
  const [condition2, setCondition2] = useState<con>({ type: 0, grade: 0, name: "0", quantity: 0, materials: [] });
  const [condition3, setCondition3] = useState<con>({ type: 0, grade: 0, name: "0", quantity: 0, materials: [] });

  // prettier-ignore
  const list = [
    [[]],

    // 직조술
    [[], ["새끼줄", "삼베천"], ["황저포", "경원장갑", "경원팔찌", "경원반지", "경원선류", "경원깍지", "경원천인반지", "경원마도반지", "경원염주", "경원보호대"], ["아마천", "사군자6폭병풍", "곤지"],
     ["모시찬", "반창고", "신선도6폭병풍"], ["파천장갑", "파천팔찌", "파천반지", "파천선류", "파천깍지", "파천천인반지", "파천마도반지", "파천염주", "파천보호대"], ["무명천", "꽃무늬복면"],
     ["양모천", "복면", "연꽃화관"], ["비단", "금강장갑", "금강팔찌", "금강반지", "금강선류", "금강깍지", "금강천인반지", "금강마도반지", "금강염주", "금강보호대"], ["사각복면", "오봉산도6폭병풍"],
     ["바람제일식장갑", "바람제일식팔찌", "바람제일식반지", "바람제일식선류", "바람제일식깍지", "바람제일식천인반지", "바람제일식마도반지", "바람제일식염주", "바람제일식보호대"],
     ["황금비단", "바람제영식장갑", "바람제영식팔찌", "바람제영식반지", "바람제영식선류", "바람제영식깍지", "바람제영식천인반지", "바람제영식마도반지", "바람제영식염주", "바람제영식보호대"]],
  
    // 벌목술
    [[], ["삼베실", "화살나무판자"], ["소나무판자", "밀짚모자", "경원투구"], ["은행나무판자", "족제비수염"], ["대나무판자", "위로빗은수염", "호랑이머리장식"], ["단풍나무판자", "아저씨수염", "파천투구"],
     ["떡갈나무판자", "선장수염", "한시등"], ["반송판자", "갓", "전모"], ["금강송판자", "금강투구"], ["백송판자", "긴수염", "금촛대"], ["황금송판자", "바람제일식투구"], ["묵철판자", "황금촛대", "바람제영식투구"]],
      
    // 채광술
    [[], ["연옥", "돌촉"], ["황동괴", "연옥노리개"], ["청동괴", "황옥"], ["구리패", "황옥노리개", "구리조각"], ["적옥", "철괴"], ["적옥노리개", "강철괴"], ["강철패", "강철쇠조각", "청옥"],
     ["은괴", "청옥노리개"], ["은장패", "은조각", "백옥"], ["금괴", "강철조각", "황금조각", "백옥노리개", "금장패"], ["찬란한금괴", "금옥노리개", "금장신패"]],
      
    // 조제술
    [[], ["곡물가루", "주먹밥"], ["독가루", "쑥절편"], ["맹독가루", "수면제"], ["작약보혈탕", "익기탕"], ["인삼약제", "해독제"], ["영지약제", "청심환", "인영보혈탕"],
     ["산인삼약제", "우황청심환", "삼기탕"], ["산양삼약제", "산양기탕", "반하보혈탕"], ["산장뇌삼약제", "보중청심환", "도삭산용기름"], ["천뇌삼약제", "천강청심환"],
     ["신비의용기름", "신수경험치축복영약", "환수경험치축복영약", "불사의환단", "최대체력증가영약", "최대마력증가영약"]],

     // 재봉술
    [[], ["미투리", "갈모", "도롱이"], ["사슴뿔", "경원갑옷", "경원갑주"], ["화관", "꽂장식남자갑옷", "꽃장식여자갑옷", "족두리"], ["호박비녀족두리", "추사체족자", "해바라기화관"],
     ["파천갑옷", "파천갑주"], ["묵죽도족자", "적향의환희", "청향의환유"], ["금테족두리", "풍류진향", "풍류인향"], ["금강산도족자", "금강갑옷", "금강갑주"],
     ["검정비녀족두리", "삼화청랑", "삼화홍랑"], ["황금비녀족두리", "바람제일식갑옷", "바람제일식갑주"], ["바람제영식갑옷", "바람제영식갑주"]],
    
    // 목공술
    [[], ["황동촛등", "돌화살통"], ["삿갓", "경원방패", "경원고서", "경원신부"], ["토끼귀", "작은창문", "양눈창문"],
     ["작은대나무발", "죽제고비", "죽장함", "죽원방패", "죽원고서", "죽원신부"], ["사각창문", "파천방패", "파천고서", "파천신부"], ["하루기른수염", "산타수염", "삼층책장"],
     ["산양뿔", "반닫이", "연상"], ["육각창문", "삼층장", "금강방패", "금강고서", "금강신부"], ["각게수리", "2단문갑", "루비왕관"],
     ["빗접", "바람제일식방패", "바람제일식고서", "바람제일식신부"], ["바람제영식방패", "바람제영식고서", "바람제영식신부"]],
   
    // 대장술
    [[], ["돌단검", "돌창"], ["경원비검", "경원비도", "경원비봉", "경원비곤", "경원비궁", "경원비포", "경원비단봉", "경원비장", "경원비명도"], ["금테머리띠", "깃발1"], ["호박머리띠", "청동단검", "청동장검", "청동명궁"],
     ["파천비검", "파천비도", "파천비봉", "파천비곤", "파천비궁", "파천비포", "파천비단봉", "파천비장", "파천비명도"], ["홍실쌍검장식", "오공머리띠"], ["오색머리띠", "강철단검", "강철장검", "강철명궁"],
     ["금강비검", "금강비도", "금강비봉", "금강비곤", "금강비궁", "금강비포", "금강비단봉", "금강비장", "금강비명도"], ["철투구장식", "선녀머리띠", "갑옷장식1"],
     ["빛나는갑옷장식", "차원의덫", "바람제일식검", "바람제일식도", "바람제일식봉", "바람제일식곤", "바람제일식궁", "바람제일식포", "바람제일식단봉", "바람제일식장", "바람제일식명도"],
     ["바람제영식검", "바람제영식도", "바람제영식봉", "바람제영식곤", "바람제영식궁", "바람제영식포", "바람제영식단봉", "바람제영식장", "바람제영식명도"]],
   
     // 강화술
     [[], ["강화슬롯부적", "초급재료보호부적"], ["초급성공강화부적", "초급공격강화부적"], ["초급방어강화부적", "초급명중강화부적"], ["중급재료보호부적", "중급명중강화부적", "중급공격강화부적"],
      ["중급성공강화부적", "초급필살강화부적", "투구방어강화부적"], ["상급명중강화부적", "상급공격강화부적"], ["방패방어강화부적", "중급필살강화부적"], ["고급공격강화부적", "상급필살강화부적", "상급성공강화부적"],
      ["갑옷방어강화부적", "고급명중강화부적"], ["고급필살강화부적"], ["전설성공강화부적", "전설공격강화부적", "전설필살강화부적", "전설재료보호부적", "전설명중강화부적", "둔갑체력강화부적","둔갑마력강화부적"]],

     // 저항환약
     [[], ["기절저항환약(하)", "기절저항환약(중)", "기절저항환약(상)", "기절저항환약(특상)"], ["침묵저항환약(하)", "침묵저항환약(중)", "침묵저항환약(상)", "침묵저항환약(특상)"], ["속박저항환약(하)", "속박저항환약(중)", "속박저항환약(상)", "속박저항환약(특상)"],
     ["수면저항환약(하)", "수면저항환약(중)", "수면저항환약(상)", "수면저항환약(특상)"], ["절망저항환약(하)", "절망저항환약(중)", "절망저항환약(상)", "절망저항환약(특상)"], ["중독저항환약(하)", "중독저항환약(중)", "중독저항환약(상)", "중독저항환약(특상)"],
      ["마비저항환약(하)", "마비저항환약(중)", "마비저항환약(상)", "마비저항환약(특상)"], ["도발저항환약(하)", "도발저항환약(중)", "도발저항환약(상)", "도발저항환약(특상)"]],
     
     // 저항부적
     [[], ["초급기절저항강화부적", "중급기절저항강화부적", "상급기절저항강화부적", "고급기절저항강화부적", "최고기절저항강화부적", "전설기절저항강화부적"], ["초급침묵저항강화부적", "중급침묵저항강화부적", "상급침묵저항강화부적", "고급침묵저항강화부적", "최고침묵저항강화부적", "전설침묵저항강화부적"],
     ["초급속박저항강화부적", "중급속박저항강화부적", "상급속박저항강화부적", "고급속박저항강화부적", "최고속박저항강화부적", "전설속박저항강화부적"], ["초급수면저항강화부적", "중급수면저항강화부적", "상급수면저항강화부적", "고급수면저항강화부적", "최고수면저항강화부적", "전설수면저항강화부적"],
     ["초급절망저항강화부적", "중급절망저항강화부적", "상급절망저항강화부적", "고급절망저항강화부적", "최고절망저항강화부적", "전설절망저항강화부적"], ["초급중독저항강화부적", "중급중독저항강화부적", "상급중독저항강화부적", "고급중독저항강화부적", "최고중독저항강화부적", "전설중독저항강화부적"],
     ["초급마비저항강화부적", "중급마비저항강화부적", "상급마비저항강화부적", "고급마비저항강화부적", "최고마비저항강화부적", "전설마비저항강화부적"], ["초급도발저항강화부적", "중급도발저항강화부적", "상급도발저항강화부적", "고급도발저항강화부적", "최고도발저항강화부적", "전설도발저항강화부적"]]
  ];

  const getMaterials = (name: string, quantity: number, id: number) => {
    if (prodItem.has(name)) {
      removeName(name, quantity, id);
      addName(name, quantity, id);
      return makeChips(id);
    }
  };

  // itemList에서 현재 물품 제거
  const removeName = (name: string, quantity: number, id: number) => {
    if (itemList[id].length === 0) return;
    for (let i = 0; i < itemList[id].length; i++) {
      if (name === itemList[id][i].split(" ")[0] && quantity.toString() === itemList[id][i].split(" ")[1]) {
        itemList[id].splice(i, 1);
        break;
      }
    }
  };

  // itemList에 현재 물품의 하위 재료 추가
  const addName = (name: string, quantity: number, id: number) => {
    for (let j = 0; j < prodItem.get(name).length; j += 2) {
      itemList[id].push(`${prodItem.get(name)[j]} ${prodItem.get(name)[j + 1] * quantity}`);
    }
    setItemList(itemList);
  };

  // 재료내 중복인 것들 전부 병합
  const mergeChips = (id: number) => {
    for (let i = 0; i < itemList[id].length - 1; i++) {
      mergeName(id);
    }
    return makeChips(id);
  };

  // itemList에 이름이 같은 물품 병합
  const mergeName = (id: number) => {
    for (let i = 0; i < itemList[id].length; i++) {
      for (let j = i + 1; j < itemList[id].length; j++) {
        if (itemList[id][i].split(" ")[0] === itemList[id][j].split(" ")[0]) {
          let temp = parseInt(itemList[id][i].split(" ")[1]);
          let temp2 = parseInt(itemList[id][j].split(" ")[1]);
          itemList[id][j] = `${itemList[id][j].split(" ")[0]} ${temp + temp2}`;
          itemList[id].splice(i, 1);
        }
      }
    }
    setItemList(itemList);
  };

  const makeChips = (id: number) => {
    let result: JSX.Element[] = itemList[id].map((item, idx) => (
      <Chip
        className={classes.itemChip}
        variant='outlined'
        color={prodItem.has(item.split(" ")[0]) ? "primary" : "default"}
        disabled={!prodItem.has(item.split(" ")[0])}
        label={item}
        key={idx}
        onClick={() => {
          if (id === 0) setCondition({ ...condition, materials: getMaterials(item.split(" ")[0], Number(item.split(" ")[1]), 0) as JSX.Element[] });
          else if (id === 1) setCondition2({ ...condition2, materials: getMaterials(item.split(" ")[0], Number(item.split(" ")[1]), 1) as JSX.Element[] });
          else if (id === 2) setCondition3({ ...condition3, materials: getMaterials(item.split(" ")[0], Number(item.split(" ")[1]), 2) as JSX.Element[] });
        }}
      />
    ));
    return result;
  };

  const getMenuList = (type: number, grade: number) => {
    let temp: JSX.Element[] = [];
    if (type !== 0 && grade !== 0) {
      temp = list[type][grade].map(item => (
        <Menus value={item} key={item}>
          {item}
        </Menus>
      ));
      return temp;
    }
  };

  return (
    <Grid container justify='center' direction='column' style={{ margin: "0", padding: "0", textAlign: "center" }}>
      <Grid container style={{ margin: "10px 0", padding: "0" }}>
        <Grid container style={{ margin: "5px 0", padding: "0" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition.type}
            onChange={e => {
              itemList[0].splice(0, itemList[0].length);
              setCondition({ type: Number(e.target.value), grade: 0, name: "0", quantity: 0, materials: [] });
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
            value={condition.grade}
            onChange={e => {
              itemList[0].splice(0, itemList[0].length);
              setMenu1(getMenuList(condition.type, Number(e.target.value)) as JSX.Element[]);
              setCondition({ ...condition, grade: Number(e.target.value), name: "0", quantity: 0, materials: [] });
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
            value={condition.name}
            disabled={condition.type === 0 || condition.grade === 0}
            onChange={e => {
              setCondition({ ...condition, name: String(e.target.value), quantity: 1, materials: [] });
            }}
            style={{ width: "140px" }}>
            <Menus value='0'>품 목</Menus>
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
            className={classes.btn}
            onClick={() => {
              if (condition.name !== "0") {
                itemList[0].splice(0, itemList[0].length);
                setCondition({ ...condition, materials: getMaterials(condition.name, condition.quantity, 0) as JSX.Element[] });
              }
            }}>
            재료
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.btn}
            onClick={() => {
              setCondition({ ...condition, materials: mergeChips(0) });
            }}>
            합산
          </Button>
        </Grid>
        <Grid container justify='center' className={classes.resultBox}>
          {condition.materials.length > 1 ? (
            condition.materials
          ) : (
            <span style={{ fontSize: "1rem" }}>
              <br />
              실패시 재료가 소멸될 수 있으니 여분을 준비하자
            </span>
          )}
        </Grid>
      </Grid>
      <Grid container style={{ margin: "10px 0", padding: "0" }}>
        <Grid container style={{ margin: "5px 0", padding: "0" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition2.type}
            onChange={e => {
              itemList[1].splice(0, itemList[1].length);
              setCondition2({ type: Number(e.target.value), grade: 0, name: "0", quantity: 0, materials: [] });
            }}>
            <Menus value={0}>종 류</Menus>
            <Menus value={5}>재봉술</Menus>
            <Menus value={6}>목공술</Menus>
            <Menus value={7}>대장술</Menus>
            <Menus value={8}>강화술</Menus>
          </Select>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition2.grade}
            onChange={e => {
              itemList[1].splice(0, itemList[1].length);
              setMenu2(getMenuList(condition2.type, Number(e.target.value)) as JSX.Element[]);
              setCondition2({ ...condition2, grade: Number(e.target.value), name: "0", quantity: 0, materials: [] });
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
            disabled={condition2.type === 0 || condition2.grade === 0}
            onChange={e => {
              setCondition2({ ...condition2, name: String(e.target.value), quantity: 1, materials: [] });
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
            className={classes.btn}
            onClick={() => {
              itemList[1].splice(0, itemList[1].length);
              if (condition2.name !== "0") setCondition2({ ...condition2, materials: getMaterials(condition2.name, condition2.quantity, 1) as JSX.Element[] });
            }}>
            재료
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.btn}
            onClick={() => {
              setCondition2({ ...condition2, materials: mergeChips(1) });
            }}>
            합산
          </Button>
        </Grid>
        <Grid container justify='center' className={classes.resultBox}>
          {condition2.materials.length > 1 ? (
            condition2.materials
          ) : (
            <span style={{ fontSize: "1rem" }}>
              <br />
              실패시 재료가 소멸될 수 있으니 여분을 준비하자
            </span>
          )}
        </Grid>
      </Grid>

      <Grid container style={{ margin: "10px 0", padding: "0" }}>
        <Grid container style={{ margin: "5px 0", padding: "0" }}>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition3.type}
            onChange={e => {
              itemList[2].splice(0, itemList[2].length);
              setCondition3({ type: Number(e.target.value), grade: 0, name: "0", quantity: 0, materials: [] });
            }}
            style={{ width: "75px" }}>
            <Menus value={0}>종류</Menus>
            <Menus value={9}>환약</Menus>
            <Menus value={10}>부적</Menus>
          </Select>
          <Select
            className={classes.select}
            variant='outlined'
            value={condition3.grade}
            onChange={e => {
              itemList[2].splice(0, itemList[2].length);
              setMenu3(getMenuList(condition3.type, Number(e.target.value)) as JSX.Element[]);
              setCondition3({ ...condition3, grade: Number(e.target.value), name: "0", quantity: 0, materials: [] });
            }}
            style={{ width: "75px" }}>
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
            value={condition3.name}
            disabled={condition3.type === 0 || condition3.grade === 0}
            onChange={e => {
              setCondition3({ ...condition3, name: String(e.target.value), quantity: 1, materials: [] });
            }}
            style={{ width: "170px" }}>
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
            className={classes.btn}
            onClick={() => {
              itemList[2].splice(0, itemList[2].length);
              setItemList(itemList);
              if (condition3.name !== "0") setCondition3({ ...condition3, materials: getMaterials(condition3.name, condition3.quantity, 2) as JSX.Element[] });
            }}>
            재료
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.btn}
            onClick={() => {
              setCondition3({ ...condition3, materials: mergeChips(2) });
            }}>
            합산
          </Button>
        </Grid>
        <Grid container justify='center' className={classes.resultBox}>
          {condition3.materials.length > 1 ? (
            condition3.materials
          ) : (
            <span style={{ fontSize: "1rem" }}>
              <br />
              실패시 재료가 소멸될 수 있으니 여분을 준비하자
            </span>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
