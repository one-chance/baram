import React from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getDicAllRaidList } from 'utils/DictionaryUtil';
import IRaids from 'interfaces/Dictionary/IRaids';
import MyInputSearch from 'elements/Input/MyInputSearch';
import MyGridDivider from 'elements/Grid/MyGridDivider';

import { useRecoilValue } from 'recoil';
import { SearchValueState } from 'state';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
  table: {
    minWidth: 400,
  },
  searchContainer: {
    padding: theme.spacing(0.1),
  },
  tableContainer: {
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

const StyledTableRow = withStyles((theme: Theme) =>
createStyles({
  root: {
    backgroundColor: "#d7ccc8",
    '&:nth-of-type(odd)': {
      backgroundColor: "#efebe9",
    },
    '&:hover': {
      backgroundColor: "#8d6e63",
    }
  },
}),
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#a1887f",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export default function Raid() {
  const classes = useStyles();
  
  const allRaids: Array<IRaids> = getDicAllRaidList();

  const _onMoveRaidInfo = (key: string) => {
    document.location.href="/dic/raid/" + key;
  }

  return (
    <React.Fragment>
      {/*
      <Grid container spacing={3}
        direction="column"
        alignItems="flex-end"
        className={classes.root}>
          <Grid item xs={3}>
            <MyInputSearch /> 
          </Grid>
          <MyGridDivider/>
      </Grid>
      */}
      {
        allRaids.map((raids) => {
          return (
            <TableContainer component={Paper} className={classes.tableContainer} key={raids.key}>
              <Table className={classes.table} aria-label={`${raids.section}-table`}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>{raids.section} 레이드 목록</StyledTableCell>
                    <StyledTableCell align="right">제한 전투력</StyledTableCell>
                    <StyledTableCell align="right">제한 인원</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    raids.raidInfos.map((info) => (
                      <StyledTableRow key={info.name}
                        onClick={() => _onMoveRaidInfo(info.key)}>
                        <StyledTableCell component="th" scope="row">
                          {info.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{info.limitPower}</StyledTableCell>
                        <StyledTableCell align="right">{info.minPeopleCount} ~ {info.maxPeopleCount}</StyledTableCell>
                      </StyledTableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          );
        })
      }
    </React.Fragment>
  );
}