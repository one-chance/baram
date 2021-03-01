import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState, useRecoilValue } from "recoil";
import AbilityState from "state/Calculator/Ability/AbilityState";
import CharState from "state/Calculator/Ability/CharState";
import EquipState from "state/Calculator/Ability/EquipState";
import EngraveState from "state/Calculator/Ability/EngraveState";
import GoldState from "state/Calculator/Ability/GoldState";
import AnimalState from "state/Calculator/Ability/AnimalState";
import AwakState from "state/Calculator/Ability/AwakState";
import FamilyState from "state/Calculator/Ability/FamilyState";
import PetState from "state/Calculator/Ability/PetState";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import CharStat from "components/Calculator/Ability/CharStat";
import EquipStat from "components/Calculator/Ability/EquipStat";
import EngraveStat from "components/Calculator/Ability/EngraveStat";
import GoldStat from "components/Calculator/Ability/GoldStat";
import AnimalStat from "components/Calculator/Ability/AnimalStat";
import AwakStat from "components/Calculator/Ability/AwakStat";
import FamilyStat from "components/Calculator/Ability/FamilyStat";
import PetStat from "components/Calculator/Ability/PetStat";

const useStyles = makeStyles({
  title: {
    height: "30px",
    lineHeight: "30px",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
  },

  contain: {
    width: "auto",
    border: "1px solid gray",
    borderRadius: "10px",
    margin: "10px",
    padding: "5px",
    float: "left",
  },

  btn: {
    width: "150px",
    height: "40px",
    padding: "5px",
    margin: "5px",
  },
});

export default function Ability() {
  const classes = useStyles();
  const statusList = useRecoilValue(AbilityState);
  const charStat = useRecoilValue(CharState);
  const equipStat = useRecoilValue(EquipState);
  const engraveStat = useRecoilValue(EngraveState);
  const goldStat = useRecoilValue(GoldState);
  const animalStat = useRecoilValue(AnimalState);
  const awakStat = useRecoilValue(AwakState);
  const familyStat = useRecoilValue(FamilyState);
  const petStat = useRecoilValue(PetState);

  var statType = ["캐릭터 스텟", "일반 장비", "각인 스텟", "돋 스텟", "신수 장비", "신체 각성", "가문력"];
  var statList = ["방어도", "방어구관통", "방어도무시", "공격력증가", "마법치명", "마력증강"];

  return (
    <React.Fragment>
      <Container style={{ width: "98%", margin: "10px 1%", padding: "0", float: "left" }}>
        <Container
          id='charStat'
          style={{ width: "100%", margin: "10px", padding: "5px", color: "blue", textAlign: "center", fontSize: "1.2rem", float: "left" }}>
          <span> {`최종 스텟 = { 캐릭터 스텟 + 장비 스텟(장비 + 각인 + 황돋 + 신수) or 신체각성 + 가문력 + 환수 } * %돋 + 한벌효과 +마법 + 시약 + 칭호`}</span>
          <br />
          <span> {`※ 일부 능력치는 마법 수치도 %돋에 영향을 받으나 보편적인 상황을 예시로 들었음 ※`}</span>
        </Container>

        <Grid
          container
          spacing={0}
          id='totalStat'
          style={{ width: "100%", border: "1px solid gray", borderRadius: "10px", margin: "10px", padding: "10px", float: "left" }}>
          <Grid container item xs={1} direction='column'>
            <Grid id='title' item className={classes.title}></Grid>
            {statList.map((name: string) => {
              return (
                <Grid key={name} item className={classes.title}>
                  {name}
                </Grid>
              );
            })}
          </Grid>
          <Grid container item xs={10} direction='column' className={classes.title}>
            <Grid item>
              <Grid id='char' item className={classes.title}>
                캐릭터
              </Grid>
              {charStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                장비
              </Grid>
              {equipStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                각인
              </Grid>
              {engraveStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                황돋
              </Grid>
              {goldStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                신수
              </Grid>
              {animalStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                신체각성
              </Grid>
              {awakStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                가문력
              </Grid>
              {familyStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                환수
              </Grid>
              {petStat.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                %돋
              </Grid>
              {statusList.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                한벌효과
              </Grid>
              {statusList.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                마법
              </Grid>
              {statusList.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                시약
              </Grid>
              {statusList.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item>
              <Grid id='equip' item className={classes.title}>
                칭호
              </Grid>
              {statusList.map((stat: number, idx: number) => {
                return (
                  <Grid item key={idx} className={classes.title}>
                    {stat}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid container item xs={1} direction='column'>
            <Grid id='total' item className={classes.title}>
              합 계
            </Grid>
            {statusList.map((name: number, idx: number) => {
              return (
                <Grid key={idx} item className={classes.title}>
                  {name}
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Container id='charStat' className={classes.contain}>
          <CharStat />
        </Container>

        <Container id='equipStat' className={classes.contain}>
          <EquipStat />
        </Container>

        <Container id='engraveStat' className={classes.contain}>
          <EngraveStat />
        </Container>

        <Container id='goldStat' className={classes.contain}>
          <GoldStat />
        </Container>

        <Container id='animalStat' className={classes.contain}>
          <AnimalStat />
        </Container>

        <Container id='awakStat' className={classes.contain}>
          <AwakStat />
        </Container>

        <Container id='familyStat' className={classes.contain}>
          <FamilyStat />
        </Container>

        <Container id='petStat' className={classes.contain}>
          <PetStat />
        </Container>
      </Container>
    </React.Fragment>
  );
}
