import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForAdventureImg } from "utils/ConfigUtil";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

import { getAdventureList } from 'utils/DictionaryUtil';
import {IAdventure, IMonster, IArticle, IExploration, IMission, IRewardImg} from "interfaces/Dictionary/IAdventure";

import AdventureList from "components/Dictionary/AdventureList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "90%",
      margin: "10px 5%",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

export default function Adventure() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.container}>
        
        <AdventureList />
        
      </Grid>
    </React.Fragment>
  );
}
