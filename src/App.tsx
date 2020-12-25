import React, { useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

import { BrowserRouter, Route } from "react-router-dom";

import Container from "@material-ui/core/Container";

import NoAuth from "pages/NoAuth";

import Header from "components/Header/Header";
import Home from "pages/Home";

import SignUp from "pages/User/SignUp";
import FindId from "pages/User/FindId";
import FindPw from "pages/User/FindPw";

import MyInfo from "pages/User/MyInfo";

import FreeBoard from "pages/Board/Free/FreeBoard";
import FreePostView from "pages/Board/Free/FreePostView";
import TipBoard from "pages/Board/Tip/TipBoard";
import TipPostView from "pages/Board/Tip/TipPostView";
import Write from "pages/Board/Write";

import Adventure from "pages/Dictionary/Adventure";
import AnimalItem from "pages/Dictionary/AnimalItem";
import Raid from "pages/Dictionary/Raid";
import RaidInfo from "pages/Dictionary/RaidInfo";
import Item from "pages/Dictionary/Item";
import PetItem from "pages/Dictionary/PetItem";
import Archeology from "pages/Dictionary/Archeology";

import MyAlert from "elements/Alert/MyAlert";
import MyBackdrop from "elements/Backdrop/MyBackdrop";

import Exp from "pages/Calculator/Exp";
import Power from "pages/Calculator/Power";
import Production from "pages/Calculator/Production";

import { refreshToken } from 'utils/CommonUtil';

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
    position: "relative",
    zIndex: 1,
    marginTop: "132px",
  },
}));

function App() {
  const classes = useStyles();

  useEffect(() => {
    // NOTE 토큰 자동갱신 실행
    setInterval(refreshToken, 1000 * 60 * 10);
  }, [])
  return (
    <Container maxWidth='xl'>
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
              <Route exact path='/findid' component={FindId} />
              <Route exact path='/findpw' component={FindPw} />

              {/*Board*/}
              <Route exact path='/board/free' component={FreeBoard} />
              <Route exact path='/board/free/:seq' component={FreePostView} />
              <Route exact path='/board/tip' component={TipBoard} />
              <Route exact path='/board/tip/:seq' component={TipPostView} />
              <Route exact path='/board/write' component={Write} />
              <Route exact path='/board/write/:tab' component={Write} />
              <Route exact path='/board/write/:tab/:seq' component={Write} />

              {/*Calculator*/}
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

              {/*MyInfo*/}
              <Route path='/myinfo/:tab' component={MyInfo} />
            </BrowserRouter>
          </Container>
        </main>
      </React.Fragment>
      <MyAlert />
      <MyBackdrop />
    </Container>
  );
}

export default App;
