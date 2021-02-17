import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
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
  })
);

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Skill() {
  const classes = useStyles();

  const [type, setType] = useState<number>(0); // 직업
  const [parts, setParts] = useState<number>(0); // 부위
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [skillPower, setSkillPower] = useState<number>(0); // 기술능력 전투력

  // prettier-ignore
  var skillList1 = [
    [],
    ["건곤대나이 피해량(+)", "동귀어진	피해량(+)", "동귀어진	체력소모도(-)", "백호참	피해량(+)", "백호참	체력소모도(-)", "회선돌격	피해량(+)", "회선돌격	pvp 쿨타임(-)", "황룡승천	피해량(+)", "황룡승천	쿨타임(-)", "초혼비무	피해량(+)", "초혼비무	체력소모도(-)", "쇄혼비무	피해량(+)", "쇄혼비무	체력소모도(-)", "극'어검무	피해량(+)", "극'어검무	체력소모도(-)", "흑룡참파	피해량(+)", "흑룡참파	체력소모도(-)",],
    ["측후방어	피해감소율(+)", "측후방어	고정피해감소(+)", "자혈갱생	회복량(+)", "자혈갱생	쿨타임(-)", "석갑	쿨타임(-)", "석갑	지속시간(+)", "살신보은	피해감소율(-)", "살신성인	쿨타임(-)", "살신성인	피해감소율(-)", "운기	피해량(+)", "의지의외침	쿨타임(-)",],
    ["극백호참	피해량(+)", "극백호참	쿨타임(-)", "노호검황	피해량(+)", "노호검황	쿨타임(-)", "표호검황	피해량(+)", "표호검황	쿨타임(-)", "혈겁만파	피해량(+)", "혈겁만파	쿨타임(-)", "천둥낙뢰	피해량(+)", "천둥낙뢰	쿨타임(-)", "현무섬멸	피해량(+)", "현무섬멸	쿨타임(-)", "발도술'시공참	피해량(+)", "명천검강	피해량(+)", "비검술	피해량(+)", "비검술	쿨타임(-)"],
    ["타척보	pvp 쿨타임(-)", "타척보	은신제한시간(+)", "육감주망	은신발견률증가(-)", "육감주망	은신제한시간(+)", "유인	지속시간(+)", "도발	pvp 쿨타임(-)", "도발	지속시간(+)", "미혼강격	방향상실률(+)", "미혼강격	지속시간(+)", "호통	피흡감소(+)", "호통	피흡증가(+)", "반격	피해량(+)", "반격	지속시간(+)", "반격	쿨타임(-)", "무장해제	pvp 쿨타임(-)", "무장해제	지속시간(+)", ],
    ["후면공격	발동확률(+)", "측면공격	발동확률(+)", "광폭	쿨타임(-)", "광폭	피해증가율(+)", "광폭	지속시간(+)", "백호령	피해증가율(+)", "백호령	지속시간(+)", "운상미보	이속증가율(+)", "어검화	피해량(+)", "기력방패	마력소모도(-)", "기력방패	방어 증가(-)",],
  ];

  return (
    <React.Fragment>
      <Container style={{ width: "100%", padding: "0", margin: "0", float: "left" }}>
        <Select
          className={classes.select}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setType(Number(e.target.value));
          }}
          style={{
            width: "120px",
          }}>
          <Menus value={0}>직업</Menus>
          <Menus value={1}>전사</Menus>
          <Menus value={2}>도적</Menus>
          <Menus value={3}>주술사</Menus>
          <Menus value={4}>도사</Menus>
          <Menus value={5}>궁사</Menus>
          <Menus value={6}>천인</Menus>
          <Menus value={7}>마도사</Menus>
          <Menus value={8}>영술사</Menus>
          <Menus value={9}>차사</Menus>
        </Select>
        <Select
          className={classes.select}
          variant='outlined'
          defaultValue={0}
          onChange={e => {
            setParts(Number(e.target.value));
          }}
          style={{
            width: "160px",
          }}>
          <Menus value={0}>아이템 부위</Menus>
          <Menus value={1}>목/어깨장식</Menus>
          <Menus value={2}>투구</Menus>
          <Menus value={3}>무기</Menus>
          <Menus value={4}>갑옷</Menus>
          <Menus value={5}>망토</Menus>
        </Select>
      </Container>
      <Container style={{ width: "100%", padding: "0", float: "left" }}>
        <Select variant='outlined' className={classes.select} defaultValue={0} onChange={e => {}}>
          {type === 0 || parts === 0 ? <Menus value={0}>아이템 부위</Menus> : <Menus value={0}>아이템</Menus>}
        </Select>
        <TextField variant='outlined' className={classes.selText} placeholder='수치' type='number' onChange={e => {}} />
      </Container>
      <Link className={classes.powerText}>기술능력 전투력 : {skillPower}</Link>
      <Button className={classes.btn} variant='contained' color='secondary' style={{ minWidth: "40px" }} onClick={() => setOpenHelper(true)}>
        ?
      </Button>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <div>
            <h3 style={{ fontFamily: "BMDOHYEON", margin: "0" }}>기술능력 전투력 TMI</h3>
          </div>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>내용</DialogContent>
        <DialogActions>
          <Button
            tabIndex={-1}
            color='primary'
            onClick={() => {
              setOpenHelper(false);
            }}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
