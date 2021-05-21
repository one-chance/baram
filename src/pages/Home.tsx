import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IPost from "interfaces/Board/IPost";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import HomeIcon from "@material-ui/icons/Home";

import MainCarousel from "components/MainCarousel";
import LatestBoardPaper from "components/Board/LatestBoardPaper";

import { getPosts } from "utils/PostUtil";
import { getVisitCount } from "utils/CommonUtil";

const useStyles = makeStyles(theme => ({
  secondSection: {
    margin: "10px 0",
    border: "1px solid lightgray",
    borderRadius: "10px",
  },
  boardItem: {
    maxWidth: "150px",
    height: "65px",
    margin: "10px 5px",
    padding: "0",
    "& p": {
      fontWeight: "bold",
      margin: "0",
    },
  },
  boardItemButton: {
    minWidth: "60px",
    height: "40px",
  },
  boardItemText: {
    textAlign: "center",
    lineHeight: "20px",
    margin: "5px 0 0 0",
  },
}));

const VIEW_COUNT = 5;

const getFree = async () => {
  return await getPosts("free", `latestCount=${VIEW_COUNT}`);
};
const getTip = async () => {
  return await getPosts("tip", `latestCount=${VIEW_COUNT}`);
};

const Home = () => {
  const classes = useStyles();

  const [freePosts, setFreePosts] = useState<Array<IPost>>([]);
  const [tipPosts, setTipPosts] = useState<Array<IPost>>([]);
  const [todayVisit, setTodayVisit] = useState(0);
  const [totalVisit, setTotalVisit] = useState(0);

  useEffect(() => {
    getFree()
      .then(res => {
        setFreePosts(res);
      })
      .catch(e => {});

    getTip()
      .then(res => {
        setTipPosts(res);
      })
      .catch(e => {});

    getVisitCount().then(res => {
      if (res) {
        setTodayVisit(res.today);
        setTotalVisit(res.total);
      }
    });
  }, []);

  return (
    <Grid container justify='center' style={{ margin: "10px 0" }}>
      <Grid item xs={12}>
        <MainCarousel />
      </Grid>
      <Grid item container alignItems='flex-end' justify='space-around' xs={10} className={classes.secondSection}>
        <Grid item style={{ width: "320px", margin: "0", padding: "0" }}>
          <LatestBoardPaper category='free' posts={freePosts} />
        </Grid>
        <Grid item style={{ width: "320px", margin: "0", padding: "0" }}>
          <LatestBoardPaper category='tip' posts={tipPosts} />
        </Grid>
        <Grid item container justify='space-around' style={{ width: "320px", height: "168px", margin: "5px 10px", padding: "0" }}>
          <Grid item className={classes.boardItem}>
            <Button variant='outlined' className={classes.boardItemButton}>
              <PriorityHighIcon />
            </Button>
            <h5 className={classes.boardItemText}>공 지</h5>
          </Grid>
          <Grid item className={classes.boardItem}>
            <Button variant='outlined' className={classes.boardItemButton}>
              <MailOutlineIcon />
            </Button>
            <h5 className={classes.boardItemText}>문 의</h5>
          </Grid>
          <Grid item className={classes.boardItem}>
            <Button variant='outlined' className={classes.boardItemButton}>
              <QuestionAnswerIcon />
            </Button>
            <h5 className={classes.boardItemText}>FAQ</h5>
          </Grid>
          <Grid item className={classes.boardItem}>
            <Button variant='outlined' href='http://www.baram.nexon.com' target='_blank' className={classes.boardItemButton}>
              <HomeIcon />
            </Button>
            <h5 className={classes.boardItemText}>공식</h5>
          </Grid>
          <Grid item container direction='column' alignItems='center' className={classes.boardItem}>
            <Typography style={{ color: "red" }}>TODAY : {todayVisit}</Typography>
            <Typography>TOTAL : {totalVisit}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
