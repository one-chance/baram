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

const useStyles = makeStyles(theme => ({
  secondSection: {
    width: "80%",
    margin: "20px 10%",
    border: "1px solid lightgray",
    borderRadius: "10px",
    float: "left",
    backgroundColor: "white",
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
  }, []);

  return (
    <Grid>
      <Grid item xs={12} style={{ float: "left" }}>
        <MainCarousel />
      </Grid>

      <Grid container item spacing={3} className={classes.secondSection}>
        <Grid item xs={4} style={{ padding: "5px" }}>
          <LatestBoardPaper category='free' posts={freePosts} />
        </Grid>
        <Grid item xs={4} style={{ padding: "5px" }}>
          <LatestBoardPaper category='tip' posts={tipPosts} />
        </Grid>
        <Grid item xs={4} style={{ padding: "5px 10px" }}>
          <div style={{ width: "100%", height: "55%", float: "left" }}>
            <div style={{ margin: "8px", float: "left" }}>
              <Button variant='outlined' style={{ minWidth: "60px" }}>
                <PriorityHighIcon />
              </Button>
              <h5 style={{ textAlign: "center", margin: "5px 0" }}>공 지</h5>
            </div>
            <div style={{ margin: "8px", float: "left" }}>
              <Button variant='outlined' style={{ minWidth: "60px" }}>
                <MailOutlineIcon />
              </Button>
              <h5 style={{ textAlign: "center", margin: "5px 0" }}>문 의</h5>
            </div>
            <div style={{ margin: "8px", float: "left" }}>
              <Button variant='outlined' style={{ minWidth: "60px" }}>
                <QuestionAnswerIcon />
              </Button>
              <h5 style={{ textAlign: "center", margin: "5px 0" }}>FAQ</h5>
            </div>
            <div style={{ margin: "8px", float: "left" }}>
              <Button variant='outlined' href='http://www.baram.nexon.com' style={{ minWidth: "60px" }}>
                <HomeIcon />
              </Button>
              <h5 style={{ textAlign: "center", margin: "5px 0" }}>공식</h5>
            </div>
          </div>
          <div style={{ width: "100%", height: "45%", padding: "8px 16px", float: "left" }}>
            Today : 123
            <br />
            Total : 1234
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
