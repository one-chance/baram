import React, { useEffect } from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';

import Container from '@material-ui/core/Container';

import NoAuth from 'pages/NoAuth';

import Header from 'components/Header/Header';
import Home from 'pages/Home';

import SignUp from 'pages/User/SignUp';
import FindId from 'pages/User/FindId';
import FindPw from 'pages/User/FindPw';

import MyInfo from 'pages/User/MyInfo';

import FreeBoard from 'pages/Board/FreeBoard';
import PostWrite from 'pages/Board/PostWrite';

import Item from 'pages/Dictionary/Item';
import Raid from 'pages/Dictionary/Raid';
import RaidInfo from 'pages/Dictionary/RaidInfo';

import MyAlert from 'elements/Alert/MyAlert';
import MyBackdrop from 'elements/Backdrop/MyBackdrop';

import { refreshToken } from 'utils/ComoonUtil';

function App() {

  useEffect(() => {
    setInterval(refreshToken, 1000 * 60 * 25);
  }, []);

  return (
    <Container
      maxWidth="xl">
      <React.Fragment>
        <header>
          <Container>
            <Header/>
          </Container>
        </header>
        <main>
          <Container
            fixed>
            <BrowserRouter>
              {/*Error Handling*/}
              <Route exact path="/error/auth" component={NoAuth}/>

              {/*Home*/}
              <Route exact path="/" component={Home}/>

              {/*Common*/}
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/findid" component={FindId}/>
              <Route exact path="/findpw" component={FindPw}/>

              {/*Board*/}
              <Route exact path="/board/free" component={FreeBoard}/>
              <Route exact path="/board/write" component={PostWrite}/>
              
              {/*Dictionary*/}
              <Route path="/dic/item" component={Item}/>
              <Route exact path="/dic/raid" component={Raid}/>
              <Route path="/dic/raid/:key" component={RaidInfo}/>

              {/*MyInfo*/}
              <Route path="/myinfo/:tab" component={MyInfo}/>
            </BrowserRouter>
          </Container>
        </main>
      </React.Fragment>
      <MyAlert/>
      <MyBackdrop/>
    </Container>
  );
}

export default App;