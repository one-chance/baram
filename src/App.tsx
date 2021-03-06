import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./App.css";

import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import NoAuth from "pages/User/NoAuth";
import Header from "components/Semantic/Header";
import Footer from "components/Semantic/Footer";
import Navigation from "components/Semantic/Navigation";
import Home from "pages/Home";

// User
import SignUp from "pages/User/SignUp";
import SignUpM from "pages/User/SignUpM";
import Forget from "pages/User/Forget";
import MyInfo from "pages/User/MyInfo";

// Board
import FreeBoard from "pages/Board/Free/FreeBoard";
import FreePostView from "pages/Board/Free/FreePostView";
import TipBoard from "pages/Board/Tip/TipBoard";
import TipPostView from "pages/Board/Tip/TipPostView";
import TradeBoard from "pages/Board/Trade/TradeBoard";
import TradePostView from "pages/Board/Trade/TradePostView";
import VideoBoard from "pages/Board/Video/VideoBoard";
import VideoPostView from "pages/Board/Video/VideoPostView";
import Write from "pages/Board/Write";

// Calculator
import Ability from "pages/Calculator/Ability";
import AbilityM from "pages/Calculator/AbilityM";
import Exp from "pages/Calculator/Exp";
import Power from "pages/Calculator/Power";
import Production from "pages/Calculator/Production";
import Tradition from "pages/Calculator/Tradition";

// Decoration
import LookBook from "pages/Decoration/LookBook";
import Tanning from "pages/Decoration/Tanning";

// Dictionary
import Adventure from "pages/Dictionary/Adventure";
import AnimalItem from "pages/Dictionary/AnimalItem";
import Raid from "pages/Dictionary/Raid";
import RaidInfo from "pages/Dictionary/RaidInfo";
import Item from "pages/Dictionary/Item";
import ItemM from "pages/Dictionary/ItemM";
import PetItem from "pages/Dictionary/PetItem";
import Archeology from "pages/Dictionary/Archeology";

import NotFound from "pages/NotFound";
import PrivacyPolicy from "components/PrivacyPolicy";
import TermsOfService from "components/TermsOfService";

import MyAlert from "elements/Alert/MyAlert";
import MyBackdrop from "elements/Backdrop/MyBackdrop";

import AuctionMarket from "pages/Auction/Market/MarketBoard";

import { refreshToken } from "utils/CommonUtil";

const useStyles = makeStyles({
  header: {
    zIndex: 10,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "120px",
    padding: "0",
  },
  navagation: {
    zIndex: 10,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    padding: "0",
  },
  root: {
    width: "100%",
    minHeight: "70vh",
    position: "relative",
    zIndex: 1,
    marginTop: "120px",
    padding: "10px",
  },
  root2: {
    width: "100%",
    position: "relative",
    zIndex: 1,
    marginTop: "60px",
    padding: "5px 0",
  },
  footer: {
    width: "100%",
    height: "90px",
    margin: 0,
    marginTop: "10px",
    padding: "0",
  },
});

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down(720));

  useEffect(() => {
    // 토큰 자동갱신 실행
    refreshToken();
    setInterval(refreshToken, 1000 * 60 * 10);
  }, []);

  return (
    <div>
      <div>
        <header>
          {smallScreen ? (
            <div className={classes.navagation}>
              <Navigation />
            </div>
          ) : (
            <div className={classes.header}>
              <Header />
            </div>
          )}
        </header>
        <main>
          <Container className={smallScreen ? classes.root2 : classes.root}>
            <BrowserRouter>
              <Switch>
                {/*Home*/}
                <Route exact path='/' component={Home} />

                {/*Common*/}
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signupM' component={SignUpM} />
                <Route exact path='/forget' component={Forget} />

                {/*Board*/}
                <Route exact path='/board/free' component={FreeBoard} />
                <Route exact path='/board/free/:seq' component={FreePostView} />
                <Route exact path='/board/tip' component={TipBoard} />
                <Route exact path='/board/tip/:seq' component={TipPostView} />
                <Route exact path='/board/trade' component={TradeBoard} />
                <Route exact path='/board/trade/:seq' component={TradePostView} />
                <Route exact path='/board/video' component={VideoBoard} />
                <Route exact path='/board/video/:seq' component={VideoPostView} />
                <Route exact path='/board/write' component={Write} />
                <Route exact path='/board/write/:tab' component={Write} />
                <Route exact path='/board/write/:tab/:seq' component={Write} />

                {/*Calculator*/}
                <Route exact path='/cal/ability' component={Ability} />
                <Route exact path='/cal/abilityM' component={AbilityM} />
                <Route exact path='/cal/exp' component={Exp} />
                <Route exact path='/cal/power' component={Power} />
                <Route exact path='/cal/production' component={Production} />
                <Route exact path='/cal/tradition' component={Tradition} />

                {/*Decoration*/}
                <Route path='/deco/lookbook' component={LookBook} />
                <Route path='/deco/tanning' component={Tanning} />

                {/*Dictionary*/}
                <Route exact path='/dic/adventure' component={Adventure} />
                <Route exact path='/dic/animalitem' component={AnimalItem} />
                <Route exact path='/dic/raid' component={Raid} />
                <Route path='/dic/raid/:key' component={RaidInfo} />
                <Route exact path='/dic/item' component={Item} />
                <Route exact path='/dic/itemM' component={ItemM} />
                <Route exact path='/dic/petitem' component={PetItem} />
                <Route exact path='/dic/archeology' component={Archeology} />

                {/*Auction*/}
                <Route path='/auction/market' component={AuctionMarket} />

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
