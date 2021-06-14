import React, { useState } from "react";
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
    height: "30px",
    fontFamily: "Jua",
    marginBottom: "10px",
  },
});

const Menus = withStyles({
  root: {
    minHeight: "40px",
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

interface engraveSlot {
  num: number;
  type: number;
  value: number;
  power: number;
}

export default function Engrave() {
  const classes = useStyles();
  const [openHelper, setOpenHelper] = useState<boolean>(false);

  // 각인 종류, 기준값, 수치, 전투력
  const [engraveSlotList, setEngraveSlotList] = useState<Array<engraveSlot>>([
    { num: 0, type: 0, value: 0, power: 0 },
    { num: 0, type: 0, value: 0, power: 0 },
  ]);

  var ability = [
    "능력치",
    "체력/마력(%)",
    "방어도",
    "방어도무시",
    "시전향상",
    "방어구관통",
    "마력증강",
    "마법치명",
    "공격력증가",
    "직타저항",
    "피해흡수",
    "피해흡수무시",
    "치명타",
    "힘/민/지",
    "명중회피",
    "체력/마력",
  ];

  const abilityList = ability.map((name: string, idx: number) => {
    return (
      <Menus value={idx} key={idx} disableGutters={true}>
        {name}
      </Menus>
    );
  });

  const changeSelect = (event: React.ChangeEvent<{ value: unknown }>, id: number) => {
    let eVal: number[] = [0, 11.1, 54.6, 45.4, 11.1, 8.76, 8.76, 8.3, 5.15, 5.15, 4.175, 4.175, 71, 0, 0, 0];
    let input: number = event.target.value as number;
    engraveSlotList[id] = { num: input, type: eVal[input], value: 0, power: 0 };
    setEngraveSlotList([...engraveSlotList]);
  };

  const calEngrave = (val: number, id: number) => {
    let eType: number = engraveSlotList[id].type;
    if (engraveSlotList[id].num === 2) {
      engraveSlotList[id] = { ...engraveSlotList[id], value: val, power: Math.floor(eType * Math.abs(val)) };
      setEngraveSlotList([...engraveSlotList]);
    } else {
      engraveSlotList[id] = { ...engraveSlotList[id], value: val, power: Math.floor(eType * val) };
      setEngraveSlotList([...engraveSlotList]);
    }
  };

  const switchDlg = () => {
    setOpenHelper(!openHelper);
  };

  return (
    <React.Fragment>
      {engraveSlotList.map((engrave: engraveSlot, idx: number) => {
        return (
          <Grid item key={idx} style={{ padding: "0", float: "left" }}>
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
              placeholder='수치'
              disabled={engrave.num === 0}
              value={engrave.value || ""}
              onChange={e => {
                if (engrave.num === 1) {
                  calEngrave(Number(e.target.value), idx);
                } else {
                  calEngrave(Math.floor(Number(e.target.value)), idx);
                }
              }}
            />
          </Grid>
        );
      })}

      <Grid item style={{ width: "100%", padding: "0", float: "left" }}>
        <Typography className={classes.powerText}>각인 전투력 : {engraveSlotList[0].power + engraveSlotList[1].power}</Typography>
        <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }} onClick={switchDlg}>
          ?
        </Button>
      </Grid>

      <Dialog open={openHelper} onClose={switchDlg} maxWidth='lg'>
        <DialogTitle style={{ padding: "10px", textAlign: "center" }}>
          <Typography style={{ fontFamily: "Do Hyeon", fontSize: "2.5rem", color: "blue" }}>각인 전투력 TMI</Typography>
        </DialogTitle>
        <DialogContent dividers={true} style={{ minWidth: "40vw", padding: "20px 30px" }}>
          <Typography variant='h5' className={classes.dlgText} style={{ color: "red" }}>
            ★ 각인 전투력 = 장비에 각인된 능력치들의 전투력 ★
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 정확한 수치를 얻으려면 문양과 앞/뒤의 수치 모두 따로 계산해야 한다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 최종 수치가 같아도 구성에 따라 전투력이 다르게 측정된다. (소수점 손실)
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 치장 한벌효과인 모든 능력 증가가 반영된다.
          </Typography>
          <Typography variant='h5' className={classes.dlgText}>
            * 과거의 각인들은 전투력이 0이다. (힘/민/지/명중회피/체력/마력)
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
