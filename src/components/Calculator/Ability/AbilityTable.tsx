import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";

import CharState from "state/Calculator/Ability/CharState";
import EquipState from "state/Calculator/Ability/EquipState";
import EngraveState from "state/Calculator/Ability/EngraveState";
import GoldState1 from "state/Calculator/Ability/GoldState1";
import GoldState2 from "state/Calculator/Ability/GoldState2";
import AnimalState from "state/Calculator/Ability/AnimalState";
import AwakState from "state/Calculator/Ability/AwakState";
import PetState from "state/Calculator/Ability/PetState";
import PairState from "state/Calculator/Ability/PairState";
import ClothState from "state/Calculator/Ability/ClothState";
import SkillState from "state/Calculator/Ability/SkillState";
import PotionState from "state/Calculator/Ability/PotionState";
import TitleState from "state/Calculator/Ability/TitleState";
import FamilyState from "state/Calculator/Ability/FamilyState";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles({
  title: {
    width: "100px",
    height: "28px",
    lineHeight: "28px",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    width: "712px",
    height: "100px",
    border: "1px solid gray",
    borderRadius: "10px",
    margin: "10px",
    padding: "5px",
    float: "left",
    "& div": {
      padding: "0",
      float: "left",
      "& p": {
        width: "100px",
        height: "30px",
        lineHeight: "30px",
        fontSize: "1rem",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
  },
  btn: {
    width: "150px",
    height: "40px",
    padding: "5px",
    margin: "5px",
  },
  btnClose: {
    minWidth: 10,
    fontSize: "1rem",
    padding: "0",
    position: "absolute",
    top: 5,
    right: 10,
  },
});

export default function AbilityTable() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState(false);
  const [openHelper2, setOpenHelper2] = useState(false);

  const charState = useRecoilValue(CharState);
  const equipState = useRecoilValue(EquipState);
  const engraveState = useRecoilValue(EngraveState);
  const goldState1 = useRecoilValue(GoldState1);
  const goldState2 = useRecoilValue(GoldState2);
  const animalState = useRecoilValue(AnimalState);
  const awakState = useRecoilValue(AwakState);
  const petState = useRecoilValue(PetState);
  const pairState = useRecoilValue(PairState);
  const titleState = useRecoilValue(TitleState);
  const clothState = useRecoilValue(ClothState);
  const skillState = useRecoilValue(SkillState);
  const potionState = useRecoilValue(PotionState);
  const familyState = useRecoilValue(FamilyState);
  const [totalState, setTotalState] = useState([0, 0, 0, 0, 0, 0]); // 최종 합산 스텟
  var statList = ["방어도", "방어구관통", "방어도무시", "공격력증가", "마법치명", "마력증강"]; // 스텟 종류

  useEffect(() => {
    const calAbility = () => {
      let total: number[] = [0, 0, 0, 0, 0, 0];

      // [{ 직업스탯 + 장비(아이템 + 각인 + @돋 + 신수) or 신체각성 + 환수 + 한벌효과 } * %돋 + 칭호] x 품의 + { 마법 + 시약 + 가문력 }
      //      A                   B                         C           D              E    F        g              H
      for (let idx = 0; idx < 6; idx++) {
        let a: number = charState[idx];
        let b: number = equipState[idx] + engraveState[idx] + goldState1[idx] + animalState[idx];
        let c: number = awakState[idx];
        let d: number = petState[idx] + pairState[idx];
        let e: number = goldState2[idx];
        let f: number = titleState[idx];
        let g: number = clothState[idx];
        let h: number = skillState[idx] + potionState[idx] + +familyState[idx];

        if (Math.abs(b) > Math.abs(c)) {
          total[idx] = Math.floor((Math.floor((a + b + d) * (1 + e / 100)) + f) * g) + h;
        } else {
          total[idx] = Math.floor((Math.floor((a + c + d) * (1 + e / 100)) + f) * g) + h;
        }
      }
      setTotalState(total);
    };

    calAbility();
  }, [
    charState,
    equipState,
    engraveState,
    goldState1,
    goldState2,
    animalState,
    awakState,
    petState,
    pairState,
    skillState,
    potionState,
    titleState,
    familyState,
    clothState,
  ]);

  return (
    <>
      <Grid container direction='row' alignItems='center' justify='center' className={classes.row}>
        <Grid container direction='row'>
          <Typography style={{ color: "blue" }}>능력치</Typography>
          {statList.map((name: string) => {
            return <Typography key={name}>{name}</Typography>;
          })}
        </Grid>
        <Grid container direction='row'>
          <Typography style={{ color: "blue" }}>합 계</Typography>
          {totalState.map((stat: number, idx: number) => {
            return <Typography key={idx}>{stat}</Typography>;
          })}
        </Grid>
      </Grid>

      <div style={{ margin: "10px" }}>
        <Button variant='outlined' color='primary' className={classes.btn} onClick={() => setOpenHelper(true)}>
          능력치 계산 공식
        </Button>
        <br />
        <Button variant='outlined' color='primary' className={classes.btn} onClick={() => setOpenHelper2(true)}>
          항목별 세부 수치
        </Button>
      </div>

      <Divider style={{ width: "100%", height: "4px", margin: "8px 0" }} />

      <Dialog
        open={openHelper}
        maxWidth='lg'
        onClose={() => {
          setOpenHelper(false);
        }}>
        <DialogTitle style={{ padding: "0 5px", textAlign: "center" }}>
          <span>
            <h2 style={{ margin: "10px 0" }}>능력치 세부 공식</h2>
            <Button
              onClick={() => {
                setOpenHelper(false);
              }}
              className={classes.btnClose}>
              &#10006;
            </Button>
          </span>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "10px 40px" }}>
          <Typography
            variant='h5'
            style={{
              color: "blue",
              textAlign: "center",
              fontWeight: "bold",
              margin: "10px 0",
            }}>{`최종 능력치 = {(A + B or B' +  C + D) x E + F} x G + H`}</Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            A &nbsp;= 직업 스탯 (힘민지건혜)
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            B &nbsp;= 장비 스탯 (아이템 + 각인 + 황돋 + 신수 장비)
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            B' = 신체 각성
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            C &nbsp;= 환수 시동
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            D &nbsp;= 한벌 효과
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            E &nbsp;= 황돋 %돋
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            F &nbsp;= 칭호 효과
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            G &nbsp;= 품의 효과
          </Typography>
          <Typography variant='h6' style={{ padding: "0 20px" }}>
            H &nbsp;= 마법 효과 + 물약 효과 + 가문 특성
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: "10px" }}>
          <Button
            color='primary'
            onClick={() => {
              setOpenHelper(false);
            }}
            style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openHelper2}
        maxWidth='lg'
        onClose={() => {
          setOpenHelper2(false);
        }}>
        <DialogTitle style={{ padding: "0 5px", textAlign: "center" }}>
          <span>
            <h2 style={{ margin: "10px 0" }}>항목별 세부 수치</h2>
            <Button
              onClick={() => {
                setOpenHelper2(false);
              }}
              className={classes.btnClose}>
              &#10006;
            </Button>
          </span>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "20px 40px" }}>
          <Grid container direction='row'>
            <Typography className={classes.title}></Typography>
            {statList.map((name: string) => {
              return (
                <Typography key={name} className={classes.title}>
                  {name}
                </Typography>
              );
            })}
          </Grid>

          <Grid container direction='row'>
            <Typography className={classes.title}> 직업 스텟 </Typography>
            {charState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>아이템</Typography>
            {equipState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>각인</Typography>
            {engraveState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>황돋</Typography>
            {goldState1.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>신수</Typography>
            {animalState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>신체각성</Typography>
            {awakState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>환수 시동</Typography>
            {petState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>%돋</Typography>
            {goldState2.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>한벌 효과</Typography>
            {pairState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>칭호</Typography>
            {titleState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>마법</Typography>
            {skillState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>물약</Typography>
            {potionState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid container direction='row'>
            <Typography className={classes.title}>가문특성</Typography>
            {familyState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "10px" }}>
          <Button
            color='primary'
            onClick={() => {
              setOpenHelper2(false);
            }}
            style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
