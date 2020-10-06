import React from 'react';
import {useRecoilState} from 'recoil';
import SignInDialogState from 'state/common/SignInDialogState';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

import TopTaps from 'components/Header/TopTaps';
import SignInForm from 'components/User/SignInForm';

import { getSignInUserId, LogoutUser } from 'utils/UserUtil';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarleft: {
    textAlign: "left",
  },
  toolbarcenter: {
    textAlign: "center"
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarright: {
    textAlign: "right",
  },
  dialogActions: {
    justifyContent: "space-between"
  }
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSignInOpen, setIsSignInOpen] = useRecoilState(SignInDialogState);

  const signInUserId = getSignInUserId();

  const _onMoveToMain = () => {
    document.location.href = "/";
  }

  const _onSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const _onSignInClose = () => {
    setIsSignInOpen(false);
  };

  const _onMoveSignUp = () => {
    document.location.href = "/signup";
  }

  const _onLogoutUser = () => {
    LogoutUser();
    
    _onMoveToMain();
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <nav>
          <Toolbar 
            className={classes.toolbar}>
            <Grid container item xs={12}>
              <Grid item xs={3}
                className={classes.toolbarleft}>                  
                <Button 
                  size="small">
                    Subscribe
                </Button>
              </Grid>
              <Grid item xs={6}>                  
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  className={classes.toolbarTitle}
                  onClick={_onMoveToMain}
                >
                  logo
                </Typography>
              </Grid>
              <Grid item xs={3}
                className={classes.toolbarright}>
                  {
                    signInUserId ?
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={_onLogoutUser}>
                        Logout
                      </Button>
                    :
                      <Container>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={_onSignInOpen}>
                            SignIn
                        </Button>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={_onMoveSignUp}
                        >
                          SignUp
                        </Button>
                      </Container>
                  }               
              </Grid>
            </Grid>
          </Toolbar>
        </nav>
        <aside>
          <Box>
            <TopTaps/>
          </Box>
        </aside>
      </React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={isSignInOpen}
        onClose={_onSignInClose}
        aria-labelledby="responsive-dialog-title">
          <DialogTitle 
            id="responsive-dialog-title">
              {"로그인"}
          </DialogTitle>
          <DialogContent>
            {/*
            <DialogContentText>
              Blah Blah ~~~~ 
            </DialogContentText>
            */}
            <SignInForm/>
          </DialogContent>
          <DialogActions
            className={classes.dialogActions}>
            <Button 
              tabIndex={-1}
              onClick={_onMoveSignUp} 
              color="primary">
                회원가입
            </Button>
            <Button 
              tabIndex={-1}
              onClick={_onSignInClose} 
              color="primary">
                닫기
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}