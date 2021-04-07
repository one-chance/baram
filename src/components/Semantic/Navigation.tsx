import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SignInDialogState from "state/common/SignInDialogState";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
//import NotificationsIcon from "@material-ui/icons/Notifications";
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
import { getSignInUserId, LogoutUser } from "utils/UserUtil";

const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    height: "100%",
  },
  boxUp: {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    backgroundColor: "white",
    borderBottom: "1px solid",
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
    "&:hover, &:active, &:focus": {
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
}));

type Anchor = "left";

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [isSignInOpen, setIsSignInOpen] = useRecoilState(SignInDialogState);
  const [opener, setOpener] = useState(false);

  const [state, setState] = useState(false);

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
          <Button className={classes.btn} onClick={_onLogoutUser}>
            로그아웃
          </Button>
        </Grid>
      ) : (
        <Grid container justify='space-around' style={{ height: "40px", backgroundColor: "white", margin: "0", padding: "0" }}>
          <Button className={classes.btn} onClick={_onSignInOpen}>
            로그인
          </Button>
          <Divider orientation='vertical' style={{ width: "2px", margin: "0", float: "left" }} />
          <Button className={classes.btn} onClick={_onMoveSignUp}>
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
          스샷 게시판
        </a>
        <Divider />
        <a href='#1' onClick={_prepare}>
          구인 게시판
        </a>
        <Divider />
        <a href='#1' onClick={_prepare}>
          직업 게시판
        </a>
        <Divider />
      </div>
      <div className={classes.text}>
        <Typography variant='h6'>계산기</Typography>
        <a href='/cal/power'>전투력</a>
        <Divider />
        <a href='/cal/ability'>능력치</a>
        <Divider />
        <a href='/cal/exp'>경험치</a>
        <Divider />
        <a href='/cal/production'>생 산</a>
        <Divider />
      </div>
      <div className={classes.text}>
        <Typography variant='h6'>도감</Typography>
        <a href='/dic/item'>일반장비</a>
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
            <Button onClick={toggleDrawer("left", true)} style={{ padding: "5px" }}>
              <MenuIcon />
            </Button>
            <Drawer anchor={"left"} open={state} onClose={toggleDrawer("left", false)}>
              {menuList("left")}
            </Drawer>
          </div>

          <Button style={{ fontFamily: "Jua", fontSize: "2rem", padding: "0" }} href='/'>
            ㄷㅌ
          </Button>

          <Button style={{ padding: "0", textTransform: "none" }}>
            {/* <NotificationsIcon /> */}
            v1.0.3
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
