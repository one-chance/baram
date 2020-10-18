import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import cheerio from "cheerio";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

//import Accordion from "@material-ui/core/Accordion";
//import AccordionSummary from "@material-ui/core/AccordionSummary";
//import AccordionDetails from "@material-ui/core/AccordionDetails";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import Typography from "@material-ui/core/Typography";

import itemList from "conf/itemList.json";
import itemPowers from "interfaces/Calculator/power";
import "./Power.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemBox: {
      width: "160px",
      height: "40px",
      margin: "0 5px",
      float: "left",
      "& input": {
        height: "40px",
        padding: "0 10px",
      },
    },
    powers: {
      width: "80px",
      height: "50px",
      float: "left",
      margin: "0 5px",
      "& input": { height: "50px", padding: "0", textAlign: "center" },
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
    selMenu: {
      fontSize: "0.9rem",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },

    selText: {
      margin: "5px",
      width: "70px",
      height: "50px",
      textAlign: "center",
      float: "left",
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
      },
      "& input": {
        padding: "5px",
        height: "40px",
        textAlign: "center",
        color: "blue",
      },
    },
  })
);

export default function Power() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  const [level, setLevel] = useState<number>(0); // 레벨
  const [levelPower, setLevelPower] = useState<number>(0); // 레벨 전투력 (표기)
  const [levelPower2, setLevelPower2] = useState<number>(0); // 레벨 전투력 (실제)
  const [itemPower, setItemPower] = useState<number>(0); // 장비 전투력
  const [engravePower, setEngravePower] = useState<number>(0); // 각인 전투력
  const [goldPower, setGoldPower] = useState<number>(0); // 황돋 전투력
  const [skillPower, setSkillPower] = useState<number>(0); // 기술능력 전투력
  const [animalPower, setAnimalPower] = useState<number>(0); // 신수 전투력
  const [petPower, setPetPower] = useState<number>(0); // 환수 전투력
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

  const [gold1, setGold1] = useState<number>(0);
  const [gold2, setGold2] = useState<number>(0);
  const [gold3, setGold3] = useState<number>(0);
  const [gold4, setGold4] = useState<number>(0);
  const [gold5, setGold5] = useState<number>(0);
  const [gold6, setGold6] = useState<number>(0);
  const [isPer, setIsPer] = useState<boolean>(false);

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

    /*
    const getHtml = async () => {
      try {
        return await axios.get(basic + name + sev, option);
      } catch (error) {
        console.error(error);
      }
    };

    getHtml().then((html: any) => {
      const $ = cheerio.load(html.data);
      const $bodyList = $("div.inner ul").children("li.level");
      console.log("성공");
      let ary = Number($bodyList.find("span.system").text());
      console.log(ary);
    });
    */
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
    setLevelPower2(c);
    setLevelPower(Math.round(c));
  };

  const closing = () => {
    setOpen(false);
  };

  const opening = () => {
    if (ready === true) setOpen(true);
  };

  const calGold1 = (e: React.ChangeEvent<{ value: unknown }>, num: number) => {
    let val: number = 0;
    setGoldPower(0);

    if ((e.target.value as number) > 9) {
      setIsPer(true);
    } else {
      setIsPer(false);
    }

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
        val = 1;
        break;
      case 12:
        val = 0.6;
        break;
      case 13:
        val = 0.375;
        break;
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        val = 0.3;
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
    let a: number = 0;
    if (isPer === true) {
      a = val * 100;
    } else {
      a = val;
    }

    switch (num) {
      case 1:
        if (Math.floor(gold1 * a) <= 300) {
          setGoldPower(Math.floor(gold1 * a) + gold3 * gold4 + gold5 * gold6);
          setGold2(val);
        } else {
          setGold2(0);
          setGoldPower(0);
        }
        break;
      case 2:
        if (Math.floor(gold3 * a) <= 300) {
          setGoldPower(gold1 * gold2 + Math.floor(gold3 * a) + gold5 * gold6);
          setGold4(val);
        } else {
          setGold4(0);
          setGoldPower(0);
        }
        break;
      case 3:
        if (Math.floor(gold5 * Math.abs(val)) <= 300) {
          setGoldPower(gold1 * gold2 + gold3 * gold4 + Math.floor(gold5 * a));
          setGold6(val);
        } else {
          setGold6(0);
          setGoldPower(0);
        }
        break;
    }
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

  useEffect(() => {
    setReady(true);
    //loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Container style={{ margin: "10px", padding: "5px", float: "left" }}>
        <TextField
          variant="outlined"
          label="아이디@서버"
          inputProps={{ style: { height: "50px", padding: "0", textAlign: "center" } }}
          style={{ width: "180px", height: "50px", float: "left" }}
        />

        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "0 10px 0 -5px",
            height: "50px",
            float: "left",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
          }}
        >
          적용
        </Button>
        <Link style={{ height: "50px", lineHeight: "40px", textDecoration: "none", float: "left" }}>전투력</Link>
        <TextField
          className={classes.powers}
          variant="outlined"
          label="레벨"
          value={levelPower || ""}
          onChange={(e) => {
            if (e.target.value !== "") setLevelPower(parseInt(e.target.value));
            else setLevelPower(0);
          }}
        />
        <TextField
          className={classes.powers}
          variant="outlined"
          label="장비"
          value={itemPower || ""}
          onChange={(e) => {
            if (e.target.value !== "") setItemPower(parseInt(e.target.value));
            else setItemPower(0);
          }}
        />
        <TextField
          className={classes.powers}
          variant="outlined"
          label="각인"
          value={engravePower || ""}
          onChange={(e) => {
            if (e.target.value !== "") setEngravePower(parseInt(e.target.value));
            else setEngravePower(0);
          }}
        />
        <TextField
          className={classes.powers}
          variant="outlined"
          label="황돋"
          value={goldPower || ""}
          onChange={(e) => {
            if (e.target.value !== "") setGoldPower(parseInt(e.target.value));
            else setGoldPower(0);
          }}
        />
        <TextField
          className={classes.powers}
          variant="outlined"
          label="기술능력"
          value={skillPower || ""}
          onChange={(e) => {
            if (e.target.value !== "") setSkillPower(parseInt(e.target.value));
            else setSkillPower(0);
          }}
        />
        <TextField
          className={classes.powers}
          variant="outlined"
          label="신수"
          value={animalPower || ""}
          onChange={(e) => {
            if (e.target.value !== "") setAnimalPower(parseInt(e.target.value));
            else setAnimalPower(0);
          }}
        />
        <TextField
          className={classes.powers}
          variant="outlined"
          label="환수"
          value={petPower || ""}
          onChange={(e) => {
            if (e.target.value !== "") setPetPower(parseInt(e.target.value));
            else setPetPower(0);
          }}
        />

        <TextField className={classes.powers} variant="outlined" label="합계" value={levelPower + itemPower || ""} />
      </Container>
      <Grid container spacing={3} style={{ margin: "10px", padding: "0" }}>
        <Grid item xs={3} style={{ padding: "5px" }}>
          <TextField
            variant="outlined"
            placeholder="99~799"
            value={level || ""}
            onChange={(e) => {
              setLevel(parseInt(e.target.value));
            }}
            inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
            style={{ width: "90px", float: "left" }}
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
              marginLeft: "-5px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              float: "left",
            }}
          >
            계산
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={opening}
            style={{ margin: "0 5px", height: "40px", float: "left" }}
          >
            TMI
          </Button>
          <br />
          <br />
          <h3>표기: {levelPower}</h3>
          <h3 style={{ margin: "0" }}>(실제: {levelPower2})</h3>
        </Grid>
        <Grid item xs={9} style={{ padding: "5px" }}>
          <Container component="div" style={{ height: "45px", margin: "5px 0", padding: "0 30px" }}>
            <TextField
              className={classes.itemBox}
              variant="outlined"
              //value={item1}
              onChange={(e) => {
                itemsUpdate(e.target.value, 1);
              }}
              placeholder="1. 목/어깨장식"
            />
            <TextField className={classes.itemBox} variant="outlined" placeholder="2. 투구" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="3. 얼굴장식" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="4. 무기" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="5. 갑옷" />
          </Container>
          <Container component="div" style={{ height: "45px", margin: "5px 0", padding: "0 30px" }}>
            <TextField className={classes.itemBox} variant="outlined" placeholder="6. 방패/보조무기" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="7. 오른손" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="8. 망토" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="9. 왼손" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="10. 보조1" />
          </Container>
          <Container component="div" style={{ height: "45px", margin: "5px 0", padding: "0 30px" }}>
            <TextField className={classes.itemBox} variant="outlined" size="small" placeholder="11. 신발" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="12. 보조2" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="13. 장신구" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="14. 세트옷" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="15. 강화슬롯" />
          </Container>
          <Container component="div" style={{ height: "45px", margin: "5px 0", padding: "0 30px" }}>
            <h3 style={{ margin: "0", float: "left" }}>장비 전투력 : {itemPower}</h3>
            <Button
              variant="contained"
              color="secondary"
              onClick={opening}
              style={{ margin: "0 5px", height: "40px", float: "left" }}
            >
              TMI
            </Button>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
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
              <MenuItem className={classes.selMenu} value={0}>
                능력치
              </MenuItem>
              <MenuItem className={classes.selMenu} value={1}>
                체력/마력
              </MenuItem>
              <MenuItem className={classes.selMenu} value={2}>
                재생력
              </MenuItem>
              <MenuItem className={classes.selMenu} value={3}>
                방관/마치/공증/마증
              </MenuItem>
              <MenuItem className={classes.selMenu} value={4}>
                타흡/마흡/피흡
              </MenuItem>
              <MenuItem className={classes.selMenu} value={5}>
                시향/회향/직타
              </MenuItem>
              <MenuItem className={classes.selMenu} value={6}>
                힘/민/지
              </MenuItem>
              <MenuItem className={classes.selMenu} value={7}>
                명중률/타격치
              </MenuItem>
              <MenuItem className={classes.selMenu} value={8}>
                마법수준향상
              </MenuItem>
              <MenuItem className={classes.selMenu} value={9}>
                명중회피/방무/방어
              </MenuItem>
              <MenuItem className={classes.selMenu} value={10}>
                체력/마력(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={11}>
                방무/방어(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={12}>
                힘/민/지(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={13}>
                명중회피(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={14}>
                방관/마치/공증/마증(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={15}>
                타흡/마흡/피흡(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={16}>
                시향/회향/직타(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={17}>
                명중률/타격치(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={18}>
                마법수준/재생력(%)
              </MenuItem>
            </Select>
            <TextField
              variant="outlined"
              className={classes.selText}
              placeholder="수치"
              type="number"
              value={gold2 || ""}
              onChange={(e) => {
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
              <MenuItem className={classes.selMenu} value={0}>
                능력치
              </MenuItem>
              <MenuItem className={classes.selMenu} value={1}>
                체력/마력
              </MenuItem>
              <MenuItem className={classes.selMenu} value={2}>
                재생력
              </MenuItem>
              <MenuItem className={classes.selMenu} value={3}>
                방관/마치/공증/마증
              </MenuItem>
              <MenuItem className={classes.selMenu} value={4}>
                타흡/마흡/피흡
              </MenuItem>
              <MenuItem className={classes.selMenu} value={5}>
                시향/회향/직타
              </MenuItem>
              <MenuItem className={classes.selMenu} value={6}>
                힘/민/지
              </MenuItem>
              <MenuItem className={classes.selMenu} value={7}>
                명중률/타격치
              </MenuItem>
              <MenuItem className={classes.selMenu} value={8}>
                마법수준향상
              </MenuItem>
              <MenuItem className={classes.selMenu} value={9}>
                명중회피/방무/방어
              </MenuItem>
              <MenuItem className={classes.selMenu} value={10}>
                체력/마력(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={11}>
                방무/방어(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={12}>
                힘/민/지(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={13}>
                명중회피(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={14}>
                방관/마치/공증/마증(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={15}>
                타흡/마흡/피흡(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={16}>
                시향/회향/직타(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={17}>
                명중률/타격치(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={18}>
                마법수준/재생력(%)
              </MenuItem>
            </Select>
            <TextField
              variant="outlined"
              className={classes.selText}
              placeholder="수치"
              type="number"
              value={gold4 || ""}
              onChange={(e) => {
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
              <MenuItem className={classes.selMenu} value={0}>
                능력치
              </MenuItem>
              <MenuItem className={classes.selMenu} value={1}>
                체력/마력
              </MenuItem>
              <MenuItem className={classes.selMenu} value={2}>
                재생력
              </MenuItem>
              <MenuItem className={classes.selMenu} value={3}>
                방관/마치/공증/마증
              </MenuItem>
              <MenuItem className={classes.selMenu} value={4}>
                타흡/마흡/피흡
              </MenuItem>
              <MenuItem className={classes.selMenu} value={5}>
                시향/회향/직타
              </MenuItem>
              <MenuItem className={classes.selMenu} value={6}>
                힘/민/지
              </MenuItem>
              <MenuItem className={classes.selMenu} value={7}>
                명중률/타격치
              </MenuItem>
              <MenuItem className={classes.selMenu} value={8}>
                마법수준향상
              </MenuItem>
              <MenuItem className={classes.selMenu} value={9}>
                명중회피/방무/방어
              </MenuItem>
              <MenuItem className={classes.selMenu} value={10}>
                체력/마력(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={11}>
                방무/방어(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={12}>
                힘/민/지(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={13}>
                명중회피(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={14}>
                방관/마치/공증/마증(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={15}>
                타흡/마흡/피흡(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={16}>
                시향/회향/직타(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={17}>
                명중률/타격치(%)
              </MenuItem>
              <MenuItem className={classes.selMenu} value={18}>
                마법수준/재생력(%)
              </MenuItem>
            </Select>
            <TextField
              variant="outlined"
              className={classes.selText}
              placeholder="수치"
              type="number"
              value={gold6 || ""}
              onChange={(e) => {
                calGold2(Number(e.target.value), 3);
              }}
            />
          </Container>
          <Container component="div" style={{ width: "100%", padding: "0", float: "left" }}>
            <Link
              style={{
                width: "200px",
                height: "40px",
                lineHeight: "40px",
                margin: "5px",
                paddingLeft: "30px",
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
              variant="contained"
              color="secondary"
              style={{
                width: "70px",
                margin: "5px",
                height: "40px",
                float: "left",
              }}
            >
              TMI
            </Button>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={closing} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>몰라도 되는 TMI</h3>
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
          <Button tabIndex={-1} color="primary" onClick={closing}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
