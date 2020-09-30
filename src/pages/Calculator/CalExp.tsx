import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import expTable from "interfaces/Calculator/exp";

const useStyles = makeStyles({
  inLevel: {
    width: "140px",
    lineHeight: "28px",
    margin: "0 5px",
    float: "left",
  },

  inExp: {
    width: "225px",
    lineHeight: "28px",
    margin: "0 5px",
    float: "left",
  },

  btn: {
    height: "36px",
    textAlign: "center",
    float: "left",
    margintLeft: "5px",
  },

  title: {
    height: "36px",
    lineHeight: "36px",
    margin: "0 5px",
    textAlign: "center",
    verticalAlign: "middle",
    float: "left",
    color: "black",
  },

  table: {
    border: "1px solid",
    borderCollapse: "collapse",
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
      fontWeight: "bold",
    },
  },
});

export default function CalExp() {
  const [level, setLevel] = useState<number>(0); // 나의 레벨(number)
  const [myExp, setMyExp] = useState<number>(0); // 보유 경험치 (number)
  const [myExp2, setMyExp2] = useState<string>("0"); // 보유 경험치 (string)
  const [needExp, setNeedExp] = useState<string>("0"); // 체력 1당 필요 경험치 (string)
  const [hp, setHp] = useState<number>(0); // 목표 체력 (number)
  const [maxHp, setMaxHp] = useState<number>(0); // 해당 레벨의 최대 체력 (number)
  const [result1, setResult1] = useState<number>(0); // 상승 체력량(number) = 보유 경험치 / 체력 1당 필요 경험치
  const [result2, setResult2] = useState<string>("0"); // 필요 경험치량(string) = 목표 체력 * 체력 1당 필요 경험치

  const [temp, setTemp] = useState<Array<expTable>>([]); // exp.json 전체를 저장하는 배열
  const [datas, setDatas] = useState<Array<expTable>>([
    { 순수체력: "0", 레벨: "0", 최소체력: "0", 필요경험치: "0", 최대체력: "0", 필요경험치2: "0" },
    { 순수체력: "0", 레벨: "0", 최소체력: "0", 필요경험치: "0", 최대체력: "0", 필요경험치2: "0" },
    { 순수체력: "0", 레벨: "0", 최소체력: "0", 필요경험치: "0", 최대체력: "0", 필요경험치2: "0" },
  ]); // 레벨에 맞는 json 값만 저장하는 배열

  const classes = useStyles();

  const fillTable = (lev: number, arr: any) => {
    let num: number = lev - 700;
    const r: Array<expTable> = [];

    for (var c = num; c < num + 3; c++) {
      r.push(arr[c]);
    }

    setNeedExp(r[1].필요경험치);
    setMaxHp(parseInt(r[1].최대체력));

    return r;
  };

  const numToText = (num: number) => {
    let len: string = num.toString();
    let text: string = "0";

    if (len.length > 15) {
      setMyExp(0);
      return 0;
    } else if (len.length > 12 && len.length < 15) {
      text =
        len.substr(0, len.length - 12) +
        "경 " +
        len.substr(len.length - 12, 4) +
        "조 " +
        len.substr(len.length - 8, 4) +
        "억 " +
        len.substr(len.length - 4, 4) +
        "만";
    } else if (len.length > 8 && len.length < 13) {
      text =
        len.substr(0, len.length - 8) +
        "조 " +
        len.substr(len.length - 8, 4) +
        "억 " +
        len.substr(len.length - 4, 4) +
        "만";
    } else if (len.length < 9 && len.length > 4) {
      text = len.substr(0, len.length - 4) + "억 " + len.substr(len.length - 4, 4) + "만";
    } else if (len.length < 5 && len.length > 0) {
      text = num + "만";
    }

    return text;
  };

  const textToNum = (text: string) => {
    let b: string[] = text.split(" "); // needExp

    if (b.length === 3) {
      let c = b[0] + b[1] + b[2];
      let d = c.substr(0, c.length - 11) + c.substr(c.length - 10, 4) + c.substr(c.length - 5, 4);
      return parseInt(d);
    } else if (b.length === 2) {
      let c = b[0] + b[1];
      let d = c.substr(0, c.length - 6) + c.substr(c.length - 5, 4);
      return parseInt(d);
    } else {
      return 0;
    }
  };

  const calculateExp = (e1: number, e2: string) => {
    let a: number = e1; // myExp
    let b: number = textToNum(e2); // needExp
    let res: number = Math.floor(a / b);

    if (res >= maxHp) {
      setResult1(maxHp);
    } else if (res === 0) {
      setMyExp(0);
      setMyExp2("0");
      setResult1(0);
    } else {
      setResult1(res);
    }
  };

  const calculateHp = (n1: number, n2: string) => {
    let a: number = n1; // hp
    let b: number = textToNum(n2); // needExp (만 단위)
    let res: number = Math.floor(a * b);
    let text: string = numToText(res).toString();

    setResult2(text);
  };

  useEffect(() => {
    axios.get("./expTable.json").then((res) => {
      for (var k = 0; k < 101; k++) {
        temp.push(res.data[k]);
      }
      setTemp(temp);
    });

    // eslint-disable-next-line
  }, []);

  return (
    /* eslint-disable jsx-a11y/anchor-is-valid */
    <React.Fragment>
      <Container
        component="div"
        style={{
          width: "600px",
          height: "46px",
          margin: "20px",
          padding: "5px",
        }}
      >
        <Link
          underline="none"
          className={classes.title}
          style={{ marginRight: "160px", fontSize: "1.25rem", fontWeight: "bold" }}
        >
          경험치 계산기 for 격수
        </Link>
        <TextField
          className={classes.inLevel}
          placeholder="레벨 (700~798)"
          variant="outlined"
          inputProps={{ style: { height: "30px", padding: "3px", textAlign: "center" } }}
          value={level || ""}
          onChange={(e) => {
            setLevel(parseInt(e.target.value));
          }}
          autoComplete="off"
        />

        <Button
          className={classes.btn}
          variant="outlined"
          color="primary"
          onClick={() => {
            if (level >= 700 && level < 799) setDatas(fillTable(level, temp));
            else setLevel(0);
          }}
        >
          설정
        </Button>
      </Container>
      <TableContainer component={Paper} elevation={0} style={{ width: "600px", margin: "15px", padding: "5px" }}>
        <Table className={classes.table} component="table" aria-label="customized table" style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "13%" }}>순수체력</TableCell>
              <TableCell style={{ width: "10%" }}>레벨</TableCell>
              <TableCell style={{ width: "12%" }}>최소체력</TableCell>
              <TableCell style={{ width: "26%" }}>필요 경험치</TableCell>
              <TableCell style={{ width: "12%" }}>최대체력</TableCell>
              <TableCell style={{ width: "26%" }}>필요 경험치</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((row, index) => (
              <TableRow key={index} selected={index === 1}>
                <TableCell scope="row">{row.순수체력 || 0}</TableCell>
                <TableCell>{row.레벨 || 0}</TableCell>
                <TableCell>{row.최소체력 || 0}</TableCell>
                <TableCell>{row.필요경험치 || 0}</TableCell>
                <TableCell>{row.최대체력 || 0}</TableCell>
                <TableCell>{row.필요경험치2 || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Container
        component="div"
        style={{ width: "600px", height: "100px", margin: "20px", padding: "10px 25px", border: "1px solid" }}
      >
        <Link underline="none" className={classes.title} style={{ margin: "0", width: "230px" }}>
          {myExp2 || "보유 경험치"}
        </Link>
        <Link underline="none" className={classes.title} style={{ margin: "0 30px 0 30px", width: "25px" }}>
          ▶&nbsp;
        </Link>
        <Link underline="none" className={classes.title} style={{ margin: "0", width: "230px" }}>
          체력 샹승량
        </Link>
        <br />
        <TextField
          className={classes.inExp}
          placeholder="1만 ~ 경험치 최대량"
          variant="outlined"
          inputProps={{
            style: { height: "30px", padding: "3px", textAlign: "center" },
          }}
          style={{ marginLeft: "5px" }}
          value={myExp || ""}
          onChange={(e) => {
            if (e.target.value.length < 14 && e.target.value.length > 0) {
              setMyExp(parseInt(e.target.value));
              setMyExp2(numToText(parseInt(e.target.value)).toString());
              setResult1(0);
            }
          }}
          autoComplete="off"
        ></TextField>
        <Button
          className={classes.btn}
          variant="outlined"
          color="primary"
          onClick={(e) => {
            if (needExp !== "0") {
              calculateExp(myExp, needExp);
            } else {
              setMyExp(0);
              setMyExp2("0");
            }
          }}
          style={{ margin: "0 5px" }}
        >
          변환
        </Button>
        <Link
          className={classes.title}
          style={{
            border: "1px solid lightgray",
            borderRadius: "3px",
            width: "223px",
            height: "34px",
            textDecoration: "none",
            color: "black",
          }}
        >
          {result1}
        </Link>
      </Container>
      <Container
        component="div"
        style={{ width: "600px", height: "100px", margin: "20px", padding: "10px 25px", border: "1px solid" }}
      >
        <Link underline="none" className={classes.title} style={{ margin: "0", width: "230px" }}>
          목표 체력량
        </Link>
        <Link underline="none" className={classes.title} style={{ margin: "0 30px 0 30px", width: "20px" }}>
          ▶&nbsp;
        </Link>
        <Link underline="none" className={classes.title} style={{ margin: "0", width: "230px" }}>
          필요 경험치
        </Link>
        <br />
        <TextField
          className={classes.inExp}
          placeholder="1 ~ 최대 체력"
          variant="outlined"
          value={hp || ""}
          inputProps={{ style: { height: "30px", padding: "3px", textAlign: "center" } }}
          onChange={(e) => {
            if (parseInt(e.target.value) <= maxHp && parseInt(e.target.value) > 0) {
              setHp(parseInt(e.target.value));
            } else {
              setHp(0);
            }
          }}
          autoComplete="off"
        ></TextField>
        <Button
          className={classes.btn}
          variant="outlined"
          color="primary"
          onClick={(e) => {
            if (needExp !== "0") {
              calculateHp(hp, needExp);
            }
          }}
          style={{ margin: "0 5px" }}
        >
          변환
        </Button>
        <Link
          className={classes.title}
          style={{
            border: "1px solid lightgray",
            borderRadius: "3px",
            width: "223px",
            height: "34px",
            textDecoration: "none",
            color: "black",
          }}
        >
          {result2}
        </Link>
      </Container>
    </React.Fragment>
  );
}
