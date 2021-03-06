import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SignInDialogState from "state/common/SignInDialogState";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SignInForm from "components/User/SignInForm";

import AppBar from "@material-ui/core/AppBar";
import { getSignInUserId, LogoutUser } from "utils/UserUtil";

const useStyles = makeStyles(theme => ({
  mainmenu: {
    width: "100%",
    height: "60px",
    padding: "0",
    margin: "0",
    listStyle: "none",
    textAlign: "center",
    float: "left",
    backgroundColor: "white",

    "& li": {
      width: "20%",
      height: "60px",
      margin: "0",
      float: "left",
      "& h3": {
        lineHeight: "40px",
        margin: "10px 0",
        fontSize: "1.2rem",
      },

      "& ul": {
        display: "none",
        width: "100%",
        height: "190px",
        padding: "5px 0",
        listStyle: "none",
        backgroundColor: "white",
        borderBottom: "1px solid darkgray",
        "& li": {
          width: "100%",
          height: "30px",
          overflow: "visible",
          "& a": {
            minWidth: "100px",
            display: "block",
            lineHeight: "30px",
            margin: "0 20%",
            padding: "0",
            textDecoration: "none",
            fontSize: "0.9rem",
            color: "black",
          },
          "& a:hover": {
            backgroundColor: "lightgray",
          },
        },
      },
    },

    "&:hover": {
      "& ul": {
        display: "block",
      },
    },
  },

  btn: {
    lineHeight: "30px",
    margin: "15px 0",
    fontFamily: "Do Hyeon",
    fontSize: "1.2rem",
    textTransform: "none",
    padding: "0",
    float: "left",
    "&:hover, &:active, &:focus": {
      color: "blue",
      backgroundColor: "transparent",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSignInOpen, setIsSignInOpen] = useRecoilState(SignInDialogState);
  const [test, setTest] = useState(false);

  const signInUserId = getSignInUserId();

  const _onMoveToMain = () => {
    document.location.href = "/";
  };

  const _onSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const _onSignInClose = () => {
    setIsSignInOpen(false);
  };

  const _test = () => {
    setTest(true);

    setTimeout(() => {
      setTest(false);
    }, 2000);
  };

  const _onMoveSignUp = () => {
    document.location.href = "/signup";
  };

  const _onLogoutUser = () => {
    LogoutUser();

    _onMoveToMain();
  };

  return (
    <React.Fragment>
      <AppBar
        color='inherit'
        elevation={0}
        style={{
          minWidth: "600px",
          position: "sticky",
          height: "122px",
        }}>
        <div
          id='up'
          style={{
            width: "100%",
            height: "60px",
            margin: "0",
            padding: "0 10px",
            backgroundColor: "white",
            float: "left",
          }}>
          <Button className={classes.btn} onClick={_onMoveToMain}>
            Home
          </Button>

          {signInUserId ? (
            <Container style={{ maxWidth: "180px", minWidth: "170px", margin: "0", padding: "0", float: "right" }}>
              <Button className={classes.btn} onClick={_onLogoutUser} style={{ marginRight: "5px" }}>
                로그아웃
              </Button>
              <Button className={classes.btn} style={{ marginLeft: "5px", color: "blue" }} disabled>
                {signInUserId}
              </Button>
            </Container>
          ) : (
            <Container style={{ maxWidth: "180px", minWidth: "170px", margin: "0", padding: "0", float: "right" }}>
              <Button className={classes.btn} onClick={_onSignInOpen} style={{ marginRight: "5px" }}>
                로그인
              </Button>
              <Button className={classes.btn} onClick={_onMoveSignUp} style={{ marginLeft: "5px" }}>
                회원가입
              </Button>
            </Container>
          )}
        </div>
        <div
          id='down'
          style={{
            width: "100%",
            margin: "0",
            padding: "0",
            backgroundColor: "white",
            borderTop: "1px solid darkgray",
            borderBottom: "1px solid darkgray",
            float: "left",
          }}>
          <ul className={classes.mainmenu}>
            <li>
              <h3>게시판</h3>
              <ul>
                <li>
                  <a href='/board/tip'>팁 게시판</a>
                </li>
                <li>
                  <a href='/board/free'>자유 게시판</a>
                </li>
                <li>
                  <a href='#1' onClick={_test}>
                    스샷 게시판
                  </a>
                </li>
                <li>
                  <a href='#1' onClick={_test}>
                    구인 게시판
                  </a>
                </li>
                <li>
                  <a href='#1' onClick={_test}>
                    직업 게시판
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <h3>계산기</h3>
              <ul>
                <li>
                  <a href='/cal/power'>전투력</a>
                </li>
                <li>
                  <a href='/cal/ability'>능력치</a>
                </li>
                <li>
                  <a href='/cal/exp'>경험치</a>
                </li>
                <li>
                  <a href='/cal/production'>생 산</a>
                </li>
              </ul>
            </li>
            <li>
              <h3>도감</h3>
              <ul>
                <li>
                  <a href='/dic/item'>일반 장비</a>
                </li>
                <li>
                  <a href='/dic/petitem'>환수장비</a>
                </li>
                <li>
                  <a href='/dic/animalitem'>신수장비</a>
                </li>
                <li>
                  <a href='/dic/raid'>레이드/사냥터</a>
                </li>
                <li>
                  <a href='/dic/adventure'>탐험일지</a>
                </li>
                <li>
                  <a href='/dic/archeology'>고고학</a>
                </li>
              </ul>
            </li>
            <li>
              <h3>거래소</h3>
              <ul>
                <li>
                  {/* <a href='/auction/auction'>거래소</a> */}
                  <a href='#1' onClick={_test}>
                    거래소
                  </a>
                </li>
                <li>
                  {/* <a href='/cal/power'>장터 게시판</a> */}
                  <a href='#1' onClick={_test}>
                    장터 게시판
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <h3>내 정보</h3>
              <ul>
                <li>
                  <a href='/myinfo/view'>회원정보</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </AppBar>

      <Dialog open={test}>
        <DialogContent>
          <img src='/assets/img/announce.png' alt='announce' />
        </DialogContent>
      </Dialog>

      <Dialog fullScreen={fullScreen} open={isSignInOpen} onClose={_onSignInClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' style={{ padding: "0 5px", textAlign: "center" }}>
          <div>
            <h2 style={{ margin: "20px 0 0 0" }}>로그인</h2>
            <Button onClick={_onSignInClose} style={{ minWidth: 10, fontSize: "1rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
              &#10006;
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <SignInForm />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
