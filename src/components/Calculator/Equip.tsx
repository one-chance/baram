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
import Checkbox from "@material-ui/core/Checkbox";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//import ItemList from "conf/itemList.json";
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

    btnDlg: {
      minWidth: "60px",
      height: "40px",
      margin: "0 5px",
      padding: "5px",
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
      width: "310px",
      margin: "0 2.5px",
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

  const [dlgItem, setDlgItem] = useState({
    isOpen: false,
    title: "0",
    parts: 1,
  });

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
    { num: 13, type: "set", name: "세트옷", value: 0 },
    { num: 14, type: "accessories", name: "장신구", value: 0 },
  ]);

  const itemName = itemList.map(item => (
    <Chip
      className={classes.itemChip}
      label={item.name}
      key={item.name}
      variant='outlined'
      color={tempPower !== 0 ? "primary" : "default"}
      onClick={() => {
        setTempPower(item.power);
        setDlgItem({ ...dlgItem, title: item.name });
      }}
    />
  ));

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

  // 장비 총 전투력 계산하는 함수
  const _calTotalPower = () => {
    // 현재 객체 저장
    setEquipSlotList(equipSlotList);

    let totalPower: number = 0;

    for (let a = 0; a < equipSlotList.length; a++) {
      totalPower += equipSlotList[a].value;
    }
    setItemPower(totalPower);
  };

  return (
    <React.Fragment>
      {equipSlotList.map((equipSlot: IEquipSlot, idx: number) => {
        return (
          <Button
            variant='outlined'
            color='primary'
            key={equipSlot.num}
            style={{ width: "140px", height: "45px", padding: "0 5px", margin: "5px" }}
            onClick={() => {
              setOption2(idx + 1);
              setDlgItem({ ...dlgItem, isOpen: true, parts: equipSlotList[idx].num });
              if (equipSlotList[idx].value === 0) {
                setItemList([]);
                setsearchName("");
                setTempPower(0);
              } else {
                searchByName(equipSlotList[idx].name);
                setTempPower(equipSlotList[idx].value);
              }
            }}>
            {`${equipSlotList[idx].num}. ${equipSlotList[idx].name}`}
          </Button>
        );
      })}
      <Container
        style={{
          width: "100%",
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
      </Container>

      <Link className={classes.powerText}>장비 전투력 : {itemPower}</Link>
      <Button
        variant='contained'
        className={classes.btn}
        color='secondary'
        onClick={() => {
          setOpenHelper(true);
        }}
        style={{ minWidth: "40px", margin: "5px" }}>
        ?
      </Button>
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
        <DialogContent style={{ maxWidth: "500px", padding: "10px", margin: "10px 0" }}>
          <Container style={{ margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <TextField
              className={classes.itemText}
              variant='outlined'
              placeholder='아이템명'
              value={equipSlotList[dlgItem.parts - 1].value === 0 ? searchName : equipSlotList[dlgItem.parts - 1].name}
              onChange={e => {
                inputName(e.target.value);
              }}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.btnDlg}
              onClick={e => {
                searchByName(searchName);
              }}>
              검색
            </Button>
          </Container>
          <Container style={{ margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
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
              style={{ width: "100px" }}>
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
              className={classes.btnDlg}
              onClick={() => {
                searchByList();
              }}>
              검색
            </Button>
          </Container>
          <Container
            style={{
              width: "380px",
              minHeight: "62px",
              margin: "2.5px 50px",
              padding: "5px",
              border: "1px solid lightgray",
              borderRadius: "5px",
              textAlign: "center",
              float: "left",
            }}>
            {itemList.length === 0 ? (
              <span>
                <br />
                검색 결과가 없습니다.
              </span>
            ) : (
              itemName
            )}
          </Container>
          <Container style={{ width: "380px", margin: "30px 50px 0 50px", padding: "0", float: "left" }}>
            <Link style={{ width: "40px", lineHeight: "40px", textDecoration: "none", color: "black", margin: "0", float: "left" }}>강화</Link>
            <Checkbox
              color='primary'
              checked={reinforce === 200}
              onChange={() => {
                if (reinforce === 200) {
                  setReinforce(0);
                } else {
                  setReinforce(200);
                }
              }}
              style={{ width: "20px", height: "40px", float: "left" }}
            />
            <Link style={{ width: "20px", lineHeight: "40px", textDecoration: "none", color: "black", margin: "0", float: "left" }}>+1</Link>
            <Checkbox
              color='primary'
              checked={reinforce === 400}
              onChange={() => {
                if (reinforce === 400) {
                  setReinforce(0);
                } else {
                  setReinforce(400);
                }
              }}
              style={{ width: "20px", height: "40px", float: "left" }}
            />
            <Link style={{ width: "20px", lineHeight: "40px", textDecoration: "none", color: "black", margin: "0", float: "left" }}>+2</Link>
            <Link style={{ width: "100px", lineHeight: "40px", textDecoration: "none", color: "black", margin: "0 45px", float: "left" }}>
              전투력 : {tempPower + reinforce || 0}
            </Link>
            <Button
              variant='contained'
              color='secondary'
              className={classes.btnDlg}
              onClick={() => {
                setDlgItem({ ...dlgItem, isOpen: false });
                equipSlotList[dlgItem.parts - 1].name = dlgItem.title;
                equipSlotList[dlgItem.parts - 1].value = tempPower + reinforce;
                //setEquipSlotList(equipSlotList);
                setReinforce(0);
                setTempPower(0);
                _calTotalPower();
              }}
              style={{ float: "right" }}>
              적용
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
