import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import LevelState from "state/Calculator/LevelState";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import Level from "components/Calculator/Level";
import Equip from "components/Calculator/Equip";
import Engrave from "components/Calculator/Engrave";
import Skill from "components/Calculator/Skill";
import Gold from "components/Calculator/Gold";
import Animal from "components/Calculator/Animal";
import Pet from "components/Calculator/Pet";

import { getItemData } from "utils/CalUtil";

const useStyles = makeStyles({
  powers: {
    width: "60px",
    margin: "0",
    "& input": { height: "40px", padding: "0", textAlign: "center" },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
  plus: {
    minWidth: "10px",
    lineHeight: "40px",
    textAlign: "center",
    margin: "0 2px",
  },
  btn: {
    minWidth: "40px",
    height: "40px",
    marginLeft: "-5px",
    padding: "0",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },
  boxSmall: {
    marginBottom: "10px",
    padding: "9px",
    border: "1px solid gray",
    borderRadius: "10px",
  },
  select: {
    width: "80px",
    height: "40px",
    padding: "0",
    margin: "0",
    color: "blue",
    textAlignLast: "center",
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "30px",
      fontSize: "0.9rem",
      textAlign: "center",
      color: "blue",
    },
  },
});

const Menus = withStyles({
  root: {
    minHeight: "40px",
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Power() {
  const classes = useStyles();
  let [auto, setAuto] = useState<string>("");
  const [plus, setPlus] = useState({ p1: 0, p2: 0, p3: 0 });
  const [multiple, setMultiple] = useState({ m1: 0, m2: 0 });
  const setLevel = useSetRecoilState(LevelState);

  const inputName = (name: string) => {
    if (name === "") {
      setAuto("");
    } else {
      setAuto(name);
    }
  };

  // 계정 정보 찾아와서 자동 입력해주는 함수
  const autoApply = () => {
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
      <Grid container direction='row' alignItems='center' justify='space-around' style={{ margin: "0", padding: "0" }}>
        {/* LEFT COLUMN */}
        <Grid item container direction='column' style={{ width: "320px", padding: "0", margin: "0 5px" }}>
          <Grid item container justify='center' style={{ padding: "0", margin: "15px 0" }}>
            <TextField
              variant='outlined'
              placeholder='아이디@서버'
              inputProps={{ style: { height: "40px", padding: "0", textAlign: "center" } }}
              style={{ width: "185px" }}
              onChange={e => {
                inputName(e.target.value);
              }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  autoApply();
                }
              }}
            />
            <Button variant='contained' color='primary' className={classes.btn} onClick={autoApply}>
              <SearchIcon />
            </Button>
          </Grid>

          <Grid item className={classes.boxSmall}>
            <Level />
          </Grid>

          <Grid item className={classes.boxSmall}>
            <Equip />
          </Grid>
        </Grid>

        {/* CENTER COLUMN */}
        <Grid item container direction='column' style={{ width: "320px", padding: "0", margin: "0  5px" }}>
          <Grid item container justify='center' style={{ padding: "0", margin: "15px 0" }}>
            <TextField
              className={classes.powers}
              variant='outlined'
              type='number'
              placeholder='전투력'
              value={plus.p1 || ""}
              onChange={e => {
                if (parseInt(e.target.value) > 0) {
                  setPlus({ ...plus, p1: parseInt(e.target.value) });
                } else {
                  setPlus({ ...plus, p1: 0 });
                }
              }}
            />
            <Typography className={classes.plus}>+</Typography>
            <TextField
              className={classes.powers}
              variant='outlined'
              type='number'
              placeholder='전투력'
              value={plus.p2 || ""}
              onChange={e => {
                if (parseInt(e.target.value) > 0) {
                  setPlus({ ...plus, p2: parseInt(e.target.value) });
                } else {
                  setPlus({ ...plus, p2: 0 });
                }
              }}
            />
            <Typography className={classes.plus}>+</Typography>
            <TextField
              className={classes.powers}
              variant='outlined'
              type='number'
              placeholder='전투력'
              value={plus.p3 || ""}
              onChange={e => {
                if (parseInt(e.target.value) > 0) {
                  setPlus({ ...plus, p3: parseInt(e.target.value) });
                } else {
                  setPlus({ ...plus, p3: 0 });
                }
              }}
            />
            <Typography className={classes.plus}>=</Typography>
            <Typography
              style={{
                width: "60px",
                height: "40px",
                lineHeight: "40px",
                border: "1px solid silver",
                borderRadius: "5px",
                textAlign: "center",
              }}>
              {Math.floor(plus.p1 + plus.p2 + plus.p3) || "합계"}
            </Typography>
          </Grid>

          <Grid item className={classes.boxSmall}>
            <Engrave />
          </Grid>

          <Grid item className={classes.boxSmall}>
            <Gold />
          </Grid>

          <Grid item className={classes.boxSmall}>
            <Skill />
          </Grid>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item container direction='column' style={{ width: "320px", padding: "0", margin: "0  5px" }}>
          <Grid item container justify='center' style={{ padding: "0", margin: "15px 0" }}>
            <TextField
              className={classes.powers}
              variant='outlined'
              type='number'
              placeholder='전투력'
              value={multiple.m1 || ""}
              onChange={e => {
                if (parseInt(e.target.value) > 0) {
                  setMultiple({ ...multiple, m1: parseInt(e.target.value) });
                } else {
                  setMultiple({ ...multiple, m1: 0 });
                }
              }}
            />
            <Typography className={classes.plus}>x</Typography>
            <Select
              variant='outlined'
              value={multiple.m2}
              className={classes.select}
              onChange={e => {
                setMultiple({ ...multiple, m2: Number(e.target.value) });
              }}>
              <Menus value={0}>노품의</Menus>
              <Menus value={1.025}>2품의</Menus>
              <Menus value={1.05}>1품의</Menus>
              <Menus value={1.075}>명품의</Menus>
            </Select>
            <Typography className={classes.plus}>=</Typography>
            <Typography
              style={{
                width: "60px",
                height: "40px",
                lineHeight: "40px",
                border: "1px solid silver",
                borderRadius: "5px",
                textAlign: "center",
              }}>
              {Math.floor(multiple.m1 * multiple.m2) || "결과"}
            </Typography>
          </Grid>

          <Grid item className={classes.boxSmall}>
            <Animal />
          </Grid>

          <Grid item className={classes.boxSmall}>
            <Pet />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
