import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import cheerio from "cheerio";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./Power.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemInput: {
      width: "155px",
      margin: "5px",
      float: "left",
      "& input": {
        height: "45px",
        padding: "0 10px",
      },
    },

    powers: {
      width: "60px",
      float: "left",
      margin: "0",
      "& input": { height: "40px", padding: "0", textAlign: "center" },
    },

    plus: {
      width: "15px",
      height: "20px",
      margin: "10px 0",
      float: "left",
      fontSize: "1rem",
      textAlign: "center",
      color: "black",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    select: {
      width: "200px",
      height: "50px",
      padding: "1px",
      margin: "5px",
      color: "blue",
      textAlignLast: "center",
      float: "left",
    },

    select2: {
      width: "90px",
      height: "40px",
      padding: "1px",
      margin: "5px 2.5px",
      color: "blue",
      textAlignLast: "center",
      float: "left",
    },

    selText: {
      width: "80px",
      margin: "5px",
      textAlign: "center",
      float: "left",
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
      },
      "& input": {
        padding: "0",
        height: "50px",
        textAlign: "center",
        color: "blue",
      },
    },

    powerText: {
      width: "150px",
      height: "40px",
      lineHeight: "40px",
      margin: "0 0 0 30%",
      color: "black",
      fontSize: "1rem",
      fontWeight: "bold",
      float: "left",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    sliBox: {
      width: "330px",
      height: "50px",
      padding: "0",
      margin: "0",
    },

    petText: {
      width: "50px",
      height: "40px",
      lineHeight: "40px",
      margin: "5px 2.5px",
      float: "left",
      textAlign: "center",
      color: "black",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    petInput: {
      width: "90px",
      float: "left",
      margin: "5px 20px 5px 0",
      "& input": {
        height: "40px",
        padding: "0",
        textAlign: "center",
      },
    },

    btnTMI: {
      minWidth: "35px",
      height: "35px",
      margin: "5px",
      padding: "0",
      float: "left",
    },

    btnCal: {
      height: "35px",
      margin: "5px",
      padding: "0",
      float: "left",
    },
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

const Menus2 = withStyles({
  root: {
    justifyContent: "center",
  },
})(MenuItem);

export default function Power() {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  const [level, setLevel] = useState<number>(0); // 레벨
  const [levelPower, setLevelPower] = useState<number>(0); // 레벨 전투력 (표기)
  const [itemPower, setItemPower] = useState<number>(0); // 장비 전투력
  const [engravePower, setEngravePower] = useState<number>(0); // 각인 전투력
  const [goldPower, setGoldPower] = useState<number>(0); // 황돋 전투력
  const [skillPower, setSkillPower] = useState<number>(0); // 기술능력 전투력
  const [animalPower, setAnimalPower] = useState<number>(0); // 신수 전투력
  const [petPower, setPetPower] = useState<number>(0); // 환수 전투력

  const [box1, setBox1] = useState<number>(0);
  const [box2, setBox2] = useState<number>(0);
  const [box3, setBox3] = useState<number>(0);
  const [box4, setBox4] = useState<number>(0);
  const [box5, setBox5] = useState<number>(0);
  const [box6, setBox6] = useState<number>(0);
  const [box7, setBox7] = useState<number>(0);
  const [box8, setBox8] = useState<number>(0);

  const [items1, setItems1] = useState<string>("");
  /*
  const [items2, setItems2] = useState<string>("");
  const [items3, setItems3] = useState<string>("");
  const [items4, setItems4] = useState<string>("");
  const [items5, setItems5] = useState<string>("");
  const [items6, setItems6] = useState<string>("");
  const [items7, setItems7] = useState<string>("");
  const [items8, setItems8] = useState<string>("");
  const [items9, setItems9] = useState<string>("");
  const [items10, setItems10] = useState<string>("");
  const [items11, setItems11] = useState<string>("");
  const [items12, setItems12] = useState<string>("");
  const [items13, setItems13] = useState<string>("");
  const [items14, setItems14] = useState<string>("");
  const [items15, setItems15] = useState<number>(0);
  */

  const [engrave1, setEngrave1] = useState<number>(0); // 각인1 종류
  const [engrave2, setEngrave2] = useState<number>(0); // 각인1 수치
  const [engrave3, setEngrave3] = useState<number>(0); // 각인2 종류
  const [engrave4, setEngrave4] = useState<number>(0); // 각인2 수치

  const [gold1, setGold1] = useState<number>(0); // 황돋1 종류
  const [gold2, setGold2] = useState<number>(0); // 황돋1 수치
  const [gold3, setGold3] = useState<number>(0); // 황돋2 종류
  const [gold4, setGold4] = useState<number>(0); // 황돋2 수치
  const [gold5, setGold5] = useState<number>(0); // 황돋3 종류
  const [gold6, setGold6] = useState<number>(0); // 황돋3 수치
  const [gold7, setGold7] = useState<number>(0); // 황돋1 투력
  const [gold8, setGold8] = useState<number>(0); // 황돋2 투력
  const [gold9, setGold9] = useState<number>(0); // 황돋3 투력

  const [animal1, setAnimal1] = useState<number>(5); // 신수등급
  const [animal2, setAnimal2] = useState<number>(99); // 신수레벨
  const [animal3, setAnimal3] = useState<number>(7); // 신수무기
  const [animal4, setAnimal4] = useState<number>(7); // 신수투구
  const [animal5, setAnimal5] = useState<number>(7); // 신수갑옷
  const [animal6, setAnimal6] = useState<number>(2); // 신수장갑1
  const [animal7, setAnimal7] = useState<number>(2); // 신수장갑2
  const [animal8, setAnimal8] = useState<number>(2); // 신수보주

  const [pet1, setPet1] = useState<number>(9); // 환수등급
  const [pet2, setPet2] = useState<number>(99); // 환수레벨
  const [pet3, setPet3] = useState<number>(0); // 환수무기 전투력
  const [pet4, setPet4] = useState<number>(0); // 환수투구 전투력
  const [pet5, setPet5] = useState<number>(0); // 환수갑옷 전투력
  const [pet6, setPet6] = useState<number>(0); // 환수성물 전투력
  const [pet7, setPet7] = useState<number>(0); // 환수성물 전투력
  const [pet8, setPet8] = useState<number>(0); // 환수목걸이 전투력
  const [pet9, setPet9] = useState<number>(0); // 환수문양 전투력
  const [pet10, setPet10] = useState<number>(0); // 환수세트옷 전투력
  const [pet11, setPet11] = useState<number>(0); // 환수신물 전투력

  const loadData = () => {
    let basic = "https://baram.nexon.com/Profile/Info?character=";
    let encodeCharacter = encodeURI("협가검");
    let encodeServer = "%40%ED%95%98%EC%9E%90";

    var option = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization, Content-Length, X-Request-With",
      },
    };

    axios.get(basic + encodeCharacter + encodeServer, option).then((html) => {
      if (html === undefined) throw new Error("NO HTML");

      console.log(html.data);
      const $ = cheerio.load(html.data);
      //const $bodyList = $("div.inner ul").children("li.level");
      //let ary = Number($bodyList.find("span.system").text());
      console.log("성공");
    });
  };

  const calLevel = (lev: number) => {
    let a: number = Math.floor(lev / 100);
    var b: number = lev % 100;
    var c: number = 0;

    switch (a) {
      case 0:
        c = 649.5;
        break;

      case 1:
        c = 1003 + b * 3.5 * a;
        break;

      case 2:
        c = 2056.5 + b * 3.5 * a;
        break;

      case 3:
        c = 3810 + b * 3.5 * a;
        break;

      case 4:
        c = 6263.5 + b * 3.5 * a;
        break;

      case 5:
        c = 9417 + b * 3.5 * a;
        break;

      case 6:
        c = 13270.5 + b * 3.5 * a;
        break;

      case 7:
        c = 17824 + b * 3.5 * a;
        break;
    }
    setLevelPower(Math.round(c));
  };

  const calEngrave = () => {
    setEngravePower(engrave1 * engrave2 + engrave3 * engrave4);
  };

  const calGold1 = (e: React.ChangeEvent<{ value: unknown }>, num: number) => {
    let val: number = 0;

    switch (e.target.value as number) {
      case 1:
        val = 3;
        break;
      case 2:
        val = 0.375;
        break;
      case 3:
      case 4:
      case 5:
        val = 3.75;
        break;
      case 6:
        val = 15;
        break;
      case 7:
        val = 37.5;
        break;
      case 8:
        val = 60;
        break;
      case 9:
        val = 100;
        break;
      case 10:
      case 11:
        val = 1 * 100;
        break;
      case 12:
        val = 0.6 * 100;
        break;
      case 13:
        val = 0.375 * 100;
        break;
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        val = 0.3 * 100;
        break;
    }

    if (num === 1) {
      setGold1(val);
      setGold2(0);
    } else if (num === 2) {
      setGold3(val);
      setGold4(0);
    } else if (num === 3) {
      setGold5(val);
      setGold6(0);
    }
  };

  const calGold2 = (val: number, num: number) => {
    let a: number = Math.abs(val);

    switch (num) {
      case 1:
        if (Math.floor(gold1 * a) <= 300) {
          setGold7(Math.floor(gold1 * a));
        } else {
          setGold2(0);
        }
        break;
      case 2:
        if (Math.floor(gold3 * a) <= 300) {
          setGold8(Math.floor(gold3 * a));
        } else {
          setGold4(0);
        }
        break;
      case 3:
        if (Math.floor(gold5 * a) <= 300) {
          setGold9(Math.floor(gold5 * a));
        } else {
          setGold6(0);
        }
        break;
    }

    setGoldPower(gold7 + gold8 + gold9);
  };

  const calAnimal = () => {
    if (animal1 !== 0 && animal2 !== 0) {
      setAnimalPower(
        animal1 * 400 +
          animal2 * 4 +
          (animal3 * 50 + 250) +
          (animal4 * 50 + 250) +
          (animal5 * 50 + 250) +
          animal6 * 100 +
          animal7 * 100 +
          animal8 * 200
      );
    }
  };

  const calPet = () => {
    setPetPower(
      pet1 * 200 + pet2 * 2 + pet3 + pet4 + pet5 + pet6 + pet7 + pet8 * 100 + pet9 * 100 + pet10 * 100 + pet11 * 100
    );
  };

  const itemsUpdate = (name: string, type: number) => {
    switch (type) {
      case 1:
        setItems1(name);
        break;
      /*
      case 2:
        setItems2(name);
        break;
      case 3:
        setItems3(name);
        break;
      case 4:
        setItems4(name);
        break;
      case 5:
        setItems5(name);
        break;
      case 6:
        setItems6(name);
        break;
      case 7:
        setItems7(name);
        break;
      case 8:
        setItems8(name);
        break;
      case 9:
        setItems9(name);
        break;
      case 10:
        setItems10(name);
        break;
      case 11:
        setItems11(name);
        break;
      case 12:
        setItems12(name);
        break;
      case 13:
        setItems13(name);
        break;
      case 14:
        setItems14(name);
        break;
      case 15:
        setItems15(parseInt(name));
        break;
        */
    }
  };

  const opening = (num: number) => {
    if (ready === true) {
      switch (num) {
        case 1:
          setOpen1(true);
          break;
        case 2:
          setOpen2(true);
          break;
      }
    }
  };

  const closing = (num: number) => {
    switch (num) {
      case 1:
        setOpen1(false);
        break;
      case 2:
        setOpen2(false);
        break;
    }
  };

  useEffect(() => {
    setReady(true);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Container
        style={{
          width: "1117px",
          margin: "10px 20px",
          padding: "0",
          float: "left",
          border: "1px solid gray",
          borderRadius: "10px",
        }}
      >
        <Container style={{ width: "255px", margin: "0", padding: "10px 12.5px", float: "left" }}>
          <TextField
            variant="outlined"
            placeholder="아이디@서버"
            inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
            style={{ width: "175px", marginLeft: "5px", float: "left" }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              minWidth: "50px",
              height: "40px",
              marginLeft: "-5px",
              padding: "0",
              float: "left",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
            }}
          >
            적용
          </Button>
        </Container>
        <Container
          style={{
            width: "620px",
            margin: "0",
            padding: "10px 15px",
            float: "left",
            borderLeft: "1px solid gray",
            borderRight: "1px solid gray",
          }}
        >
          <TextField
            className={classes.powers}
            variant="outlined"
            placeholder="전투력"
            value={box1 || ""}
            onChange={(e) => {
              setBox1(parseInt(e.target.value));
            }}
          />
          <Link className={classes.plus}>+</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="전투력" value={box2 || ""} />
          <Link className={classes.plus}>+</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="전투력" value={box3 || ""} />
          <Link className={classes.plus}>+</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="전투력" value={box4 || ""} />
          <Link className={classes.plus}>+</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="전투력" value={box5 || ""} />
          <Link className={classes.plus}>=</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="전투력" value={box6 || ""} />
          <Link className={classes.plus}>=</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="전투력" value={box7 || ""} />
          <Link className={classes.plus}>=</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="결과" value={box8 || ""} />
        </Container>
        <Container
          style={{
            width: "240px",
            margin: "0",
            padding: "10px 15px",
            float: "left",
          }}
        >
          <TextField className={classes.powers} variant="outlined" placeholder="전투력" value={box7 || ""} />
          <Link className={classes.plus}>x</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="품의" value={box8 || ""} />
          <Link className={classes.plus}>=</Link>
          <TextField className={classes.powers} variant="outlined" placeholder="결과" value={box8 || ""} />
        </Container>
      </Container>
      <Grid container spacing={3} style={{ margin: "0", padding: "0" }}>
        <Grid item style={{ width: "350px", padding: "0", margin: "10px 20px" }}>
          <Container
            component="div"
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "9px",
              float: "left",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Container component="div" style={{ width: "100%", margin: "0", padding: "0", float: "left" }}>
              <TextField
                variant="outlined"
                placeholder="99~799"
                value={level || ""}
                onChange={(e) => {
                  setLevel(parseInt(e.target.value));
                }}
                inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
                style={{ width: "105px", margin: "5px 0 5px 45px", float: "left" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (level > 98 && level < 800) calLevel(level);
                  else setLevel(0);
                }}
                style={{
                  height: "40px",
                  margin: "5px 5px 5px -5px",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  float: "left",
                }}
              >
                계산
              </Button>
              <Button
                variant="contained"
                className={classes.btnTMI}
                color="secondary"
                onClick={() => {
                  opening(1);
                }}
                style={{ width: "40px", height: "40px" }}
              >
                ?
              </Button>
            </Container>
            <Container
              component="div"
              style={{ width: "100%", height: "40px", margin: "0", padding: "0", float: "left" }}
            >
              <Link className={classes.powerText}>레벨 전투력 : {levelPower}</Link>
            </Container>
          </Container>
          <Container
            component="div"
            style={{
              width: "100%",
              margin: "0",
              padding: "9px",
              float: "left",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <TextField
              className={classes.itemInput}
              variant="outlined"
              //value={item1}
              onChange={(e) => {
                itemsUpdate(e.target.value, 1);
              }}
              placeholder="1. 목/어깨장식"
            />
            <TextField className={classes.itemInput} variant="outlined" placeholder="2. 투구" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="3. 얼굴장식" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="4. 무기" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="5. 갑옷" />

            <TextField className={classes.itemInput} variant="outlined" placeholder="6. 방패/보조무기" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="7. 오른손" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="8. 망토" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="9. 왼손" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="10. 보조1" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="11. 신발" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="12. 보조2" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="13. 장신구" />
            <TextField className={classes.itemInput} variant="outlined" placeholder="14. 세트옷" />
            <Container component="div" style={{ height: "55px", padding: "0", float: "left" }}>
              <Link
                className={classes.petText}
                style={{ width: "60px", height: "45px", lineHeight: "45px", margin: "5px 5px 5px 10px" }}
              >
                15. 강화
              </Link>
              <TextField
                className={classes.itemInput}
                variant="outlined"
                placeholder="0 ~ 11"
                inputProps={{ style: { textAlign: "center" } }}
                style={{ width: "80px" }}
              />
              <Button
                className={classes.btnCal}
                variant="contained"
                color="primary"
                style={{
                  margin: "10px 0 10px 35px",
                }}
              >
                계산
              </Button>
              <Button
                variant="contained"
                className={classes.btnTMI}
                color="secondary"
                onClick={() => {
                  opening(2);
                }}
                style={{ margin: "10px 5px" }}
              >
                ?
              </Button>
            </Container>
            <Link className={classes.powerText}>장비 전투력 : {itemPower}</Link>
          </Container>
        </Grid>

        <Grid item style={{ width: "320px", padding: "0", margin: "10px 30px" }}>
          <Container
            component="div"
            style={{
              width: "100%",
              padding: "9px",
              marginBottom: "10px",
              float: "left",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant="outlined"
                className={classes.select}
                defaultValue={0}
                onChange={(e) => {
                  setEngrave1(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>능력치</Menus>
                <Menus value={1}>체력/마력(0.4%)</Menus>
                <Menus value={2}>체력/마력(0.5%)</Menus>
                <Menus value={3}>방어구관통</Menus>
                <Menus value={4}>방어도무시</Menus>
                <Menus value={5}>마법치명</Menus>
                <Menus value={6}>공격력증가</Menus>
                <Menus value={7}>마력증가</Menus>
                <Menus value={8}>방어도</Menus>
                <Menus value={9}>직타저항</Menus>
                <Menus value={10}>시전향상</Menus>
                <Menus value={11}>피해흡수</Menus>
                <Menus value={11}>피해흡수무시</Menus>
                <Menus value={11}>치명타(1%)</Menus>
              </Select>
              <TextField
                variant="outlined"
                className={classes.selText}
                placeholder="수치"
                type="number"
                value={engrave2 || ""}
                onChange={(e) => {
                  setEngrave2(parseInt(e.target.value));
                }}
              />
            </Container>
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant="outlined"
                className={classes.select}
                defaultValue={0}
                onChange={(e) => {
                  setEngrave3(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>능력치</Menus>
                <Menus value={1}>체력/마력(0.4%)</Menus>
                <Menus value={2}>체력/마력(0.5%)</Menus>
                <Menus value={3}>방어구관통</Menus>
                <Menus value={4}>방어도무시</Menus>
                <Menus value={5}>마법치명</Menus>
                <Menus value={6}>공격력증가</Menus>
                <Menus value={7}>마력증가</Menus>
                <Menus value={8}>방어도</Menus>
                <Menus value={9}>직타저항</Menus>
                <Menus value={10}>시전향상</Menus>
                <Menus value={11}>피해흡수</Menus>
                <Menus value={12}>피해흡수무시</Menus>
                <Menus value={13}>치명타(1%)</Menus>
              </Select>
              <TextField
                variant="outlined"
                className={classes.selText}
                placeholder="수치"
                type="number"
                value={engrave4 || ""}
                onChange={(e) => {
                  setEngrave4(parseInt(e.target.value));
                }}
              />
            </Container>
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Link
                className={classes.powerText}
                style={{
                  marginLeft: "20%",
                }}
              >
                각인 전투력 : {engravePower}
              </Link>
              <Button
                className={classes.btnTMI}
                variant="contained"
                color="secondary"
                style={{ margin: "2.5px 5px 2.5px 25px" }}
              >
                ?
              </Button>
            </Container>
          </Container>
          <Container
            component="div"
            style={{
              width: "100%",
              padding: "9px",
              marginBottom: "10px",
              float: "left",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant="outlined"
                className={classes.select}
                defaultValue={0}
                onChange={(e) => {
                  calGold1(e, 1);
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>능력치</Menus>
                <Menus value={1}>체력/마력</Menus>
                <Menus value={2}>재생력</Menus>
                <Menus value={3}>방관/마치/공증/마증</Menus>
                <Menus value={4}>타흡/마흡/피흡</Menus>
                <Menus value={5}>시향/회향/직타</Menus>
                <Menus value={6}>힘/민/지</Menus>
                <Menus value={7}>명중률/타격치</Menus>
                <Menus value={8}>마법수준향상</Menus>
                <Menus value={9}>명중회피/방무/방어</Menus>
                <Menus value={10}>체력/마력(%)</Menus>
                <Menus value={11}>방무/방어(%)</Menus>
                <Menus value={12}>힘/민/지(%)</Menus>
                <Menus value={13}>명중회피(%)</Menus>
                <Menus value={14}>방관/마치/공증/마증(%)</Menus>
                <Menus value={15}>타흡/마흡/피흡(%)</Menus>
                <Menus value={16}>시향/회향/직타(%)</Menus>
                <Menus value={17}>명중률/타격치(%)</Menus>
                <Menus value={18}>마법수준/재생력(%)</Menus>
              </Select>
              <TextField
                variant="outlined"
                className={classes.selText}
                value={gold2 || ""}
                placeholder="수치"
                type="number"
                onChange={(e) => {
                  setGold2(Number(e.target.value));
                  calGold2(Number(e.target.value), 1);
                }}
              />
            </Container>
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant="outlined"
                className={classes.select}
                defaultValue={0}
                onChange={(e) => {
                  calGold1(e, 2);
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>능력치</Menus>
                <Menus value={1}>체력/마력</Menus>
                <Menus value={2}>재생력</Menus>
                <Menus value={3}>방관/마치/공증/마증</Menus>
                <Menus value={4}>타흡/마흡/피흡</Menus>
                <Menus value={5}>시향/회향/직타</Menus>
                <Menus value={6}>힘/민/지</Menus>
                <Menus value={7}>명중률/타격치</Menus>
                <Menus value={8}>마법수준향상</Menus>
                <Menus value={9}>명중회피/방무/방어</Menus>
                <Menus value={10}>체력/마력(%)</Menus>
                <Menus value={11}>방무/방어(%)</Menus>
                <Menus value={12}>힘/민/지(%)</Menus>
                <Menus value={13}>명중회피(%)</Menus>
                <Menus value={14}>방관/마치/공증/마증(%)</Menus>
                <Menus value={15}>타흡/마흡/피흡(%)</Menus>
                <Menus value={16}>시향/회향/직타(%)</Menus>
                <Menus value={17}>명중률/타격치(%)</Menus>
                <Menus value={18}>마법수준/재생력(%)</Menus>
              </Select>
              <TextField
                variant="outlined"
                className={classes.selText}
                value={gold4 || ""}
                placeholder="수치"
                type="number"
                onChange={(e) => {
                  setGold4(Number(e.target.value));
                  calGold2(Number(e.target.value), 2);
                }}
              />
            </Container>
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant="outlined"
                className={classes.select}
                defaultValue={0}
                onChange={(e) => {
                  calGold1(e, 3);
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>능력치</Menus>
                <Menus value={1}>체력/마력</Menus>
                <Menus value={2}>재생력</Menus>
                <Menus value={3}>방관/마치/공증/마증</Menus>
                <Menus value={4}>타흡/마흡/피흡</Menus>
                <Menus value={5}>시향/회향/직타</Menus>
                <Menus value={6}>힘/민/지</Menus>
                <Menus value={7}>명중률/타격치</Menus>
                <Menus value={8}>마법수준향상</Menus>
                <Menus value={9}>명중회피/방무/방어</Menus>
                <Menus value={10}>체력/마력(%)</Menus>
                <Menus value={11}>방무/방어(%)</Menus>
                <Menus value={12}>힘/민/지(%)</Menus>
                <Menus value={13}>명중회피(%)</Menus>
                <Menus value={14}>방관/마치/공증/마증(%)</Menus>
                <Menus value={15}>타흡/마흡/피흡(%)</Menus>
                <Menus value={16}>시향/회향/직타(%)</Menus>
                <Menus value={17}>명중률/타격치(%)</Menus>
                <Menus value={18}>마법수준/재생력(%)</Menus>
              </Select>
              <TextField
                variant="outlined"
                className={classes.selText}
                value={gold6 || ""}
                placeholder="수치"
                type="number"
                onChange={(e) => {
                  setGold6(Number(e.target.value));
                  calGold2(Number(e.target.value), 3);
                }}
              />
            </Container>
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Link
                style={{
                  width: "150px",
                  height: "40px",
                  lineHeight: "40px",
                  marginLeft: "20%",
                  color: "black",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  float: "left",
                }}
              >
                황돋 전투력 : {goldPower}
              </Link>
              <Button
                className={classes.btnTMI}
                variant="contained"
                color="secondary"
                style={{ margin: "2.5px 5px 2.5px 25px" }}
              >
                ?
              </Button>
            </Container>
          </Container>

          <Container
            component="div"
            style={{
              width: "100%",
              padding: "9px",
              margin: "0",
              float: "left",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Container component="div" style={{ width: "100%", padding: "0", margin: "0", float: "left" }}>
              <Select
                className={classes.select}
                variant="outlined"
                defaultValue={0}
                onChange={(e) => {
                  calGold1(e, 1);
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
                style={{
                  width: "110px",
                }}
              >
                <Menus2 value={0}>직업</Menus2>
                <Menus2 value={1}>전사</Menus2>
                <Menus2 value={2}>도적</Menus2>
                <Menus2 value={3}>주술사</Menus2>
                <Menus2 value={4}>도사</Menus2>
                <Menus2 value={5}>궁사</Menus2>
                <Menus2 value={6}>천인</Menus2>
                <Menus2 value={7}>마도사</Menus2>
                <Menus2 value={8}>영술사</Menus2>
                <Menus2 value={9}>차사</Menus2>
              </Select>
              <Select
                className={classes.select}
                variant="outlined"
                defaultValue={0}
                onChange={(e) => {
                  calGold1(e, 1);
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
                style={{
                  width: "170px",
                }}
              >
                <Menus2 value={0}>아이템 부위</Menus2>
                <Menus2 value={1}>목/어깨장식</Menus2>
                <Menus2 value={2}>투구</Menus2>
                <Menus2 value={3}>무기</Menus2>
                <Menus2 value={4}>갑옷</Menus2>
                <Menus2 value={5}>망토</Menus2>
              </Select>
            </Container>
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant="outlined"
                className={classes.select}
                defaultValue={0}
                onChange={(e) => {
                  calGold1(e, 1);
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus2 value={0}>기술능력</Menus2>
                <Menus2 value={1}>무영보법-명중회피</Menus2>
                <Menus2 value={2}>투명-피해증가율</Menus2>
                <Menus2 value={3}>전혈-지속시간</Menus2>
                <Menus2 value={4}>전혈-전환율</Menus2>
                <Menus2 value={5}>전혈'첨-지속시간</Menus2>
                <Menus2 value={6}>전혈'첨-전환율</Menus2>
                <Menus2 value={7}>운상미보-이속증가율</Menus2>
                <Menus2 value={8}>은형연막탄-직타저항</Menus2>
                <Menus2 value={9}>은형연막탄-피해흡수</Menus2>
                <Menus2 value={10}>은형연막탄-쿨타임</Menus2>
                <Menus2 value={11}>묵혈광참-피해량</Menus2>
                <Menus2 value={12}>묵혈광참-피해량감소</Menus2>
                <Menus2 value={13}>묵혈광참-방어감소</Menus2>
              </Select>
              <TextField
                variant="outlined"
                className={classes.selText}
                placeholder="수치"
                type="number"
                onChange={(e) => {
                  calGold2(Number(e.target.value), 1);
                }}
              />
            </Container>
            <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
              <Link
                className={classes.powerText}
                style={{
                  marginLeft: "15%",
                }}
              >
                기술능력 전투력 : {skillPower}
              </Link>
              <Button
                className={classes.btnTMI}
                variant="contained"
                color="secondary"
                style={{ margin: "2.5px 0 2.5px 10px" }}
              >
                ?
              </Button>
            </Container>
          </Container>
        </Grid>
        <Grid item style={{ width: "350px", padding: "0", margin: "10px 15px" }}>
          <Container
            component="div"
            style={{
              width: "100%",
              padding: "9px",
              marginBottom: "10px",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Container component="div" className={classes.sliBox} style={{ height: "45px" }}>
              <TextField
                variant="outlined"
                inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
                defaultValue={animal1}
                onChange={(e) => {
                  let a = parseInt(e.target.value);
                  if (a > 0 && a < 6) setAnimal1(a);
                }}
                style={{ width: "35px", float: "left", margin: "5px 0 5px 10px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "35px",
                  lineHeight: "35px",
                  margin: "5px",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}
              >
                등급
              </Link>
              <TextField
                variant="outlined"
                inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
                defaultValue={animal2}
                onChange={(e) => {
                  let a = parseInt(e.target.value);
                  if (a > 0 && a < 99) setAnimal2(a);
                }}
                style={{ width: "35px", float: "left", margin: "5px 0 5px 5px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "35px",
                  lineHeight: "35px",
                  margin: "5px",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}
              >
                레벨
              </Link>
              <Button
                className={classes.btnCal}
                variant="contained"
                color="primary"
                onClick={calAnimal}
                style={{
                  margin: "5px 0 5px 35px",
                }}
              >
                계산
              </Button>
              <Button className={classes.btnTMI} variant="contained" color="secondary" style={{ margin: "5px" }}>
                ?
              </Button>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>무기</Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={7}
                onChange={(e) => {
                  setAnimal3(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={5}>5성</Menus>
                <Menus value={6}>6성</Menus>
                <Menus value={7}>7성</Menus>
                <Menus value={8}>8성</Menus>
                <Menus value={9}>9성</Menus>
              </Select>
              <Link className={classes.petText} style={{ marginLeft: "20px" }}>
                손
              </Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={2}
                onChange={(e) => {
                  setAnimal6(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>없음</Menus>
                <Menus value={1}>1단</Menus>
                <Menus value={2}>2단</Menus>
                <Menus value={3}>3단</Menus>
              </Select>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>투구</Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={7}
                onChange={(e) => {
                  setAnimal4(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={5}>5성</Menus>
                <Menus value={6}>6성</Menus>
                <Menus value={7}>7성</Menus>
                <Menus value={8}>8성</Menus>
                <Menus value={9}>9성</Menus>
              </Select>
              <Link className={classes.petText} style={{ marginLeft: "20px" }}>
                손
              </Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={2}
                onChange={(e) => {
                  setAnimal7(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>없음</Menus>
                <Menus value={1}>1단</Menus>
                <Menus value={2}>2단</Menus>
                <Menus value={3}>3단</Menus>
              </Select>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>갑옷</Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={7}
                onChange={(e) => {
                  setAnimal5(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={5}>5성</Menus>
                <Menus value={6}>6성</Menus>
                <Menus value={7}>7성</Menus>
                <Menus value={8}>8성</Menus>
                <Menus value={9}>9성</Menus>
              </Select>
              <Link className={classes.petText} style={{ marginLeft: "20px" }}>
                보주
              </Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={2}
                onChange={(e) => {
                  setAnimal8(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>없음</Menus>
                <Menus value={1}>1개</Menus>
                <Menus value={2}>2개</Menus>
              </Select>
            </Container>
            <Container component="div" className={classes.sliBox} style={{ height: "40px" }}>
              <Link className={classes.powerText}>신수 전투력 : {animalPower}</Link>
            </Container>
          </Container>
          <Container
            component="div"
            style={{
              width: "100%",
              padding: "9px",
              margin: "0",
              border: "1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Container component="div" className={classes.sliBox} style={{ height: "45px" }}>
              <TextField
                variant="outlined"
                value={pet1}
                inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
                onChange={(e) => {
                  setPet1(parseInt(e.target.value));
                }}
                style={{ width: "35px", float: "left", margin: "2.5px 0 2.5px 10px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "35px",
                  lineHeight: "35px",
                  margin: "2.5px 5px",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}
              >
                등급
              </Link>
              <TextField
                variant="outlined"
                inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
                value={pet2}
                onChange={(e) => {
                  setPet2(parseInt(e.target.value));
                }}
                style={{ width: "35px", float: "left", margin: "2.5px 0 2.5px 5px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "35px",
                  lineHeight: "35px",
                  margin: "2.5px 5px",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}
              >
                레벨
              </Link>
              <Button
                className={classes.btnCal}
                variant="contained"
                color="primary"
                onClick={calPet}
                style={{
                  margin: "5px 0 5px 30px",
                }}
              >
                계산
              </Button>
              <Button className={classes.btnTMI} variant="contained" color="secondary" style={{ margin: "5px" }}>
                ?
              </Button>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>무 기</Link>
              <TextField
                variant="outlined"
                className={classes.petInput}
                placeholder="전투력"
                onChange={(e) => {
                  setPet3(parseInt(e.target.value));
                }}
              />
              <Link className={classes.petText}>목걸이</Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={0}
                onChange={(e) => {
                  setPet8(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>없음</Menus>
                <Menus value={1}>작생목</Menus>
                <Menus value={2}>생목</Menus>
                <Menus value={3}>커생목</Menus>
                <Menus value={4}>극락목</Menus>
              </Select>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>투 구</Link>
              <TextField
                variant="outlined"
                className={classes.petInput}
                placeholder="전투력"
                onChange={(e) => {
                  setPet4(parseInt(e.target.value));
                }}
              />
              <Link className={classes.petText}>문 양</Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={0}
                onChange={(e) => {
                  setPet9(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>없음</Menus>
                <Menus value={2}>문양</Menus>
                <Menus value={4}>문양'진</Menus>
              </Select>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>갑 옷</Link>
              <TextField
                variant="outlined"
                className={classes.petInput}
                placeholder="전투력"
                onChange={(e) => {
                  setPet5(parseInt(e.target.value));
                }}
              />
              <Link className={classes.petText}>신 물</Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={0}
                onChange={(e) => {
                  setPet10(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 20px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>없음</Menus>
                <Menus value={1}>1성</Menus>
                <Menus value={2}>2성</Menus>
                <Menus value={3}>3성</Menus>
                <Menus value={4}>4성</Menus>
              </Select>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>성 물</Link>
              <TextField
                variant="outlined"
                className={classes.petInput}
                placeholder="전투력"
                onChange={(e) => {
                  setPet6(parseInt(e.target.value));
                }}
              />
              <Link className={classes.petText}>세트옷</Link>
              <Select
                className={classes.select2}
                variant="outlined"
                defaultValue={0}
                onChange={(e) => {
                  setPet11(Number(e.target.value));
                }}
                SelectDisplayProps={{
                  style: {
                    padding: "2px 15px 2px 5px",
                    lineHeight: "30px",
                    fontSize: "0.9rem",
                    color: "blue",
                  },
                }}
              >
                <Menus value={0}>없음</Menus>
                <Menus value={3}>환수神</Menus>
              </Select>
            </Container>
            <Container component="div" className={classes.sliBox}>
              <Link className={classes.petText}>성 물</Link>
              <TextField
                variant="outlined"
                className={classes.petInput}
                placeholder="전투력"
                onChange={(e) => {
                  setPet7(parseInt(e.target.value));
                }}
              />
              <Link className={classes.petText} style={{ width: "145px", color: "gray", fontSize: "0.8rem" }}>
                &nbsp;* 신물은 강화 적용됨 *
              </Link>
            </Container>
            <Container component="div" className={classes.sliBox} style={{ height: "40px" }}>
              <Link className={classes.powerText}>환수 전투력 : {petPower}</Link>
            </Container>
          </Container>
        </Grid>
      </Grid>
      <Dialog
        open={open1}
        onClose={() => {
          closing(1);
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>레벨 전투력 TMI</h3>
          </div>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>
          <h3 style={{ color: "red", fontFamily: "BMJUA" }}>★ 레벨 전투력 = 렙업 전투력 + 승급 전투력 ★</h3>
          <h3 style={{ fontFamily: "BMJUA" }}>
            * Lv.99에 최초 전투력이 부여되며 이후 렙업과 승급마다 전투력이 증가한다.
          </h3>
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
            color="primary"
            onClick={() => {
              closing(1);
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={() => {
          closing(2);
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>장비 전투력 TMI</h3>
          </div>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>
          <h3 style={{ color: "red", fontFamily: "BMJUA" }}>★ 장비 전투력 ★</h3>
          <h3 style={{ fontFamily: "BMJUA" }}>
            * Lv.99에 최초 전투력이 부여되며 이후 렙업과 승급마다 전투력이 증가한다.
          </h3>
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
            color="primary"
            onClick={() => {
              closing(2);
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
