import React from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import RaidListItem from 'components/ListItem/RaidListItem';
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
    minWidth: 700,
  },
  searchContainer: {
    padding: theme.spacing(0.1),
  },
  listContainer: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  sectionContainer: {
    margin: "10px",
  },
  listItemContainer: {
    padding: "10px",
  }
}));

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

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#d7ccc8",
      },
      '&:hover': {
        backgroundColor: "#8d6e63",
      }
    },
  }),
)(TableRow);

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}


export default function Raid() {
  const classes = useStyles();
  
  const searchValue = useRecoilValue(SearchValueState);
  
  const allRaids: Array<IRaids> = getDicAllRaidList();
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  return (
    <React.Fragment>
      <Grid container spacing={3}
        direction="column"
        justify="flex-start"
        alignItems="center"
        className={classes.root}>
          <Grid container
            className={classes.searchContainer}>
              <Grid item xs={9}>
              </Grid>
              <Grid item xs={3}>
                <MyInputSearch /> 
              </Grid> 
          </Grid>
          <Grid container
            className={classes.listContainer}>
              <Grid item xs={2}>
                
              </Grid>
              <Grid item xs={4}>
                레이드명 
              </Grid>
              <Grid item xs={2}>
                제한 전투력
              </Grid>
              <Grid item xs={2}>
                제한 인원
              </Grid>
              <Grid item xs={2}>

              </Grid>
          </Grid>
          <MyGridDivider/>
          {
            allRaids.map((raids) => {
              return (
                <Container
                  key={raids.section}
                  className={classes.sectionContainer}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        {raids.section}
                      </Typography>
                    </Grid>
                    <Grid container item xs={12}
                      className={classes.listItemContainer}>
                        {
                          raids.raidInfos.map((raid) => (
                            <RaidListItem
                              key={raid.key}
                              raid= {raid}
                              keyword={searchValue}/>
                          ))
                        }
                    </Grid>
                    <MyGridDivider/>
                </Container>
              );
            })
          }
      </Grid>
      {
        allRaids.map((raids) => {
          return (
            <TableContainer component={Paper} className={classes.listContainer}>
              <Table className={classes.table} aria-label={`${raids.section}-table`}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>{raids.section} 레이드명</StyledTableCell>
                    <StyledTableCell align="right">제한 전투력</StyledTableCell>
                    <StyledTableCell align="right">제한 인원</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    raids.raidInfos.map((info) => (
                      <StyledTableRow key={info.name}>
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>레이드명</StyledTableCell>
              <StyledTableCell align="right">제한 전투력</StyledTableCell>
              <StyledTableCell align="right">제한 인원</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}