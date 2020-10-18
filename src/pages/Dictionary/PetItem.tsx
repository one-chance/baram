import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForPetItemImg } from "utils/ConfigUtil";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnGroup: {
      margin: "5px 0 20px 0",
      padding: "1px",
      "& Button": {
        width: "64px",
        height: "36px",
        padding: "2px",
      },
    },
    title: {
      width: "200px",
      height: "50px",
      lineHeight: "50px",
      margin: "10px 0 15px 60px",
      padding: "0",
      fontSize: "2rem",
      color: "black",
      float: "left",
    },
    selectBox: {
      height: "45px",
      margin: "5px 10px",
      float: "left",
    },
    select: {
      width: "90px",
      height: "40px",
      textAlign: "center",
      textAlignLast: "center",
      float: "left",
    },
  })
);

export default function PetItem() {
  const classes = useStyles();
  const baseUrlForPetItemImg = getBaseUrlForPetItemImg();
  const [img1, setImg1] = useState<string>("empty.png");
  const [img2, setImg2] = useState<string>("empty.png");
  const [accuracy, setAccuracy] = useState<number>(0);
  const [acc1, setAcc1] = useState<number>(0);
  const [acc2, setAcc2] = useState<number>(0);
  const [acc3, setAcc3] = useState<number>(0);
  const [acc4, setAcc4] = useState<number>(0);
  const [acc5, setAcc5] = useState<number>(0);
  const [acc6, setAcc6] = useState<number>(0);
  const [acc7, setAcc7] = useState<number>(0);
  const [acc8, setAcc8] = useState<number>(0);
  const [acc9, setAcc9] = useState<number>(0);
  const [acc10, setAcc10] = useState<number>(0);
  const [acc11, setAcc11] = useState<number>(0);
  const [acc12, setAcc12] = useState<number>(0);

  const handleChange = (e: any, num: number) => {
    switch (num) {
      case 1:
        setAcc1(parseInt(e.target.value));
        break;
      case 2:
        setAcc2(parseInt(e.target.value));
        break;
      case 3:
        setAcc3(parseInt(e.target.value));
        break;
      case 4:
        setAcc4(parseInt(e.target.value));
        break;
      case 5:
        setAcc5(parseInt(e.target.value));
        break;
      case 6:
        setAcc6(parseInt(e.target.value));
        break;
      case 7:
        setAcc7(parseInt(e.target.value));
        break;
      case 8:
        setAcc8(parseInt(e.target.value));
        break;
      case 9:
        setAcc9(parseInt(e.target.value));
        break;
      case 10:
        setAcc10(parseInt(e.target.value));
        break;
      case 11:
        setAcc11(parseInt(e.target.value));
        break;
      case 12:
        setAcc12(parseInt(e.target.value));
        break;
    }
  };

  const totalAccuracy = () => {
    setAccuracy(acc1 * acc2 + acc3 + acc4 + acc5 + acc6 + acc7 + acc8 + acc9 + acc10 + acc11 + acc12);
  };

  return (
    <React.Fragment>
      <Container
        component="div"
        style={{
          width: "100%",
          minWidth: "1200px",
          height: "140px",
          margin: "20px 0",
          padding: "0 20px",
          float: "left",
          border: "1px solid",
        }}
      >
        <Container
          component="div"
          style={{ width: "62%", height: "140px", padding: "10px 0 10px 60px", float: "left" }}
        >
          <Container component="div" style={{ width: "100%", height: "60px", padding: "0", float: "left" }}>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                환수
              </InputLabel>
              <Select
                label="환수"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 1);
                }}
              >
                <MenuItem value={0}>황룡</MenuItem>
                <MenuItem value={5}>청룡</MenuItem>
                <MenuItem value={5}>주작</MenuItem>
                <MenuItem value={5}>백호</MenuItem>
                <MenuItem value={5}>현무</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                등급
              </InputLabel>
              <Select
                label="등급"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 2);
                }}
              >
                <MenuItem value={2}>6등급</MenuItem>
                <MenuItem value={3}>7등급</MenuItem>
                <MenuItem value={4}>8등급</MenuItem>
                <MenuItem value={5}>9등급</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                무기
              </InputLabel>
              <Select
                label="무기"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 3);
                }}
              >
                <MenuItem value={35}>3성</MenuItem>
                <MenuItem value={45}>4성</MenuItem>
                <MenuItem value={54}>5성</MenuItem>
                <MenuItem value={70}>6성</MenuItem>
                <MenuItem value={85}>7성</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                투구
              </InputLabel>
              <Select
                label="투구"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 4);
                }}
              >
                <MenuItem value={16}>3성</MenuItem>
                <MenuItem value={24}>4성</MenuItem>
                <MenuItem value={32}>5성</MenuItem>
                <MenuItem value={41}>6성</MenuItem>
                <MenuItem value={52}>7성</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                갑옷
              </InputLabel>
              <Select
                label="갑옷"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 5);
                }}
              >
                <MenuItem value={10}>3성</MenuItem>
                <MenuItem value={14}>4성</MenuItem>
                <MenuItem value={20}>5성</MenuItem>
                <MenuItem value={26}>6성</MenuItem>
                <MenuItem value={32}>7성</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                부적
              </InputLabel>
              <Select
                label="부적"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 11);
                }}
              >
                <MenuItem value={5}>고명부</MenuItem>
                <MenuItem value={6}>최명부</MenuItem>
                <MenuItem value={7}>전명부</MenuItem>
              </Select>
            </FormControl>
          </Container>
          <Container component="div" style={{ width: "100%", height: "60px", padding: "0", float: "left" }}>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                성물
              </InputLabel>
              <Select
                label="성물"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 6);
                }}
              >
                <MenuItem value={0}>없음</MenuItem>
                <MenuItem value={5}>성물</MenuItem>
                <MenuItem value={7}>성물'진</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                성물
              </InputLabel>
              <Select
                label="성물"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 7);
                }}
              >
                <MenuItem value={0}>없음</MenuItem>
                <MenuItem value={5}>성물</MenuItem>
                <MenuItem value={7}>성물'진</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                신물
              </InputLabel>
              <Select
                label="신물"
                labelId="select-standard"
                id="select-standard"
                className={classes.select}
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 8);
                }}
              >
                <MenuItem value={0}>없음</MenuItem>
                <MenuItem value={5}>1성</MenuItem>
                <MenuItem value={10}>2성</MenuItem>
                <MenuItem value={20}>3성</MenuItem>
                <MenuItem value={31}>4성</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "15px", color: "black" }}>
                목걸이
              </InputLabel>
              <Select
                className={classes.select}
                label="목걸이"
                labelId="select-standard"
                id="select-standard"
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 9);
                }}
              >
                <MenuItem value={0}>없음</MenuItem>
                <MenuItem value={3}>작생목</MenuItem>
                <MenuItem value={5}>생목</MenuItem>
                <MenuItem value={7}>커생목</MenuItem>
                <MenuItem value={10}>극락목</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.selectBox}>
              <InputLabel id="select-standard" style={{ paddingLeft: "20px", color: "black" }}>
                문양
              </InputLabel>
              <Select
                className={classes.select}
                label="문양"
                labelId="select-standard"
                id="select-standard"
                defaultValue={""}
                onChange={(e) => {
                  handleChange(e, 10);
                }}
              >
                <MenuItem value={0}>없음</MenuItem>
                <MenuItem value={10}>문양</MenuItem>
                <MenuItem value={20}>문양'진</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="기타(돋)"
              value={acc12 || ""}
              onChange={(e) => {
                handleChange(e, 12);
              }}
              inputProps={{
                style: { height: "35px", lineHeight: "30px", textAlign: "center", padding: "0" },
              }}
              style={{
                width: "90px",
                height: "45px",
                margin: "10px 10px 0 10px",
                paddingTop: "10px",
                float: "left",
              }}
            />
          </Container>
        </Container>
        <Container
          component="div"
          style={{ width: "38%", height: "140px", padding: "10px 60px 10px 0", float: "left" }}
        >
          <Link
            style={{
              width: "100%",
              color: "gray",
              marginTop: "15px",
              textDecoration: "none",
              textAlign: "right",
              float: "left",
            }}
          >
            * 모든 명중률은 최대치(강화석o)로 반영 *
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={totalAccuracy}
            style={{ width: "60px", height: "60px", margin: "0 20px 10px 20px", float: "left" }}
          >
            계산
          </Button>
          <Link className={classes.title} style={{ textDecoration: "none" }}>
            명중률 +{accuracy}
          </Link>
        </Container>
      </Container>
      <Container
        component="div"
        style={{ width: "100%", minWidth: "1020px", margin: "0", padding: "0", float: "left" }}
      >
        <Container component="div" style={{ width: "40%", margin: "0 6% 0 2%", padding: "0", float: "left" }}>
          <ButtonGroup color="primary" className={classes.btnGroup}>
            <Button color={img1 === "centerGod.png" ? "secondary" : "primary"} onClick={() => setImg1("centerGod.png")}>
              황룡
            </Button>
            <Button color={img1 === "eastGod.png" ? "secondary" : "primary"} onClick={() => setImg1("eastGod.png")}>
              청룡
            </Button>
            <Button color={img1 === "southGod.png" ? "secondary" : "primary"} onClick={() => setImg1("southGod.png")}>
              주작
            </Button>
            <Button color={img1 === "westGod.png" ? "secondary" : "primary"} onClick={() => setImg1("westGod.png")}>
              백호
            </Button>
            <Button color={img1 === "northGod.png" ? "secondary" : "primary"} onClick={() => setImg1("northGod.png")}>
              현무
            </Button>
            <Button color={img1 === "others.png" ? "secondary" : "primary"} onClick={() => setImg1("others.png")}>
              기타
            </Button>
            <Button color="primary" onClick={() => setImg1("empty.png")}>
              X
            </Button>
          </ButtonGroup>
          <img src={baseUrlForPetItemImg + img1} alt="장비1" />
        </Container>
        <Container component="div" style={{ width: "40%", margin: "0 2% 0 6%", padding: "0", float: "left" }}>
          <ButtonGroup color="primary" className={classes.btnGroup}>
            <Button color={img2 === "centerGod.png" ? "secondary" : "primary"} onClick={() => setImg2("centerGod.png")}>
              황룡
            </Button>
            <Button color={img2 === "eastGod.png" ? "secondary" : "primary"} onClick={() => setImg2("eastGod.png")}>
              청룡
            </Button>
            <Button color={img2 === "southGod.png" ? "secondary" : "primary"} onClick={() => setImg2("southGod.png")}>
              주작
            </Button>
            <Button color={img2 === "westGod.png" ? "secondary" : "primary"} onClick={() => setImg2("westGod.png")}>
              백호
            </Button>
            <Button color={img2 === "northGod.png" ? "secondary" : "primary"} onClick={() => setImg2("northGod.png")}>
              현무
            </Button>
            <Button color={img2 === "others.png" ? "secondary" : "primary"} onClick={() => setImg2("others.png")}>
              기타
            </Button>
            <Button color="primary" onClick={() => setImg2("empty.png")}>
              X
            </Button>
          </ButtonGroup>
          <img src={baseUrlForPetItemImg + img2} alt="장비2" />
        </Container>
      </Container>
    </React.Fragment>
  );
}
