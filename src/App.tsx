import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';

import Container from '@material-ui/core/Container';

import Header from 'components/Header/Header';
import Home from 'pages/Home';
import SignIn from 'pages/Common/SignIn';
import SignUp from 'pages/Common/SignUp';
import FindId from 'pages/Common/FindId';
import FindPw from 'pages/Common/FindPw';

import Item from 'pages/Dictionary/Item';
import Raid from 'pages/Dictionary/Raid';
import RaidInfo from 'pages/Dictionary/RaidInfo';

import MyInfo from 'pages/MyPage/MyInfo';

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

              {/*Common*/}
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/findid" component={FindId}/>
              <Route exact path="/findpw" component={FindPw}/>

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
    </Container>
  );
}

export default App;