import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import LevelState from "state/Calculator/LevelState";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import Level from "components/Calculator/Level";
import Equip from "components/Calculator/Equip";
import Engrave from "components/Calculator/Engrave";
import Skill from "components/Calculator/Skill";
import Gold from "components/Calculator/Gold";
import Animal from "components/Calculator/Animal";
import Pet from "components/Calculator/Pet";

import { getItemData } from "utils/CalUtil";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    powers: {
      width: "60px",
      margin: "0",
      "& input": { height: "40px", padding: "0", textAlign: "center" },
    },

    plus: {
      minWidth: "10px",
      lineHeight: "40px",
      margin: "0 2px",
      color: "black",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    bigBox: {
      width: "100%",
      marginBottom: "10px",
      padding: "9px",
      border: "1px solid gray",
      borderRadius: "10px",
      float: "left",
    },
  })
);

export default function Power() {
  const classes = useStyles();

  let [auto, setAuto] = useState<string>("");

  const [box1, setBox1] = useState<number>(0);
  const setLevel = useSetRecoilState(LevelState);

  // 계정 정보 찾아와서 자동 입력해주는 함수
  const autoApply = () => {
    setAuto(auto);
    if (auto.split("@").length === 2) {
      getItemData(auto).then(res => {
        // 레벨 세팅
        if (!isNaN(res.level)) {
          setLevel(res.level);
        }

        // 아이템 정보 세팅 .item_list
        /*
          if (!isNaN(res.item)) {

          }
          */
      });
    } else {
      alert("에러! 아이디@서버 형식을 확인하세요.");
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{
          width: "90%",
          margin: "0 5%",
          padding: "0",
          justifyContent: "center",
          alignItems: "center",
          float: "left",
        }}>
        {/* LEFT COLUMN */}
        <Grid item style={{ width: "320px", padding: "0", margin: "5px 15px" }}>
          <Container style={{ padding: "0", margin: "15px 0", textAlign: "center", float: "left" }}>
            <TextField
              variant='outlined'
              placeholder='아이디@서버'
              onChange={e => {
                auto = e.target.value;
              }}
              inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
              style={{ width: "175px" }}
            />
            <Button
              variant='contained'
              color='primary'
              style={{
                minWidth: "50px",
                height: "40px",
                marginLeft: "-5px",
                padding: "0",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
              onClick={() => autoApply()}>
              적용
            </Button>
          </Container>

          <Container className={classes.bigBox}>
            <Level />
          </Container>

          <Container className={classes.bigBox}>
            <Equip />
          </Container>
        </Grid>

        {/* CENTER COLUMN */}
        <Grid item style={{ width: "320px", padding: "0", margin: "5px 15px" }}>
          <Container style={{ padding: "0", margin: "15px 0", textAlign: "center", float: "left" }}>
            <TextField
              className={classes.powers}
              variant='outlined'
              placeholder='전투력'
              value={box1 || ""}
              onChange={e => {
                setBox1(parseInt(e.target.value));
              }}
            />
            <Link className={classes.plus}>+</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='전투력' />
            <Link className={classes.plus}>+</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='전투력' />
            <Link className={classes.plus}>=</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='결과' />
          </Container>

          <Container className={classes.bigBox}>
            <Engrave />
          </Container>

          <Container className={classes.bigBox}>
            <Gold />
          </Container>

          <Container className={classes.bigBox}>
            <Skill />
          </Container>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item style={{ width: "320px", padding: "0", margin: "5px 15px" }}>
          <Container style={{ padding: "0", margin: "15px 0", textAlign: "center", float: "left" }}>
            <TextField className={classes.powers} variant='outlined' placeholder='전투력' />
            <Link className={classes.plus}>x</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='품의' />
            <Link className={classes.plus}>=</Link>
            <TextField className={classes.powers} variant='outlined' placeholder='결과' />
          </Container>

          <Container className={classes.bigBox}>
            <Animal />
          </Container>

          <Container className={classes.bigBox}>
            <Pet />
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
