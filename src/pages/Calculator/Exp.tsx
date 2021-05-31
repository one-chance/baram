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
import expTable2 from "conf/expTable2.json";

const useStyles = makeStyles({
  input: {
    width: "200px",
    margin: "0",
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
    width: "200px",
    lineHeight: "30px",
    margin: "0",
    textAlign: "center",
    color: "black",
    fontSize: "1rem",
    fontWeight: "bold",
    float: "left",
  },
  btn: {
    minWidth: "60px",
    height: "35px",
    textAlign: "center",
    float: "left",
    margin: "0",
    padding: "0",
    boxShadow: "none",
  },
  table: {
    border: "1px solid",
    borderCollapse: "collapse",
    float: "left",
    "& th, td": {
      height: "32px",
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
    padding: "10px 0",
    border: "1px solid",
  },
  boxTable: {
    margin: "10px 0",
    padding: "5px 0",
  },
});

export default function Exp() {
  const classes = useStyles();
  const baseUrlForExpImg = getBaseUrlForExpImg();
  const [toggle, setToggle] = useState(true);
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
    { 순수: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
    { 순수: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
    { 순수: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
  ]); // 레벨에 맞는 json 값만 저장하는 배열

  const fillTable = (lev: number) => {
    let num: number = lev - 700;
    let r: Array<IExp> = [];

    for (var c = num; c < num + 3; c++) {
      r.push(temp[c]);
    }

    setNeedExp(r[1].필요경험치1);
    setMaxHp(r[1].최대);
    setDatas(r);
  };

  const numToText = (num: number) => {
    let len: string = num.toString();

    if (len.length > 15) {
      setMyExp({ ...myExp, num: 0 });
      return 0;
    } else if (len.length > 12 && len.length < 15) {
      return `${len.substr(0, len.length - 12)}경 ${len.substr(len.length - 12, 4)}조 ${len.substr(len.length - 8, 4)}억 ${len.substr(len.length - 4, 4)}만`;
    } else if (len.length > 8 && len.length < 13) {
      return `${len.substr(0, len.length - 8)}조 ${len.substr(len.length - 8, 4)}억 ${len.substr(len.length - 4, 4)}만`;
    } else if (len.length < 9 && len.length > 4) {
      return `${len.substr(0, len.length - 4)}억 ${len.substr(len.length - 4, 4)}만`;
    } else if (len.length < 5 && len.length > 0) {
      return `${num}만`;
    }
  };

  const textToNum = (text: string) => {
    let str: string[] = text.split(" "); // needExp
    let temp: string = "";

    if (str.length === 3) {
      temp = str[0] + str[1] + str[2];
      return parseInt(temp.substr(0, temp.length - 11) + temp.substr(temp.length - 10, 4) + temp.substr(temp.length - 5, 4));
    } else if (str.length === 2) {
      temp = str[0] + str[1];
      return parseInt(temp.substr(0, temp.length - 6) + temp.substr(temp.length - 5, 4));
    } else if (str.length === 1) {
      temp = text;
      return parseInt(temp.substr(0, temp.length)) * 10000;
    } else {
      return 0;
    }
  };

  const calculateExp = (e1: number, e2: string) => {
    let getMyExp: number = e1; // myExp
    let getNeedExp: number = textToNum(e2); // needExp
    let res: number = Math.floor(getMyExp / getNeedExp);

    if (getNeedExp === 0 || getMyExp === 0 || isNaN(getMyExp)) {
      return 0;
    }

    if (res >= maxHp) {
      return maxHp;
    } else if (res === 0) {
      setMyExp({ num: 0, str: "0" });
      return 0;
    } else {
      return res;
    }
  };

  const calculateHp = (n1: number, n2: string) => {
    let getHp: number = n1; // hp
    let getNeedExp: number = textToNum(n2); // needExp (만 단위)
    let res: number = Math.floor(getHp * getNeedExp);
    return numToText(res);
  };

  const switchToggle = () => {
    setToggle(!toggle);
    setDatas([
      { 순수: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
      { 순수: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
      { 순수: 0, 레벨: 0, 최소: 0, 필요경험치1: "0", 최대: 0, 필요경험치2: "0" },
    ]);
    setLevel(0);
    if (toggle) {
      setTemp(expTable2);
    } else {
      setTemp(expTable);
    }
  };

  useEffect(() => {
    setTemp(expTable);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container style={{ margin: "10px 0", padding: "0" }}>
        <Grid item container direction='column' style={{ minWidth: "500px", maxWidth: "620px", margin: "0 5px", padding: "0", float: "left" }}>
          <Grid container justify='space-between' className={classes.box} style={{ border: "none", padding: "0" }}>
            <div>
              <Typography style={{ width: "160px", lineHeight: "35px", fontSize: "1.25rem", fontWeight: "bold", textAlign: "center", float: "left" }}>
                경험치 계산기 for
              </Typography>
              <Button
                className={classes.btn}
                variant='outlined'
                color={toggle ? "primary" : "secondary"}
                style={{ minWidth: "80px", margin: "0 10px", fontSize: "1.25rem", fontWeight: "bold" }}
                onClick={switchToggle}>
                {toggle ? "격수" : "비격수"}
              </Button>
            </div>
            <div>
              <TextField
                className={classes.input}
                type='number'
                placeholder='레벨 (700~798)'
                variant='outlined'
                value={level || ""}
                style={{ width: "140px", margin: "0 5px" }}
                onChange={e => {
                  setLevel(parseInt(e.target.value));
                }}
              />
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={() => {
                  if (level >= 700 && level < 799) fillTable(level);
                  else setLevel(0);
                }}>
                설정
              </Button>
            </div>
          </Grid>

          <Container className={classes.boxTable}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>{toggle ? "순수 체력" : "순수 마력"}</TableCell>
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
                    <TableCell scope='row'>{row.순수 || 0}</TableCell>
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

          <Grid item container direction='row' alignItems='flex-end' justify='center' className={classes.box}>
            <Grid item style={{ maxWidth: "210px", padding: "5px" }}>
              <Typography className={classes.text}>{isNaN(myExp.num) || myExp.num === 0 ? "보유 경험치" : myExp.str}</Typography>
              <TextField
                className={classes.input}
                placeholder='1만 ~ 경험치 최대량'
                variant='outlined'
                value={myExp.num || ""}
                onChange={e => {
                  if (e.target.value.length < 14 && needExp !== "0") {
                    setMyExp({ num: parseInt(e.target.value), str: numToText(parseInt(e.target.value)) as string });
                    setIncreasedHp(0);
                  } else {
                    setMyExp({ num: 0, str: "보유 경험치" });
                  }
                }}
              />
            </Grid>
            <Grid item style={{ margin: "5px", padding: "0" }}>
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={e => {
                  setIncreasedHp(calculateExp(myExp.num, needExp) as number);
                }}>
                변환
              </Button>
            </Grid>
            <Grid item style={{ maxWidth: "210px", padding: "5px" }}>
              <Typography className={classes.text}>{toggle ? "체력 상승량" : "마력 상승량"}</Typography>
              <TextField variant='outlined' value={increasedHp} className={classes.input} disabled={true} />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='flex-end' justify='center' className={classes.box}>
            <Grid item style={{ maxWidth: "210px", padding: "5px" }}>
              <Typography className={classes.text}>{toggle ? "목표 체력량" : "목표 마력량"}</Typography>
              <TextField
                className={classes.input}
                type='number'
                placeholder={toggle ? "1 ~ 최대 체력" : "1 ~ 최대 마력"}
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
            </Grid>
            <Grid item style={{ margin: "5px", padding: "0" }}>
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={e => {
                  setRequiredExp(calculateHp(hp, needExp) as string);
                }}>
                변환
              </Button>
            </Grid>
            <Grid item style={{ maxWidth: "210px", padding: "5px" }}>
              <Typography className={classes.text}>필요 경험치</Typography>
              <TextField variant='outlined' className={classes.input} value={requiredExp} disabled={true} />
            </Grid>
          </Grid>

          <Grid container justify='center' style={{ width: "auto", margin: "10px", border: "none", textAlign: "center" }}>
            <Button variant='outlined' color='primary' onClick={() => setOpenHelper(true)} style={{ height: "35px", margin: "0 10px" }}>
              격수용 마력별 필요경험치표
            </Button>
            {/*             <Button variant='outlined' color='primary' onClick={() => setOpenHelper(true)} style={{ height: "35px", margin: "0 10px" }}>
              비격수용 체력별 필요경험치표
            </Button> */}
          </Grid>
        </Grid>
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
        <DialogContent dividers={true} style={{ padding: "10px" }}>
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
