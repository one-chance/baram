import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import ItemList from "conf/itemList.json";
import { SearchItemByName, SearchItemByOption } from "../../utils/CalUtil";
import IItemInfo from "interfaces/Calculator/IItemInfo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemInput: {
      width: "140px",
      margin: "5px",
      float: "left",
      "& input": {
        height: "45px",
        padding: "0 10px",
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
    select: {
      width: "120px",
      height: "40px",
      padding: "1px",
      margin: "5px 2.5px",
      color: "blue",
      textAlignLast: "center",
      fontSize: "0.8rem",
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        textAlign: "center",
        color: "blue",
      },
    },
    itemChip: {
      height: "30px",
      margin: "2.5px",
    },

    itemText: {
      width: "200px",
      "& input": {
        height: "36px",
        padding: "2px 10px",
        textAlign: "center",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid",
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

interface IEquipSlot {
  num: number;
  type: string;
  name: string;
  // value: string;
  value: number;
}

export default function Equip() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [itemPower, setItemPower] = useState<number>(0); // 장비 전투력

  const [tempPower, setTempPower] = useState<number>(0);
  const [reinforce, setReinforce] = useState<number>(0);

  const [searchName, setsearchName] = useState(""); // 검색할 장비 이름 (이름용)
  const [option1, setOption1] = useState(0); // 검색할 장비 옵션1
  const [option2, setOption2] = useState(0); // 검색할 장비 옵션2
  const [option3, setOption3] = useState(0); // 검색할 장비 옵션3
  const [itemList, setItemList] = useState<Array<IItemInfo>>([]);

  const itemName = itemList.map(item => (
    <Chip
      className={classes.itemChip}
      label={item.name}
      key={item.name}
      variant='outlined'
      onClick={() => {
        setTempPower(item.power);
      }}
    />
  ));

  const [dlgItem, setDlgItem] = useState({
    isOpen: false,
    title: "",
    parts: 1,
  });

  const inputName = (name: string) => {
    if (name === "") {
      setsearchName("");
    } else {
      setsearchName(name);
    }
  };

  // 이름 직접 검색
  const searchByName = async (name: string) => {
    setOption1(0);
    setOption2(0);
    setOption3(0);

    if (name === "") {
      setItemList([]);
      return;
    }

    const res = await SearchItemByName(name);
    const temp = Array<IItemInfo>();
    res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  // 리스트 통해서 검색
  const searchByList = async () => {
    if (option1 === 0 || option2 === 0 || option3 === 0) {
      alert("세부 옵션을 모두 선택해주세요.");
      return;
    }
    setsearchName("");

    const res = await SearchItemByOption(option1, option2, option3);
    const temp = Array<IItemInfo>();
    res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  // 장비 전투력 계산기에서 사용하는 변수들
  const [equipSlotList, setEquipSlotList] = useState<Array<IEquipSlot>>([
    { num: 1, type: "neck", name: "목/어깨장식", value: 0 },
    { num: 2, type: "head", name: "투구", value: 0 },
    { num: 3, type: "face", name: "얼굴장식", value: 0 },
    { num: 4, type: "weaphon", name: "무기", value: 0 },
    { num: 5, type: "armor", name: "갑옷", value: 0 },
    { num: 6, type: "subWeaphon", name: "방패/보조무기", value: 0 },
    { num: 7, type: "rightHand", name: "오른손", value: 0 },
    { num: 8, type: "cloak", name: "망토", value: 0 },
    { num: 9, type: "leftHand", name: "왼손", value: 0 },
    { num: 10, type: "sub1", name: "보조1", value: 0 },
    { num: 11, type: "shoes", name: "신발", value: 0 },
    { num: 12, type: "sub2", name: "보조2", value: 0 },
    { num: 13, type: "accessories", name: "장신구", value: 0 },
    { num: 14, type: "set", name: "세트옷", value: 0 },
    { num: 15, type: "reinforce", name: "0~11", value: 0 }, // 커스텀 UI 강화
  ]);

  // 장비 총 전투력 계산하는 함수
  const _calTotalPower = () => {
    // 현재 객체 저장
    setEquipSlotList(equipSlotList);

    let totalPower: number = 0;
    equipSlotList.map((equipSlot: IEquipSlot) => {
      //if (equipSlot.value) {
      //if (equipSlot.type === "reinforce") totalPower += Number(equipSlot.value) * 200;
      //else totalPower += Number(searchItemPower(equipSlot.value, equipSlot.num));
      totalPower += Number(equipSlot.value);
      //}
    });

    setItemPower(totalPower);
  };

  // itemList.json 에서 아이템 전투력 찾는 함수
  const searchItemPower = (item: String, num: number) => {
    item = item.replace(/ /g, ""); // 찾는 아이템 명에서 공백제거

    if (item !== "") {
      for (let i = 0; i < Object.keys(ItemList[num]).length; i++) {
        if (item === Object.keys(ItemList[num])[i]) return Object.values(ItemList[num])[i];
      }
    }

    return 0;
  };

  return (
    <React.Fragment>
      {equipSlotList.map((equipSlot: IEquipSlot, idx: number) => {
        if (equipSlot.type === "reinforce") {
          return (
            <div key={equipSlot.num}>
              <Link
                style={{
                  width: "60px",
                  height: "45px",
                  lineHeight: "45px",
                  margin: "5px",
                  textAlign: "center",
                  color: "black",
                  textDecoration: "none",
                  float: "left",
                }}>
                15. 강화
              </Link>
              <TextField
                className={classes.itemInput}
                variant='outlined'
                placeholder={equipSlot.name}
                onChange={e => {
                  equipSlotList[idx].value = Number(e.target.value);
                }}
                inputProps={{ style: { textAlign: "center" } }}
                style={{ width: "70px" }}
              />
            </div>
          );
        } else {
          return (
            <TextField
              key={equipSlot.num}
              className={classes.itemInput}
              variant='outlined'
              onChange={e => {
                equipSlotList[idx].value = Number(e.target.value);
              }}
              placeholder={`${equipSlot.num}. ${equipSlot.name}`}
            />
          );
        }
      })}
      <Container
        style={{
          width: "140px",
          height: "45px",
          padding: "0",
          margin: "5px",
          textAlign: "center",
          float: "left",
        }}>
        <Button
          className={classes.btn}
          variant='contained'
          color='primary'
          onClick={() => _calTotalPower()}
          style={{
            margin: "2.5px",
          }}>
          계산
        </Button>
        <Button
          variant='contained'
          className={classes.btn}
          color='secondary'
          onClick={() => {
            setOpenHelper(true);
          }}
          style={{ minWidth: "40px", margin: "2.5px" }}>
          ?
        </Button>
      </Container>
      <Container style={{ width: "100%", height: "45px", padding: "0", margin: "5px", textAlign: "center", float: "left" }}>
        <Button
          variant='outlined'
          color='primary'
          style={{ width: "140px", height: "45px", padding: "0 5px", margin: "0 5px 0 0" }}
          onClick={() => {
            setDlgItem({ ...dlgItem, isOpen: true });
          }}>
          1. 목/어깨장식
        </Button>
        <Button
          variant='outlined'
          color='primary'
          style={{ width: "140px", height: "45px", padding: "0 5px", margin: "0 0 0 5px" }}
          onClick={() => {
            setDlgItem({ ...dlgItem, isOpen: true });
          }}>
          2. 투구
        </Button>
      </Container>
      <Link className={classes.powerText} style={{ width: "100%" }}>
        장비 전투력 : {itemPower}
      </Link>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "BMDOHYEON", margin: "0" }}>장비 전투력 TMI</span>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>
          <h3 style={{ color: "red", fontFamily: "BMJUA" }}>★ 장비 전투력 ★</h3>
          <h3 style={{ fontFamily: "BMJUA" }}>* Lv.99에 최초 전투력이 부여되며 이후 렙업과 승급마다 전투력이 증가한다.</h3>
          <h4>* 승급퀘를 완료하지 않아도 레벨만 달성하면 승급 전투력이 증가한다.</h4>
          <h4>* 렙업 전투력 = 3.5 x 승급 차수 | 승급 전투력 = 350 x 승급 차수</h4>
          <h5>ex) 699 달성시 3.5 x 6 = 21 증가 </h5>
          <h5>ex) 700 달성시 3.5 x 7 + 350 x 7 = 2474.5 증가 </h5>
          <h4>* 소수점 첫재 자리까지 계산되지만 상태창에는 반올림한 정수로 표시된다.</h4>
          <h4>* 치장 한벌효과인 모든 능력 증가가 반영되지 않는다.</h4>
          <h4>* 8차가 나온다면 Lv.899의 레벨 전투력은 25850일 것이다.</h4>
        </DialogContent>
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

      <Dialog
        open={dlgItem.isOpen}
        onClose={() => {
          setDlgItem({ ...dlgItem, isOpen: false });
        }}>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>장비 전투력</span>
          <Button
            onClick={() => {
              setDlgItem({ ...dlgItem, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ maxWidth: "500px", padding: "10px" }}>
          <Container style={{ margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <TextField
              className={classes.itemText}
              variant='outlined'
              placeholder='아이템명'
              value={searchName || ""}
              onChange={e => {
                inputName(e.target.value);
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={e => {
                searchByName(searchName);
              }}
              style={{ height: "40px", marginLeft: "-5px", borderBottomLeftRadius: "0", borderTopLeftRadius: "0" }}>
              검색
            </Button>
          </Container>
          <Container style={{ margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <Select
              variant='outlined'
              className={classes.select}
              value={option1}
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={e => {
                setOption1(Number(e.target.value));
              }}>
              <Menus value={0}>종류</Menus>
              <Menus value={1}>용장비</Menus>
              <Menus value={2}>북방장비</Menus>
              <Menus value={3}>중국전설</Menus>
              <Menus value={4}>일본전설</Menus>
              <Menus value={5}>환웅장비</Menus>
              <Menus value={6}>백제/황산벌</Menus>
              <Menus value={7}>전우치/구미호</Menus>
              <Menus value={8}>타계장비</Menus>
              <Menus value={9}>흉수계/봉래산</Menus>
              <Menus value={10}>생산장비</Menus>
              <Menus value={11}>격전지/전장</Menus>
              <Menus value={12}>승급장비</Menus>
              <Menus value={13}>기타</Menus>
            </Select>

            <Select
              variant='outlined'
              className={classes.select}
              value={option2}
              disabled={true}
              MenuProps={{ disableScrollLock: true }}
              onChange={e => {
                setOption2(Number(e.target.value));
              }}>
              <Menus value={0}>부위</Menus>
              <Menus value={1}>목/어깨장식</Menus>
              <Menus value={2}>투구</Menus>
              <Menus value={3}>얼굴장식</Menus>
              <Menus value={4}>무기</Menus>
              <Menus value={5}>갑옷</Menus>
              <Menus value={6}>방패/보조무기</Menus>
              <Menus value={7}>손</Menus>
              <Menus value={8}>망토</Menus>
              <Menus value={9}>보조</Menus>
              <Menus value={10}>신발</Menus>
              <Menus value={11}>장신구</Menus>
              <Menus value={12}>분신</Menus>
            </Select>

            <Select
              variant='outlined'
              className={classes.select}
              value={option3}
              MenuProps={{ disableScrollLock: true }}
              onChange={e => {
                setOption3(Number(e.target.value));
              }}
              style={{ width: "80px" }}>
              <Menus value={0}>직업</Menus>
              <Menus value={1}>공용</Menus>
              <Menus value={2}>전사</Menus>
              <Menus value={3}>도적</Menus>
              <Menus value={4}>주술사</Menus>
              <Menus value={5}>도사</Menus>
              <Menus value={6}>궁사</Menus>
              <Menus value={7}>천인</Menus>
              <Menus value={8}>마도사</Menus>
              <Menus value={9}>영술사</Menus>
              <Menus value={10}>차사</Menus>
            </Select>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                searchByList();
              }}
              style={{ width: "60px", height: "40px", margin: "5px 2.5px", color: "white" }}>
              검색
            </Button>
          </Container>
          <Container
            style={{
              width: "80%",
              minHeight: "62px",
              margin: "5px 10%",
              padding: "5px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              textAlign: "center",
              float: "left",
            }}>
            {itemList.length === 0 ? "검색 결과가 없습니다." : itemName}
          </Container>
          <Container style={{ width: "100%", margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <Select
              variant='outlined'
              className={classes.select}
              value={reinforce}
              onChange={e => {
                setReinforce(Number(e.target.value));
              }}
              style={{ width: "80px", margin: "0 5px" }}>
              <Menus value={0}>강화</Menus>
              <Menus value={200}>슬롯1</Menus>
              <Menus value={400}>슬롯2</Menus>
            </Select>
            <Link style={{ width: "120px", lineHeight: "40px", textDecoration: "none", color: "black", margin: "0 10px" }}>
              전투력 : {tempPower + reinforce || 0}
            </Link>
            <Button variant='contained' color='secondary' style={{ width: "80px", height: "40px", color: "white", margin: "0 5px" }}>
              적용
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
