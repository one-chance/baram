import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

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

import { getItemData } from "utils/CalUtil";
import ItemList from "conf/itemList.json";

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

    powers: {
      width: "60px",
      margin: "0",
      "& input": { height: "40px", padding: "0", textAlign: "center" },
    },

    plus: {
      minWidth: "10px",
      lineHeight: "40px",
      margin: "0 2px",
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
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        textAlign: "center",
        color: "blue",
      },
    },

    select2: {
      width: "80px",
      height: "40px",
      padding: "1px",
      margin: "5px 2.5px",
      color: "blue",
      textAlignLast: "center",
      float: "left",
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        fontSize: "0.9rem",
        textAlign: "center",
        color: "blue",
      },
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

    smallBox: {
      width: "300px",
      height: "50px",
      padding: "0",
      margin: "0",
    },

    bigBox: {
      width: "100%",
      marginBottom: "10px",
      padding: "9px",
      border: "1px solid gray",
      borderRadius: "10px",
      float: "left",
    },

    petText: {
      width: "50px",
      height: "40px",
      lineHeight: "40px",
      margin: "5px 0",
      float: "left",
      textAlign: "center",
      color: "black",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    petInput: {
      width: "80px",
      float: "left",
      margin: "5px 25px 5px 0",
      "& input": {
        height: "40px",
        padding: "0",
        textAlign: "center",
      },
    },

    btn: {
      height: "40px",
      margin: "5px",
      padding: "0",
    },
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Power() {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [auto, setAuto] = useState<string>("");
  const [level, setLevel] = useState<number>(0); // 레벨
  const [levelPower, setLevelPower] = useState<number>(0); // 레벨 전투력 (표기)
  const [levelPower2, setLevelPower2] = useState<number>(0); // 레벨 전투력 (실제)
  const [itemPower, setItemPower] = useState<number>(0); // 장비 전투력
  const [engravePower, setEngravePower] = useState<number>(0); // 각인 전투력
  const [goldPower, setGoldPower] = useState<number>(0); // 황돋 전투력
  const [skillPower, setSkillPower] = useState<number>(0); // 기술능력 전투력
  const [animalPower, setAnimalPower] = useState<number>(0); // 신수 전투력
  const [petPower, setPetPower] = useState<number>(0); // 환수 전투력

  const [box1, setBox1] = useState<number>(0);

  let itemList = ItemList;
  let itemP: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [item1, setItem1] = useState<string>("");
  const [item2, setItem2] = useState<string>("");

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

  //let golds: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 황돋 : 종류1, 수치1, 종류2, 수치2, 종류3, 수치3
  let animals: number[] = [5, 99, 7, 7, 7, 2, 2, 2]; // 신수 : 등급, 레벨, 무기, 투구, 갑옷, 장갑1, 장갑2, 보주
  let pets: number[] = [9, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 환수 : 등급, 레벨, 무기, 투구, 갑옷, 성물1, 성물2, 목걸이, 문양, 세트옷, 신물

  const calLevel = (lev: number) => {
    if (lev < 1 || lev > 799) {
      return;
    }

    let a: number = Math.floor(lev / 100);
    let b: number = lev % 100;
    let c: number[] = [649.5, 1003, 2056.5, 3810, 6263.5, 9417, 13270.5, 17824];
    let res: number = 0;

    res = a * 3.5 * b + c[a];
    setLevelPower(Math.round(res));
    setLevelPower2(res);
  };

  const calItem = (e: string, num: number) => {
    for (let i = 0; i < Object.keys(itemList[num]).length; i++) {
      if (e.localeCompare(Object.keys(itemList[num])[i]) === 0) {
        return Object.values(itemList[num])[i];
      }
    }
  };

  const calEngrave = () => {
    setEngravePower(engrave1 * engrave2 + engrave3 * engrave4);
  };

  const calGold1 = (e: React.ChangeEvent<{ value: unknown }>) => {
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

    return val;
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
  };

  const calAnimal = () => {
    setAnimalPower(
      animals[0] * 400 +
        animals[1] * 4 +
        (animals[2] * 50 + 250) +
        (animals[3] * 50 + 250) +
        (animals[4] * 50 + 250) +
        animals[5] * 100 +
        animals[6] * 100 +
        animals[7] * 200
    );
  };

  const calPet = () => {
    setPetPower(pets[0] * 200 + pets[1] * 2 + pets[2] + pets[3] + pets[4] + pets[5] + pets[6] + pets[7] * 100 + pets[8] * 100 + pets[9] * 100 + pets[10] * 100);
  };

  const opening = (num: number) => {
    switch (num) {
      case 1:
        setOpen1(true);
        break;
      case 2:
        setOpen2(true);
        break;
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

  const autoApply = (cen: string) => {
    if (auto.split("@").length === 2) {
      let a = getItemData(auto);
      a.then(res => {
        if (!isNaN(res.level)) {
          setLevel(res.level);
          calLevel(res.level);
        }
      });
    } else {
      alert("에러! 아이디@서버 형식을 확인하세요.");
    }
  };

  useEffect(() => {
    const calculating = () => {
      setGoldPower(gold7 + gold8 + gold9);
      setSkillPower(0);
      setItemPower(itemP[1] + itemP[2]);
    };
    calculating();
    // eslint-disable-next-line
  });

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{
          width: "90%",
          margin: "0 5%",
          padding: "0",
          justifyContent: "center",
          alignItems: "center",
          float: "left",
        }}>
        <Grid item style={{ width: "320px", padding: "0", margin: "5px 15px" }}>
          <Container style={{ padding: "0", margin: "15px 0", textAlign: "center", float: "left" }}>
            <TextField
              variant='outlined'
              placeholder='아이디@서버'
              value={auto || ""}
              onChange={e => {
                setAuto(e.target.value);
              }}
              inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
              style={{ width: "175px" }}
            />
            <Button
              variant='contained'
              color='primary'
              style={{
                minWidth: "50px",
                height: "40px",
                marginLeft: "-5px",
                padding: "0",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
              onClick={e => {
                autoApply(auto);
              }}>
              적용
            </Button>
          </Container>
          <Container className={classes.bigBox}>
            <Container className={classes.smallBox} style={{ margin: "5px 0", textAlign: "center" }}>
              <TextField
                variant='outlined'
                placeholder='99~799'
                value={level || ""}
                onChange={e => {
                  setLevel(parseInt(e.target.value));
                }}
                inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
                style={{ width: "105px", margin: "5px 0 5px 5px" }}
              />
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={() => {
                  calLevel(level);
                }}
                style={{
                  minWidth: "60px",
                  marginLeft: "-5px",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}>
                계산
              </Button>
              <Button
                variant='contained'
                className={classes.btn}
                color='secondary'
                onClick={() => {
                  opening(1);
                }}
                style={{ minWidth: "40px" }}>
                ?
              </Button>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.powerText} style={{ width: "100%" }}>
                레벨 전투력 : {levelPower === levelPower2 ? levelPower : levelPower + " (" + levelPower2 + ")"}
              </Link>
            </Container>
          </Container>
          <Container className={classes.bigBox}>
            <TextField
              className={classes.itemInput}
              variant='outlined'
              value={item1 || ""}
              onChange={e => {
                setItem1(e.target.value);
              }}
              placeholder='1. 목/어깨장식'
            />
            <TextField
              className={classes.itemInput}
              variant='outlined'
              value={item2 || ""}
              onChange={e => {
                setItem2(e.target.value);
              }}
              placeholder='2. 투구'
            />
            <TextField className={classes.itemInput} variant='outlined' placeholder='3. 얼굴장식' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='4. 무기' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='5. 갑옷' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='6. 방패/보조무기' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='7. 오른손' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='8. 망토' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='9. 왼손' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='10. 보조1' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='11. 신발' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='12. 보조2' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='13. 장신구' />
            <TextField className={classes.itemInput} variant='outlined' placeholder='14. 세트옷' />
            <Link className={classes.petText} style={{ width: "60px", height: "45px", lineHeight: "45px", margin: "5px" }}>
              15. 강화
            </Link>
            <TextField
              className={classes.itemInput}
              variant='outlined'
              placeholder='0 ~ 11'
              inputProps={{ style: { textAlign: "center" } }}
              style={{ width: "70px" }}
            />
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
                onClick={() => {
                  itemP[1] = Number(calItem(item1, 1));
                  itemP[2] = Number(calItem(item2, 2));
                }}
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
                  opening(2);
                }}
                style={{ minWidth: "40px", margin: "2.5px" }}>
                ?
              </Button>
            </Container>
            <Link className={classes.powerText} style={{ width: "100%" }}>
              장비 전투력 : {itemPower}
            </Link>
          </Container>
        </Grid>

        <Grid item style={{ width: "320px", padding: "0", margin: "5px 15px" }}>
          <Container style={{ padding: "0", margin: "15px 0", textAlign: "center", float: "left" }}>
            <TextField
              className={classes.powers}
              variant='outlined'
              placeholder='전투력'
              value={box1 || ""}
              onChange={e => {
                setBox1(parseInt(e.target.value));
              }}
            />
            <Link className={classes.plus}>+</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='전투력' />
            <Link className={classes.plus}>+</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='전투력' />
            <Link className={classes.plus}>=</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='결과' />
          </Container>
          <Container className={classes.bigBox}>
            <Container style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant='outlined'
                className={classes.select}
                defaultValue={0}
                onChange={e => {
                  setEngrave1(Number(e.target.value));
                }}>
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
                variant='outlined'
                className={classes.selText}
                placeholder='수치'
                type='number'
                value={engrave2 || ""}
                onChange={e => {
                  setEngrave2(parseInt(e.target.value));
                }}
              />
            </Container>
            <Container style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant='outlined'
                className={classes.select}
                defaultValue={0}
                onChange={e => {
                  setEngrave3(Number(e.target.value));
                }}>
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
                variant='outlined'
                className={classes.selText}
                placeholder='수치'
                type='number'
                value={engrave4 || ""}
                onChange={e => {
                  setEngrave4(parseInt(e.target.value));
                }}
              />
            </Container>
            <Link className={classes.powerText}>각인 전투력 : {engravePower}</Link>
            <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }}>
              ?
            </Button>
          </Container>
          <Container className={classes.bigBox}>
            <Container style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant='outlined'
                className={classes.select}
                defaultValue={0}
                onChange={e => {
                  setGold1(Number(calGold1(e)));
                  setGold2(0);
                }}>
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
                variant='outlined'
                className={classes.selText}
                value={gold2 || ""}
                placeholder='수치'
                type='number'
                onChange={e => {
                  setGold2(Number(e.target.value));
                  calGold2(Number(e.target.value), 1);
                }}
              />
            </Container>
            <Container style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant='outlined'
                className={classes.select}
                defaultValue={0}
                onChange={e => {
                  setGold3(Number(calGold1(e)));
                  setGold4(0);
                }}>
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
                variant='outlined'
                className={classes.selText}
                value={gold4 || ""}
                placeholder='수치'
                type='number'
                onChange={e => {
                  setGold4(Number(e.target.value));
                  calGold2(Number(e.target.value), 2);
                }}
              />
            </Container>
            <Container style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant='outlined'
                className={classes.select}
                defaultValue={0}
                onChange={e => {
                  setGold5(Number(calGold1(e)));
                  setGold6(0);
                }}>
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
                variant='outlined'
                className={classes.selText}
                value={gold6 || ""}
                placeholder='수치'
                type='number'
                onChange={e => {
                  setGold6(Number(e.target.value));
                  calGold2(Number(e.target.value), 3);
                }}
              />
            </Container>
            <Link className={classes.powerText}>황돋 전투력 : {goldPower}</Link>
            <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }}>
              ?
            </Button>
          </Container>

          <Container className={classes.bigBox}>
            <Container style={{ width: "100%", padding: "0", margin: "0", float: "left" }}>
              <Select
                className={classes.select}
                variant='outlined'
                defaultValue={0}
                onChange={e => {
                  calGold1(e);
                }}
                style={{
                  width: "120px",
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
              <Select
                className={classes.select}
                variant='outlined'
                defaultValue={0}
                onChange={e => {
                  calGold1(e);
                }}
                style={{
                  width: "160px",
                }}>
                <Menus value={0}>아이템 부위</Menus>
                <Menus value={1}>목/어깨장식</Menus>
                <Menus value={2}>투구</Menus>
                <Menus value={3}>무기</Menus>
                <Menus value={4}>갑옷</Menus>
                <Menus value={5}>망토</Menus>
              </Select>
            </Container>
            <Container style={{ width: "100%", padding: "0", float: "left" }}>
              <Select
                variant='outlined'
                className={classes.select}
                defaultValue={0}
                onChange={e => {
                  calGold1(e);
                }}>
                <Menus value={0}>기술능력</Menus>
                <Menus value={1}>무영보법-명중회피</Menus>
                <Menus value={2}>투명-피해증가율</Menus>
                <Menus value={3}>전혈-지속시간</Menus>
                <Menus value={4}>전혈-전환율</Menus>
                <Menus value={5}>전혈'첨-지속시간</Menus>
                <Menus value={6}>전혈'첨-전환율</Menus>
                <Menus value={7}>운상미보-이속증가율</Menus>
                <Menus value={8}>은형연막탄-직타저항</Menus>
                <Menus value={9}>은형연막탄-피해흡수</Menus>
                <Menus value={10}>은형연막탄-쿨타임</Menus>
                <Menus value={11}>묵혈광참-피해량</Menus>
                <Menus value={12}>묵혈광참-피해량감소</Menus>
                <Menus value={13}>묵혈광참-방어감소</Menus>
              </Select>
              <TextField
                variant='outlined'
                className={classes.selText}
                placeholder='수치'
                type='number'
                onChange={e => {
                  calGold2(Number(e.target.value), 1);
                }}
              />
            </Container>
            <Link className={classes.powerText}>기술능력 전투력 : {skillPower}</Link>
            <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }}>
              ?
            </Button>
          </Container>
        </Grid>
        <Grid item style={{ width: "320px", padding: "0", margin: "5px 15px" }}>
          <Container style={{ padding: "0", margin: "15px 0", textAlign: "center", float: "left" }}>
            <TextField className={classes.powers} variant='outlined' placeholder='전투력' />
            <Link className={classes.plus}>x</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='품의' />
            <Link className={classes.plus}>=</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='결과' />
          </Container>

          <Container className={classes.bigBox}>
            <Container className={classes.smallBox}>
              <TextField
                variant='outlined'
                inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
                defaultValue={5}
                onChange={e => {
                  let a = parseInt(e.target.value);
                  if (a > 0 && a < 6) {
                    animals[0] = a;
                  }
                }}
                style={{ width: "35px", float: "left", margin: "5px 0 5px 10px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "40px",
                  lineHeight: "40px",
                  margin: "5px 0",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}>
                등급
              </Link>
              <TextField
                variant='outlined'
                inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
                defaultValue={99}
                onChange={e => {
                  let a = parseInt(e.target.value);
                  if (a > 0 && a < 99) {
                    animals[1] = a;
                  }
                }}
                style={{ width: "35px", float: "left", margin: "5px 0 5px 5px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "40px",
                  lineHeight: "40px",
                  margin: "5px 0",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}>
                레벨
              </Link>
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={calAnimal}
                style={{
                  marginRight: "15px",
                  float: "right",
                }}>
                계산
              </Button>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>무기</Link>
              <Select
                className={classes.select2}
                variant='outlined'
                defaultValue={7}
                onChange={e => {
                  animals[2] = Number(e.target.value);
                }}>
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
                variant='outlined'
                defaultValue={2}
                onChange={e => {
                  animals[5] = Number(e.target.value);
                }}>
                <Menus value={0}>없음</Menus>
                <Menus value={1}>1단</Menus>
                <Menus value={2}>2단</Menus>
                <Menus value={3}>3단</Menus>
              </Select>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>투구</Link>
              <Select
                className={classes.select2}
                variant='outlined'
                defaultValue={7}
                onChange={e => {
                  animals[3] = Number(e.target.value);
                }}>
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
                variant='outlined'
                defaultValue={2}
                onChange={e => {
                  animals[6] = Number(e.target.value);
                }}>
                <Menus value={0}>없음</Menus>
                <Menus value={1}>1단</Menus>
                <Menus value={2}>2단</Menus>
                <Menus value={3}>3단</Menus>
              </Select>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>갑옷</Link>
              <Select
                className={classes.select2}
                variant='outlined'
                defaultValue={7}
                onChange={e => {
                  animals[4] = Number(e.target.value);
                }}>
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
                variant='outlined'
                defaultValue={2}
                onChange={e => {
                  animals[7] = Number(e.target.value);
                }}>
                <Menus value={0}>없음</Menus>
                <Menus value={1}>1개</Menus>
                <Menus value={2}>2개</Menus>
              </Select>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.powerText}>신수 전투력 : {animalPower}</Link>
              <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px", margin: "5px 0" }}>
                ?
              </Button>
            </Container>
          </Container>
          <Container className={classes.bigBox}>
            <Container className={classes.smallBox}>
              <TextField
                variant='outlined'
                value={9}
                inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
                onChange={e => {
                  pets[0] = parseInt(e.target.value);
                }}
                style={{ width: "35px", float: "left", margin: "5px 0 5px 10px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "40px",
                  lineHeight: "40px",
                  margin: "5px 0",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}>
                등급
              </Link>
              <TextField
                variant='outlined'
                inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
                value={99}
                onChange={e => {
                  pets[1] = parseInt(e.target.value);
                }}
                style={{ width: "35px", float: "left", margin: "5px 0 5px 5px" }}
              />
              <Link
                style={{
                  width: "35px",
                  height: "40px",
                  lineHeight: "40px",
                  margin: "5px 0",
                  float: "left",
                  textDecoration: "none",
                  textAlign: "center",
                  color: "black",
                }}>
                레벨
              </Link>
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={calPet}
                style={{
                  marginRight: "15px",
                  float: "right",
                }}>
                계산
              </Button>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>무 기</Link>
              <TextField
                variant='outlined'
                className={classes.petInput}
                placeholder='전투력'
                onChange={e => {
                  pets[2] = parseInt(e.target.value);
                }}
              />
              <Link className={classes.petText}>목걸이</Link>
              <Select
                className={classes.select2}
                variant='outlined'
                defaultValue={0}
                onChange={e => {
                  pets[7] = Number(e.target.value);
                }}>
                <Menus value={0}>없음</Menus>
                <Menus value={1}>작생목</Menus>
                <Menus value={2}>생목</Menus>
                <Menus value={3}>커생목</Menus>
                <Menus value={4}>극락목</Menus>
              </Select>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>투 구</Link>
              <TextField
                variant='outlined'
                className={classes.petInput}
                placeholder='전투력'
                onChange={e => {
                  pets[3] = parseInt(e.target.value);
                }}
              />
              <Link className={classes.petText}>문 양</Link>
              <Select
                className={classes.select2}
                variant='outlined'
                defaultValue={0}
                onChange={e => {
                  pets[8] = Number(e.target.value);
                }}>
                <Menus value={0}>없음</Menus>
                <Menus value={2}>문양</Menus>
                <Menus value={4}>문양'진</Menus>
              </Select>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>갑 옷</Link>
              <TextField
                variant='outlined'
                className={classes.petInput}
                placeholder='전투력'
                onChange={e => {
                  pets[4] = parseInt(e.target.value);
                }}
              />
              <Link className={classes.petText}>세트옷</Link>
              <Select
                className={classes.select2}
                variant='outlined'
                defaultValue={0}
                onChange={e => {
                  pets[9] = Number(e.target.value);
                }}>
                <Menus value={0}>없음</Menus>
                <Menus value={3}>환수神</Menus>
              </Select>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>성 물</Link>
              <TextField
                variant='outlined'
                className={classes.petInput}
                placeholder='전투력'
                onChange={e => {
                  pets[5] = parseInt(e.target.value);
                }}
              />
              <Link className={classes.petText}>신 물</Link>
              <Select
                className={classes.select2}
                variant='outlined'
                defaultValue={0}
                onChange={e => {
                  pets[10] = Number(e.target.value);
                }}>
                <Menus value={0}>없음</Menus>
                <Menus value={3}>1성</Menus>
                <Menus value={4}>2성</Menus>
                <Menus value={5}>3성</Menus>
                <Menus value={6}>4성</Menus>
              </Select>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.petText}>성 물</Link>
              <TextField
                variant='outlined'
                className={classes.petInput}
                placeholder='전투력'
                onChange={e => {
                  pets[6] = parseInt(e.target.value);
                }}
              />
              <Link className={classes.petText} style={{ width: "130px", color: "gray", fontSize: "0.8rem" }}>
                * 신물은 강화 적용됨 *
              </Link>
            </Container>
            <Container className={classes.smallBox}>
              <Link className={classes.powerText}>환수 전투력 : {petPower}</Link>
              <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }}>
                ?
              </Button>
            </Container>
          </Container>
        </Grid>
      </Grid>

      <Dialog
        open={open1}
        onClose={() => {
          closing(1);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>레벨 전투력 TMI</h3>
          </div>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>
          <h3 style={{ color: "red", fontFamily: "BMJUA" }}>★ 레벨 전투력 = 렙업 전투력 + 승급 전투력 ★</h3>
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
              closing(1);
            }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={() => {
          closing(2);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>장비 전투력 TMI</h3>
          </div>
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
              closing(2);
            }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
