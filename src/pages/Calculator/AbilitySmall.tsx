import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import AbilityTableSmall from "components/Calculator/Ability/AbilityTableSmall";
import CharStat from "components/Calculator/Ability/CharStat";
import EquipStat from "components/Calculator/Ability/EquipStat";
import EngraveStat from "components/Calculator/Ability/EngraveStat";
import GoldStatSmall from "components/Calculator/Ability/GoldStatSmall";
import AnimalStat from "components/Calculator/Ability/AnimalStat";
import AwakStat from "components/Calculator/Ability/AwakStat";
import PetStat from "components/Calculator/Ability/PetStat";
import PairStat from "components/Calculator/Ability/PairStat";
import ClothStat from "components/Calculator/Ability/ClothStat";
import SkillStat from "components/Calculator/Ability/SkillStat";
import PotionStat from "components/Calculator/Ability/PotionStat";
import TitleStat from "components/Calculator/Ability/TitleStat";
import FamilyStat from "components/Calculator/Ability/FamilyStat";

const useStyles = makeStyles({
  boxSmall: {
    width: "auto",
    border: "1px solid",
    borderRadius: "10px",
    margin: "0 5px",
    padding: "5px",
    float: "left",
  },
  boxBig: {
    width: "auto",
    margin: "10px",
    padding: "0",
  },
  title: {
    width: "100px",
    margin: "0 10px",
    fontWeight: "bold",
    float: "left",
  },
});

export default function Ability() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container direction='column' style={{ padding: "0", margin: "0" }}>
        <Grid container alignItems='center' justify='center' style={{ margin: "5px 0", padding: "0" }}>
          <AbilityTableSmall />
        </Grid>

        <Grid container direction='column' className={classes.boxBig}>
          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              직업 스텟
            </Typography>
            <Grid container id='cahrStat' className={classes.boxSmall}>
              <div style={{ width: "210px" }}>
                <CharStat />
              </div>
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              일반 장비
            </Typography>
            <Grid container justify='center' id='equipStat' className={classes.boxSmall} style={{ maxWidth: "930px" }}>
              <EquipStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              각인 수치
            </Typography>
            <Grid container justify='center' id='equipStat' className={classes.boxSmall}>
              <EngraveStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              황돋 수치
            </Typography>
            <Grid container id='goldStat' justify='center' className={classes.boxSmall}>
              <GoldStatSmall />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              신수 장비
            </Typography>
            <Grid container id='animalStat' className={classes.boxSmall}>
              <div style={{ width: "240px" }}>
                <AnimalStat />
              </div>
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              신체 각성
            </Typography>
            <Grid container justify='center' id='awakStat' className={classes.boxSmall}>
              <AwakStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              환수 시동
            </Typography>
            <Grid container justify='center' id='petStat' className={classes.boxSmall}>
              <PetStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              한벌 효과
            </Typography>
            <Grid container justify='center' id='pairStat' className={classes.boxSmall}>
              <PairStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              칭호 효과
            </Typography>
            <Grid container justify='center' id='titleStat' className={classes.boxSmall}>
              <TitleStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              품의 효과
            </Typography>
            <Grid container justify='center' id='clothStat' className={classes.boxSmall}>
              <ClothStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              마법 수치
            </Typography>
            <Grid container justify='center' id='skillStat' className={classes.boxSmall}>
              <SkillStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              물약 도핑
            </Typography>
            <Grid container justify='center' id='potionStat' className={classes.boxSmall}>
              <PotionStat />
            </Grid>
          </Grid>

          <Grid item container direction='row' alignItems='center' className={classes.boxBig}>
            <Typography variant='h6' className={classes.title}>
              가문 특성
            </Typography>
            <Grid container justify='center' id='familyStat' className={classes.boxSmall}>
              <FamilyStat />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
