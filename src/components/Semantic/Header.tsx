import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SignInDialogState from "state/common/SignInDialogState";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SignInForm from "components/User/SignInForm";

import AppBar from "@material-ui/core/AppBar";
import { getSignInUserId, LogoutUser } from "utils/UserUtil";

const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    height: "100%",
  },
  boxUp: {
    width: "100%",
    height: "50%",
    margin: "0",
    padding: "0 1.5vw",
    backgroundColor: "white",
  },
  boxDown: {
    width: "100%",
    height: "50%",
    margin: "0",
    padding: "0",
    backgroundColor: "white",
    borderTop: "1px solid darkgray",
    borderBottom: "1px solid darkgray",
    "&:hover": {
      "& div": {
        display: "block",
      },
    },
  },
  menuText: {
    width: "100%",
    lineHeight: "7.5vh",
    margin: "0",
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  mainmenu: {
    width: "20%",
    padding: "0",
    margin: "0",
    float: "left",

    "& div": {
      width: "100%",
      height: "25vh",
      padding: "5px 0",
      listStyle: "none",
      backgroundColor: "white",
      borderBottom: "1px solid darkgray",
      textAlign: "center",
      display: "none",
      "& a": {
        lineHeight: "4vh",
        margin: "0 20%",
        padding: "0",
        textDecoration: "none",
        fontSize: "1rem",
        color: "black",
        display: "block",
      },
      "& a:hover": {
        backgroundColor: "lightgray",
      },
    },
  },
  btn: {
    minWidth: "80px",
    lineHeight: "4vh",
    fontFamily: "Do Hyeon",
    fontSize: "1.2rem",
    textTransform: "none",
    margin: "0",
    padding: "0",
    float: "left",
    "&:hover, &:active, &:focus": {
      color: "blue",
      backgroundColor: "transparent",
    },
  },
  btnClose: {
    minWidth: 10,
    fontSize: "1rem",
    padding: "0",
    position: "absolute",
    top: 5,
    right: 10,
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [isSignInOpen, setIsSignInOpen] = useRecoilState(SignInDialogState);
  const [opener, setOpener] = useState(false);

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

  const _prepare = () => {
    setOpener(true);

    setTimeout(() => {
      setOpener(false);
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
      <AppBar color='inherit' elevation={0} className={classes.root}>
        <Grid container alignItems='center' justify='space-between' id='up' className={classes.boxUp}>
          <Button className={classes.btn} onClick={_onMoveToMain}>
            Home
          </Button>

          {signInUserId ? (
            <Grid item style={{ margin: "0", padding: "0" }}>
              <Button className={classes.btn} onClick={_onLogoutUser}>
                로그아웃
              </Button>
              <Button className={classes.btn} style={{ color: "blue" }} disabled>
                {signInUserId}
              </Button>
            </Grid>
          ) : (
            <Grid item style={{ margin: "0", padding: "0" }}>
              <Button className={classes.btn} onClick={_onSignInOpen}>
                로그인
              </Button>
              <Button className={classes.btn} onClick={_onMoveSignUp}>
                회원가입
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container id='down' direction='row' className={classes.boxDown}>
          <Grid item container className={classes.mainmenu}>
            <Typography className={classes.menuText}>게시판</Typography>
            <div style={{ marginTop: "-1px" }}>
              <a href='/board/tip'>팁 게시판</a>
              <a href='/board/free'>자유 게시판</a>
              <a href='#1' onClick={_prepare}>
                스샷 게시판
              </a>
              <a href='#1' onClick={_prepare}>
                구인 게시판
              </a>
              <a href='#1' onClick={_prepare}>
                직업 게시판
              </a>
            </div>
          </Grid>
          <Grid item container className={classes.mainmenu}>
            <Typography className={classes.menuText}>계산기</Typography>
            <div style={{ marginTop: "-1px" }}>
              <a href='/cal/power'>전투력</a>
              <a href='/cal/ability'>능력치</a>
              <a href='/cal/exp'>경험치</a>
              <a href='/cal/production'>생 산</a>
            </div>
          </Grid>
          <Grid item container className={classes.mainmenu}>
            <Typography className={classes.menuText}>도감</Typography>
            <div style={{ marginTop: "-1px" }}>
              <a href='/dic/item'>일반장비</a>
              <a href='/dic/petitem'>환수장비</a>
              <a href='/dic/animalitem'>신수장비</a>
              <a href='#1' onClick={_prepare}>
                레이드
              </a>
              <a href='/dic/adventure'>탐험일지</a>
              <a href='/dic/archeology'>고고학</a>
            </div>
          </Grid>
          <Grid item container className={classes.mainmenu}>
            <Typography className={classes.menuText}>거래소</Typography>
            <div style={{ marginTop: "-1px" }}>
              {/* <a href='/auction/auction'>거래소</a> */}
              <a href='#1' onClick={_prepare}>
                거래소
              </a>
              <a href='/board/trade'>
                거래 게시판
              </a>
            </div>
          </Grid>
          <Grid item container className={classes.mainmenu}>
            <Typography className={classes.menuText}>내 정보</Typography>
            <div style={{ marginTop: "-1px" }}>
              <a href='/myinfo/view'>회원정보</a>
            </div>
          </Grid>
        </Grid>
      </AppBar>

      <Dialog open={opener}>
        <DialogContent>
          <img src='/assets/img/announce.png' alt='announce' />
        </DialogContent>
      </Dialog>

      <Dialog fullScreen={fullScreen} open={isSignInOpen} onClose={_onSignInClose}>
        <DialogTitle style={{ padding: "0 5px", textAlign: "center" }}>
          <span>
            <h2 style={{ margin: "20px 0 0 0" }}>로그인</h2>
            <Button onClick={_onSignInClose} className={classes.btnClose}>
              &#10006;
            </Button>
          </span>
        </DialogTitle>
        <DialogContent style={{ padding: "10px 40px" }}>
          <SignInForm />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
