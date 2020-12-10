import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForAdventureImg } from "utils/ConfigUtil";

import Container from "@material-ui/core/Container";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: "100px",
      height: "50px",
      padding: "1px",
      margin: "5px",
      textAlignLast: "center",
      float: "left",
      "& .MuiSelect-selectMenu": {
        padding: "2px 20px 2px 5px",
        lineHeight: "30px",
        textAlign: "center",
      },
    },

    table: {
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
  })
);

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function Adventure() {
  const classes = useStyles();
  const baseUrlForAdventureImg = getBaseUrlForAdventureImg();

  const [expanded, setExpanded] = React.useState<string | false>("panel0");
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <Container style={{ width: "90%", height: "100%", margin: "10px 5%", padding: "0", textAlign: "center", float: "left" }}>
        <Container style={{ width: "40%", height: "100%", padding: "0", float: "left" }}>
          <Accordion square expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
              <Typography>괴수(32) - 570점</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>괴수</TableCell>
                    <TableCell>점수</TableCell>
                    <TableCell>주요 등장위치</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope='row'>거대북살모사</TableCell>
                    <TableCell>1/2/3/4/5</TableCell>
                    <TableCell>녹명봉</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
              <Typography>물품(3) - 15점</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>물품</TableCell>
                    <TableCell>점수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>독사여왕의낫</TableCell>
                    <TableCell>10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
            <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
              <Typography>임무(11) - 60점</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>임무</TableCell>
                    <TableCell>점수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>돌돌이와 친해지기</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
            <AccordionSummary>
              <Typography>탐방(16) - 105점</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
        <img src={baseUrlForAdventureImg + "reward1.png"} alt='장비2' style={{ float: "left" }} />
      </Container>
    </React.Fragment>
  );
}
