import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import IMarketContent from "interfaces/Auction/IMarketContent";
import MarketDataGrid from "components/Auction/MarketDataGrid";
import {getMarketItemsDummy} from "utils/AuctionUtil";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 0 15px 0",
    float: "left",
  },
}));

function MarketBoard() {
  const classes = useStyles();
  const [posts, setPosts] = React.useState<Array<IMarketContent>>([]);

  const _onLoad = async () => {
    setPosts(await getMarketItemsDummy());
  }

  useEffect(() => {
    _onLoad();
  }, []);

  return (
    <Container className={classes.root}>
      <MarketDataGrid
        posts={posts}
      />
    </Container>
  );
}

export default MarketBoard;
