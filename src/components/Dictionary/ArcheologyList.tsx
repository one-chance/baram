import React from "react";
import { makeStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import IArcheology from "interfaces/Dictionary/IArcheology";

import { getArcheologyList } from "utils/DictionaryUtil";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "10px",
  },
  table: {
    minWidth: 400,
    width: "100%",
  },
  searchContainer: {
    padding: theme.spacing(0.1),
  },
  tableContainer: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  shortImage: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#efebe9",
      // '&:nth-of-type(odd)': {
      //   backgroundColor: "#efebe9",
      // },
      // '&:hover': {
      //   backgroundColor: "#8d6e63",
      // }
    },
  })
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#e94e77",
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: "bolder",
    },
    body: {
      fontSize: 16,
    },
  })
)(TableCell);

function ArcheologyList() {
  const classes = useStyles();

  const archeologyList: Array<IArcheology> = getArcheologyList();

  return (
    <TableContainer component={Paper} elevation={0} className={classes.tableContainer}>
      <Table className={classes.table} aria-label={`archeologyList-Table`}>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>아이템명</StyledTableCell>
            <StyledTableCell align='center'>위치</StyledTableCell>
            <StyledTableCell align='center'>사용방법</StyledTableCell>
            <StyledTableCell align='center'>수량</StyledTableCell>
            <StyledTableCell align='center'>보상</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {archeologyList.map((archeology: IArcheology) => {
            const rewardCount = archeology.rewardList.length;

            if (rewardCount > 1) {
              return (
                <React.Fragment key={archeology.idx}>
                  <StyledTableRow>
                    <StyledTableCell align='center' rowSpan={rewardCount + 1}>
                      {archeology.itemName}
                    </StyledTableCell>
                    <StyledTableCell align='center' rowSpan={rewardCount + 1}>
                      {archeology.location}
                    </StyledTableCell>
                    <StyledTableCell align='center' rowSpan={rewardCount + 1}>
                      {archeology.use}
                    </StyledTableCell>
                  </StyledTableRow>
                  {archeology.rewardList.map((reward, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell align='center'>{reward.count}</StyledTableCell>
                      <StyledTableCell align='center'>{reward.name}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={archeology.idx}>
                  <StyledTableRow>
                    <StyledTableCell align='center'>{archeology.itemName}</StyledTableCell>
                    <StyledTableCell align='center'>{archeology.location}</StyledTableCell>
                    <StyledTableCell align='center'>{archeology.use}</StyledTableCell>
                    <StyledTableCell align='center'>{archeology.rewardList[0].count}</StyledTableCell>
                    <StyledTableCell align='center'>{archeology.rewardList[0].name}</StyledTableCell>
                  </StyledTableRow>
                </React.Fragment>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ArcheologyList;
