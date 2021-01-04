import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
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
    float: "left",
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
    border: "1px solid",
    borderCollapse: "collapse",
    "& th, td": {
      height: "4vh",
      border: "1px solid",
      fontSize: "1rem",
      padding: "2px",
      textAlign: "center",
    },
    "& th": {
      border: "1px solid",
      fontSize: "1rem",
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

  const [option1, setOption1] = useState(0);
  const [option2, setOption2] = useState(0);
  const [option3, setOption3] = useState(0);

  const [dlgMonster, setDlgMonster] = useState({
    isOpen: false,
    title: "",
  });

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
              setDlgMonster({ ...dlgMonster, isOpen: true });
            }}>
            장비
          </Button>
        </Container>
      </Container>

      <Dialog
        open={dlgMonster.isOpen}
        onClose={() => {
          setDlgMonster({ ...dlgMonster, isOpen: false });
        }}>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>장비 전투력</h2>
          <Button
            onClick={() => {
              setDlgMonster({ ...dlgMonster, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ maxWidth: "480px", padding: "10px 15px" }}>
          <Container style={{ margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <TextField className={classes.itemText} variant='outlined' placeholder='아이템명' />
            <Button variant='contained' color='primary' style={{ height: "40px", marginLeft: "-5px", borderBottomLeftRadius: "0", borderTopLeftRadius: "0" }}>
              검색
            </Button>
          </Container>
          <Container style={{ margin: "5px 0", padding: "0", float: "left" }}>
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
              <Menus value={7}>격전지</Menus>
              <Menus value={8}>생산</Menus>
              <Menus value={9}>전우치/구미호</Menus>
              <Menus value={10}>흉수계</Menus>
              <Menus value={11}>탐라장비</Menus>
              <Menus value={12}>타계장비</Menus>
              <Menus value={13}>승급장비</Menus>
              <Menus value={14}>기타</Menus>
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
              <Menus value={1}>전사</Menus>
              <Menus value={2}>도적</Menus>
              <Menus value={3}>주술사</Menus>
              <Menus value={4}>도사</Menus>
              <Menus value={5}>궁사</Menus>
              <Menus value={6}>천인</Menus>
              <Menus value={7}>마도사</Menus>
              <Menus value={8}>영술사</Menus>
              <Menus value={9}>차사</Menus>
            </Select>
          </Container>
          <Container style={{ margin: "5px 0", padding: "0", textAlign: "center", float: "left" }}>
            <Button variant='contained' color='primary' style={{ width: "150px", color: "white" }}>
              <ArrowDownwardIcon />
            </Button>
          </Container>
          <Container style={{ width: "96%", margin: "5px 2%", padding: "10px", border: "1px solid lightgray", borderRadius: "10px", float: "left" }}>
            123
            <br />
            123
          </Container>
          <TableContainer style={{ margin: "10px 0 ", padding: "5px", textAlign: "center", float: "left" }}>
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
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
