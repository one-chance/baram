import React from 'react';
import {useRecoilValue} from 'recoil';
import {MyBackdropState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MyBackdrop = () => {
  const classes = useStyles();

  const backdrop = useRecoilValue(MyBackdropState);

  return (
    <Backdrop className={classes.backdrop} open={backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default MyBackdrop;