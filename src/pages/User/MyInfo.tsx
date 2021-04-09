import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { getSignInUserId, getUserInfoById } from "utils/UserUtil";
import IUserInfo from "interfaces/User/IUserInfo";

import NoAuth from "pages/User/NoAuth";
import ViewUserInfo from "components/User/ViewUserInfo";
import ViewUserInfoSmall from "components/User/ViewUserInfoSmall";
import AuthAccount from "components/User/AuthAccount";
import ChagnePassword from "components/User/ChagnePassword";
import WithdrawUser from "components/User/WithdrawUser";

const useStyles = makeStyles({
  root: {
    margin: "10px 0",
  },
  box: {
    margin: "10px 5px",
  },
  box2: {
    width: "66%",
    margin: "10px",
    paddingLeft: "30px",
  },
});

const Menus = withStyles({
  root: {
    padding: "5px 10px",
    "&:hover,:focus,:active": {
      fontWeight: "bolder",
    },
  },
})(MenuItem);

function MyInfo({ match }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const { tab } = match.params;
  const mode = tab;

  const [isNoSignInUser, setIsNoSignInUser] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    id: "",
    isActive: false,
    createDate: new Date(),
    editDate: new Date(),
  });

  const _onViewUser = () => {
    document.location.href = "/myinfo/view";
  };

  const _onAuthUser = () => {
    document.location.href = "/myinfo/auth";
  };

  const _onChangePassword = () => {
    document.location.href = "/myinfo/changepassword";
  };

  const _onWithdraw = () => {
    document.location.href = "/myinfo/withdraw";
  };

  // NOTE Init User Information
  useEffect(() => {
    const getUserInfo = async () => {
      const id = getSignInUserId();
      if (id) {
        const info = await getUserInfoById(id);
        info && setUserInfo(info);
      } else {
        setIsNoSignInUser(true);
      }
    };

    getUserInfo();
  }, []);

  return (
    <React.Fragment>
      {isNoSignInUser ? (
        <NoAuth />
      ) : (
        <Grid container className={classes.root}>
          {!smallScreen ? (
            <React.Fragment>
              <Grid item>
                <Menus onClick={_onViewUser}>회원 정보</Menus>
                <Divider />
                <Menus onClick={_onAuthUser}>캐릭터 인증</Menus>
                <Divider />
                <Menus onClick={_onChangePassword}>비밀번호 변경</Menus>
                <Divider />
                <Menus onClick={_onWithdraw}>회원 탈퇴</Menus>
              </Grid>
              <Divider orientation='vertical' flexItem style={{ width: "2px", margin: "4px" }} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid
                item
                container
                direction='row'
                justify='space-around'
                style={{ minWidth: "360px", margin: "0", borderTop: "2px solid lightgray", borderBottom: "2px solid lightgray" }}>
                <Menus onClick={_onViewUser} style={{ padding: "5px 0", float: "left" }}>
                  회원 정보
                </Menus>
                <Divider orientation='vertical' flexItem style={{ width: "2px", margin: "0" }} />
                <Menus onClick={_onAuthUser} style={{ padding: "5px 0", float: "left" }}>
                  캐릭터 인증
                </Menus>
                <Divider orientation='vertical' flexItem style={{ width: "2px", margin: "0" }} />
                <Menus onClick={_onChangePassword} style={{ padding: "5px 0", float: "left" }}>
                  비밀번호 변경
                </Menus>
                <Divider orientation='vertical' flexItem style={{ width: "2px", margin: "0" }} />
                <Menus onClick={_onWithdraw} style={{ padding: "5px 0", float: "left" }}>
                  회원 탈퇴
                </Menus>
              </Grid>
            </React.Fragment>
          )}
          <Grid item container className={smallScreen ? classes.box : classes.box2}>
            {mode === "view" && smallScreen && <ViewUserInfoSmall userInfo={userInfo} />}
            {mode === "view" && !smallScreen && <ViewUserInfo userInfo={userInfo} />}
            {mode === "auth" && <AuthAccount userInfo={userInfo} />}
            {mode === "changepassword" && <ChagnePassword id={userInfo.id} />}
            {mode === "withdraw" && <WithdrawUser id={userInfo.id} />}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default MyInfo;
