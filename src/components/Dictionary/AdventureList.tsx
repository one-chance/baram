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

import { getAdventureList } from "utils/DictionaryUtil";
import { IAdventure, IMonster, IStuff, IMission, IPlace, IRewardImg } from "interfaces/Dictionary/IAdventure";

const useStyles = makeStyles({
  btn: {
    minWidth: "60px",
    height: "40px",
    margin: "10px",
    padding: "0",
  },
  box: {
    width: "35vw",
    minWidth: "300px",
    margin: "10px 2vw",
    padding: "5px",
    border: "1px solid gray",
    borderRadius: "10px",
  },
});

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
      padding: "10px 5px",
      fontSize: "1rem",
      fontWeight: "bolder",
      textAlign: "center",
    },
    body: {
      fontSize: "1rem",
      padding: "10px 5px",
      textAlign: "center",
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
      <Grid container justify='center' style={{ padding: "0" }}>
        {adventureList.map((adventure: IAdventure) => (
          <Grid item className={classes.box} key={adventure.idx}>
            <h2 style={{ width: "100%", margin: "5px 0", textAlign: "center" }}>{adventure.name}</h2>
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
        <Grid item style={{ width: "35vw", margin: "10px 2vw", padding: "5px" }}></Grid>
      </Grid>

      {/* NOTE 괴수 다이얼로그 */}
      <Dialog
        open={dlgMonster.isOpen}
        onClose={() => {
          setDlgMonster({ ...dlgMonster, isOpen: false });
        }}
        maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>{dlgMonster.title}</span>
          <Button
            onClick={() => {
              setDlgMonster({ ...dlgMonster, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>괴수</StyledTableCell>
                <StyledTableCell>점수</StyledTableCell>
                <StyledTableCell>주요 등장위치</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgMonster.monsterList.map((monster: IMonster) => (
                <StyledTableRow key={monster.idx}>
                  <StyledTableCell>{monster.name}</StyledTableCell>
                  <StyledTableCell>{monster.score}</StyledTableCell>
                  <StyledTableCell>{monster.location}</StyledTableCell>
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
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>{dlgStuff.title}</span>
          <Button
            onClick={() => {
              setDlgStuff({ ...dlgStuff, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>물품</StyledTableCell>
                <StyledTableCell>점수</StyledTableCell>
                <StyledTableCell>획득방법</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgStuff.stuffList.map((stuff: IStuff) => (
                <StyledTableRow key={stuff.idx}>
                  <StyledTableCell>{stuff.name}</StyledTableCell>
                  <StyledTableCell>{stuff.score}</StyledTableCell>
                  <StyledTableCell>{stuff.obtain}</StyledTableCell>
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
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>{dlgMission.title}</span>
          <Button
            onClick={() => {
              setDlgMission({ ...dlgMission, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>임무</StyledTableCell>
                <StyledTableCell>점수</StyledTableCell>
                <StyledTableCell>시작 NPC</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgMission.missionList.map((mission: IMission) => (
                <StyledTableRow key={mission.idx}>
                  <StyledTableCell>{mission.name}</StyledTableCell>
                  <StyledTableCell>{mission.score}</StyledTableCell>
                  <StyledTableCell>{mission.npc}</StyledTableCell>
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
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>{dlgPlace.title}</span>
          <Button
            onClick={() => {
              setDlgPlace({ ...dlgPlace, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>탐방</StyledTableCell>
                <StyledTableCell>점수</StyledTableCell>
                <StyledTableCell>상세위치</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dlgPlace.placeList.map((place: IPlace) => (
                <StyledTableRow key={place.idx}>
                  <StyledTableCell>{place.name}</StyledTableCell>
                  <StyledTableCell>{place.score}</StyledTableCell>
                  <StyledTableCell>{place.location}</StyledTableCell>
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
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>{dlgRewardImg.title}</span>
          <Button
            onClick={() => {
              setDlgRewardImg({ ...dlgRewardImg, isOpen: false });
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <DialogContent dividers={true} style={{ padding: "5px" }}>
          {dlgRewardImg.rewardImgList.map((rewardImg: IRewardImg) => (
            <img src={baseUrlForAdventureImg + rewardImg.img} key={rewardImg.idx} alt='보상' />
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
