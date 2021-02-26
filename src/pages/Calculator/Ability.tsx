import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

import { SearchItem, SearchOptionByName } from "../../utils/CalUtil";
import IItemInfo from "interfaces/Calculator/IItemInfo";
import IItemOptionInfo from "interfaces/Calculator/IItemOptionInfo";

const useStyles = makeStyles({
  stat: {
    width: "60px",
    margin: "10px",
    "& input": {
      height: "40px",
      padding: "5px",
      textAlign: "center",
    },
  },

  btn: {
    width: "150px",
    height: "40px",
    padding: "5px",
    margin: "5px",
  },

  itemChip: {
    height: "30px",
    margin: "2.5px",
    borderRadius: "12px",
    "& .MuiChip-label": {
      padding: "0 7.5px",
    },
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

  table: {
    maxWidth: "380px",
    borderCollapse: "collapse",
    "& th, td": {
      height: "28px",
      border: "1px solid lightgray",
      textAlign: "center",
      fontSize: "1rem",
      padding: "0",
    },
    "& th": {
      height: "30px",
      fontSize: "1rem",
      fontWeight: "bolder",
    },
  },

  dlgButton: {
    minWidth: "60px",
    height: "40px",
    margin: "0 5px",
    padding: "5px",
  },
});

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

interface IEquipOption {
  type: string;
  option: number;
}

interface IEquipSlot {
  num: number;
  type: string;
  name: string;
  status: IEquipOption;
}

export default function Ability() {
  const classes = useStyles();

  const [searchName, setSearchName] = useState(""); // 검색할 장비 이름
  const [option1, setOption1] = useState(0); // 검색할 장비 옵션1
  const [option2, setOption2] = useState(0); // 검색할 장비 옵션2
  const [option3, setOption3] = useState(0); // 검색할 장비 옵션3
  const [itemList, setItemList] = useState<Array<IItemInfo>>([]);

  const [statusList, setStatusList] = useState<Array<IItemOptionInfo>>([]);

  var menuList = [
    // prettier-ignore
    ["종류", "용장비", "북방장비", "중국전설", "일본전설", "환웅장비", "백제/황산벌", "전우치/구미호", "타계장비", "흉수계/봉래산", "생산장비", "격전지/전장", "승급장비", "합성노리개",],
    ["부위", "목/어깨장식", "투구", "얼굴장식", "무기", "갑옷", "방패/보조무기", "손", "망토", "보조", "신발", "세트", "장신구"],
    ["직업", "공용", "전사", "도적", "주술사", "도사", "궁사", "천인", "마도사", "영술사", "차사"],
  ];

  var tableList = ["방어도", "명중률", "방어구관통", "방어도무시", "공격력증가", "마력증강", "직타저항", "대인방어", "전투력증가"];

  const [equipSlotList, setEquipSlotList] = useState<Array<IEquipSlot>>([
    { num: 1, type: "목/어깨장식", name: "목/어깨장식", status: { type: "0", option: 0 } },
    { num: 2, type: "투구", name: "투구", status: { type: "0", option: 0 } },
    { num: 3, type: "얼굴장식", name: "얼굴장식", status: { type: "0", option: 0 } },
    { num: 4, type: "무기", name: "무기", status: { type: "0", option: 0 } },
    { num: 5, type: "갑옷", name: "갑옷", status: { type: "0", option: 0 } },
    { num: 6, type: "방패/보조무기", name: "방패/보조무기", status: { type: "0", option: 0 } },
    { num: 7, type: "오른손", name: "오른손", status: { type: "0", option: 0 } },
    { num: 8, type: "망토", name: "망토", status: { type: "0", option: 0 } },
    { num: 9, type: "왼손", name: "왼손", status: { type: "0", option: 0 } },
    { num: 10, type: "보조1", name: "보조1", status: { type: "0", option: 0 } },
    { num: 11, type: "신발", name: "신발", status: { type: "0", option: 0 } },
    { num: 12, type: "보조2", name: "보조2", status: { type: "0", option: 0 } },
    { num: 13, type: "세트", name: "세트", status: { type: "0", option: 0 } },
    { num: 14, type: "장신구", name: "장신구", status: { type: "0", option: 0 } },
  ]);

  const [dlgItem, setDlgItem] = useState({
    isOpen: false,
    title: "0",
    parts: 1,
  });

  const itemName = itemList.map(item => (
    <Chip
      className={classes.itemChip}
      label={item.name}
      key={item.name}
      variant='outlined'
      color={dlgItem.title === item.name ? "primary" : "default"}
      onClick={() => {
        setDlgItem({ ...dlgItem, title: item.name });
        loadData(item.name);
      }}
    />
  ));

  const inputName = (name: string) => {
    if (name === "") {
      setSearchName("");
      setItemList([]);
    } else {
      setSearchName(name);
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
    setSearchName("");

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
      setSearchName("");
    } else {
      searchByName(equipSlotList[num].name, equipSlotList[num].num);
    }
  };

  // 해당 아이템의 스텟 데이터 불러오기
  const loadData = async (name: string) => {
    const res = await SearchOptionByName(name);
    var temp = Array<IItemOptionInfo>();
    res.forEach(r => temp.push(r));

    console.log(temp);
  };

  return (
    <React.Fragment>
      <Container style={{ width: "98%", margin: "10px 1%", padding: "0", float: "left" }}>
        <Container style={{ width: "auto", border: "1px solid gray", borderRadius: "10px", margin: "10px", padding: "5px", float: "left" }}>
          <TextField variant='outlined' label='힘' className={classes.stat} />
          <TextField variant='outlined' label='민첩' className={classes.stat} />
          <TextField variant='outlined' label='지력' className={classes.stat} />
          <TextField variant='outlined' label='건강' className={classes.stat} />
          <TextField variant='outlined' label='지혜' className={classes.stat} />
        </Container>

        <Container style={{ width: "auto", border: "1px solid gray", borderRadius: "10px", margin: "10px", padding: "5px", float: "left" }}>
          {equipSlotList.map((equipSlot: IEquipSlot, idx: number) => {
            return (
              <Button
                variant='outlined'
                color={equipSlot.type === equipSlot.name ? "primary" : "secondary"}
                key={idx}
                className={classes.btn}
                onClick={() => {
                  fixedOption(idx);
                  setDlgItem({ ...dlgItem, isOpen: true, parts: equipSlot.num });
                }}>
                {equipSlot.name}
              </Button>
            );
          })}
        </Container>
      </Container>

      <Dialog
        open={dlgItem.isOpen}
        onClose={() => {
          setDlgItem({ ...dlgItem, isOpen: false });
        }}>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>장비 능력치</span>
          <Button
            onClick={() => {
              setDlgItem({ ...dlgItem, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ width: "500px", maxWidth: "500px", padding: "10px", margin: "0" }}>
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
              minHeight: "70px",
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

          <TableContainer style={{ margin: "5px 0", padding: "0 50px", textAlign: "center", float: "left" }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "50%" }}>종류</TableCell>
                  <TableCell style={{ width: "50%" }}>수치</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableList.map((status: string, idx: number) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>{status}</TableCell>
                      <TableCell>{idx}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Container style={{ width: "100%", margin: "5px 0", padding: "0 50px", textAlign: "center", float: "left" }}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              onClick={() => {
                setDlgItem({ ...dlgItem, isOpen: false });
                if (itemList.length !== 0) {
                  equipSlotList[dlgItem.parts - 1].name = dlgItem.title;
                } else {
                  equipSlotList[dlgItem.parts - 1].name = equipSlotList[dlgItem.parts - 1].type;
                }
                setEquipSlotList(equipSlotList);
              }}>
              적용
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
