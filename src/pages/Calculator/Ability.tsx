import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import AbilityTable from "components/Calculator/Ability/AbilityTable";
import CharStat from "components/Calculator/Ability/CharStat";
import EquipStat from "components/Calculator/Ability/EquipStat";
import EngraveStat from "components/Calculator/Ability/EngraveStat";
import GoldStat from "components/Calculator/Ability/GoldStat";
import AnimalStat from "components/Calculator/Ability/AnimalStat";
import AwakStat from "components/Calculator/Ability/AwakStat";
import PetStat from "components/Calculator/Ability/PetStat";
import PairStat from "components/Calculator/Ability/PairStat";
import SkillStat from "components/Calculator/Ability/SkillStat";
import PotionStat from "components/Calculator/Ability/PotionStat";
import TitleStat from "components/Calculator/Ability/TitleStat";
import FamilyStat from "components/Calculator/Ability/FamilyStat";

const useStyles = makeStyles({
  box: {
    width: "auto",
    border: "1px solid",
    borderRadius: "10px",
    margin: "0",
    padding: "5px",
    float: "left",
  },
  title: {
    width: "100px",
    margin: "0",
    fontWeight: "bold",
    float: "left",
  },
});

export default function Ability() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container direction='column' style={{ padding: "0", margin: "0" }}>
        <div style={{ margin: "10px 0", padding: "5px", color: "blue", textAlign: "center", fontSize: "1.2rem" }}>
          <span>{`최종 능력치 = { 직업 스텟 + 장비 스텟(템+ 각인 + 황돋 + 신수) or 신체각성 + 환수시동 } * %돋 + 한벌효과 + 칭호 + ( 마법 + 물약 + 가문특성 )`}</span>
          <span>{`최종 능력치 = (A + B or B' +  C ) x D + E`}</span>
        </div>

        <Grid item style={{ margin: "5px 0", padding: "0" }}>
          <AbilityTable />
        </Grid>

        <Grid container direction='column' style={{ margin: "10px 0", padding: "0" }}>
          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              직업 스텟
            </Typography>
            <div id='cahrStat' className={classes.box}>
              <CharStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              일반 장비
            </Typography>
            <div id='equipStat' className={classes.box} style={{ maxWidth: "1070px" }}>
              <EquipStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              각인 수치
            </Typography>
            <div id='equipStat' className={classes.box}>
              <EngraveStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              황돋 수치
            </Typography>
            <div id='goldStat' className={classes.box}>
              <GoldStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              신수 장비
            </Typography>
            <div id='animalStat' className={classes.box}>
              <AnimalStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              신체 각성
            </Typography>
            <div id='awakStat' className={classes.box}>
              <AwakStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              환수 시동
            </Typography>
            <div id='petStat' className={classes.box}>
              <PetStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              한벌 효과
            </Typography>
            <div id='pairStat' className={classes.box}>
              <PairStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              칭호 효과
            </Typography>
            <div id='titleStat' className={classes.box}>
              <TitleStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              마법 수치
            </Typography>
            <div id='skillStat' className={classes.box}>
              <SkillStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              물약 도핑
            </Typography>
            <div id='potionStat' className={classes.box}>
              <PotionStat />
            </div>
          </Grid>

          <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
            <Typography variant='h6' className={classes.title}>
              가문 특성
            </Typography>
            <div id='familyStat' className={classes.box}>
              <FamilyStat />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
