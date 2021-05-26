import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import LatestBoardPaper from "components/Board/LatestBoardPaper";

import IPost from "interfaces/Board/IPost";
import { getPosts } from "utils/PostUtil";
import { getVisitCount } from "utils/CommonUtil";

const useStyles = makeStyles(theme => ({
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
  const [opener, setOpener] = useState(false);

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
    <>
      <Grid item style={{ width: "320px", margin: "0", padding: "0" }}>
        <LatestBoardPaper category='free' posts={freePosts} />
      </Grid>
      <Grid item style={{ width: "320px", margin: "0", padding: "0" }}>
        <LatestBoardPaper category='tip' posts={tipPosts} />
      </Grid>
      <Grid item container justify='space-around' style={{ width: "320px", height: "168px", padding: "0" }}>
        <Grid item className={classes.boardItem}>
          <Button
            variant='outlined'
            className={classes.boardItemButton}
            onClick={() => {
              setOpener(true);
            }}>
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

      <Dialog
        open={opener}
        onClose={() => {
          setOpener(false);
        }}
        maxWidth='lg'>
        <DialogTitle style={{ padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", justifyContent: "center", display: "flex" }}>공지 사항</span>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <h4>도톨 v.1.2.0 업데이트</h4>
          <h4>- 모바일 환경 UI 개선</h4>
          <h4>====================================================================</h4>
          <h4>추가 예정 : 장비마법</h4>
          <h4>추가할수도 : 치장 룩북, 장비 재료, 한벌효과, bj 및 스트리머</h4>
        </DialogContent>
        <Divider />
        <DialogActions style={{ padding: "0" }} disableSpacing={true}>
          <Button
            onClick={() => {
              setOpener(false);
            }}
            color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
