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
    },
    textContainer: {
      width: "380px",
      margin: "0 0 0 20px",
      padding: "10px 0",
    },
    table: {
      width: "800px",
      border: "1px solid",
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
      margin: "5px 0",
      float: "left",
    },
  })
);

export default function AnimalItem() {
  const classes = useStyles();

  /*   var title = [
    ["등급", "파괴력", "피해흡수무시", "체력/마력", "방무", "방관", "공증", "피해흡수", "전투력"],
    ["등급", "방어도", "피해흡수무시", "체력/마력", "방무", "공증", "마치", "피해흡수", "전투력"],
    ["등급", "방어도", "피해흡수무시", "체력/마력", "방무", "직타", "회향", "피해흡수", "전투력"],
  ]; */

  const datas1 = [
    [
      // 등급, 파괴력, 피해흡수무시, 체력/마력, 방무, 방관, 공증, 피해흡수, 전투력
      ["5성", "400-550", "320", "4.5%", "-", "-", "-", "20", "500"],
      ["6성", "450-600", "360", "5.5%", "-", "-", "-", "25", "550"],
      ["7성", "550-680", "400", "7.0%", "2", "7", "10", "30", "600"],
      ["8성", "650-760", "440", "8.0%", "5", "15", "25", "40", "650"],
      ["9성", "750-840", "500", "10.0%", "10", "30", "50", "50", "700"],
    ],

    [
      // 등급, 방어도, 피해흡수무시, 체력/마력, 방무, 공증, 마치, 피해흡수, 전투력
      ["5성", "-7", "240", "0.5%", "-", "-", "-", "40", "500"],
      ["6성", "-9", "280", "1.0%", "-", "-", "-", "50", "550"],
      ["7성", "-11", "320", "1.5%", "1", "10", "20", "60", "600"],
      ["8성", "-13", "360", "2.0%", "3", "20", "30", "80", "650"],
      ["9성", "-15", "400", "3.0%", "5", "30", "50", "100", "700"],
    ],

    [
      // 등급, 방어도, 피해흡수무시, 체력/마력, 방무, 직타, 회향, 피해흡수, 전투력
      ["5성", "-12", "240", "0.8%", "-", "6%", "5%", "40", "500"],
      ["6성", "-15", "280", "1.0%", "-", "8%", "7%", "50", "550"],
      ["7성", "-20", "320", "1.5%", "5", "10%", "9%", "60", "600"],
      ["8성", "-25", "360", "3.0%", "8", "15%", "12%", "80", "650"],
      ["9성", "-30", "400", "5.0%", "13", "20%", "15%", "100", "700"],
    ],
  ];

  const datas2 = [
    // 등급, 방어도, 피흡무시, 힘민지, 마법수준, 전투력
    ["1단", "-1", "60", "1~2", "0~1", "100"],
    ["2단", "-1", "100", "1~2", "1~2", "200"],
    ["3단", "-1", "140", "1~2", "2~3", "300"],
  ];

  const datas3 = [
    ["청룡", "마법치명", "1~2", "60", "200"],
    ["주작", "공격력증가", "1~2", "60", "200"],
    ["백호", "시전향상", "1~2", "60", "200"],
    ["현무", "내구도보호", "1~2", "60", "200"],
  ];

  const datas4 = [
    ["정수 (개)", "10", "30", "50", "100", "250", "400", "700", "1200"],
    ["금전 (만)", "25", "50", "100", "200", "400", "800", "1500", "2000"],
  ];

  return (
    <React.Fragment>
      <Grid container direction='column' alignItems='center' justify='center' style={{ width: "100%", margin: "10px 0 20px 0" }}>
        <Grid item className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>무기</TableCell>
                <TableCell>파괴력</TableCell>
                <TableCell>피흡무시</TableCell>
                <TableCell>체력/마력</TableCell>
                <TableCell>방무</TableCell>
                <TableCell>방관</TableCell>
                <TableCell>공증</TableCell>
                <TableCell>피해흡수</TableCell>
                <TableCell>전투력</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas1[0].map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[4]}</TableCell>
                  <TableCell>{row[5]}</TableCell>
                  <TableCell>{row[6]}</TableCell>
                  <TableCell>{row[7]}</TableCell>
                  <TableCell>{row[8]}</TableCell>
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
                <TableCell>체력/마력</TableCell>
                <TableCell>방무</TableCell>
                <TableCell>공증</TableCell>
                <TableCell>마치</TableCell>
                <TableCell>피해흡수</TableCell>
                <TableCell>전투력</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas1[1].map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[4]}</TableCell>
                  <TableCell>{row[5]}</TableCell>
                  <TableCell>{row[6]}</TableCell>
                  <TableCell>{row[7]}</TableCell>
                  <TableCell>{row[8]}</TableCell>
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
                <TableCell>체력/마력</TableCell>
                <TableCell>방무</TableCell>
                <TableCell>직타</TableCell>
                <TableCell>회향</TableCell>
                <TableCell>피해흡수</TableCell>
                <TableCell>전투력</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas1[2].map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[4]}</TableCell>
                  <TableCell>{row[5]}</TableCell>
                  <TableCell>{row[6]}</TableCell>
                  <TableCell>{row[7]}</TableCell>
                  <TableCell>{row[8]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item container direction='row' alignItems='center' justify='center' className={classes.tableContainer}>
          <Grid item>
            <Table className={classes.table} style={{ width: "400px" }}>
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
                {datas2.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>{row[4]}</TableCell>
                    <TableCell>{row[5]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item className={classes.textContainer}>
            <h4 className={classes.text}>▶ 범위 수치는 최초 감정시 확정되며 재감정할 수 없다.</h4>
            <h4 className={classes.text}>▶ 손, 보주 아이템은 사신정기로 교환할 수 있다. (교불)</h4>
            <h4 className={classes.text}>▶ 손, 보주 아이템은 사행성으로 얻을 수 있다. (교환)</h4>
          </Grid>
        </Grid>

        <Grid item container direction='row' alignItems='center' justify='center' className={classes.tableContainer}>
          <Grid item>
            <Table className={classes.table} style={{ width: "400px" }}>
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
                {datas3.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>{row[4]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item className={classes.textContainer}>
            <h4 className={classes.text}>▶ 보주는 신수에 관계없이 착용할 수 있다.</h4>
            <h4 className={classes.text}>▶ 손, 보주 아이템은 신수계 대장장이에게 파괴할 수 있다.</h4>
            <h4 className={classes.text}>▶ 무기/투구/갑옷은 7성 이상부터 강화시 손상된다.</h4>
            <h4 className={classes.text}>▶ 무기/투구/갑옷은 7성 이상부터 교환시 전속된다.</h4>
          </Grid>
        </Grid>

        <Grid item container direction='row' alignItems='center' justify='center' className={classes.tableContainer}>
          <Grid>
            <Table className={classes.table} style={{ width: "400px" }}>
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
                {datas4.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>{row[4]}</TableCell>
                    <TableCell>{row[5]}</TableCell>
                    <TableCell>{row[6]}</TableCell>
                    <TableCell>{row[7]}</TableCell>
                    <TableCell>{row[8]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item className={classes.textContainer}>
            <h4 className={classes.text}>▶ 10성은 없지만 9성(손상)은 데이터로 존재한다.</h4>
            <h4 className={classes.text}>▶ 손상 되어도 지를 수 있으나 재료가 2배 필요하다.</h4>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
