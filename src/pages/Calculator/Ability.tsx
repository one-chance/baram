import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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

import { SearchItemByOption } from "../../utils/CalUtil";

const useStyles = makeStyles({
  btn: {
    height: "36px",
    textAlign: "center",
    float: "left",
    margintLeft: "5px",
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

  select: {
    width: "140px",
    height: "40px",
    padding: "1px",
    margin: "5px",
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
    maxWidth: "360px",
    margin: "10px 50px",
    borderCollapse: "collapse",
    "& th, td": {
      border: "1px solid lightgray",
      textAlign: "center",
      fontSize: "1rem",
      padding: "0",
    },
    "& th": {
      fontWeight: "bold",
    },
  },
});

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Ability() {
  const classes = useStyles();

  const [search, setSearch] = useState("0");
  const [option1, setOption1] = useState(0);
  const [option2, setOption2] = useState(0);
  const [option3, setOption3] = useState(0);
  const [nameList, setNameList] = useState<string[]>([]);

  const itemName = nameList.map(item => <Chip label={item} key={item} variant='outlined' clickable={true} style={{ height: "30px", margin: "2.5px" }} />);

  const [dlgItem, setDlgItem] = useState({
    isOpen: false,
    title: "",
  });

  const searchByName = async (name: string) => {
    const res = await SearchItemByOption(search, option1, option2, option3);
    setNameList(res);
    // 이름 직접 검색
  };

  const loadItemList = (typeA: number, typeB: number, typeC: number) => {
    let abc = typeA + typeB + typeC;
    // chip 생성할 이름 받아오기
  };

  const searchByList = (name: string) => {
    console.log(name);
    // 리스트 통해서 검색
  };

  return (
    <React.Fragment>
      <Container style={{ width: "90%", margin: "10px 5%", padding: "0" }}>
        <Container style={{ width: "100%", border: "1px solid gray", borderRadius: "10px" }}>
          <h2>123</h2>
          <Button
            className={classes.btn}
            variant='outlined'
            color='primary'
            onClick={() => {
              setDlgItem({ ...dlgItem, isOpen: true });
            }}>
            장비
          </Button>
        </Container>
      </Container>

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
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={e => {
                searchByName(search);
              }}
              style={{ height: "40px", marginLeft: "-5px", borderBottomLeftRadius: "0", borderTopLeftRadius: "0" }}>
              검색
            </Button>
          </Container>
          <Container style={{ margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <Select
              variant='outlined'
              className={classes.select}
              defaultValue={0}
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
              defaultValue={0}
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
              defaultValue={0}
              MenuProps={{ disableScrollLock: true }}
              onChange={e => {
                setOption3(Number(e.target.value));
              }}>
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
          </Container>
          <Container style={{ margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                searchByList("쇄자황금투구");
              }}
              style={{ width: "140px", color: "white" }}>
              <ArrowDownwardIcon />
            </Button>
          </Container>
          <Container
            style={{
              width: "96%",
              minHeight: "82px",
              margin: "5px 2%",
              padding: "5px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              textAlign: "center",
              float: "left",
            }}>
            {itemName}
          </Container>
          <TableContainer style={{ margin: "5px 0 ", padding: "0 5px", textAlign: "center", float: "left" }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "50%" }}>종류</TableCell>
                  <TableCell style={{ width: "50%" }}>수치</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>방어도</TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>명중률</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>방어구관통</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>방어도무시</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>공격력증가</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>마력증강</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>직타저항</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>대인방어</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>전투력증가</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Container style={{ margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <Button variant='contained' color='primary' style={{ width: "140px", marginLeft: "-12px", color: "white" }}>
              적용
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
