import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

import {useRecoilState} from 'recoil';
import {MyAlertState} from 'state/index';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MyAlert() {
  const classes = useStyles();
  const [myAlert, setMyAlert] = useRecoilState(MyAlertState);

  const _close = (event?: React.SyntheticEvent, reason?: string) => {
    setMyAlert({
      ...myAlert,
      isOpen: false
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        anchorOrigin={{ vertical: "top", horizontal: "right"}}
        open={myAlert.isOpen} 
        autoHideDuration={myAlert.duration} 
        onClose={_close}>
          <Alert onClose={_close} severity={myAlert.severity}>
            {myAlert.message}
          </Alert>
      </Snackbar>
    </div>
  );
}
