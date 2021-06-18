import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  box: {
    width: "40px",
    margin: "5px",
    float: "left",
    "& input": {
      height: "40px",
      padding: "0",
      textAlign: "center",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
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
  petText: {
    width: "50px",
    height: "40px",
    lineHeight: "40px",
    margin: "5px 0",
    float: "left",
    textAlign: "center",
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
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
  powerText: {
    width: "240px",
    height: "40px",
    lineHeight: "40px",
    margin: "5px 0",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    float: "left",
  },
  btn: {
    height: "40px",
    margin: "5px",
    padding: "0",
    float: "left",
  },
  dlgText: {
    fontFamily: "Jua",
    marginBottom: "8px",
  },
});

const Menus = withStyles({
  root: {
    minHeight: "40px",
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
    grade: 9,
    level: 99,
    weaphon: 0,
    helmet: 0,
    armor: 0,
    handL: 0,
    handR: 0,
    neck: 0,
    face: 0,
    set: 0,
    shield: 0,
  });

  const switchDlg = () => {
    setOpenHelper(!openHelper);
  };

  useEffect(() => {
    setPetInfo(petInfo);

    if (petInfo.grade === 0 || petInfo.level === 0) {
      setPetPower(0);
    } else {
      setPetPower(
        petInfo.grade * 200 +
          petInfo.level * 2 +
          petInfo.weaphon +
          petInfo.helmet +
          petInfo.armor +
          petInfo.handL +
          petInfo.handR +
          petInfo.neck * 100 +
          petInfo.face * 100 +
          petInfo.set * 100 +
          petInfo.shield * 100
      );
    }
  }, [petInfo]);

  return (
    <React.Fragment>
      <Grid item container justify='center' style={{ padding: "0", margin: "0" }}>
        <label>
          <TextField
            variant='outlined'
            type='number'
            value={petInfo.grade || ""}
            className={classes.box}
            onChange={e => {
              if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 10) {
                setPetInfo({ ...petInfo, grade: parseInt(e.target.value) });
              } else {
                setPetInfo({ ...petInfo, grade: 0 });
              }
            }}
          />
        </label>
        <Typography className={classes.petText} style={{ width: "40px", textAlign: "left" }}>
          등급
        </Typography>
        <label>
          <TextField
            variant='outlined'
            type='number'
            className={classes.box}
            value={petInfo.level || ""}
            onChange={e => {
              if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 100) {
                setPetInfo({ ...petInfo, level: parseInt(e.target.value) });
              } else {
                setPetInfo({ ...petInfo, level: 0 });
              }
            }}
          />
        </label>
        <Typography className={classes.petText} style={{ width: "40px", textAlign: "left" }}>
          레벨
        </Typography>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.petText}>무 기</Typography>
        <TextField
          variant='outlined'
          type='number'
          value={petInfo.weaphon || ""}
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            if (parseInt(e.target.value) > 0 && e.target.value.length < 5) {
              setPetInfo({ ...petInfo, weaphon: parseInt(e.target.value) });
            } else {
              setPetInfo({ ...petInfo, weaphon: 0 });
            }
          }}
        />
        <Typography className={classes.petText}>목걸이</Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={petInfo.neck}
          onChange={e => {
            setPetInfo({ ...petInfo, neck: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>작생목</Menus>
          <Menus value={2}>생목</Menus>
          <Menus value={3}>커생목</Menus>
          <Menus value={4}>극락목</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.petText}>투 구</Typography>
        <TextField
          variant='outlined'
          type='number'
          className={classes.petInput}
          value={petInfo.helmet || ""}
          placeholder='전투력'
          onChange={e => {
            if (parseInt(e.target.value) > 0 && e.target.value.length < 5) {
              setPetInfo({ ...petInfo, helmet: parseInt(e.target.value) });
            } else {
              setPetInfo({ ...petInfo, helmet: 0 });
            }
          }}
        />
        <Typography className={classes.petText}>문 양</Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={petInfo.face}
          onChange={e => {
            setPetInfo({ ...petInfo, face: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={2}>문양</Menus>
          <Menus value={4}>문양'진</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.petText}>갑 옷</Typography>
        <TextField
          variant='outlined'
          type='number'
          className={classes.petInput}
          value={petInfo.armor || ""}
          placeholder='전투력'
          onChange={e => {
            if (parseInt(e.target.value) > 0 && e.target.value.length < 5) {
              setPetInfo({ ...petInfo, armor: parseInt(e.target.value) });
            } else {
              setPetInfo({ ...petInfo, armor: 0 });
            }
          }}
        />
        <Typography className={classes.petText}>세트옷</Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={petInfo.set}
          onChange={e => {
            setPetInfo({ ...petInfo, set: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={3}>환수神</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.petText}>성 물</Typography>
        <TextField
          variant='outlined'
          type='number'
          className={classes.petInput}
          value={petInfo.handL || ""}
          placeholder='전투력'
          onChange={e => {
            if (parseInt(e.target.value) > 0 && e.target.value.length < 5) {
              setPetInfo({ ...petInfo, handL: parseInt(e.target.value) });
            } else {
              setPetInfo({ ...petInfo, handL: 0 });
            }
          }}
        />
        <Typography className={classes.petText}>신 물</Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={petInfo.shield}
          onChange={e => {
            setPetInfo({ ...petInfo, shield: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={3}>1성</Menus>
          <Menus value={4}>2성</Menus>
          <Menus value={5}>3성</Menus>
          <Menus value={6}>4성</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.petText}>성 물</Typography>
        <TextField
          variant='outlined'
          type='number'
          value={petInfo.handR || ""}
          className={classes.petInput}
          placeholder='전투력'
          onChange={e => {
            if (parseInt(e.target.value) > 0 && e.target.value.length < 5) {
              setPetInfo({ ...petInfo, handR: parseInt(e.target.value) });
            } else {
              setPetInfo({ ...petInfo, handR: 0 });
            }
          }}
        />
        <Typography className={classes.petText} style={{ width: "130px", color: "blue", fontSize: "0.8rem" }}>
          * 신물은 강화 적용됨 *
        </Typography>
      </Grid>
      <Grid item style={{ width: "100%", padding: "0", margin: "0" }}>
        <Typography className={classes.powerText}>환수 전투력 : {petPower}</Typography>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }} onClick={switchDlg}>
          ?
        </Button>
      </Grid>

      <Dialog open={openHelper} onClose={switchDlg} maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>환수 전투력 TMI</Typography>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 환수 전투력 = 기본 전투력 + 환수 장비 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 기본 전투력 = 200 x 등급 + 2 x 레벨
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 잠재 능력에 %돋이 없고 최대 수치가 일반 장비와 다르다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 부위(무기/투구/갑옷/손)에 따라서도 최대 수치가 다르다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 일반 장비처럼 강화가 가능하다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영되지 않는다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={switchDlg} style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
