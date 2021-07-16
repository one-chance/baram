import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { getNowUserInfo } from "utils/UserUtil";
import { getTitleAccountString } from "utils/CommonUtil";
import SignInDialogState from "state/common/SignInDialogState";

const useStyles = makeStyles({
  root: { maxWidth: "100%", margin: "10px 0", minHeight: "60vh" },
  dirBtn: {
    margin: "4px 0",
    display: "flex",
    borderColor: "#3f51b5",
    boxShadow: "none",
    justifyContent: "center",
    outline: "none",
    "& button": { minWidth: "48px", padding: "5px 10px", backgroundColor: "transparent", borderColor: "#3f51b5", color: "#3f51b5", outline: "none" },
    "& .Mui-selected": { backgroundColor: "#3f51b5", color: "white" },
    "& .Mui-selected:hover": { backgroundColor: "#3f51b5", color: "white" },
    "& .Mui-disabled": { backgroundColor: "transparent", borderColor: "#3f51b5", color: "#3f51b5" },
  },
  refreshBtn: { minWidth: "36px", height: "36px", padding: "0", float: "right" },
  wearBtn: { minWidth: "60px", height: "36px", margin: "4px", padding: "0 4px", boxShadow: "none" },
  text: { width: "110px", lineHeight: "36px", margin: "4px", float: "left" },
  inputText: {
    width: "200px",
    margin: "4px",
    padding: "0",
    float: "left",
    "& .MuiInputAdornment-positionEnd": { width: "28px", height: "36px", backgroundColor: "#E8EBED", margin: "0" },
    "& input": { height: "36px", padding: "0 0 0 10px", fontSize: "0.9rem" },
    "& input:focus": { backgroundColor: "#E8EBED" },
    "& button": { width: "28px", margin: "0", padding: "0 4px 0 2px", "&:hover": { outline: "none", backgroundColor: "#E8EBED" } },
  },
  selected: { backgroundColor: "#E8EBED" },
  btnClose: { minWidth: 15, fontSize: "1.5rem", padding: "0", position: "absolute", top: 5, right: 10 },
});

