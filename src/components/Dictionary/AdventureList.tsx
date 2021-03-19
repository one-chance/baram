import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForAdventureImg } from "utils/ConfigUtil";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

import { getAdventureList } from "utils/DictionaryUtil";
import { IAdventure, IMonster, IStuff, IMission, IPlace, IRewardImg } from "interfaces/Dictionary/IAdventure";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      margin: "10px",
    },
    table: {
      minWidth: 400,
      width: "100%",
    },
    searchContainer: {
      padding: theme.spacing(0.1),
    },
  })
);

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
      backgroundColor: "#004e66",
      color: theme.palette.common.white,
      padding: "10px",
      fontSize: 20,
      fontWeight: "bolder",
    },
    body: {
      fontSize: 18,
      //fontWeight: "bolder",
      padding: "10px",
    },
  })
)(TableCell);

export default function AdventureList() {
  const classes = useStyles();

  const adventureList = getAdventureList();
  const baseUrlForAdventureImg = getBaseUrlForAdventureImg();

  const [dlgMonster, setDlgMonster] = useState({
    isOpen: false,
    title: "",
    monsterList: new Array<IMonster>(),
  });

  const [dlgStuff, setDlgStuff] = useState({
    isOpen: false,
    title: "",
    stuffList: new Array<IStuff>(),
  });

  const [dlgMission, setDlgMission] = useState({
    isOpen: false,
    title: "",
    missionList: new Array<IMission>(),
  });

  const [dlgPlace, setDlgPlace] = useState({
    isOpen: false,
    title: "",
    placeList: new Array<IPlace>(),
  });

  const [dlgRewardImg, setDlgRewardImg] = useState({
    isOpen: false,
    title: "",
    rewardImgList: new Array<IRewardImg>(),
  });

  return (
    <React.Fragment>
      {adventureList.map((adventure: IAdventure) => (
        <Grid item key={adventure.idx} style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h2 style={{ width: "100%", margin: "0", textAlign: "center" }}>{adventure.name}</h2>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            {adventure.monsterList && (
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={() => {
                  setDlgMonster({
                    isOpen: true,
                    title: `${adventure.name}`,
                    monsterList: adventure.monsterList,
                  });
                }}>
                괴수
              </Button>
            )}
            {adventure.stuffList && (
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={() => {
                  setDlgStuff({
                    isOpen: true,
                    title: `${adventure.name}`,
                    stuffList: adventure.stuffList,
                  });
                }}>
                물품
              </Button>
            )}
            {adventure.missionList && (
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={() => {
                  setDlgMission({
                    isOpen: true,
                    title: `${adventure.name}`,
                    missionList: adventure.missionList,
                  });
                }}>
                임무
              </Button>
            )}
            {adventure.placeList && (
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={() => {
                  setDlgPlace({
                    isOpen: true,
                    title: `${adventure.name}`,
                    placeList: adventure.placeList,
                  });
                }}>
                탐방
              </Button>
            )}
            {adventure.rewardImgList && (
              <Button
                className={classes.btn}
                variant='outlined'
                color='primary'
                onClick={() => {
                  setDlgRewardImg({
                    isOpen: true,
                    title: `${adventure.name}`,
                    rewardImgList: adventure.rewardImgList,
                  });
                }}>
                보상
              </Button>
            )}
          </Container>
        </Grid>
      ))}

      {/* NOTE 이중 열 자리 맞추기 */}
      <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px" }}></Grid>

      {/* NOTE 괴수 다이얼로그 */}
      <Dialog
        open={dlgMonster.isOpen}
        onClose={() => {
          setDlgMonster({ ...dlgMonster, isOpen: false });
        }}
        maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgMonster.title}</span>
          <Button
            onClick={() => {
              setDlgMonster({ ...dlgMonster, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <Table className={classes.table} aria-label={`archeologyList-Table`}>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>괴수</StyledTableCell>
                <StyledTableCell align='center'>점수</StyledTableCell>
                <StyledTableCell align='center'>주요 등장위치</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgMonster.monsterList.map((monster: IMonster) => (
                <StyledTableRow key={monster.idx}>
                  <StyledTableCell align='center'>{monster.name}</StyledTableCell>
                  <StyledTableCell align='center'>{monster.score}</StyledTableCell>
                  <StyledTableCell align='center'>{monster.location}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* NOTE 물품 다이얼로그 */}
      <Dialog
        open={dlgStuff.isOpen}
        onClose={() => {
          setDlgStuff({ ...dlgStuff, isOpen: false });
        }}
        maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgStuff.title}</span>
          <Button
            onClick={() => {
              setDlgStuff({ ...dlgStuff, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <Table className={classes.table} aria-label={`archeologyList-Table`}>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>물품</StyledTableCell>
                <StyledTableCell align='center'>점수</StyledTableCell>
                <StyledTableCell align='center'>획득방법</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgStuff.stuffList.map((stuff: IStuff) => (
                <StyledTableRow key={stuff.idx}>
                  <StyledTableCell align='center'>{stuff.name}</StyledTableCell>
                  <StyledTableCell align='center'>{stuff.score}</StyledTableCell>
                  <StyledTableCell align='center'>{stuff.obtain}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* NOTE 임무 다이얼로그 */}
      <Dialog
        open={dlgMission.isOpen}
        onClose={() => {
          setDlgMission({ ...dlgMission, isOpen: false });
        }}
        maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgMission.title}</span>
          <Button
            onClick={() => {
              setDlgMission({ ...dlgMission, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <Table className={classes.table} aria-label={`archeologyList-Table`}>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>임무</StyledTableCell>
                <StyledTableCell align='center'>점수</StyledTableCell>
                <StyledTableCell align='center'>시작 NPC</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgMission.missionList.map((mission: IMission) => (
                <StyledTableRow key={mission.idx}>
                  <StyledTableCell align='center'>{mission.name}</StyledTableCell>
                  <StyledTableCell align='center'>{mission.score}</StyledTableCell>
                  <StyledTableCell align='center'>{mission.npc}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* NOTE 탐방 다이얼로그 */}
      <Dialog
        open={dlgPlace.isOpen}
        onClose={() => {
          setDlgPlace({ ...dlgPlace, isOpen: false });
        }}
        maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgPlace.title}</span>
          <Button
            onClick={() => {
              setDlgPlace({ ...dlgPlace, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <Table className={classes.table} aria-label={`archeologyList-Table`}>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>탐방</StyledTableCell>
                <StyledTableCell align='center'>점수</StyledTableCell>
                <StyledTableCell align='center'>상세위치</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgPlace.placeList.map((place: IPlace) => (
                <StyledTableRow key={place.idx}>
                  <StyledTableCell align='center'>{place.name}</StyledTableCell>
                  <StyledTableCell align='center'>{place.score}</StyledTableCell>
                  <StyledTableCell align='center'>{place.location}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* NOTE 보상 다이얼로그 */}
      <Dialog
        open={dlgRewardImg.isOpen}
        onClose={() => {
          setDlgRewardImg({ ...dlgRewardImg, isOpen: false });
        }}
        maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{dlgRewardImg.title}</span>
          <Button
            onClick={() => {
              setDlgRewardImg({ ...dlgRewardImg, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          {dlgRewardImg.rewardImgList.map((rewardImg: IRewardImg) => (
            <img src={baseUrlForAdventureImg + rewardImg.img} key={rewardImg.idx} alt='보상' />
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
