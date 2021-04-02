import React from "react";
import { makeStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

import IArcheology from "interfaces/Dictionary/IArcheology";

import { getArcheologyList } from "utils/DictionaryUtil";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    margin: "0",
    padding: "0",
  },
}));

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#efebe9",
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
      textAlign: "center",
      padding: "10px",
    },
    body: {
      fontSize: 16,
      textAlign: "center",
      padding: "10px",
    },
  })
)(TableCell);

function ArcheologyList() {
  const classes = useStyles();
  const archeologyList: Array<IArcheology> = getArcheologyList();

  return (
    <Grid container className={classes.tableContainer}>
      <Table aria-label={`archeologyList-Table`}>
        <TableHead>
          <TableRow>
            <StyledTableCell>아이템명</StyledTableCell>
            <StyledTableCell>위치</StyledTableCell>
            <StyledTableCell>사용방법</StyledTableCell>
            <StyledTableCell>수량</StyledTableCell>
            <StyledTableCell>보상</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {archeologyList.map((archeology: IArcheology) => {
            const rewardCount = archeology.rewardList.length;

            if (rewardCount > 1) {
              return (
                <React.Fragment key={archeology.idx}>
                  <StyledTableRow>
                    <StyledTableCell rowSpan={rewardCount + 1}>{archeology.itemName}</StyledTableCell>
                    <StyledTableCell rowSpan={rewardCount + 1}>{archeology.location}</StyledTableCell>
                    <StyledTableCell rowSpan={rewardCount + 1}>{archeology.use}</StyledTableCell>
                  </StyledTableRow>
                  {archeology.rewardList.map((reward, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell>{reward.count}</StyledTableCell>
                      <StyledTableCell>{reward.name}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={archeology.idx}>
                  <StyledTableRow>
                    <StyledTableCell>{archeology.itemName}</StyledTableCell>
                    <StyledTableCell>{archeology.location}</StyledTableCell>
                    <StyledTableCell>{archeology.use}</StyledTableCell>
                    <StyledTableCell>{archeology.rewardList[0].count}</StyledTableCell>
                    <StyledTableCell>{archeology.rewardList[0].name}</StyledTableCell>
                  </StyledTableRow>
                </React.Fragment>
              );
            }
          })}
        </TableBody>
      </Table>
    </Grid>
  );
}

export default ArcheologyList;
