import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForAdventureImg } from "utils/ConfigUtil";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

import { getAdventureList } from 'utils/DictionaryUtil';
import {IAdventure, IMonster, IArticle, IExploration, IMission, IRewardImg} from "interfaces/Dictionary/IAdventure";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      margin: "10px",
    },
    table: {
      minWidth: 400,
      width: '100%'
    },
    searchContainer: {
      padding: theme.spacing(0.1),
    },
    tableContainer: {
      marginTop: "20px",
      marginBottom: "20px",
    },
  })
);

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
  }),
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#a1887f",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

export default function AdventureList() {
  const classes = useStyles();

  const adventureList = getAdventureList();

  const baseUrlForAdventureImg = getBaseUrlForAdventureImg();

  const [dlgMonster, setDlgMonster] = useState({
    isOpen: false,
    title: '',
    monsterList: new Array<IMonster>()
  });

  const [dlgArticle, setDlgArticle] = useState({
    isOpen: false,
    title: '',
    articleList: new Array<IArticle>()
  });

  const [dlgMission, setDlgMission] = useState({
    isOpen: false,
    title: '',
    missionList: new Array<IMission>()
  });

  const [dlgExploration, setDlgExploration] = useState({
    isOpen: false,
    title: '',
    explorationList: new Array<IExploration>()
  });

  const [dlgRewardImg, setDlgRewardImg] = useState({
    isOpen: false,
    title: '',
    rewardImgList: new Array<IRewardImg>()
  });

  return (
    <React.Fragment>
      {
        adventureList.map((adventure: IAdventure) => (
          <Grid item key={adventure.idx}
            style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
              <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>{adventure.name}</h1>
              <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
                {
                  adventure.monsterList &&
                    <Button
                      className={classes.btn}
                      variant='outlined'
                      color='primary'
                      onClick={() => {
                        setDlgMonster({
                          isOpen: true,
                          title: `${adventure.name} - 괴수`, 
                          monsterList: adventure.monsterList
                        });
                      }}>
                        괴수
                    </Button>
                }
                {
                  adventure.articleList &&
                    <Button
                      className={classes.btn}
                      variant='outlined'
                      color='primary'
                      onClick={() => {
                        setDlgArticle({
                          isOpen: true,
                          title: `${adventure.name} - 물품`, 
                          articleList: adventure.articleList
                        });
                      }}>
                      물품
                    </Button>
                }
                {
                  adventure.missionList &&
                    <Button
                      className={classes.btn}
                      variant='outlined'
                      color='primary'
                      onClick={() => {
                        setDlgMission({
                          isOpen: true,
                          title: `${adventure.name} - 임무`, 
                          missionList: adventure.missionList
                        });
                      }}>
                      임무
                    </Button>
                }
                {
                  adventure.explorationList &&
                    <Button
                      className={classes.btn}
                      variant='outlined'
                      color='primary'
                      onClick={() => {
                        setDlgExploration({
                          isOpen: true,
                          title: `${adventure.name} - 탐방`, 
                          explorationList: adventure.explorationList
                        });
                      }}>
                      탐방
                    </Button>
                }
                {
                  adventure.rewardImgList &&
                    <Button
                      className={classes.btn}
                      variant='outlined'
                      color='primary'
                      onClick={() => {
                        setDlgRewardImg({
                          isOpen: true,
                          title: `${adventure.name} - 보상`, 
                          rewardImgList: adventure.rewardImgList
                        });
                      }}>
                      보상
                    </Button>
                }
              </Container>
          </Grid>
        ))
      }

      {/* NOTE 이중 열 자리 맞추기 */}
      <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px" }}></Grid>

      {/* NOTE 괴수 다이얼로그 */}
      <Dialog open={dlgMonster.isOpen} onClose={() => { setDlgMonster({...dlgMonster, isOpen: false})}} maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgMonster.title}</h1>
          <Button
            onClick={() => { setDlgMonster({...dlgMonster, isOpen: false})}}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label={`archeologyList-Table`}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">괴수</StyledTableCell>
                  <StyledTableCell align="center">점수</StyledTableCell>
                  <StyledTableCell align="center">주요 등장위치</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dlgMonster.monsterList.map((monster: IMonster) => (
                    <StyledTableRow key={monster.idx}>
                      <StyledTableCell align="center">{monster.name}</StyledTableCell>
                      <StyledTableCell align="center">{monster.score}</StyledTableCell>
                      <StyledTableCell align="center">{monster.location}</StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
          </Table>
        </TableContainer>
        </DialogContent>
      </Dialog>

      {/* NOTE 물품 다이얼로그 */}
      <Dialog open={dlgArticle.isOpen} onClose={() => { setDlgArticle({...dlgArticle, isOpen: false})}} maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgArticle.title}</h1>
          <Button
            onClick={() => { setDlgArticle({...dlgArticle, isOpen: false})}}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label={`archeologyList-Table`}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">물품</StyledTableCell>
                  <StyledTableCell align="center">점수</StyledTableCell>
                  <StyledTableCell align="center">획득방법</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dlgArticle.articleList.map((article: IArticle) => (
                    <StyledTableRow key={article.idx}>
                      <StyledTableCell align="center">{article.name}</StyledTableCell>
                      <StyledTableCell align="center">{article.score}</StyledTableCell>
                      <StyledTableCell align="center">{article.obtain}</StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
          </Table>
        </TableContainer>
        </DialogContent>
      </Dialog>

      {/* NOTE 임무 다이얼로그 */}
      <Dialog open={dlgMission.isOpen} onClose={() => { setDlgMission({...dlgMission, isOpen: false})}} maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgMission.title}</h1>
          <Button
            onClick={() => { setDlgMission({...dlgMission, isOpen: false})}}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label={`archeologyList-Table`}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">임무</StyledTableCell>
                  <StyledTableCell align="center">점수</StyledTableCell>
                  <StyledTableCell align="center">시작 NPC</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dlgMission.missionList.map((mission: IMission) => (
                    <StyledTableRow key={mission.idx}>
                      <StyledTableCell align="center">{mission.name}</StyledTableCell>
                      <StyledTableCell align="center">{mission.score}</StyledTableCell>
                      <StyledTableCell align="center">{mission.npc}</StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
          </Table>
        </TableContainer>
        </DialogContent>
      </Dialog>

      {/* NOTE 탐방 다이얼로그 */}
      <Dialog open={dlgExploration.isOpen} onClose={() => { setDlgExploration({...dlgExploration, isOpen: false})}} maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgExploration.title}</h1>
          <Button
            onClick={() => { setDlgExploration({...dlgExploration, isOpen: false})}}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label={`archeologyList-Table`}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">탐방</StyledTableCell>
                  <StyledTableCell align="center">점수</StyledTableCell>
                  <StyledTableCell align="center">상세위치</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dlgExploration.explorationList.map((exploration: IExploration) => (
                    <StyledTableRow key={exploration.idx}>
                      <StyledTableCell align="center">{exploration.name}</StyledTableCell>
                      <StyledTableCell align="center">{exploration.score}</StyledTableCell>
                      <StyledTableCell align="center">{exploration.location}</StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
          </Table>
        </TableContainer>
        </DialogContent>
      </Dialog>

      {/* NOTE 보상 다이얼로그 */}
      <Dialog open={dlgRewardImg.isOpen} onClose={() => { setDlgRewardImg({...dlgRewardImg, isOpen: false})}} maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgRewardImg.title}</h1>
          <Button
            onClick={() => { setDlgRewardImg({...dlgRewardImg, isOpen: false})}}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label={`archeologyList-Table`}>
              <TableBody>
                {
                  dlgRewardImg.rewardImgList.map((rewardImg: IRewardImg) => (
                    <StyledTableRow key={rewardImg.idx}>
                      <img src={baseUrlForAdventureImg + rewardImg.img} alt='사진' />
                    </StyledTableRow>
                  ))
                }
              </TableBody>
          </Table>
        </TableContainer>
        </DialogContent>
      </Dialog>

    </React.Fragment>
  );
}
