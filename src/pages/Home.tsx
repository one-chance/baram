import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IPost from "interfaces/Board/IPost";
import Button from "@material-ui/core/Button";
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
    minHeight: "160px",
    margin: "20px 0 10px 0",
    border: "1px solid lightgray",
    borderRadius: "10px",
    backgroundColor: "white",
  },
  boardItem: {
    margin: "10px",
    padding: "0",
    fontWeight: "bold",
  },
  boardItemButton: {
    minWidth: "60px",
  },
  boardItemText: {
    textAlign: "center",
    margin: "5px 0",
  },
  boardVisitCountWrapper: {
    width: "100%",
    height: "40%",
    fontWeight: "bold",
    padding: "8px 16px",
    float: "left",
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

  const [freePosts, setFreePosts] = React.useState<Array<IPost>>([]);
  const [tipPosts, setTipPosts] = React.useState<Array<IPost>>([]);
  const [todayVisit, setTodayVisit] = React.useState(0);
  const [totalVisit, setTotalVisit] = React.useState(0);

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
      <Grid item container justify='space-between' xs={10} className={classes.secondSection}>
        <Grid item style={{ width: "320px", margin: "0 auto" }}>
          <LatestBoardPaper category='free' posts={freePosts} />
        </Grid>
        <Grid item style={{ width: "320px", margin: "0 auto" }}>
          <LatestBoardPaper category='tip' posts={tipPosts} />
        </Grid>
        <Grid item container justify='center' style={{ width: "320px", margin: "0 auto" }}>
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
          <Grid item className={classes.boardItem}>
            <span style={{ color: "red" }}>TODAY : {todayVisit}</span>
            <br />
            TOTAL : {totalVisit}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
