import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getBaseUrlForExpImg } from "utils/ConfigUtil";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import IExp from "interfaces/Calculator/IExp";
import expTable from "conf/expTable.json";

const useStyles = makeStyles({
  inLevel: {
    width: "140px",
    margin: "0 5px",
    float: "right",
    "& input": {
      height: "35px",
      padding: "0 5px",
      textAlign: "center",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
  inExp: {
    width: "225px",
    margin: "0 5px",
    float: "left",
    "& input": {
      height: "35px",
      padding: "0 5px",
      textAlign: "center",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
  text: {
    width: "225px",
    lineHeight: "35px",
    margin: "0 5px",
    textAlign: "center",
    color: "black",
    fontSize: "1rem",
    fontWeight: "bold",
    float: "left",
  },
  btn: {
    height: "35px",
    textAlign: "center",
    float: "left",
    margin: "0 5px",
    boxShadow: "none",
  },
  title: {
    width: "225px",
    lineHeight: "35px",
    margin: "0 5px",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    float: "left",
  },
  table: {
    border: "1px solid",
    borderCollapse: "collapse",
    float: "left",
    "& th, td": {
      height: "4vh",
      border: "none",
      fontSize: "1rem",
      padding: "2px",
      textAlign: "center",
    },
    "& th": {
      borderBottom: "1px solid",
      fontSize: "1rem",
      fontWeight: "bolder",
    },
  },
  box: {
    margin: "10px 0",
    padding: "10px 25px",
    border: "1px solid",
    float: "left",
  },
  boxTable: {
    margin: "10px 0",
    padding: "5px 0",
  },
});

export default function Exp() {
  const classes = useStyles();
  const baseUrlForExpImg = getBaseUrlForExpImg();

  const [openHelper, setOpenHelper] = useState<boolean>(false);

  const [level, setLevel] = useState<number>(0);
  const [myExp, setMyExp] = useState({ num: 0, str: "보유 경험치" });
  const [needExp, setNeedExp] = useState<string>("0"); // 체력 1당 필요 경험치 (string)
  const [hp, setHp] = useState<number>(0); // 목표 체력 (number)
  const [maxHp, setMaxHp] = useState<number>(0); // 해당 레벨의 최대 체력 (number)
  const [increasedHp, setIncreasedHp] = useState<number>(0); // myExpString / needExp
  const [requiredExp, setRequiredExp] = useState<string>("0"); // hp * needExp

  const [temp, setTemp] = useState<Array<IExp>>([]); // exp.json 전체를 저장하는 배열
  const [datas, setDatas] = useState<Array<IExp>>([
    { 순수체력: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
    { 순수체력: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
    { 순수체력: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
  ]); // 레벨에 맞는 json 값만 저장하는 배열

  const fillTable = (lev: number) => {
    let num: number = lev - 700;
    const r: Array<IExp> = [];

    for (var c = num; c < num + 3; c++) {
      r.push(temp[c]);
    }

    setNeedExp(r[1].필요경험치1);
    setMaxHp(r[1].최대);
    setDatas(r);
  };

  const numToText = (num: number) => {
    let len: string = num.toString();
    let text: string = "0";

    if (len.length > 15) {
      setMyExp({ ...myExp, num: 0 });
      return 0;
    } else if (len.length > 12 && len.length < 15) {
      text = `${len.substr(0, len.length - 12)}경 ${len.substr(len.length - 12, 4)}조 ${len.substr(len.length - 8, 4)}억 ${len.substr(len.length - 4, 4)}만`;
    } else if (len.length > 8 && len.length < 13) {
      text = `${len.substr(0, len.length - 8)}조 ${len.substr(len.length - 8, 4)}억 ${len.substr(len.length - 4, 4)}만`;
    } else if (len.length < 9 && len.length > 4) {
      text = `${len.substr(0, len.length - 4)}억 ${len.substr(len.length - 4, 4)}만`;
    } else if (len.length < 5 && len.length > 0) {
      text = `${num}만`;
    }

    return text;
  };

  const textToNum = (text: string) => {
    let b: string[] = text.split(" "); // needExp
    let num: number = 0;

    if (b.length === 3) {
      let c = b[0] + b[1] + b[2];
      num = parseInt(c.substr(0, c.length - 11) + c.substr(c.length - 10, 4) + c.substr(c.length - 5, 4));
      return num;
    } else if (b.length === 2) {
      let c = b[0] + b[1];
      num = parseInt(c.substr(0, c.length - 6) + c.substr(c.length - 5, 4));
      return num;
    } else {
      return 0;
    }
  };

  const calculateExp = (e1: number, e2: string) => {
    let getMyExp: number = e1; // myExp
    let getNeedExp: number = textToNum(e2); // needExp
    let res: number = Math.floor(getMyExp / getNeedExp);

    if (res >= maxHp) {
      setIncreasedHp(maxHp);
    } else if (res === 0) {
      setMyExp({ num: 0, str: "0" });
      setIncreasedHp(0);
    } else {
      setIncreasedHp(res);
    }
  };

  const calculateHp = (n1: number, n2: string) => {
    let getHp: number = n1; // hp
    let getNeedExp: number = textToNum(n2); // needExp (만 단위)
    let res: number = Math.floor(getHp * getNeedExp);
    let text: string = numToText(res).toString();

    setRequiredExp(text);
  };

  useEffect(() => {
    setTemp(expTable);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container style={{ width: "40vw", padding: "0 20px", float: "left" }}>
        <Container className={classes.box} style={{ border: "none", padding: "0" }}>
          <Typography className={classes.title} style={{ fontSize: "1.25rem", margin: "0" }}>
            경험치 계산기 for 격수
          </Typography>
          <Button
            className={classes.btn}
            variant='outlined'
            color='primary'
            style={{ float: "right" }}
            onClick={() => {
              if (level >= 700 && level < 799) fillTable(level);
              else setLevel(0);
            }}>
            설정
          </Button>

          <TextField
            className={classes.inLevel}
            type='number'
            placeholder='레벨 (700~798)'
            variant='outlined'
            value={level || ""}
            onChange={e => {
              setLevel(parseInt(e.target.value));
            }}
          />
        </Container>

        <Container className={classes.boxTable}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>순수 체력</TableCell>
                <TableCell>레벨</TableCell>
                <TableCell>최소</TableCell>
                <TableCell>필요 경험치</TableCell>
                <TableCell>최대</TableCell>
                <TableCell>필요 경험치</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((row, index) => (
                <TableRow key={index} selected={index === 1}>
                  <TableCell scope='row'>{row.순수체력 || 0}</TableCell>
                  <TableCell>{row.레벨 || 0}</TableCell>
                  <TableCell>{row.최소 || 0}</TableCell>
                  <TableCell>{row.필요경험치1 || 0}</TableCell>
                  <TableCell>{row.최대 || 0}</TableCell>
                  <TableCell>{row.필요경험치2 || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
        <Container className={classes.box}>
          <Typography className={classes.text}>{isNaN(myExp.num) || myExp.num === 0 ? "보유 경험치" : myExp.str}</Typography>
          <Typography className={classes.title} style={{ width: "64px", margin: "0 5px" }}>
            ▶
          </Typography>
          <Typography className={classes.text}>체력 상승량</Typography>

          <TextField
            className={classes.inExp}
            placeholder='1만 ~ 경험치 최대량'
            variant='outlined'
            value={myExp.num || ""}
            onChange={e => {
              if (e.target.value.length < 14 && needExp !== "0") {
                setMyExp({ num: parseInt(e.target.value), str: numToText(parseInt(e.target.value)).toString() });
                setIncreasedHp(0);
              } else {
                setMyExp({ num: 0, str: "보유 경험치" });
              }
            }}
          />
          <Button
            className={classes.btn}
            variant='contained'
            color='primary'
            onClick={e => {
              if (needExp !== "0" && myExp.num !== 0 && !isNaN(myExp.num)) {
                calculateExp(myExp.num, needExp);
              }
            }}>
            변환
          </Button>
          <TextField variant='outlined' value={increasedHp} className={classes.inExp} disabled={true} />
        </Container>
        <Container className={classes.box}>
          <Typography className={classes.text}>목표 체력량</Typography>
          <Typography className={classes.title} style={{ width: "64px", margin: "0 5px" }}>
            ▶
          </Typography>
          <Typography className={classes.text}>필요 경험치</Typography>

          <TextField
            className={classes.inExp}
            type='number'
            placeholder='1 ~ 최대 체력'
            variant='outlined'
            value={hp || ""}
            onChange={e => {
              if (parseInt(e.target.value) <= maxHp && parseInt(e.target.value) > 0) {
                setHp(parseInt(e.target.value));
              } else {
                setHp(0);
              }
            }}
          />
          <Button
            className={classes.btn}
            variant='contained'
            color='primary'
            onClick={e => {
              if (needExp !== "0" && hp !== 0) {
                calculateHp(hp, needExp);
              }
            }}>
            변환
          </Button>
          <TextField variant='outlined' className={classes.inExp} value={requiredExp} disabled={true} />
        </Container>
        <Container className={classes.box} style={{ border: "none", textAlign: "center" }}>
          <Button variant='outlined' color='primary' onClick={() => setOpenHelper(true)}>
            격수용 마력별 필요경험치표
          </Button>
        </Container>
      </Grid>

      <Dialog
        open={openHelper}
        maxWidth='lg'
        onClose={() => {
          setOpenHelper(false);
        }}>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <span style={{ fontWeight: "bolder" }}>격수용 마력별 필요경험치표</span>
        </DialogTitle>
        <DialogContent style={{ padding: "10px" }}>
          <img src={baseUrlForExpImg + "mana.png"} alt='마력별 필요경험치표' />
        </DialogContent>
        <DialogActions style={{ padding: "0" }}>
          <Button
            color='primary'
            onClick={() => {
              setOpenHelper(false);
            }}
            style={{ fontWeight: "bolder" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
