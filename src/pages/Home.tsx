import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IPost from "interfaces/Board/IPost";
import Button from "@material-ui/core/Button";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

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

      <Grid container item spacing={1} className={classes.secondSection}>
        <Grid item xs={3}>
          <LatestBoardPaper category='free' posts={freePosts} />
        </Grid>
        <Grid item xs={3}>
          <LatestBoardPaper category='tip' posts={tipPosts} />
        </Grid>
        <Grid item xs={6}>
          <Button variant='outlined'>
            <PriorityHighIcon />
          </Button>
          <Button variant='outlined'>
            <MailOutlineIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
