import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 0 15px 0",
    float: "left",
  },
}));

function MarketBoardWrite() {
  const classes = useStyles();

  return (
    <div>
      글쓰기
    </div>
  );
}

export default MarketBoardWrite;
