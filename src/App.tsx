import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

import MyAlert from "elements/Alert/MyAlert";
import MyBackdrop from "elements/Backdrop/MyBackdrop";

import AuctionMarket from "pages/Auction/Market/MarketBoard";

import { refreshToken } from "utils/CommonUtil";

const useStyles = makeStyles(theme => ({
  header: {
    zIndex: 10,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "122px",
    padding: "0",
  },
  root: {
    width: "100%",
    minHeight: "545px",
    position: "relative",
    zIndex: 1,
    marginTop: "132px",
  },
}));

function App() {
  const classes = useStyles();

  useEffect(() => {
    // 토큰 자동갱신 실행
    setInterval(refreshToken, 1000 * 60 * 10);
  }, []);

  return (
    <Container maxWidth='xl' style={{ padding: "0" }}>
      <React.Fragment>
        <header>
          <Container fixed className={classes.header}>
            <Header />
          </Container>
        </header>
        <main>
          <Container className={classes.root}>
            <BrowserRouter>
              {/*Error Handling*/}
              <Route exact path='/signin' component={NoAuth} />

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
              <Route exact path='/board/write' component={Write} />
              <Route exact path='/board/write/:tab' component={Write} />
              <Route exact path='/board/write/:tab/:seq' component={Write} />

              {/*Calculator*/}
              <Route exact path='/cal/ability' component={Ability} />
              <Route exact path='/cal/exp' component={Exp} />
              <Route exact path='/cal/power' component={Power} />
              <Route exact path='/cal/production' component={Production} />

              {/*Dictionary*/}
              <Route path='/dic/adventure' component={Adventure} />
              <Route path='/dic/animalitem' component={AnimalItem} />
              <Route exact path='/dic/raid' component={Raid} />
              <Route path='/dic/raid/:key' component={RaidInfo} />
              <Route path='/dic/item' component={Item} />
              <Route path='/dic/petitem' component={PetItem} />
              <Route path='/dic/archeology' component={Archeology} />

              {/*Auction*/}
              <Route path='/auction/market' component={AuctionMarket} />

              {/*MyInfo*/}
              <Route path='/myinfo/:tab' component={MyInfo} />
            </BrowserRouter>
          </Container>

          <footer style={{ width: "100%", marginTop: "20px", float: "left" }}>
            <Container style={{ padding: "0" }}>
              <Footer />
            </Container>
          </footer>
        </main>
      </React.Fragment>
      <MyAlert />
      <MyBackdrop />
    </Container>
  );
}

export default App;
