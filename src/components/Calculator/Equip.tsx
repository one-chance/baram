import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import ItemList from "conf/itemList.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemInput: {
      width: "140px",
      margin: "5px",
      float: "left",
      "& input": {
        height: "45px",
        padding: "0 10px",
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

interface IEquipSlot {
  num: number;
  type: string;
  name: string;
  value: string;
}

export default function Equip() {
  const classes = useStyles();

  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const [itemPower, setItemPower] = useState<number>(0); // 장비 전투력

  // 장비 전투력 계산기에서 사용하는 변수들
  const [equipSlotList, setEquipSlotList] = useState<Array<IEquipSlot>>([
    { num: 1, type: "neck", name: "목/어깨장식", value: "" },
    { num: 2, type: "head", name: "투구", value: "" },
    { num: 3, type: "face", name: "얼굴장식", value: "" },
    { num: 4, type: "weaphon", name: "무기", value: "" },
    { num: 5, type: "armor", name: "갑옷", value: "" },
    { num: 6, type: "subWeaphon", name: "방패/보조무기", value: "" },
    { num: 7, type: "rightHand", name: "오른손", value: "" },
    { num: 8, type: "cloak", name: "망토", value: "" },
    { num: 9, type: "leftHand", name: "왼손", value: "" },
    { num: 10, type: "sub1", name: "보조1", value: "" },
    { num: 11, type: "shoes", name: "신발", value: "" },
    { num: 12, type: "sub2", name: "보조2", value: "" },
    { num: 13, type: "accessories", name: "장신구", value: "" },
    { num: 14, type: "set", name: "세트옷", value: "" },
    { num: 15, type: "reinforce", name: "0~11", value: "" }, // 커스텀 UI 강화
  ]);

  // 장비 총 전투력 계산하는 함수
  const _calTotalPower = () => {
    // 현재 객체 저장
    setEquipSlotList(equipSlotList);

    let totalPower: number = 0;
    equipSlotList.map((equipSlot: IEquipSlot) => {
      if (equipSlot.value) {
        if (equipSlot.type === "reinforce") totalPower += Number(equipSlot.value) * 200;
        else totalPower += Number(searchItemPower(equipSlot.value, equipSlot.num));
      }
    });

    setItemPower(totalPower);
  };

  // itemList.json 에서 아이템 전투력 찾는 함수
  const searchItemPower = (item: String, num: number) => {
    item = item.replace(/ /g, ""); // 찾는 아이템 명에서 공백제거

    if (item !== "") {
      for (let i = 0; i < Object.keys(ItemList[num]).length; i++) {
        if (item === Object.keys(ItemList[num])[i]) return Object.values(ItemList[num])[i];
      }
    }

    return 0;
  };

  return (
    <React.Fragment>
      {equipSlotList.map((equipSlot: IEquipSlot, idx: number) => {
        if (equipSlot.type === "reinforce") {
          return (
            <div>
              <Link
                style={{
                  width: "60px",
                  height: "45px",
                  lineHeight: "45px",
                  margin: "5px",
                  textAlign: "center",
                  color: "black",
                  textDecoration: "none",
                  float: "left",
                }}>
                15. 강화
              </Link>
              <TextField
                className={classes.itemInput}
                variant='outlined'
                placeholder={equipSlot.name}
                onChange={e => {
                  equipSlotList[idx].value = e.target.value;
                }}
                inputProps={{ style: { textAlign: "center" } }}
                style={{ width: "70px" }}
              />
            </div>
          );
        } else {
          return (
            <TextField
              key={equipSlot.num}
              className={classes.itemInput}
              variant='outlined'
              onChange={e => {
                equipSlotList[idx].value = e.target.value;
              }}
              placeholder={`${equipSlot.num}. ${equipSlot.name}`}
            />
          );
        }
      })}
      <Container
        style={{
          width: "140px",
          height: "45px",
          padding: "0",
          margin: "5px",
          textAlign: "center",
          float: "left",
        }}>
        <Button
          className={classes.btn}
          variant='contained'
          color='primary'
          onClick={() => _calTotalPower()}
          style={{
            margin: "2.5px",
          }}>
          계산
        </Button>
        <Button
          variant='contained'
          className={classes.btn}
          color='secondary'
          onClick={() => {
            setOpenHelper(true);
          }}
          style={{ minWidth: "40px", margin: "2.5px" }}>
          ?
        </Button>
      </Container>
      <Link className={classes.powerText} style={{ width: "100%" }}>
        장비 전투력 : {itemPower}
      </Link>
      <Dialog
        open={openHelper}
        onClose={() => {
          setOpenHelper(false);
        }}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "BMDOHYEON", margin: "0" }}>장비 전투력 TMI</span>
        </DialogTitle>
        <DialogContent style={{ borderTop: "1px solid gray", borderBottom: "1px solid gray", padding: "10px 50px" }}>
          <h3 style={{ color: "red", fontFamily: "BMJUA" }}>★ 장비 전투력 ★</h3>
          <h3 style={{ fontFamily: "BMJUA" }}>* Lv.99에 최초 전투력이 부여되며 이후 렙업과 승급마다 전투력이 증가한다.</h3>
          <h4>* 승급퀘를 완료하지 않아도 레벨만 달성하면 승급 전투력이 증가한다.</h4>
          <h4>* 렙업 전투력 = 3.5 x 승급 차수 | 승급 전투력 = 350 x 승급 차수</h4>
          <h5>ex) 699 달성시 3.5 x 6 = 21 증가 </h5>
          <h5>ex) 700 달성시 3.5 x 7 + 350 x 7 = 2474.5 증가 </h5>
          <h4>* 소수점 첫재 자리까지 계산되지만 상태창에는 반올림한 정수로 표시된다.</h4>
          <h4>* 치장 한벌효과인 모든 능력 증가가 반영되지 않는다.</h4>
          <h4>* 8차가 나온다면 Lv.899의 레벨 전투력은 25850일 것이다.</h4>
        </DialogContent>
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
