import React from "react";
import { Switch, Route } from "react-router";

export default (
  <Switch>
    <Route exact path='/' />

    {/*Common*/}
    <Route exact path='/signup' />
    <Route exact path='/signupM' />
    <Route exact path='/forget' />

    {/*Board*/}
    <Route exact path='/board/free' />
    <Route exact path='/board/free/:seq' />
    <Route exact path='/board/tip' />
    <Route exact path='/board/tip/:seq' />
    <Route exact path='/board/trade' />
    <Route exact path='/board/trade/:seq' />
    <Route exact path='/board/write' />
    <Route exact path='/board/write/:tab' />
    <Route exact path='/board/write/:tab/:seq' />

    {/*Calculator*/}
    <Route exact path='/cal/ability' />
    <Route exact path='/cal/abilityM' />
    <Route exact path='/cal/exp' />
    <Route exact path='/cal/power' />
    <Route exact path='/cal/production' />
    <Route exact path='/cal/tradition' />

    {/*Dictionary*/}
    <Route exact path='/dic/adventure' />
    <Route exact path='/dic/animalitem' />
    <Route exact path='/dic/raid' />
    <Route path='/dic/raid/:key' />
    <Route exact path='/dic/item' />
    <Route exact path='/dic/itemM' />
    <Route exact path='/dic/petitem' />
    <Route exact path='/dic/archeology' />

    {/*Auction*/}
    <Route path='/auction/market' />

    {/*MyInfo*/}
    <Route path='/myinfo/:tab' />

    {/*Policy*/}
    <Route exact path='/privacypolicy' />
    <Route exact path='/termsofservice' />

    {/*Error Handling*/}
    <Route exact path='/signin' />
  </Switch>
);
