import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  btn: {
    height: "36px",
    textAlign: "center",
    float: "left",
    margintLeft: "5px",
  },

  table: {
    border: "1px solid",
    borderCollapse: "collapse",
    "& th, td": {
      height: "4vh",
      border: "none",
      fontSize: "1rem",
      padding: "2px",
      textAlign: "center",
    },
    "& th": {
      borderBottom: "1px solid",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
});

export default function Ability() {
  const classes = useStyles();

  return (
    /* eslint-disable jsx-a11y/anchor-is-valid */
    <React.Fragment>
      <Container style={{ width: "90%", margin: "10px 5%", padding: "0" }}>
        <Container style={{ width: "100%", border: "1px solid gray", borderRadius: "10px" }}>
          <h2>123</h2>
        </Container>
      </Container>
    </React.Fragment>
  );
}
