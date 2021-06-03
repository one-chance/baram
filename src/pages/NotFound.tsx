import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>요청하신 페이지를 찾을 수 없습니다.</div>
    </>
  );
};

export default NotFound;
