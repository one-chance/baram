import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForAdventureImg } from "utils/ConfigUtil";

import Container from "@material-ui/core/Container";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

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
  const [open, setOpen] = useState<boolean>(false);
  const baseUrlForAdventureImg = getBaseUrlForAdventureImg();
  const [image, setImage] = useState<string>("");

  const [expanded, setExpanded] = useState<string | false>("panel");
  const openPanel = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const opening = (imageName: string) => {
    setImage(imageName);
    setOpen(true);
  };

  const closing = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Container style={{ width: "90%", height: "100%", margin: "10px 5%", padding: "0", textAlign: "center", float: "left" }}>
        <Container style={{ width: "60%", minWidth: "360px", padding: "0", float: "left" }}>
          <Accordion square expanded={expanded === "panel1"} onChange={openPanel("panel1")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
          <Accordion square expanded={expanded === "panel2"} onChange={openPanel("panel2")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>물품(3) - 15점</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>물품</TableCell>
                    <TableCell>점수</TableCell>
                    <TableCell>획득방법</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>독사여왕의낫</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>독사여왕(드랍)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>폭염익룡의꼬리</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>폭염익룡(드랍)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>환상의섬동동주</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>환상의섬주막</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === "panel3"} onChange={openPanel("panel3")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>임무(11) - 60점</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>임무</TableCell>
                    <TableCell>점수</TableCell>
                    <TableCell>시작 NPC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>돌돌이와 친해지기</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>돌돌이</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === "panel4"} onChange={openPanel("panel4")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>탐방(16) - 105점</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            square
            onClick={() => {
              opening("reward1.png");
            }}>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography>최종 보상 - 750점</Typography>
            </AccordionSummary>
          </Accordion>
        </Container>
      </Container>

      <Dialog open={open} onClose={closing} maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "5px" }}>최종 보상</DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <img src={baseUrlForAdventureImg + image} alt='최종 보상' />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
