import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainmenu: {
      width: "100%",
      height: "60px",
      padding: "0",
      margin: "0",
      listStyle: "none",
      textAlign: "center",
      float: "left",
      backgroundColor: "white",
    },

    mainmenu2: {
      width: "20%",
      height: "60px",
      margin: "0",
      float: "left",
      "& a": {
        display: "block",
        lineHeight: "40px",
        margin: "10px 0",
        textDecoration: "none",
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "black",
      },
    },

    submenu: {
      display: "none",
      width: "100%",
      height: "200px",
      padding: "5px 0 10px 0",
      listStyle: "none",
      backgroundColor: "white",
      borderBottom: "1px solid darkgray",
      "& li": {
        width: "100%",
        height: "30px",
        "& a": {
          lineHeight: "30px",
          margin: "0",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: "400",
          color: "black",
        },
        "& a:hover": {
          textDecoration: "underline",
        },
      },
    },
  })
);

export default function TopTaps2() {
  const classes = useStyles();

  function opening() {
    let a = document.getElementById("testA");
    let b = document.getElementById("testB");
    let c = document.getElementById("testC");
    let d = document.getElementById("testD");
    let e = document.getElementById("testE");
    if (a !== null && b !== null && c !== null && d !== null && e !== null) {
      a.style.display = "block";
      b.style.display = "block";
      c.style.display = "block";
      d.style.display = "block";
      e.style.display = "block";
    }
  }

  function closing() {
    let a = document.getElementById("testA");
    let b = document.getElementById("testB");
    let c = document.getElementById("testC");
    let d = document.getElementById("testD");
    let e = document.getElementById("testE");
    if (a !== null && b !== null && c !== null && d !== null && e !== null) {
      a.style.display = "none";
      b.style.display = "none";
      c.style.display = "none";
      d.style.display = "none";
      e.style.display = "none";
    }
  }

  return (
    <React.Fragment>
      <AppBar
        color="transparent"
        elevation={0}
        style={{
          position: "-webkit-sticky",
          width: "100%",
          float: "left",
        }}
      >
        <div
          id="up"
          style={{
            width: "80%",
            margin: "0 10%",
            padding: "0",
            float: "left",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ margin: "10px 0" }}>logo</h1>
        </div>
        <div
          id="down"
          style={{
            width: "80%",
            margin: "0 10%",
            padding: "0",
            backgroundColor: "white",
            borderTop: "1px solid darkgray",
            borderBottom: "1px solid darkgray",
            float: "left",
          }}
        >
          <ul className={classes.mainmenu} onMouseOver={opening} onMouseOut={closing}>
            <li className={classes.mainmenu2}>
              <a href="/cal/power">게시판</a>
              <ul id="testA" className={classes.submenu}>
                <li>
                  <a href="/cal/power">팁 게시판</a>
                </li>
                <li>
                  <a href="/cal/power">자유 게시판</a>
                </li>
                <li>
                  <a href="/cal/power">스샷 게시판</a>
                </li>
                <li>
                  <a href="/cal/power">구인 게시판</a>
                </li>
                <li>
                  <a href="/cal/power">직업 게시판</a>
                </li>
              </ul>
            </li>
            <li className={classes.mainmenu2}>
              <a href="/cal/power">계산기</a>
              <ul id="testB" className={classes.submenu}>
                <li>
                  <a href="/cal/power">전투력</a>
                </li>
                <li>
                  <a href="/cal/power">능력치</a>
                </li>
                <li>
                  <a href="/cal/power">경험치</a>
                </li>
                <li>
                  <a href="/cal/power">생 산</a>
                </li>
              </ul>
            </li>
            <li className={classes.mainmenu2}>
              <a href="/cal/power">도감</a>
              <ul id="testC" className={classes.submenu}>
                <li>
                  <a href="/cal/power">아이템</a>
                </li>
                <li>
                  <a href="/cal/power">환수장비</a>
                </li>
                <li>
                  <a href="/cal/power">신수장비</a>
                </li>
                <li>
                  <a href="/cal/power">레이드/사냥터</a>
                </li>
                <li>
                  <a href="/cal/power">장비마법</a>
                </li>
                <li>
                  <a href="/cal/power">고고학</a>
                </li>
              </ul>
            </li>
            <li className={classes.mainmenu2}>
              <a href="/cal/power">경매장</a>
              <ul id="testD" className={classes.submenu}>
                <li>
                  <a href="/cal/power">경매장</a>
                </li>
                <li>
                  <a href="/cal/power">장 터</a>
                </li>
              </ul>
            </li>
            <li className={classes.mainmenu2}>
              <a href="/cal/power">내정보</a>
              <ul id="testE" className={classes.submenu}>
                <li>
                  <a href="/cal/power">회원정보</a>
                </li>
                <li>
                  <a href="/cal/power">아이디 찾기</a>
                </li>
                <li>
                  <a href="/cal/power">비밀번호 찾기</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </AppBar>
    </React.Fragment>
  );
}
