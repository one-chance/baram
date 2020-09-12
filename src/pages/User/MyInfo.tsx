import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { getSignInUserId, getUserInfoById } from 'utils/UserUtil';

import IUserInfo from 'interfaces/User/IUserInfo';

import NoSignInUser from 'components/User/NoSignInUser';
import ViewUserInfo from 'components/User/ViewUserInfo';
import EditUserInfo from 'components/User/EditUserInfo';
import AuthUserInfo from 'components/User/AuthUserInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  leftSection: {
  },
  rightSection: {
    padding: 10,
  },
}));

function MyInfo() {
  const classes = useStyles();

  const userId: string = getSignInUserId();
  //TODO : 회원정보 불러오기 구현
  //const userInfo: IUserInfo = getUserInfoById(userId);
  const userInfo: IUserInfo = {
    id: "whitow",
    mail: "whitow@test.co.kr",
    server: "하자",
    character: "협가검",
    isActive: true,
    createDateString: "1",
    editDateString: "1",
    isAuth: true
  }

  const [mode, setMode] = React.useState("view");

  const _onViewUser = () => {
    setMode("view");
  }

  const _onEditUser = () => {
    setMode("edit");
  }

  const _onAuthUser = () => {
    setMode("auth");
  }

  return (
    <React.Fragment>
      {
        userId === "" ?
          <NoSignInUser />
        :
        <Container 
          className={classes.root}
          component="main" 
          maxWidth="md">
            <Grid container>
              <Grid item xs={2} className={classes.leftSection}>
                <MenuList>
                  <MenuItem onClick={_onViewUser}>회원정보</MenuItem>
                  <Divider variant="middle"/>
                  <MenuItem onClick={_onEditUser}>정보수정</MenuItem>
                  <Divider variant="middle"/>
                  <MenuItem onClick={_onAuthUser}>회원인증</MenuItem>
                </MenuList>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={9} className={classes.rightSection}>
                {
                  mode === "view" &&
                    <ViewUserInfo 
                      userInfo={userInfo}/>
                }
                {
                  mode === "edit" &&
                    <EditUserInfo
                      userInfo={userInfo}/>
                }
                {
                  mode === "auth" &&
                    <AuthUserInfo 
                      userInfo={userInfo}/>
                }
              </Grid>
            </Grid>
        </Container>
        
      }
    </React.Fragment>
  )
}

export default MyInfo;