export default function LookBook() {
  const classes = useStyles();
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setIsSignInOpen = useSetRecoilState(SignInDialogState);
  const account = getTitleAccountString(getNowUserInfo().titleAccount);
  const basic = `https://avatar.baram.nexon.com/Profile/AvatarRender.aspx?loginID=${account}&is=1`;

  const [opener, setOpener] = useState(true);
  const [skin, setSkin] = useState(-1);
  const [naked, setNaked] = useState("N");
  const [dir, setDir] = useState(2); // 0 1 2 3 - 후 우 전 좌
  const [avartar, setAvartar] = useState(basic);
  const [equip, setEquip] = useState(["", "", "", "", "", "", "", "", "", ""]);

  //prettier-ignore
  const skinList = ["구릿빛", "감귤주황", "건강미", "광택밝은피부", "광택살구", "그레이", "극지방", "깊은파랑", "끓는분노", "나비노랑", "남자핑크", "노랑", "다크블랙", "당근주황", "더하얀", "라벤더", "레몬", "레몬민트", "레인보우", "마젠타", "바닐라", "바다파랑", "바위색", "밝은피부", "보스마령", "봉래하얀", "새벽하늘", "샤이니", "소다", "솜사탕", "순백", "순수하양", "숲의노래", "아보카도", "암회색", "에메랄드", "연분홍", "외계연두", "우윳빛", "유령", "자연연두", "잔혹검정", "저승사자", "정열", "초록색", "초콜릿", "코코아파우더", "피치", "하늘색", "핫레드", "형광연두색", "흑색", "흰색"];
  const skinNumber = [
    0, 17, 35, 29, 27, 32, 41, 13, 38, 8, 14, 37, 40, 15, 46, 36, 50, 62, 39, 33, 51, 16, 22, 26, 42, 47, 61, 52, 31, 54, 12, 9, 60, 53, 20, 45, 44, 30, 24, 58,
    10, 7, 48, 11, 4, 18, 19, 49, 2, 34, 43, 5, 6,
  ];
  const dirList = ["전", "후", "좌", "우"];
  const dirNumber = [2, 0, 3, 1];
  const equipList = ["목/어깨장식", "투구", "얼굴장식", "무기", "겉옷", "방패/보조무기", "망토", "신발", "장신구", "태닝"];

  const openDlg = () => {
    setOpener(!opener);
  };

  const changeDirection = (dNum: number) => {
    setDir(dNum);
  };

  const previewItem = () => {
    let info = getNowUserInfo();
    if (info === "") {
      setIsSignInOpen(true);
      return;
    } else if (Number(info.grade) < 2) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: 3000,
        message: "대표 캐릭터를 인증한 Lv.2 부터 사용할 수 있습니다.",
      });
      return;
    }

    /*     var result = "";
    for (let i = 0; i < 9; i++) {
      result += `${equip[i]}|`;
    } */
    setEquip([...equip]);

    if (skinList.includes(equip[9])) {
      setSkin(skinNumber[skinList.indexOf(equip[9])]);
    } else {
      setSkin(-1);
    }
  };

  useEffect(() => {
    let temp = `https://avatar.baram.nexon.com/Profile/AvatarRender.aspx?loginID=${account}&is=1`;

    if (naked !== "") temp += `&ed=${naked}`;
    if (skin !== -1) temp += `&sc=${skin}`;
    if (dir !== -1) temp += `&changeDir=${dir}`;
    if (equip[3] !== "") temp += `&previewEquip=${equip[3]}`;
    setAvartar(temp);

    // eslint-disable-next-line
  }, [naked, skin, dir, equip]);

  return (
    <>
      <Grid spacing={2} container justify='center' alignContent='center' className={classes.root}>
        <Grid item container xs={10} justify='center'>
          <Typography>※ 일반 / 치장 / 직업 / 성별에 관계 없이 아이템을 선택할 수 있습니다 ※</Typography>
        </Grid>

        <Grid item container justify='center' direction='column' style={{ width: "210px", border: "1px solid silver", margin: "4px" }}>
          <ToggleButtonGroup className={classes.dirBtn}>
            {dirList.map((arr, idx) => {
              return (
                <ToggleButton
                  key={idx}
                  value={dirNumber[idx]}
                  selected={dir === dirNumber[idx] ? true : false}
                  onClick={() => {
                    changeDirection(dirNumber[idx]);
                  }}>
                  {arr}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
          <img src={avartar} alt='아바타' style={{ margin: "auto" }} />
          <Typography style={{ height: "36px", lineHeight: "36px", margin: "4px", fontWeight: "bold", textAlign: "center" }}>
            {account === "Unknown Account" ? "아이디@서버" : account}
          </Typography>
          <Grid container justify='center'>
            <Button
              className={classes.wearBtn}
              variant={naked === "Y" ? "contained" : "outlined"}
              color='primary'
              onClick={() => {
                setNaked("Y");
              }}>
              벗기
            </Button>
            <Button
              className={classes.wearBtn}
              variant={naked === "N" ? "contained" : "outlined"}
              color='primary'
              onClick={() => {
                setNaked("N");
              }}>
              입기
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ maxWidth: "850px", border: "1px solid silver", margin: "4px" }}>
          <Typography style={{ margin: "16px 8px", fontSize: "1.5rem", fontWeight: "bold", padding: "0 8px", textAlign: "center" }}>
            룩북
            <Button
              className={classes.refreshBtn}
              variant='outlined'
              color='secondary'
              onClick={() => {
                setEquip([]);
              }}>
              <RefreshIcon />
            </Button>
          </Typography>

          <Grid container justify='space-around' style={{ margin: "8px 0" }}>
            {equipList.map((arr, idx) => {
              return (
                <div style={{ margin: "4px 0" }} key={arr}>
                  <Typography className={classes.text}>{arr}</Typography>
                  <OutlinedInput
                    className={equip[idx] !== "" ? `${classes.inputText} ${classes.selected}` : classes.inputText}
                    disabled={idx !== 3 && idx !== 9}
                    onChange={e => {
                      equip[idx] = e.target.value;
                    }}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        previewItem();
                      }
                    }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton aria-label='search-button' edge='end'>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={opener} onClose={openDlg} maxWidth='lg'>
        <DialogContent dividers={true} style={{ padding: "20px" }}>
          <Typography style={{ fontSize: "1.2rem", margin: "4px 0" }}>현재 무기와 태닝만 미리보기가 가능합니다.</Typography>
          <Typography style={{ fontSize: "1.2rem", margin: "4px 0" }}>나머지 부위는 운영자의 협조가 필요하여 시도 중입니다.</Typography>
        </DialogContent>
        <DialogActions style={{ padding: "0" }} disableSpacing={true}>
          <Button onClick={openDlg} color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
