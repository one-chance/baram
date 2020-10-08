import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForPetItemImg } from "utils/ConfigUtil";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";

import Select from "@material-ui/core/NativeSelect";
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
      height: "80px",
      lineHeight: "80px",
      margin: "30px 20px 10px 20px",
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
      textAlignLast: "center",
    },
  })
);

export default function PetItem() {
  const classes = useStyles();
  const baseUrlForPetItemImg = getBaseUrlForPetItemImg();
  const [img1, SetImg1] = useState<string>("empty.png");
  const [img2, SetImg2] = useState<string>("empty.png");
  const [accuracy, SetAccuracy] = useState<number>(0);
  const [acc1, SetAcc1] = useState<number>(0);
  const [acc2, SetAcc2] = useState<number>(0);
  const [acc3, SetAcc3] = useState<number>(0);
  const [acc4, SetAcc4] = useState<number>(0);
  const [acc5, SetAcc5] = useState<number>(0);
  const [acc6, SetAcc6] = useState<number>(0);
  const [acc7, SetAcc7] = useState<number>(0);
  const [acc8, SetAcc8] = useState<number>(0);
  const [acc9, SetAcc9] = useState<number>(0);
  const [acc10, SetAcc10] = useState<number>(0);
  const [acc11, SetAcc11] = useState<number>(0);
  const [acc12, SetAcc12] = useState<number>(0);

  const handleChange = (e: any, num: number) => {
    switch (num) {
      case 1:
        SetAcc1(parseInt(e.target.value));
        break;
      case 2:
        SetAcc2(parseInt(e.target.value));
        break;
      case 3:
        SetAcc3(parseInt(e.target.value));
        break;
      case 4:
        SetAcc4(parseInt(e.target.value));
        break;
      case 5:
        SetAcc5(parseInt(e.target.value));
        break;
      case 6:
        SetAcc6(parseInt(e.target.value));
        break;
      case 7:
        SetAcc7(parseInt(e.target.value));
        break;
      case 8:
        SetAcc8(parseInt(e.target.value));
        break;
      case 9:
        SetAcc9(parseInt(e.target.value));
        break;
      case 10:
        SetAcc10(parseInt(e.target.value));
        break;
      case 11:
        SetAcc11(parseInt(e.target.value));
        break;
      case 12:
        SetAcc12(parseInt(e.target.value));
        break;
    }
  };

  const totalAccuracy = () => {
    SetAccuracy(acc1 * acc2 + acc3 + acc4 + acc5 + acc6 + acc7 + acc8 + acc9 + acc10 + acc11 + acc12);
  };

  return (
    <React.Fragment>
      <Container
        component="div"
        style={{
          width: "100%",
          height: "140px",
          margin: "20px 0",
          padding: "0 20px",
          float: "left",
          border: "1px solid",
        }}
      >
        <Container
          component="div"
          style={{ width: "65%", height: "140px", padding: "10px 0 10px 50px", float: "left" }}
        >
          <Container component="div" style={{ width: "100%", height: "60px", padding: "0", float: "left" }}>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">환수</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 1);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={0}>황룡</option>
                <option value={5}>청룡</option>
                <option value={5}>주작</option>
                <option value={5}>백호</option>
                <option value={5}>현무</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">등급</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 2);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={2}>6등급</option>
                <option value={3}>7등급</option>
                <option value={4}>8등급</option>
                <option value={5}>9등급</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">무기</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 3);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={35}>3성</option>
                <option value={45}>4성</option>
                <option value={54}>5성</option>
                <option value={70}>6성</option>
                <option value={85}>7성</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">투구</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 4);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={16}>3성</option>
                <option value={24}>4성</option>
                <option value={32}>5성</option>
                <option value={41}>6성</option>
                <option value={52}>7성</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">갑옷</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 5);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>3성</option>
                <option value={14}>4성</option>
                <option value={20}>5성</option>
                <option value={26}>6성</option>
                <option value={32}>7성</option>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="&nbsp;부적"
              value={acc11 || ""}
              onChange={(e) => {
                handleChange(e, 11);
              }}
              inputProps={{
                style: { height: "35px", lineHeight: "30px", textAlign: "center", padding: "0" },
              }}
              style={{
                width: "70px",
                height: "45px",
                margin: "10px 10px 0 10px",
                paddingTop: "10px",
                float: "left",
              }}
            ></TextField>
          </Container>
          <Container component="div" style={{ width: "100%", height: "60px", padding: "0", float: "left" }}>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">성물</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 6);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={5}>성물</option>
                <option value={7}>성물'진</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">성물</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 7);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={5}>성물</option>
                <option value={7}>성물'진</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">신물</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 8);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={0}>없음</option>
                <option value={5}>1성</option>
                <option value={10}>2성</option>
                <option value={20}>3성</option>
                <option value={31}>4성</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">목걸이</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 9);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={3}>작생목</option>
                <option value={5}>생목</option>
                <option value={7}>커생목</option>
                <option value={10}>극락목</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel htmlFor="select-outlined">문양</InputLabel>
              <Select
                className={classes.select}
                onChange={(e) => {
                  handleChange(e, 10);
                }}
                id="select-outlined"
                inputProps={{
                  style: { padding: "2px 20px 2px 2px", height: "26px" },
                }}
              >
                <option aria-label="None" value="" />
                <option value={0}>없음</option>
                <option value={10}>문양</option>
                <option value={20}>문양'진</option>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              label="&nbsp;황돋"
              value={acc12 || ""}
              onChange={(e) => {
                handleChange(e, 12);
              }}
              inputProps={{
                style: { height: "35px", lineHeight: "30px", textAlign: "center", padding: "0" },
              }}
              style={{
                width: "70px",
                height: "45px",
                margin: "10px 10px 0 10px",
                paddingTop: "10px",
                float: "left",
              }}
            ></TextField>
          </Container>
        </Container>
        <Container
          component="div"
          style={{ width: "35%", height: "140px", padding: "10px 50px 10px 0", float: "left" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={totalAccuracy}
            style={{ width: "60px", height: "60px", margin: "35px 30px 25px 10px", float: "left" }}
          >
            계산
          </Button>
          <Link className={classes.title} style={{ textDecoration: "none" }}>
            명중률 +{accuracy}
          </Link>
        </Container>
      </Container>
      <Container component="div" style={{ width: "100%", margin: "0", padding: "0", float: "left" }}>
        <Container component="div" style={{ width: "40%", margin: "0 6% 0 2%", padding: "0", float: "left" }}>
          <ButtonGroup color="primary" className={classes.btnGroup}>
            <Button color={img1 === "centerGod.png" ? "secondary" : "primary"} onClick={() => SetImg1("centerGod.png")}>
              황룡
            </Button>
            <Button color={img1 === "eastGod.png" ? "secondary" : "primary"} onClick={() => SetImg1("eastGod.png")}>
              청룡
            </Button>
            <Button color={img1 === "southGod.png" ? "secondary" : "primary"} onClick={() => SetImg1("southGod.png")}>
              주작
            </Button>
            <Button color={img1 === "westGod.png" ? "secondary" : "primary"} onClick={() => SetImg1("westGod.png")}>
              백호
            </Button>
            <Button color={img1 === "northGod.png" ? "secondary" : "primary"} onClick={() => SetImg1("northGod.png")}>
              현무
            </Button>
            <Button color={img1 === "others.png" ? "secondary" : "primary"} onClick={() => SetImg1("others.png")}>
              기타
            </Button>
            <Button color="primary" onClick={() => SetImg1("empty.png")}>
              X
            </Button>
          </ButtonGroup>
          <img src={baseUrlForPetItemImg + img1} alt="장비1" />
        </Container>
        <Container component="div" style={{ width: "40%", margin: "0 2% 0 6%", padding: "0", float: "left" }}>
          <ButtonGroup color="primary" className={classes.btnGroup}>
            <Button color={img2 === "centerGod.png" ? "secondary" : "primary"} onClick={() => SetImg2("centerGod.png")}>
              황룡
            </Button>
            <Button color={img2 === "eastGod.png" ? "secondary" : "primary"} onClick={() => SetImg2("eastGod.png")}>
              청룡
            </Button>
            <Button color={img2 === "southGod.png" ? "secondary" : "primary"} onClick={() => SetImg2("southGod.png")}>
              주작
            </Button>
            <Button color={img2 === "westGod.png" ? "secondary" : "primary"} onClick={() => SetImg2("westGod.png")}>
              백호
            </Button>
            <Button color={img2 === "northGod.png" ? "secondary" : "primary"} onClick={() => SetImg2("northGod.png")}>
              현무
            </Button>
            <Button color={img2 === "others.png" ? "secondary" : "primary"} onClick={() => SetImg2("others.png")}>
              기타
            </Button>
            <Button color="primary" onClick={() => SetImg2("empty.png")}>
              X
            </Button>
          </ButtonGroup>
          <img src={baseUrlForPetItemImg + img2} alt="장비2" />
        </Container>
      </Container>
    </React.Fragment>
  );
}
