import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';

import Container from '@material-ui/core/Container';

import Test from './Test';

import Header from 'components/Header/Header';
import Home from 'pages/Home';

import SignIn from 'pages/User/SignIn';
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

function App() {

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
              {/*Home*/}
              <Route exact path="/" component={Home}/>
              <Route exact path="/test" component={Test}/>

              {/*Common*/}
              <Route exact path="/signin" component={SignIn}/>
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
              <Route exact path="/myinfo" component={MyInfo}/>
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