import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

    btn: {
      height: "40px",
      margin: "5px",
      padding: "0",
    },

    dlgText: {
      height: "30px",
      fontFamily: "Jua",
      marginBottom: "10px",
    },
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Pet() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [petPower, setPetPower] = useState<number>(0); // 환수 전투력

  // 환수 정보 : 등급, 레벨, 무기, 투구, 갑옷, 성물, 성물, 목걸이, 문양, 세트옷, 신물
  const [petInfo, setPetInfo] = useState({
    grade: "9",
    level: "99",
    weaphon: "0",
    helmet: "0",
    armor: "0",
    handL: "0",
    handR: "0",
    neck: 0,
    face: 0,
    set: 0,
    shield: 0,
  });

  useEffect(() => {
    if (petInfo.grade === "" || petInfo.level === "") {
      return;
    }
    setPetInfo(petInfo);

    setPetPower(
      parseInt(petInfo.grade) * 200 +
        parseInt(petInfo.level) * 2 +
        parseInt(petInfo.weaphon) +
        parseInt(petInfo.helmet) +
        parseInt(petInfo.armor) +
        parseInt(petInfo.handL) +
        parseInt(petInfo.handR) +
        petInfo.neck +
        petInfo.face +
        petInfo.set +
        petInfo.shield
    );
  }, [petInfo]);

  return (
    <React.Fragment>
      <Container style={{ width: "100%", height: "50px", padding: "0 75px", margin: "0" }}>
        <TextField
          variant='outlined'
          type='tel'
          value={petInfo.grade}
          inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
          onChange={e => {
            if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 9) {
              setPetInfo({ ...petInfo, grade: "9" });
            } else {
              setPetInfo({ ...petInfo, grade: e.target.value });
            }
          }}
          style={{ width: "35px", float: "left", margin: "5px 0" }}
        />
        <Link
          style={{
            width: "35px",
            height: "35px",
            lineHeight: "35px",
            margin: "5px 5px 5px 0",
            float: "left",
            textDecoration: "none",
            textAlign: "center",
            color: "black",
          }}>
          등급
        </Link>
        <TextField
          variant='outlined'
          type='tel'
          inputProps={{ style: { height: "35px", padding: "0", textAlign: "center" } }}
          value={petInfo.level}
          onChange={e => {
            if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 99) {
              setPetInfo({ ...petInfo, level: "99" });
            } else {
              setPetInfo({ ...petInfo, level: e.target.value });
            }
          }}
          style={{ width: "35px", float: "left", margin: "5px 0 0 5px" }}
        />
        <Link
          style={{
            width: "35px",
            lineHeight: "35px",
            margin: "5px 0",
            float: "left",
            textDecoration: "none",
            textAlign: "center",
            color: "black",
          }}>
          레벨
        </Link>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>무 기</Link>
        <TextField
          variant='outlined'
          type='tel'
          value={petInfo.weaphon === "0" ? "" : petInfo.weaphon}
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            if (e.target.value.length > 4) {
              setPetInfo({ ...petInfo, weaphon: "0" });
              return;
            }

            if (e.target.value === "" || e.target.value === "-") {
              setPetInfo({ ...petInfo, weaphon: "0" });
            } else {
              setPetInfo({ ...petInfo, weaphon: e.target.value });
            }
          }}
        />
        <Link className={classes.petText}>목걸이</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setPetInfo({ ...petInfo, neck: Number(e.target.value) * 100 });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>작생목</Menus>
          <Menus value={2}>생목</Menus>
          <Menus value={3}>커생목</Menus>
          <Menus value={4}>극락목</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>투 구</Link>
        <TextField
          variant='outlined'
          type='tel'
          className={classes.petInput}
          value={petInfo.helmet === "0" ? "" : petInfo.helmet}
          placeholder='전투력'
          onChange={e => {
            if (e.target.value.length > 4) {
              setPetInfo({ ...petInfo, helmet: "0" });
              return;
            }

            if (e.target.value === "" || e.target.value === "-") {
              setPetInfo({ ...petInfo, helmet: "0" });
            } else {
              setPetInfo({ ...petInfo, helmet: e.target.value });
            }
          }}
        />
        <Link className={classes.petText}>문 양</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setPetInfo({ ...petInfo, face: Number(e.target.value) * 100 });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={2}>문양</Menus>
          <Menus value={4}>문양'진</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>갑 옷</Link>
        <TextField
          variant='outlined'
          type='tel'
          className={classes.petInput}
          value={petInfo.armor === "0" ? "" : petInfo.armor}
          placeholder='전투력'
          onChange={e => {
            if (e.target.value.length > 4) {
              setPetInfo({ ...petInfo, armor: "0" });
              return;
            }

            if (e.target.value === "" || e.target.value === "-") {
              setPetInfo({ ...petInfo, armor: "0" });
            } else {
              setPetInfo({ ...petInfo, armor: e.target.value });
            }
          }}
        />
        <Link className={classes.petText}>세트옷</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setPetInfo({ ...petInfo, set: Number(e.target.value) * 100 });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={3}>환수神</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>성 물</Link>
        <TextField
          variant='outlined'
          type='tel'
          className={classes.petInput}
          value={petInfo.handL === "0" ? "" : petInfo.handL}
          placeholder='전투력'
          onChange={e => {
            if (e.target.value === "" || e.target.value === "-") {
              setPetInfo({ ...petInfo, handL: "0" });
            } else {
              setPetInfo({ ...petInfo, handL: e.target.value });
            }
          }}
        />
        <Link className={classes.petText}>신 물</Link>
        <Select
          className={classes.select2}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setPetInfo({ ...petInfo, shield: Number(e.target.value) * 100 });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={3}>1성</Menus>
          <Menus value={4}>2성</Menus>
          <Menus value={5}>3성</Menus>
          <Menus value={6}>4성</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.petText}>성 물</Link>
        <TextField
          variant='outlined'
          type='tel'
          value={petInfo.handR === "0" ? "" : petInfo.handR}
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            if (e.target.value === "" || e.target.value === "-") {
              setPetInfo({ ...petInfo, handR: "0" });
            } else {
              setPetInfo({ ...petInfo, handR: e.target.value });
            }
          }}
        />
        <Link className={classes.petText} style={{ width: "130px", color: "gray", fontSize: "0.8rem" }}>
          * 신물은 강화 적용됨 *
        </Link>
      </Container>
      <Container style={{ width: "100%", height: "50px", padding: "0", margin: "0" }}>
        <Link className={classes.powerText}>환수 전투력 : {petPower}</Link>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }} onClick={() => setOpenHelper(true)}>
          ?
        </Button>
      </Container>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>환수 전투력 TMI</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 환수 전투력 = 기본 전투력 + 환수 장비 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 기본 전투력 = 200 x 등급 + 2 x 레벨
          </Typography>
          <Typography variant='h5' className={classes.dlgText} style={{ margin: "0" }}>
            * 환수 장비의 일부 잠재능력은 최대 수치가 일반 장비와 다르다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ paddingLeft: "20px" }}>
            ex) 방관/마치 : 50, 마법수준향상 : 3, 명중률 : 4
          </Typography>
          <Typography variant='h5' className={classes.dlgText} style={{ margin: "0" }}>
            * 일반 장비처럼 강화가 가능하다.
          </Typography>
          <Typography variant='h6' className={classes.dlgText} style={{ paddingLeft: "20px" }}>
            ex) 무기, 투구, 갑옷, 성물(손), 신물(방패)
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영되지 않는다.
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            tabIndex={-1}
            color='primary'
            onClick={() => {
              setOpenHelper(false);
            }}
            style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
