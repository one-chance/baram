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

export default function Animal() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [animalPower, setAnimalPower] = useState<number>(0); // 신수 전투력

  // 신수 정보 : 등급, 레벨, 무기, 갑옷, 손, 손, 보주
  const [animalInfo, setAnimalInfo] = useState({ grade: 5, level: 99, weaphon: 7, helmet: 7, armor: 7, handL: 2, handR: 2, orb: 2 });

  const switchDlg = () => {
    setOpenHelper(!openHelper);
  };

  useEffect(() => {
    setAnimalInfo(animalInfo);
    if (animalInfo.grade === 0 || animalInfo.level === 0) {
      setAnimalPower(0);
    } else {
      setAnimalPower(
        animalInfo.grade * 400 +
          animalInfo.level * 4 +
          (animalInfo.weaphon * 50 + 250) +
          (animalInfo.helmet * 50 + 250) +
          (animalInfo.armor * 50 + 250) +
          animalInfo.handL * 100 +
          animalInfo.handR * 100 +
          animalInfo.orb * 200
      );
    }
  }, [animalInfo]);

  return (
    <React.Fragment>
      <Grid item container justify='center' style={{ padding: "0", margin: "0" }}>
        <label>
          <TextField
            variant='outlined'
            className={classes.box}
            value={animalInfo.grade || ""}
            onChange={e => {
              if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 6) {
                setAnimalInfo({ ...animalInfo, grade: Number(e.target.value) });
              } else {
                setAnimalInfo({ ...animalInfo, grade: 0 });
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
            value={animalInfo.level || ""}
            onChange={e => {
              if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 100) {
                setAnimalInfo({ ...animalInfo, level: parseInt(e.target.value) });
              } else {
                setAnimalInfo({ ...animalInfo, level: 0 });
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
        <Select
          className={classes.select2}
          variant='outlined'
          value={animalInfo.weaphon}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, weaphon: Number(e.target.value) });
          }}>
          <Menus value={5}>5성</Menus>
          <Menus value={6}>6성</Menus>
          <Menus value={7}>7성</Menus>
          <Menus value={8}>8성</Menus>
          <Menus value={9}>9성</Menus>
        </Select>
        <Typography className={classes.petText} style={{ marginLeft: "20px" }}>
          손
        </Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={animalInfo.handL}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, handL: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>1단</Menus>
          <Menus value={2}>2단</Menus>
          <Menus value={3}>3단</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.petText}>투구</Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={animalInfo.helmet}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, helmet: Number(e.target.value) });
          }}>
          <Menus value={5}>5성</Menus>
          <Menus value={6}>6성</Menus>
          <Menus value={7}>7성</Menus>
          <Menus value={8}>8성</Menus>
          <Menus value={9}>9성</Menus>
        </Select>
        <Typography className={classes.petText} style={{ marginLeft: "20px" }}>
          손
        </Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={animalInfo.handR}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, handR: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>1단</Menus>
          <Menus value={2}>2단</Menus>
          <Menus value={3}>3단</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.petText}>갑옷</Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={animalInfo.armor}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, armor: Number(e.target.value) });
          }}>
          <Menus value={5}>5성</Menus>
          <Menus value={6}>6성</Menus>
          <Menus value={7}>7성</Menus>
          <Menus value={8}>8성</Menus>
          <Menus value={9}>9성</Menus>
        </Select>
        <Typography className={classes.petText} style={{ marginLeft: "20px" }}>
          보주
        </Typography>
        <Select
          className={classes.select2}
          variant='outlined'
          value={animalInfo.orb}
          onChange={e => {
            setAnimalInfo({ ...animalInfo, orb: Number(e.target.value) });
          }}>
          <Menus value={0}>없음</Menus>
          <Menus value={1}>1개</Menus>
          <Menus value={2}>2개</Menus>
        </Select>
      </Grid>
      <Grid item style={{ padding: "0", margin: "0" }}>
        <Typography className={classes.powerText}>신수 전투력 : {animalPower}</Typography>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px", margin: "5px 0" }} onClick={switchDlg}>
          ?
        </Button>
      </Grid>

      <Dialog open={openHelper} onClose={switchDlg} maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>신수 전투력 TMI</Typography>
        </DialogTitle>
        <DialogContent dividers={true} style={{ minWidth: "40vw", padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 신수 전투력 = 기본 전투력 + 신수 장비 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 기본 전투력 = 400 x 등급 + 4 x 레벨
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 등급업은 레벨 +2로 취급된다. (99 &gt; 등급업 &gt; 1)
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
