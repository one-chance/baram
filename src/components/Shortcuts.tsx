import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import HomeIcon from "@material-ui/icons/Home";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import LatestBoardPaper from "components/Board/LatestBoardPaper";
import IPost from "interfaces/Board/IPost";
import { getPosts } from "utils/PostUtil";
import { getVisitCount } from "utils/CommonUtil";

const useStyles = makeStyles({
  boardItem: {
    maxWidth: "150px",
    height: "64px",
    margin: "10px 4px",
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
    margin: "4px 0 0 0",
  },
  btnClose: {
    minWidth: 15,
    fontSize: "1.5rem",
    padding: "0",
    position: "absolute",
    top: 5,
    right: 10,
  },
  dlgContent: {
    minWidth: "40vw",
    minHeight: "30vh",
    padding: "10px",
    "& h2, h4": { margin: "12px 0" },
  },
});

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
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    minHeight: 50,
    padding: "0 15px",
    "&$expanded": {
      minHeight: 50,
    },
  },
  content: {
    margin: "0",
    "&$expanded": {
      padding: "0",
      margin: "0",
    },
    "& p": {
      lineHeight: "30px",
      fontSize: "1rem",
      fontWeight: "bold",
      margin: "10px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: "10px 20px",
  },
})(MuiAccordionDetails);

const VIEW_COUNT = 5;

const getFree = async () => {
  return await getPosts("free", `latestCount=${VIEW_COUNT}`);
};
const getTip = async () => {
  return await getPosts("tip", `latestCount=${VIEW_COUNT}`);
};

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [freePosts, setFreePosts] = useState<Array<IPost>>([]);
  const [tipPosts, setTipPosts] = useState<Array<IPost>>([]);
  const [todayVisit, setTodayVisit] = useState(0);
  const [totalVisit, setTotalVisit] = useState(0);
  const [opener, setOpener] = useState(false);
  const [opener2, setOpener2] = useState(false);

  const openDlg = () => {
    setOpener(!opener);
  };

  const openDlg2 = () => {
    setOpener2(!opener2);
  };

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
          <Button variant='outlined' className={classes.boardItemButton} onClick={openDlg} aria-label='Notice' disableRipple={true}>
            <PriorityHighIcon />
          </Button>
          <h5 className={classes.boardItemText}>공 지</h5>
        </Grid>
        <Grid item className={classes.boardItem}>
          <Button variant='outlined' className={classes.boardItemButton} aria-label='Ask' disableRipple={true}>
            <MailOutlineIcon />
          </Button>
          <h5 className={classes.boardItemText}>문 의</h5>
        </Grid>
        <Grid item className={classes.boardItem}>
          <Button variant='outlined' className={classes.boardItemButton} onClick={openDlg2} aria-label='FAQ' disableRipple={true}>
            <QuestionAnswerIcon />
          </Button>
          <h5 className={classes.boardItemText}>FAQ</h5>
        </Grid>
        <Grid item className={classes.boardItem}>
          <Button variant='outlined' href='http://www.baram.nexon.com' rel='noopener' target='_blank' className={classes.boardItemButton} aria-label='Site'>
            <HomeIcon />
          </Button>
          <h5 className={classes.boardItemText}>공식</h5>
        </Grid>
        <Grid item container direction='column' alignItems='center' className={classes.boardItem}>
          <Typography style={{ color: "red" }}>TODAY : {todayVisit}</Typography>
          <Typography>TOTAL : {totalVisit}</Typography>
        </Grid>
      </Grid>

      <Dialog open={opener} onClose={openDlg} maxWidth='lg' fullScreen={fullScreen}>
        <DialogTitle style={{ padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", justifyContent: "center", display: "flex" }}>공지 사항</span>
          <Button onClick={openDlg} className={classes.btnClose}>
            &#10006;
          </Button>
        </DialogTitle>
        <DialogContent dividers={true} className={classes.dlgContent}>
          <h2 style={{ margin: "10px 0" }}>도톨 - 바람의나라 커뮤니티</h2>
          <h4> 목적 : 기술 스택 좀 쌓을 겸, 유저에게 필요한 기능들 만들어봤음</h4>
          <h4> 장점 : 운영자가 바람 하는 중, 최신 정보만 취급함 (패치 반영)</h4>
          <h4> 단점 : 혼자 오만가지 처리해서 업뎃이 좀 느림</h4>
          <Divider style={{ height: "3px", backgroundColor: "drakgray" }} />
          <h2>v.1.4.0 업데이트</h2>
          <h4>코디 메뉴 추가 - 룩북, 태닝</h4>
          <h4>레벨 전투력 899까지로 확장</h4>
          <Divider style={{ height: "3px", backgroundColor: "drakgray" }} />
          <h2>추후 업데이트</h2>
          <h4>확정 : 장비마법</h4>
          <h4>미확정 : 치장 룩북, 장비 재료, 한벌효과, 동영상(bj/스트리머/유튜버)</h4>
          <h4>원하는 기능 건의 받음 (단, 데이터가 있고 흥미가 귀찮음보다 큰 경우)</h4>
        </DialogContent>
        <DialogActions style={{ padding: "0" }} disableSpacing={true}>
          <Button onClick={openDlg} color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={opener2} onClose={openDlg2} maxWidth='lg' fullScreen={fullScreen}>
        <DialogTitle style={{ padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", justifyContent: "center", display: "flex" }}>FAQ</span>
          <Button onClick={openDlg2} className={classes.btnClose}>
            &#10006;
          </Button>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "10px" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content'>
              <Typography>Q. 캐릭터 인증을 하면 호패 내용을 다시 바꿔도 되나요?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                네 바꿔도 됩니다.
                <br />
                도톨 아이디와 같은지 비교하는 단계에서만 사용하고, 그 외에는 필요하지 않습니다.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2-content'>
              <Typography>Q. 회원가입을 하면 뭐가 좋은가요?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                회원 레벨에 따라 이용할 수 있는 기능과 혜택이 달라집니다.
                <br />
                ex. 게시물 작성, 거래소 이용, 광고 삭제 (계속 추가 예정)
                <br />
                추가로 캐릭터와 오픈카톡을 인증하여 사기를 예방할 수 있습니다.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel3-content'>
              <Typography>Q. 회원가입시 인증한 이메일 정보를 수집하나요?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                개인정보처리방침에 따라 비밀번호 찾기를 제공하기 위해 수집하고,
                <br />
                다른 곳에 무단으로 활용하거나 제 3자에게 제공하지 않습니다.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel4-content'>
              <Typography>Q. 질문 4</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>답변 4</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel5-content'>
              <Typography>Q. 질문 5</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>답변 5</Typography>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions style={{ padding: "0" }} disableSpacing={true}>
          <Button onClick={openDlg2} color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
