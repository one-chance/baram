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
import SkillState from "state/Calculator/Ability/SkillState";
import PotionState from "state/Calculator/Ability/PotionState";
import TitleState from "state/Calculator/Ability/TitleState";
import FamilyState from "state/Calculator/Ability/FamilyState";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    height: "28px",
    lineHeight: "28px",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default function AbilityTable() {
  const classes = useStyles();
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
  const skillState = useRecoilValue(SkillState);
  const potionState = useRecoilValue(PotionState);
  const familyState = useRecoilValue(FamilyState);
  const [totalState, setTotalState] = useState([0, 0, 0, 0, 0, 0]); // 최종 합산 스텟
  var statList = ["방어도", "방어구관통", "방어도무시", "공격력증가", "마법치명", "마력증강"]; // 스텟 종류

  useEffect(() => {
    const calAbility = () => {
      let total: number[] = [0, 0, 0, 0, 0, 0];

      for (let idx = 0; idx < 6; idx++) {
        let a: number = charState[idx];
        let b: number = equipState[idx] + engraveState[idx] + goldState1[idx] + animalState[idx];
        let c: number = awakState[idx];
        let d: number = petState[idx];
        let e: number = goldState2[idx];
        let f: number = pairState[idx] + skillState[idx] + potionState[idx] + titleState[idx] + familyState[idx];

        if (b > c) {
          total[idx] = Math.floor((a + b + d) * (1 + e / 100)) + f;
        } else {
          total[idx] = Math.floor((a + c + d) * (1 + e / 100)) + f;
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
  ]);

  return (
    <>
      <div style={{ border: "1px solid gray", borderRadius: "10px", margin: "0 5px", padding: "5px", float: "left" }}>
        <div style={{ width: "100px", float: "left" }}>
          <Typography className={classes.title}></Typography>
          {statList.map((name: string) => {
            return (
              <Typography key={name} className={classes.title}>
                {name}
              </Typography>
            );
          })}
        </div>
      </div>
      <div style={{ border: "1px solid gray", borderRadius: "10px", margin: "0 5px", padding: "5px", float: "left" }}>
        <div style={{ width: "100px", float: "left" }}>
          <Typography className={classes.title}>직업 스텟</Typography>
          {charState.map((stat: number, idx: number) => {
            return (
              <Typography key={idx} className={classes.title}>
                {stat}
              </Typography>
            );
          })}
        </div>
      </div>
      <div style={{ border: "1px solid gray", borderRadius: "10px", margin: "0 5px", padding: "5px", float: "left" }}>
        <div style={{ width: "100px", float: "left" }}>
          <Typography className={classes.title}>일반 장비</Typography>
          {charState.map((stat: number, idx: number) => {
            return (
              <Typography key={idx} className={classes.title}>
                {stat}
              </Typography>
            );
          })}
        </div>
        <div style={{ width: "100px", float: "left" }}>
          <Typography className={classes.title}>각인 수치</Typography>
          {charState.map((stat: number, idx: number) => {
            return (
              <Typography key={idx} className={classes.title}>
                {stat}
              </Typography>
            );
          })}
        </div>
        <div style={{ width: "100px", float: "left" }}>
          <Typography className={classes.title}>황돋 장비</Typography>
          {charState.map((stat: number, idx: number) => {
            return (
              <Typography key={idx} className={classes.title}>
                {stat}
              </Typography>
            );
          })}
        </div>
        <div style={{ width: "100px", float: "left" }}>
          <Typography className={classes.title}>신수 장비</Typography>
          {charState.map((stat: number, idx: number) => {
            return (
              <Typography key={idx} className={classes.title}>
                {stat}
              </Typography>
            );
          })}
        </div>
        <div style={{ width: "100px", float: "left" }}>
          <Typography className={classes.title}>장비 합계</Typography>
          {charState.map((stat: number, idx: number) => {
            return (
              <Typography key={idx} className={classes.title}>
                {stat}
              </Typography>
            );
          })}
        </div>
      </div>
      <Grid container spacing={0} style={{ border: "1px solid gray", borderRadius: "10px", margin: "0", padding: "5px" }}>
        <Grid container item xs={1} direction='column'>
          <Typography className={classes.title}></Typography>
          {statList.map((name: string) => {
            return (
              <Typography key={name} className={classes.title}>
                {name}
              </Typography>
            );
          })}
        </Grid>
        <Grid container item xs={10} direction='column' className={classes.title}>
          <Grid item>
            <Typography className={classes.title}> 직업 스텟 </Typography>
            {charState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>아이템</Typography>
            {equipState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>각인</Typography>
            {engraveState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>황돋</Typography>
            {goldState1.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>신수</Typography>
            {animalState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>신체각성</Typography>
            {awakState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>환수 시동</Typography>
            {petState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>%돋</Typography>
            {goldState2.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>한벌 효과</Typography>
            {pairState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>칭호</Typography>
            {titleState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>마법</Typography>
            {skillState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>물약</Typography>
            {potionState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>가문특성</Typography>
            {familyState.map((stat: number, idx: number) => {
              return (
                <Typography key={idx} className={classes.title}>
                  {stat}
                </Typography>
              );
            })}
          </Grid>
        </Grid>
        <Grid container item xs={1} direction='column'>
          <Typography className={classes.title}>합 계</Typography>
          {totalState.map((stat: number, idx: number) => {
            return (
              <Typography key={idx} className={classes.title}>
                {stat}
              </Typography>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
