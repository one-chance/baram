import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      minWidth: "700px",
      margin: "5px 0",
      padding: "5px",
      float: "left",
    },

    tableContainer2: {
      width: "50%",
      minWidth: "400px",
      margin: "5px 0",
      padding: "5px",
      float: "left",
    },

    table: {
      border: "1px solid",
      flaot: "left",
      "& th, td": {
        height: "4vh",
        border: "none",
        fontSize: "1rem",
        padding: "2px",
        textAlign: "center",
      },
      "& th": {
        backgroundColor: "#1976d2",
        color: "white",
      },
    },

    text: {
      margin: "10px 0",
      float: "left",
    },
  })
);

export default function AnimalItem() {
  const classes = useStyles();

  const datas1 = [
    {
      등급: "5성",
      파괴력: "400-550",
      피흡무시: "320",
      체력: "4.5%",
      마력: "4.5%",
      방무: "-",
      방관: "-",
      공증: "-",
      피해흡수: "20",
      전투력: "500",
    },
    {
      등급: "6성",
      파괴력: "450-600",
      피흡무시: "360",
      체력: "5.5%",
      마력: "5.5%",
      방무: "-",
      방관: "-",
      공증: "-",
      피해흡수: "25",
      전투력: "550",
    },
    {
      등급: "7성",
      파괴력: "550-680",
      피흡무시: "400",
      체력: "7.0%",
      마력: "7.0%",
      방무: "2",
      방관: "7",
      공증: "10",
      피해흡수: "30",
      전투력: "600",
    },
    {
      등급: "8성",
      파괴력: "650-760",
      피흡무시: "440",
      체력: "8.0%",
      마력: "8.0%",
      방무: "5",
      방관: "15",
      공증: "25",
      피해흡수: "40",
      전투력: "650",
    },
    {
      등급: "9성",
      파괴력: "750-840",
      피흡무시: "500",
      체력: "10.0%",
      마력: "10.0%",
      방무: "10",
      방관: "30",
      공증: "50",
      피해흡수: "50",
      전투력: "700",
    },
  ];

  const datas2 = [
    {
      등급: "5성",
      방어도: "-7",
      피흡무시: "240",
      체력: "0.5%",
      마력: "0.5%",
      방무: "-",
      공증: "-",
      마치: "-",
      피해흡수: "40",
      전투력: "500",
    },
    {
      등급: "6성",
      방어도: "-9",
      피흡무시: "280",
      체력: "1.0%",
      마력: "1.0%",
      방무: "-",
      공증: "-",
      마치: "-",
      피해흡수: "50",
      전투력: "550",
    },
    {
      등급: "7성",
      방어도: "-11",
      피흡무시: "320",
      체력: "1.5%",
      마력: "1.5%",
      방무: "1",
      공증: "10",
      마치: "20",
      피해흡수: "60",
      전투력: "600",
    },
    {
      등급: "8성",
      방어도: "-13",
      피흡무시: "360",
      체력: "2.0%",
      마력: "2.0%",
      방무: "3",
      공증: "20",
      마치: "30",
      피해흡수: "80",
      전투력: "650",
    },
    {
      등급: "9성",
      방어도: "-15",
      피흡무시: "400",
      체력: "3.0%",
      마력: "3.0%",
      방무: "5",
      공증: "30",
      마치: "50",
      피해흡수: "100",
      전투력: "700",
    },
  ];

  const datas3 = [
    {
      등급: "5성",
      방어도: "-12",
      피흡무시: "240",
      체력: "0.8%",
      마력: "0.8%",
      방무: "-",
      직타: "6%",
      회향: "5%",
      피해흡수: "40",
      전투력: "500",
    },
    {
      등급: "6성",

      방어도: "-15",
      피흡무시: "280",
      체력: "1.0%",
      마력: "1.0%",
      방무: "-",
      직타: "8%",
      회향: "7%",
      피해흡수: "50",
      전투력: "550",
    },
    {
      등급: "7성",
      방어도: "-20",
      피흡무시: "320",
      체력: "1.5%",
      마력: "1.5%",
      방무: "5",
      직타: "10%",
      회향: "9%",
      피해흡수: "60",
      전투력: "600",
    },

    {
      등급: "8성",
      방어도: "-25",
      피흡무시: "360",
      체력: "3.0%",
      마력: "3.0%",
      방무: "8",
      직타: "15%",
      회향: "12%",
      피해흡수: "80",
      전투력: "650",
    },
    {
      등급: "9성",
      방어도: "-30",
      피흡무시: "400",
      체력: "5.0%",
      마력: "5.0%",
      방무: "13",
      직타: "20%",
      회향: "15%",
      피해흡수: "100",
      전투력: "700",
    },
  ];

  const datas4 = [
    { 등급: "1단", 방어도: "-1", 피흡무시: "60", 힘민지: "1~2", 마법수준: "0~1", 전투력: "100" },
    { 등급: "2단", 방어도: "-1", 피흡무시: "100", 힘민지: "1~2", 마법수준: "1~2", 전투력: "200" },
    { 등급: "3단", 방어도: "-1", 피흡무시: "140", 힘민지: "1~2", 마법수준: "2~3", 전투력: "300" },
  ];

  const datas5 = [
    { 종류: "청룡", 특성: "마법치명 10~20", 명중회피: "1~2", 피흡무시: "60", 전투력: "200" },
    { 종류: "주작", 특성: "공격력증가 10~20", 명중회피: "1~2", 피흡무시: "60", 전투력: "200" },
    { 종류: "백호", 특성: "시전향상 10~20", 명중회피: "1~2", 피흡무시: "60", 전투력: "200" },
    { 종류: "현무", 특성: "내구도보호 85%", 명중회피: "1~2", 피흡무시: "60", 전투력: "200" },
  ];

  const datas6 = [
    {
      재료: "정수 (개)",
      이성: "10",
      삼성: "30",
      사성: "50",
      오성: "100",
      육성: "250",
      칠성: "400",
      팔성: "700",
      구성: "1200",
    },
    {
      재료: "금전 (만)",
      이성: "25",
      삼성: "50",
      사성: "100",
      오성: "200",
      육성: "400",
      칠성: "800",
      팔성: "1500",
      구성: "2000",
    },
  ];

  return (
    <React.Fragment>
      <Grid container direction='column' style={{ width: "80%", margin: "10px 10%" }}>
        <Grid item className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>무기</TableCell>
                <TableCell>파괴력</TableCell>
                <TableCell>피흡무시</TableCell>
                <TableCell>체력</TableCell>
                <TableCell>마력</TableCell>
                <TableCell>방무</TableCell>
                <TableCell>방관</TableCell>
                <TableCell>공증</TableCell>
                <TableCell>피해흡수</TableCell>
                <TableCell>전투력</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas1.map((row, index) => (
                <TableRow key={index}>
                  <TableCell scope='row'>{row.등급 || 0}</TableCell>
                  <TableCell>{row.파괴력 || 0}</TableCell>
                  <TableCell>{row.피흡무시 || 0}</TableCell>
                  <TableCell>{row.체력 || 0}</TableCell>
                  <TableCell>{row.마력 || 0}</TableCell>
                  <TableCell>{row.방무 || 0}</TableCell>
                  <TableCell>{row.방관 || 0}</TableCell>
                  <TableCell>{row.공증 || 0}</TableCell>
                  <TableCell>{row.피해흡수 || 0}</TableCell>
                  <TableCell>{row.전투력 || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>투구</TableCell>
                <TableCell>방어도</TableCell>
                <TableCell>피흡무시</TableCell>
                <TableCell>체력</TableCell>
                <TableCell>마력</TableCell>
                <TableCell>방무</TableCell>
                <TableCell>공증</TableCell>
                <TableCell>마치</TableCell>
                <TableCell>피해흡수</TableCell>
                <TableCell>전투력</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas2.map((row, index) => (
                <TableRow key={index}>
                  <TableCell scope='row'>{row.등급 || 0}</TableCell>
                  <TableCell>{row.방어도 || 0}</TableCell>
                  <TableCell>{row.피흡무시 || 0}</TableCell>
                  <TableCell>{row.체력 || 0}</TableCell>
                  <TableCell>{row.마력 || 0}</TableCell>
                  <TableCell>{row.방무 || 0}</TableCell>
                  <TableCell>{row.공증 || 0}</TableCell>
                  <TableCell>{row.마치 || 0}</TableCell>
                  <TableCell>{row.피해흡수 || 0}</TableCell>
                  <TableCell>{row.전투력 || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>갑옷</TableCell>
                <TableCell>방어도</TableCell>
                <TableCell>피흡무시</TableCell>
                <TableCell>체력</TableCell>
                <TableCell>마력</TableCell>
                <TableCell>방무</TableCell>
                <TableCell>직타</TableCell>
                <TableCell>회향</TableCell>
                <TableCell>피해흡수</TableCell>
                <TableCell>전투력</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas3.map((row, index) => (
                <TableRow key={index}>
                  <TableCell scope='row'>{row.등급 || 0}</TableCell>
                  <TableCell>{row.방어도 || 0}</TableCell>
                  <TableCell>{row.피흡무시 || 0}</TableCell>
                  <TableCell>{row.체력 || 0}</TableCell>
                  <TableCell>{row.마력 || 0}</TableCell>
                  <TableCell>{row.방무 || 0}</TableCell>
                  <TableCell>{row.직타 || 0}</TableCell>
                  <TableCell>{row.회향 || 0}</TableCell>
                  <TableCell>{row.피해흡수 || 0}</TableCell>
                  <TableCell>{row.전투력 || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item container direction='row' className={classes.tableContainer}>
          <Grid item xs={5}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>손</TableCell>
                  <TableCell>방어도</TableCell>
                  <TableCell>피흡무시</TableCell>
                  <TableCell>힘민지</TableCell>
                  <TableCell>마법수준</TableCell>
                  <TableCell>전투력</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas4.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell scope='row'>{row.등급 || 0}</TableCell>
                    <TableCell>{row.방어도 || 0}</TableCell>
                    <TableCell>{row.피흡무시 || 0}</TableCell>
                    <TableCell>{row.힘민지 || 0}</TableCell>
                    <TableCell>{row.마법수준 || 0}</TableCell>
                    <TableCell>{row.전투력 || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              height: "129px",
              margin: "0 20px",
              padding: "5px",
              float: "left",
            }}>
            <h4 className={classes.text}>▶ 범위 수치는 최초 감정시 랜덤으로 부여되며 재감정할 수 없다.</h4>
            <h4 className={classes.text}>▶ 손, 보주 아이템은 사신단 레이드로 얻을 수 있다. (교환불가)</h4>
            <h4 className={classes.text} style={{ marginBottom: "0" }}>
              ▶ 손, 보주 아이템은 사행성으로 얻을 수 있다. (교환가능)
            </h4>
          </Grid>
        </Grid>

        <Grid item container direction='row' className={classes.tableContainer}>
          <Grid item xs={5}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>보주</TableCell>
                  <TableCell>특성</TableCell>
                  <TableCell>명중회피</TableCell>
                  <TableCell>피흡무시</TableCell>
                  <TableCell>전투력</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas5.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell scope='row'>{row.종류 || 0}</TableCell>
                    <TableCell>{row.특성 || 0}</TableCell>
                    <TableCell>{row.명중회피 || 0}</TableCell>
                    <TableCell>{row.피흡무시 || 0}</TableCell>
                    <TableCell>{row.전투력 || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              height: "161px",
              margin: "0 20px",
              padding: "5px",
              float: "left",
            }}>
            <h4 className={classes.text}>▶ 보주는 신수에 관계없이 착용할 수 있다.</h4>
            <h4 className={classes.text}>▶ 손, 보주 아이템은 신수계 대장장이에게 파괴할 수 있다.</h4>
            <h4 className={classes.text}>▶ 무기/투구/갑옷은 7성 이상부터 강화시 손상된다.</h4>
            <h4 className={classes.text}>▶ 무기/투구/갑옷은 7성 이상부터 교환시 전속된다.</h4>
          </Grid>
        </Grid>

        <Grid item container direction='row' className={classes.tableContainer}>
          <Grid item xs={5}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>재료</TableCell>
                  <TableCell>2성</TableCell>
                  <TableCell>3성</TableCell>
                  <TableCell>4성</TableCell>
                  <TableCell>5성</TableCell>
                  <TableCell>6성</TableCell>
                  <TableCell>7성</TableCell>
                  <TableCell>8성</TableCell>
                  <TableCell>9성</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas6.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell scope='row'>{row.재료 || 0}</TableCell>
                    <TableCell>{row.이성 || 0}</TableCell>
                    <TableCell>{row.삼성 || 0}</TableCell>
                    <TableCell>{row.사성 || 0}</TableCell>
                    <TableCell>{row.오성 || 0}</TableCell>
                    <TableCell>{row.육성 || 0}</TableCell>
                    <TableCell>{row.칠성 || 0}</TableCell>
                    <TableCell>{row.팔성 || 0}</TableCell>
                    <TableCell>{row.구성 || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              height: "97px",
              margin: "0 20px",
              padding: "5px",
              float: "left",
            }}>
            <h4 className={classes.text}>▶ 10성은 없지만 9성(손상)은 데이터로 존재한다.</h4>
            <h4 className={classes.text}>▶ 손상 되어도 지를 수 있으나 재료가 2배 필요하다.</h4>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
