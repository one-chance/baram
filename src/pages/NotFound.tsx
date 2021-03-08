import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import classes from '*.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
    <div className={classes.root}>
      요청하신 페이지를 찾을 수 없습니다.
    </div>
    </>
  )
}

export default NotFound;