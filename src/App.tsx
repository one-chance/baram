import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

import Container from "@material-ui/core/Container";

import NoAuth from "pages/User/NoAuth";
import Header from "components/Semantic/Header";
import Footer from "components/Semantic/Footer";
import Home from "pages/Home";

// User
import SignUp from "pages/User/SignUp";
import Forget from "pages/User/Forget";
import MyInfo from "pages/User/MyInfo";

// Board
import FreeBoard from "pages/Board/Free/FreeBoard";
import FreePostView from "pages/Board/Free/FreePostView";
import TipBoard from "pages/Board/Tip/TipBoard";
import TipPostView from "pages/Board/Tip/TipPostView";
import TradeBoard from "pages/Board/Trade/TradeBoard";
import TradePostView from "pages/Board/Trade/TradePostView";
import Write from "pages/Board/Write";

// Dictionary
import Adventure from "pages/Dictionary/Adventure";
import AnimalItem from "pages/Dictionary/AnimalItem";
import Raid from "pages/Dictionary/Raid";
import RaidInfo from "pages/Dictionary/RaidInfo";
import Item from "pages/Dictionary/Item";
import PetItem from "pages/Dictionary/PetItem";
import Archeology from "pages/Dictionary/Archeology";

// Calculator
import Ability from "pages/Calculator/Ability";
import Exp from "pages/Calculator/Exp";
import Power from "pages/Calculator/Power";
import Production from "pages/Calculator/Production";

import NotFound from "pages/NotFound";
import PrivacyPolicy from "components/PrivacyPolicy";
import TermsOfService from "components/TermsOfService";

import MyAlert from "elements/Alert/MyAlert";
import MyBackdrop from "elements/Backdrop/MyBackdrop";

// Auction
import AuctionMarket from "pages/Auction/Market/MarketBoard";
import AuctionMarketWrite from "pages/Auction/Market/MarketBoardWrite";

import { refreshToken } from "utils/CommonUtil";

const useStyles = makeStyles(theme => ({
  header: {
    zIndex: 10,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "15vh",
    padding: "0",
  },
  root: {
    width: "100%",
    minHeight: "70vh",
    position: "relative",
    zIndex: 1,
    marginTop: "15vh",
    padding: "10px 0.75vw",
  },
  footer: {
    width: "100%",
    height: "12vh",
    margin: 0,
    marginTop: "10px",
    padding: "0",
  },
}));

function App() {
  const classes = useStyles();

  useEffect(() => {
    // 토큰 자동갱신 실행
    setInterval(refreshToken, 1000 * 60 * 10);
  }, []);

  return (
    <div>
      <div>
        <header>
          <div className={classes.header}>
            <Header />
          </div>
        </header>
        <main>
          <Container className={classes.root}>
            <BrowserRouter>
              <Switch>
                {/*Home*/}
                <Route exact path='/' component={Home} />

                {/*Common*/}
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/forget' component={Forget} />

                {/*Board*/}
                <Route exact path='/board/free' component={FreeBoard} />
                <Route exact path='/board/free/:seq' component={FreePostView} />
                <Route exact path='/board/tip' component={TipBoard} />
                <Route exact path='/board/tip/:seq' component={TipPostView} />
                <Route exact path='/board/trade' component={TradeBoard} />
                <Route exact path='/board/trade/:seq' component={TradePostView} />
                <Route exact path='/board/write' component={Write} />
                <Route exact path='/board/write/:tab' component={Write} />
                <Route exact path='/board/write/:tab/:seq' component={Write} />

                {/*Calculator*/}
                <Route exact path='/cal/ability' component={Ability} />
                <Route exact path='/cal/exp' component={Exp} />
                <Route exact path='/cal/power' component={Power} />
                <Route exact path='/cal/production' component={Production} />

                {/*Dictionary*/}
                <Route exact path='/dic/adventure' component={Adventure} />
                <Route exact path='/dic/animalitem' component={AnimalItem} />
                <Route exact path='/dic/raid' component={Raid} />
                <Route path='/dic/raid/:key' component={RaidInfo} />
                <Route exact path='/dic/item' component={Item} />
                <Route exact path='/dic/petitem' component={PetItem} />
                <Route exact path='/dic/archeology' component={Archeology} />

                {/*Auction*/}
                <Route path='/auction/market' component={AuctionMarket} />
                <Route path='/auction/write' component={AuctionMarketWrite} />

                {/*MyInfo*/}
                <Route path='/myinfo/:tab' component={MyInfo} />

                {/*Policy*/}
                <Route exact path='/privacypolicy' component={PrivacyPolicy} />
                <Route exact path='/termsofservice' component={TermsOfService} />

                {/*Error Handling*/}
                <Route exact path='/signin' component={NoAuth} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </Container>
        </main>
        <footer>
          <div className={classes.footer}>
            <Footer />
          </div>
        </footer>
      </div>
      <MyAlert />
      <MyBackdrop />
    </div>
  );
}

export default App;
