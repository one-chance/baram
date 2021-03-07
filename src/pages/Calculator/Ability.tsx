import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import AbilityTable from "components/Calculator/Ability/AbilityTable";
import CharStat from "components/Calculator/Ability/CharStat";
import EquipStat from "components/Calculator/Ability/EquipStat";
import EngraveStat from "components/Calculator/Ability/EngraveStat";
import GoldStat from "components/Calculator/Ability/GoldStat";
import AnimalStat from "components/Calculator/Ability/AnimalStat";
import AwakStat from "components/Calculator/Ability/AwakStat";
import FamilyStat from "components/Calculator/Ability/FamilyStat";
import PetStat from "components/Calculator/Ability/PetStat";
import PairStat from "components/Calculator/Ability/PairStat";
import SkillStat from "components/Calculator/Ability/SkillStat";
import PotionStat from "components/Calculator/Ability/PotionStat";
import TitleStat from "components/Calculator/Ability/TitleStat";

const useStyles = makeStyles({
  contain: {
    width: "auto",
    border: "1px solid",
    borderRadius: "10px",
    margin: "0",
    padding: "5px",
    float: "left",
  },
});

export default function Ability() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container style={{ margin: "10px 0", padding: "5px", color: "blue", textAlign: "center", fontSize: "1.2rem" }}>
        <span>{`최종 능력치 = { 직업 스텟 + 장비 스텟(템+ 각인 + 황돋 + 신수) or 신체각성 + 가문특성 + 환수시동 } * %돋 + 한벌효과 + 마법 + 물약 + 칭호`}</span>
        <br />
        <span> {`※ 방어도는 마법도 %돋에 영향 받음, 각 요소에 품의 효과를 반영하지 않아 오차 발생 가능 (언젠간 수정할 듯) ※`}</span>
      </Container>

      <Container style={{ margin: "5px 0", padding: "0", float: "left" }}>
        <AbilityTable />
      </Container>

      <Grid container direction='column' style={{ margin: "10px 0", padding: "0", float: "left" }}>
        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            직업 스텟
          </Typography>
          <Container id='cahrStat' className={classes.contain}>
            <CharStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            일반 장비
          </Typography>
          <Container id='equipStat' className={classes.contain} style={{ maxWidth: "1070px" }}>
            <EquipStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            각인 수치
          </Typography>
          <Container id='equipStat' className={classes.contain}>
            <EngraveStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            황돋 수치
          </Typography>
          <Container id='goldStat' className={classes.contain}>
            <GoldStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            신수 장비
          </Typography>
          <Container id='animalStat' className={classes.contain}>
            <AnimalStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            신체 각성
          </Typography>
          <Container id='awakStat' className={classes.contain}>
            <AwakStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            가문 특성
          </Typography>
          <Container id='familyStat' className={classes.contain}>
            <FamilyStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            환수 시동
          </Typography>
          <Container id='petStat' className={classes.contain}>
            <PetStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            한벌 효과
          </Typography>
          <Container id='pairStat' className={classes.contain}>
            <PairStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            마법 수치
          </Typography>
          <Container id='skillStat' className={classes.contain}>
            <SkillStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            물약 도핑
          </Typography>
          <Container id='potionStat' className={classes.contain}>
            <PotionStat />
          </Container>
        </Grid>

        <Grid item container direction='row' alignItems='center' style={{ margin: "10px 0", padding: "0" }}>
          <Typography variant='h6' style={{ width: "100px", margin: "0", fontWeight: "bold" }}>
            칭호 효과
          </Typography>
          <Container id='titleStat' className={classes.contain}>
            <TitleStat />
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
