import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import { getBaseUrlForAdventureImg } from "utils/ConfigUtil";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      margin: "10px",
    },
  })
);

export default function Adventure() {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const baseUrlForAdventureImg = getBaseUrlForAdventureImg();
  const [image, setImage] = useState<string>("monster1.png");
  const [title, setTitle] = useState<string>("괴수");

  const opening = (type: number) => {
    switch (type) {
      case 1:
        setTitle("괴수");
        break;
      case 2:
        setTitle("물품");
        break;
      case 3:
        setTitle("임무");
        break;
      case 4:
        setTitle("탐방");
        break;
      case 5:
        setTitle("최종보상");
    }

    setOpen(true);
  };

  const closing = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} style={{ width: "90%", margin: "10px 5%", justifyContent: "center", alignItems: "center" }}>
        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center", color: "blue" }}>탐험일지</h1>
        </Grid>

        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>환상의섬</h1>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("monster1.png");
                opening(1);
              }}>
              괴수
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("item1.png");
                opening(2);
              }}>
              물품
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("quest1.png");
                opening(3);
              }}>
              임무
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("place1.png");
                opening(4);
              }}>
              탐방
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("reward1.png");
                opening(5);
              }}>
              보상
            </Button>
          </Container>
        </Grid>

        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>백두촌</h1>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("monster2.png");
                opening(1);
              }}>
              괴수
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("item2.png");
                opening(2);
              }}>
              물품
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("quest2.png");
                opening(3);
              }}>
              임무
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("place2.png");
                opening(4);
              }}>
              탐방
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("reward2.png");
                opening(5);
              }}>
              보상
            </Button>
          </Container>
        </Grid>

        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>용궁</h1>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("monster2.png");
                opening(1);
              }}>
              괴수
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("item2.png");
                opening(2);
              }}>
              물품
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("quest2.png");
                opening(3);
              }}>
              임무
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("place2.png");
                opening(4);
              }}>
              탐방
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("reward2.png");
                opening(5);
              }}>
              보상
            </Button>
          </Container>
        </Grid>

        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>백제</h1>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("monster4.png");
                opening(1);
              }}>
              괴수
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("item4.png");
                opening(2);
              }}>
              물품
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("quest4.png");
                opening(3);
              }}>
              임무
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("place4.png");
                opening(4);
              }}>
              탐방
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("reward4.png");
                opening(5);
              }}>
              보상
            </Button>
          </Container>
        </Grid>

        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>지옥</h1>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("monster5.png");
                opening(1);
              }}>
              괴수
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("item5.png");
                opening(2);
              }}>
              물품
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("quest5.png");
                opening(3);
              }}>
              임무
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("place5.png");
                opening(4);
              }}>
              탐방
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("reward5.png");
                opening(5);
              }}>
              보상
            </Button>
          </Container>
        </Grid>

        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>금천군</h1>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("monster6.png");
                opening(1);
              }}>
              괴수
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("item6.png");
                opening(2);
              }}>
              물품
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("quest6.png");
                opening(3);
              }}>
              임무
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("place6.png");
                opening(4);
              }}>
              탐방
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("reward6.png");
                opening(5);
              }}>
              보상
            </Button>
          </Container>
        </Grid>

        <Grid item style={{ width: "45%", margin: "10px 2%", padding: "10px", border: "1px solid gray", borderRadius: "10px" }}>
          <h1 style={{ width: "100%", margin: "0", textAlign: "center" }}>흉수계</h1>
          <Container style={{ width: "100%", padding: "0", textAlign: "center" }}>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("monster7.png");
                opening(1);
              }}>
              괴수
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("item7.png");
                opening(2);
              }}>
              물품
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("quest7.png");
                opening(3);
              }}>
              임무
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("place7.png");
                opening(4);
              }}>
              탐방
            </Button>
            <Button
              className={classes.btn}
              variant='outlined'
              color='primary'
              onClick={() => {
                setImage("reward7.png");
                opening(5);
              }}>
              보상
            </Button>
          </Container>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={closing} maxWidth='lg'>
        <DialogTitle style={{ textAlign: "center", padding: "10px" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>{title}</h1>
          <Button
            onClick={() => {
              closing();
            }}
            style={{ minWidth: 20, fontSize: "1.25rem", padding: "0", position: "absolute", top: 5, right: 10 }}>
            &#10006;
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }}>
          <img src={baseUrlForAdventureImg + image} alt='사진' />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
