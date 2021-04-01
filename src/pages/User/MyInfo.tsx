import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import { getSignInUserId, getUserInfoById } from "utils/UserUtil";
import IUserInfo from "interfaces/User/IUserInfo";

import NoAuth from "pages/User/NoAuth";
import ViewUserInfo from "components/User/ViewUserInfo";
import AuthAccount from "components/User/AuthAccount";
import ChagnePassword from "components/User/ChagnePassword";
import WithdrawUser from "components/User/WithdrawUser";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px 0",
  },
}));

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
          <Grid item>
            <MenuList style={{ outline: "none" }}>
              <Menus onClick={_onViewUser}>회원 정보</Menus>
              <Divider />
              <Menus onClick={_onAuthUser}>캐릭터 인증</Menus>
              <Divider />
              <Menus onClick={_onChangePassword}>비밀번호 변경</Menus>
              <Divider />
              <Menus onClick={_onWithdraw}>회원 탈퇴</Menus>
            </MenuList>
          </Grid>
          <Divider orientation='vertical' flexItem style={{ width: "2px", margin: "4px" }} />
          <Grid item xs={8} style={{ marginLeft: "1vw" }}>
            {mode === "view" && <ViewUserInfo userInfo={userInfo} />}
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
