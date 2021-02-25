import React, { useState, useEffect } from "react";
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
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { SearchItem } from "../../utils/CalUtil";
import IItemInfo from "interfaces/Calculator/IItemInfo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    dlgButton: {
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
    linkText: {
      lineHeight: "40px",
      color: "black",
      margin: "0",
      float: "left",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    dlgText: {
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

interface IEquipSlot {
  num: number;
  type: string;
  name: string;
  power: number;
  reinforce: number;
}

export default function Equip() {
  const classes = useStyles();

  var check1 = [2, 4, 5, 6];
  var check2 = [2, 4, 5];
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [itemPower, setItemPower] = useState<number>(0); // 장비 전투력

  const [tempPower, setTempPower] = useState<number>(0);
  const [reinforce, setReinforce] = useState<number>(0);

  const [searchName, setsearchName] = useState(""); // 검색할 장비 이름 (이름용)
  const [option1, setOption1] = useState(0); // 검색할 장비 옵션1
  const [option2, setOption2] = useState(0); // 검색할 장비 옵션2
  const [option3, setOption3] = useState(0); // 검색할 장비 옵션3
  const [itemList, setItemList] = useState<Array<IItemInfo>>([]);

  var menuList = [
    // prettier-ignore
    [ "종류", "용장비", "북방장비", "중국전설", "일본전설", "환웅장비", "백제/황산벌", "전우치/구미호", "타계장비", "흉수계/봉래산", "생산장비", "격전지/전장", "승급장비", "합성노리개", ],
    ["부위", "목/어깨장식", "투구", "얼굴장식", "무기", "갑옷", "방패/보조무기", "손", "망토", "보조", "신발", "세트", "장신구"],
    ["직업", "공용", "전사", "도적", "주술사", "도사", "궁사", "천인", "마도사", "영술사", "차사"],
  ];

  const [dlgItem, setDlgItem] = useState({
    isOpen: false,
    title: "0",
    parts: 1,
  });

  // 장비 전투력 계산기에서 사용하는 변수들
  const [equipSlotList, setEquipSlotList] = useState<Array<IEquipSlot>>([
    { num: 1, type: "목/어깨장식", name: "목/어깨장식", power: 0, reinforce: 0 },
    { num: 2, type: "투구", name: "투구", power: 0, reinforce: 0 },
    { num: 3, type: "얼굴장식", name: "얼굴장식", power: 0, reinforce: 0 },
    { num: 4, type: "무기", name: "무기", power: 0, reinforce: 0 },
    { num: 5, type: "갑옷", name: "갑옷", power: 0, reinforce: 0 },
    { num: 6, type: "방패/보조무기", name: "방패/보조무기", power: 0, reinforce: 0 },
    { num: 7, type: "오른손", name: "오른손", power: 0, reinforce: 0 },
    { num: 8, type: "망토", name: "망토", power: 0, reinforce: 0 },
    { num: 9, type: "왼손", name: "왼손", power: 0, reinforce: 0 },
    { num: 10, type: "보조1", name: "보조1", power: 0, reinforce: 0 },
    { num: 11, type: "신발", name: "신발", power: 0, reinforce: 0 },
    { num: 12, type: "보조2", name: "보조2", power: 0, reinforce: 0 },
    { num: 13, type: "세트", name: "세트", power: 0, reinforce: 0 },
    { num: 14, type: "장신구", name: "장신구", power: 0, reinforce: 0 },
  ]);

  const itemName = itemList.map(item => (
    <Chip
      className={classes.itemChip}
      label={item.name}
      key={item.name}
      variant='outlined'
      color={dlgItem.title === item.name ? "primary" : "default"}
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
  const searchByName = async (name: string, parts: number) => {
    setOption1(0);
    setOption3(0);

    if (name === "") {
      setItemList([]);
      return;
    }

    const res = await SearchItem(name, 0, parts, 0);
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

    const res = await SearchItem("", option1, option2, option3);
    const temp = Array<IItemInfo>();
    res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  // 착용 부위를 고정하는 함수
  const fixedOption = (num: number) => {
    if (num + 1 === 9) {
      setOption2(7);
    } else if (num + 1 === 10) {
      setOption2(9);
    } else if (num + 1 === 11) {
      setOption2(10);
    } else if (num + 1 === 12) {
      setOption2(9);
    } else if (num + 1 === 13) {
      setOption2(11);
    } else if (num + 1 === 14) {
      setOption2(12);
    } else {
      setOption2(num + 1);
    }

    if (equipSlotList[num].type === equipSlotList[num].name) {
      setItemList([]);
      setsearchName("");
      setTempPower(0);
      setReinforce(0);
    } else {
      searchByName(equipSlotList[num].name, equipSlotList[num].num);
      setTempPower(equipSlotList[num].power);
      setReinforce(equipSlotList[num].reinforce);
    }
  };

  // 장비 총 전투력 계산하는 함수
  const _calTotalPower = () => {
    setEquipSlotList(equipSlotList);
    let totalPower: number = 0;

    for (let a = 0; a < equipSlotList.length; a++) {
      totalPower += equipSlotList[a].power + equipSlotList[a].reinforce;
    }
    setItemPower(totalPower);
  };

  useEffect(() => {
    setOption1(0);
    setOption3(0);
  }, [dlgItem.isOpen]);

  return (
    <React.Fragment>
      {equipSlotList.map((equipSlot: IEquipSlot, idx: number) => {
        return (
          <Button
            variant='outlined'
            color='primary'
            key={equipSlot.num}
            style={{ width: "140px", height: "55px", padding: "0 5px", margin: "5px" }}
            onClick={() => {
              fixedOption(idx);
              setDlgItem({ ...dlgItem, isOpen: true, parts: equipSlot.num });
            }}>
            <span>
              {equipSlot.type !== equipSlot.name ? equipSlot.name : `${idx + 1}. ${equipSlot.name}`}
              <br />
              {equipSlot.type !== equipSlot.name ? `(${Number(equipSlot.power + equipSlot.reinforce)})` : ""}
            </span>
          </Button>
        );
      })}

      <Link className={classes.powerText}>장비 전투력 : {itemPower}</Link>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          setOpenHelper(true);
        }}
        style={{ minWidth: "40px", height: "40px", padding: "0", margin: "5px" }}>
        ?
      </Button>

      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>장비 전투력 TMI</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 장비 전투력 = 각인, 돋, 기술능력을 제외한 순수한 아이템 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 같은 종류의 아이템은 전투력도 같다. (한손/양손무기 차이는 존재)
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영된다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText} style={{ margin: "0" }}>
            * 장비에 부여된 부가 잠재능력은 황금돋보기 전투력으로 계산된다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ paddingLeft: "20px" }}>
            ex) 마사의귀목, 고대마령의암막/표식, 고대마령의군화(흑/월)
          </Typography>
          <Typography variant='h5' className={classes.dlgText} style={{ margin: "0" }}>
            * 종류에 상관없이 강화슬롯 1개당 전투력 200이 증가한다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ paddingLeft: "20px" }}>
            ex) 무기, 투구, 손 (최대 400), 방패/보조무기 (최대 200)
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
              placeholder={`(${equipSlotList[dlgItem.parts - 1].type}) 아이템명 `}
              value={searchName}
              onChange={e => {
                inputName(e.target.value);
              }}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.dlgButton}
              onClick={e => {
                searchByName(searchName, dlgItem.parts);
              }}>
              검색
            </Button>
          </Container>
          <Container style={{ margin: "2.5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <Select
              variant='outlined'
              className={classes.select}
              value={option1}
              /* MenuProps={{ disableScrollLock: true }} */
              onChange={e => {
                setOption1(Number(e.target.value));
              }}>
              {menuList[0].map((name: string, idx: number) => {
                return (
                  <Menus value={idx} key={idx} disableGutters={true}>
                    {name}
                  </Menus>
                );
              })}
            </Select>

            <Select variant='outlined' className={classes.select} value={option2} disabled={true} style={{ width: "100px" }}>
              {menuList[1].map((name: string, idx: number) => {
                return (
                  <Menus value={idx} key={idx} disableGutters={true}>
                    {name}
                  </Menus>
                );
              })}
            </Select>

            <Select
              variant='outlined'
              className={classes.select}
              value={option3}
              onChange={e => {
                setOption3(Number(e.target.value));
              }}
              style={{ width: "80px" }}>
              {menuList[2].map((name: string, idx: number) => {
                return (
                  <Menus value={idx} key={idx} disableGutters={true}>
                    {name}
                  </Menus>
                );
              })}
            </Select>

            <Button
              variant='contained'
              color='primary'
              className={classes.dlgButton}
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
          <Container style={{ width: "380px", margin: "20px 50px 0 50px", padding: "0", float: "left" }}>
            <Link className={classes.linkText} style={{ width: "40px" }}>
              강화
            </Link>
            <Checkbox
              color='primary'
              disabled={!check1.includes(equipSlotList[dlgItem.parts - 1].num) || itemList.length === 0}
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
            <Link className={classes.linkText} style={{ width: "25px", textAlign: "center" }}>
              +1
            </Link>
            <Checkbox
              color='primary'
              disabled={!check2.includes(equipSlotList[dlgItem.parts - 1].num) || itemList.length === 0}
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
            <Link className={classes.linkText} style={{ width: "25px", textAlign: "center" }}>
              +2
            </Link>
            <Link className={classes.linkText} style={{ width: "100px", margin: "0 30px", fontWeight: "bold", fontSize: "1rem" }}>
              전투력 : {itemList.length === 0 ? 0 : tempPower + reinforce}
            </Link>
            <Button
              variant='contained'
              color='secondary'
              className={classes.dlgButton}
              style={{ float: "right" }}
              onClick={() => {
                setDlgItem({ ...dlgItem, isOpen: false });
                if (itemList.length !== 0) {
                  equipSlotList[dlgItem.parts - 1].name = dlgItem.title;
                  equipSlotList[dlgItem.parts - 1].power = tempPower;
                  equipSlotList[dlgItem.parts - 1].reinforce = reinforce;
                } else {
                  equipSlotList[dlgItem.parts - 1].name = equipSlotList[dlgItem.parts - 1].type;
                  equipSlotList[dlgItem.parts - 1].power = 0;
                  equipSlotList[dlgItem.parts - 1].reinforce = 0;
                }
                _calTotalPower();
              }}>
              저장
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
