import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import { getSignInUserId, getUserInfoById } from "utils/UserUtil";
import IUserInfo from "interfaces/User/IUserInfo";

import NoSignInUser from "components/User/NoSignInUser";
import ViewUserInfo from "components/User/ViewUserInfo";
/* import EditUserInfo from "components/User/EditUserInfo"; */
import AuthAccount from "components/User/AuthAccount";
import AccountInfo from "components/User/AccountInfo";
import ChagnePassword from "components/User/ChagnePassword";
import WithdrawUser from "components/User/WithdrawUser";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "20px 5%",
    float: "left",
  },
  rightSection: {
    minWidth: "795px",
    padding: "0 0 0 30px",
  },
}));

const Menus = withStyles({
  root: {
    "&:hover,:focus,:active": {
      fontWeight: "bolder",
    },
  },
})(MenuItem);

function MyInfo({ match }: any) {
  const classes = useStyles();
  const { tab } = match.params;
  const mode = tab;

  const [isNoSignInUser, setIsNoSignInUser] = React.useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    id: "",
    isActive: false,
    createDateString: "",
    editDateString: "",
  });

  const _onViewUser = () => {
    document.location.href = "/myinfo/view";
  };

  const _onAuthUser = () => {
    document.location.href = "/myinfo/auth";
  };

  const _onCharUser = () => {
    document.location.href = "/myinfo/char";
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
        <NoSignInUser />
      ) : (
        <Container component='main'>
          <Grid container className={classes.root}>
            <Grid item xs={2}>
              <MenuList style={{ outline: "none" }}>
                <Menus onClick={_onViewUser}>회원 정보</Menus>
                <Divider variant='middle' />
                <Menus onClick={_onAuthUser}>캐릭터 인증</Menus>
                <Divider variant='middle' />
                <Menus onClick={_onCharUser}>캐릭터 관리</Menus>
                <Divider variant='middle' />
                <Menus onClick={_onChangePassword}>비밀번호 변경</Menus>
                <Divider variant='middle' />
                <Menus onClick={_onWithdraw}>회원 탈퇴</Menus>
              </MenuList>
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid item xs={9} className={classes.rightSection}>
              {mode === "view" && <ViewUserInfo userInfo={userInfo} />}
              {/*               {mode === "edit" && <EditUserInfo userInfo={userInfo} />} */}
              {mode === "auth" && <AuthAccount userInfo={userInfo} />}
              {mode === "char" && <AccountInfo userInfo={userInfo} />}
              {mode === "changepassword" && <ChagnePassword id={userInfo.id} />}
              {mode === "withdraw" && <WithdrawUser id={userInfo.id} />}
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default MyInfo;
