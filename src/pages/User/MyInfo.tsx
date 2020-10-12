import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { getSignInUserId, getUserInfoById } from 'utils/UserUtil';

import IUserInfo from 'interfaces/User/IUserInfo';

import LeftMenuList from 'components/User/LeftMenuList';

import NoSignInUser from 'components/User/NoSignInUser';
import ViewUserInfo from 'components/User/ViewUserInfo';
import EditUserInfo from 'components/User/EditUserInfo';
import AuthAccount from 'components/User/AuthAccount';
import AccountInfo from 'components/User/AccountInfo';
import ChagnePassword from 'components/User/ChagnePassword';
import WithdrawUser from 'components/User/WithdrawUser';

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

function MyInfo({match}: any) {
  const classes = useStyles();
  const {tab} = match.params;

  //const [mode, setMode] = React.useState(tab);
  const mode = tab;

  const [isNoSignInUser, setIsNoSignInUser] = React.useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    id: "",
    isActive: false,
    createDateString: "",
    editDateString: ""
  });

  // Init User Information
  useEffect(() => {
    const getUserInfo = async () => {
      const id = getSignInUserId();
      
      if (id) {
        const info = await getUserInfoById(id);
        info && setUserInfo(info);
      }
      else {
        setIsNoSignInUser(true);
      }
    };

    getUserInfo();
  }, []);

  return (
    <React.Fragment>
      {
        isNoSignInUser ?
          <NoSignInUser />
        :
        <Container 
          className={classes.root}
          component="main" 
          maxWidth="md">
            <Grid container>
              <Grid item xs={2} className={classes.leftSection}>
                <LeftMenuList />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={9} className={classes.rightSection}>
                {
                  (mode === "view") &&
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
                    <AuthAccount 
                      userInfo={userInfo}/>
                }
                {
                  mode === "char" &&
                    <AccountInfo 
                      userInfo={userInfo}/>
                }
                {
                  mode === "chgPwd" &&
                    <ChagnePassword
                      id={userInfo.id} />
                }
                {
                  mode === "withdraw" &&
                    <WithdrawUser
                      id={userInfo.id} />
                }
              </Grid>
            </Grid>
        </Container>
        
      }
    </React.Fragment>
  )
}

export default MyInfo;