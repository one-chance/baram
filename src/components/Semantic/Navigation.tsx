import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SignInDialogState from "state/common/SignInDialogState";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SignInForm from "components/User/SignInForm";
import AppBar from "@material-ui/core/AppBar";
import { getNowUserInfo, LogoutUser } from "utils/UserUtil";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    height: "100%",
    backgroundColor: "#E3BF7D",
  },
  boxUp: {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    //borderBottom: "1px solid",
  },
  btn: {
    minWidth: "70px",
    lineHeight: "40px",
    textTransform: "none",
    fontFamily: "Do Hyeon",
    fontSize: "1.2rem",
    margin: "0",
    padding: "0",
    float: "left",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      outline: "none",
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
  text: {
    width: "160px",
    padding: "0",
    "& h6": {
      lineHeight: "28px",
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "lightgray",
    },
    "& a": {
      lineHeight: "24px",
      margin: "3px 0",
      paddingLeft: "10px",
      textDecoration: "none",
      fontSize: "1rem",
      border: "1px solid lightgraphy",
      color: "black",
      display: "block",
    },
    "& a:hover": {
      backgroundColor: "lightgray",
    },
  },
});

type Anchor = "left";

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [isSignInOpen, setIsSignInOpen] = useRecoilState(SignInDialogState);
  const [opener, setOpener] = useState(false);
  const [state, setState] = useState(false);

  const signInUserId = getNowUserInfo().id;

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
    document.location.href = "/signupM";
  };

  const _onLogoutUser = () => {
    LogoutUser();
    document.location.reload();
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState(open);
  };

  const menuList = (anchor: Anchor) => (
    <div role='presentation' onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      {signInUserId ? (
        <Grid container justify='space-around' style={{ height: "40px", backgroundColor: "white", margin: "0", padding: "0" }}>
          <Button className={classes.btn} style={{ fontSize: "1rem", color: "blue" }} disabled>
            {signInUserId}
          </Button>
          <Divider orientation='vertical' flexItem style={{ width: "2px", margin: "0", float: "left" }} />
          <Button className={classes.btn} onClick={_onLogoutUser} disableRipple={true}>
            로그아웃
          </Button>
        </Grid>
      ) : (
        <Grid container justify='space-around' style={{ height: "40px", backgroundColor: "white", margin: "0", padding: "0" }}>
          <Button className={classes.btn} onClick={_onSignInOpen} disableRipple={true}>
            로그인
          </Button>
          <Divider orientation='vertical' style={{ width: "2px", margin: "0", float: "left" }} />
          <Button className={classes.btn} onClick={_onMoveSignUp} disableRipple={true}>
            회원가입
          </Button>
        </Grid>
      )}

      <div className={classes.text}>
        <Typography variant='h6'>게시판</Typography>
        <a href='/board/tip'>팁 게시판</a>
        <Divider />
        <a href='/board/free'>자유 게시판</a>
        <Divider />
        <a href='#1' onClick={_prepare}>
          서버 게시판
        </a>
        <Divider />
        <a href='/board/video'>영상 게시판</a>
        <Divider />
      </div>
      <div className={classes.text}>
        <Typography variant='h6'>코디</Typography>
        <a href='/deco/lookbook'>룩북</a>
        <Divider />
        <a href='/deco/tanning'>태닝</a>
        <Divider />
        <a href='#1' onClick={_prepare}>
          헤어
        </a>
        <Divider />
        <a href='#1' onClick={_prepare}>
          얼굴
        </a>
        <Divider />
        <a href='#1' onClick={_prepare}>
          치장
        </a>
        <Divider />
      </div>
      <div className={classes.text}>
        <Typography variant='h6'>계산기</Typography>
        <a href='/cal/power'>전투력</a>
        <Divider />
        <a href='/cal/abilityM'>능력치</a>
        <Divider />
        <a href='/cal/exp'>경험치</a>
        <Divider />
        <a href='/cal/production'>생 산</a>
        <Divider />
        <a href='/cal/tradition'>세시마을</a>
        <Divider />
      </div>
      <div className={classes.text}>
        <Typography variant='h6'>도감</Typography>
        <a href='/dic/itemM'>일반장비</a>
        <Divider />
        <a href='/dic/petitem'>환수장비</a>
        <Divider />
        <a href='/dic/animalitem'>신수장비</a>
        <Divider />
        <a href='#1' onClick={_prepare}>
          레이드
        </a>
        <Divider />
        <a href='/dic/adventure'>탐험일지</a>
        <Divider />
        <a href='/dic/archeology'>고고학</a>
        <Divider />
      </div>
      <div className={classes.text}>
        <Typography variant='h6'>거래소</Typography>
        <a href='#1' onClick={_prepare}>
          거래소
        </a>
        <Divider />
        <a href='/board/trade'>거래 게시판</a>
        <Divider />
      </div>
      <div className={classes.text}>
        <Typography variant='h6'>내 정보</Typography>
        <a href='/myinfo/view'>회원정보</a>
        <Divider />
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <AppBar color='inherit' elevation={0} className={classes.root}>
        <Grid container alignItems='center' justify='space-between' id='up' className={classes.boxUp}>
          <div>
            <Button onClick={toggleDrawer("left", true)} style={{ padding: "5px" }} aria-label='Menu' disableRipple={true}>
              <MenuIcon />
            </Button>
            <Drawer anchor={"left"} open={state} onClose={toggleDrawer("left", false)}>
              {menuList("left")}
            </Drawer>
          </div>
          <img src='/assets/img/title.png' alt='title' width='58' height='22' />
          <Button href='/' style={{ padding: "0", textTransform: "none" }} aria-label='Home' disableRipple={true}>
            <HomeIcon />
          </Button>
        </Grid>

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
      </AppBar>
    </React.Fragment>
  );
}
