import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: "200px",
      height: "50px",
      padding: "1px",
      margin: "5px",
      color: "blue",
      textAlignLast: "center",
      float: "left",
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        textAlign: "center",
        color: "blue",
      },
    },

    selText: {
      width: "80px",
      margin: "5px",
      textAlign: "center",
      float: "left",
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
      },
      "& input": {
        padding: "0",
        height: "50px",
        textAlign: "center",
        color: "blue",
      },
    },

    powerText: {
      width: "80%",
      height: "40px",
      lineHeight: "40px",
      margin: "5px 0",
      color: "black",
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "center",
      float: "left",
      "&:focus, &:hover, &:visited, &:link, &:active": {
        textDecoration: "none",
      },
    },

    btn: {
      height: "40px",
      margin: "5px",
      padding: "0",
    },

    dlgText: {
      height: "30px",
      fontFamily: "Jua",
      margin: "10px 0",
    },
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

interface goldSlot {
  num: number;
  type: number;
  value: number;
  power: number;
}

export default function Gold() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);

  // 황돋 종류, 기준값, 수치, 전투력
  const [goldSlotList, setGoldSlotList] = useState<Array<goldSlot>>([
    { num: 0, type: 0, value: 0, power: 0 },
    { num: 0, type: 0, value: 0, power: 0 },
    { num: 0, type: 0, value: 0, power: 0 },
  ]);

  // prettier-ignore
  var ability = [ "능력치", "체력/마력", "재생력", "방관/마치/공증/마증", "타흡/마흡/피흡", "시향/회향/직타", "힘/민/지", "명중률/타격치", "마법수준향상", "명중회피/방무/방어",
    "체력/마력(%)", "방무/방어(%)", "힘/민/지(%)","명중회피(%)", "방관/마치/공증/마증(%)", "타흡/마흡/피흡(%)", "시향/회향/직타(%)", "명중률/타격치(%)", "마법수준/재생력(%)", ];

  const abilityList = ability.map((name: string, idx: number) => {
    return (
      <Menus value={idx} key={idx} disableGutters={true}>
        {name}
      </Menus>
    );
  });

  const changeSelect = (event: React.ChangeEvent<{ value: unknown }>, id: number) => {
    let goldVal: number[] = [0, 0.003, 0.375, 3.75, 3.75, 3.75, 15, 37.5, 60, 100, 1, 1, 0.6, 0.375, 0.3, 0.3, 0.3, 0.3, 0.3];
    let input: number = event.target.value as number;

    goldSlotList[id] = { num: input, type: goldVal[input], value: 0, power: 0 };
    setGoldSlotList([...goldSlotList]);
  };

  const calGold = (val: number, id: number) => {
    let gNumber: number = goldSlotList[id].num; // gNumber : 황돋 종류,
    let gType: number = goldSlotList[id].type; // gType : 황돋 종류별 기준값
    let gValue: number = 0;

    gNumber > 9 ? (gValue = Math.abs(val) * 100) : (gValue = Math.abs(val));

    if (Math.floor(gType * gValue) <= 300) {
      goldSlotList[id] = { ...goldSlotList[id], value: Math.abs(val), power: Math.floor(gType * gValue) };
    } else {
      goldSlotList[id] = { ...goldSlotList[id], value: 0, power: 0 };
    }
    setGoldSlotList([...goldSlotList]);
  };

  return (
    <React.Fragment>
      {goldSlotList.map((gold: goldSlot, idx: number) => {
        return (
          <Container key={idx} style={{ width: "100%", padding: "0", float: "left" }}>
            <Select
              variant='outlined'
              className={classes.select}
              defaultValue={0}
              onChange={e => {
                changeSelect(e, idx);
              }}>
              {abilityList}
            </Select>
            <TextField
              variant='outlined'
              type='number'
              className={classes.selText}
              disabled={gold.num === 0}
              value={gold.value || ""}
              placeholder='수치'
              onChange={e => {
                if (gold.num < 10) {
                  calGold(Math.floor(Number(e.target.value)), idx);
                } else {
                  calGold(Number(e.target.value), idx);
                }
              }}
            />
          </Container>
        );
      })}

      <Link className={classes.powerText}>황돋 전투력 : {goldSlotList[0].power + goldSlotList[1].power + goldSlotList[2].power}</Link>
      <Button
        className={classes.btn}
        variant='contained'
        color='secondary'
        style={{ minWidth: "40px" }}
        onClick={() => {
          setOpenHelper(true);
        }}>
        ?
      </Button>

      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>황돋 전투력 TMI</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 황돋 전투력 = 장비에 감정된 부가 잠재능력들의 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 장비당 2~3가지 종류의 잠재능력이 중복 없이 감정된다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 모든 황돋 전투력은 최대값이 300이므로 장비당 최대는 900이다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 능력별 전투력은 소수점까지 계산되지만, 소수점 이하는 버림 한다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 장비 아이템의 부가 잠재능력도 황돋 전투력으로 계산된다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영된다.
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            tabIndex={-1}
            color='primary'
            onClick={() => {
              setOpenHelper(false);
            }}
            style={{ fontFamily: "Do Hyeon", fontSize: "1.2rem", padding: "0" }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
