import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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

import Select from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import "./Power.css";
import itemPowers from "interfaces/Calculator/power";

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
    selectBox: {
      height: "45px",
      margin: "5px 10px",
      float: "left",
    },
    select: {
      width: "90px",
      textAlignLast: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
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

  const calLevel = (lev: number) => {
    let a: number = Math.floor(lev / 100);
    var b: number = lev % 100;
    var c: number = 0;

    console.log(a);
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

  const itemsUpdate = (name: string, type: number) => {
    switch (type) {
      case 1:
        setItems1(name);
        break;
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
    }
  };

  useEffect(() => {
    setReady(true);
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
              value={items1}
              onChange={(e) => {
                itemsUpdate(e.target.value, 1);
              }}
              placeholder="1) 목/어깨장식"
            />
            <TextField className={classes.itemBox} variant="outlined" placeholder="2) 투구" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="3) 얼굴장식" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="4) 무기" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="5) 갑옷" />
          </Container>
          <Container component="div" style={{ height: "45px", margin: "5px 0", padding: "0 30px" }}>
            <TextField className={classes.itemBox} variant="outlined" placeholder="6) 방패/보조무기" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="7) 오른손" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="8) 망토" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="9) 왼손" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="10) 보조 1" />
          </Container>
          <Container component="div" style={{ height: "45px", margin: "5px 0", padding: "0 30px" }}>
            <TextField className={classes.itemBox} variant="outlined" size="small" placeholder="11) 신발" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="12) 보조 2" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="13) 장신구" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="14) 세트옷" />
            <TextField className={classes.itemBox} variant="outlined" placeholder="15) 강화슬롯" />
          </Container>
          <Container component="div" style={{ height: "45px", margin: "5px 0", padding: "0 30px" }}>
            <h3 style={{ margin: "0" }}>장비 전투력 : {itemPower}</h3>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.selectBox}>
            <InputLabel htmlFor="select-outlined">환수</InputLabel>
            <Select
              className={classes.select}
              id="select-outlined"
              inputProps={{
                style: { padding: "2px 20px 2px 2px", height: "26px" },
              }}
            >
              <option aria-label="None" value="" />
              <option value={0}>황룡</option>
              <option value={5}>청룡</option>
              <option value={5}>주작</option>
              <option value={5}>백호</option>
              <option value={5}>현무</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={6}>
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
