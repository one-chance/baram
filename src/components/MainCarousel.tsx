import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Carousel from "react-slick";
import { getBaseUrlForMainCarousel } from "utils/ConfigUtil";

const useStyles = makeStyles({
  gridContainer: {
    width: "auto",
    marginBottom: "25px",
  },
  cardCarousel: {
    border: "0",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "515px",
    maxHeight: "300px",
    boxShadow: "none",
    transition: "all 300ms linear",
    margin: "0 5px",
    float: "left",
    "& img": {
      borderRadius: "5px",
      maxWidth: "100%",
      margin: "0 auto",
      height: "300px",
    },
  },
  cardCarousel2: {
    border: "0",
    borderRadius: "5px",
    width: "100%",
    maxHeight: "300px",
    boxShadow: "none",
    transition: "all 300ms linear",
    margin: "0",
    "& img": {
      borderRadius: "5px",
      width: "100%",
      maxWidth: "515px",
      height: "auto",
      maxHeight: "300px",
      margin: "0 auto",
    },
  },
  gridItem: {
    position: "relative",
    width: "100%",
    flexBasis: "auto",
    textAlign: "center",
  },
});

export default function MainCarousel() {
  const classes = useStyles();
  const theme = useTheme();
  const middleScreen = useMediaQuery(theme.breakpoints.down("md"));

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //creating the ref
  const refCarousel: React.RefObject<Carousel> = React.createRef();
  const baseUrlForMainCarousel = getBaseUrlForMainCarousel();
  const images = ["bg1.png", "bg2.png", "bg3.png", "bg4.png", "bg5.png", "bg6.png"];
  const hrefs = ["/dic/item", "/cal/ability", "/dic/adventure", "/dic/archeology", "/cal/exp", "/cal/power"];
  const hrefs2 = ["/dic/itemM", "/cal/abilityM", "/dic/adventure", "/dic/archeology", "/cal/exp", "/cal/power"];

  const cards = () => {
    let temp: JSX.Element[] = [];

    for (let i = 0; i < 5; i += 2) {
      temp[i] = (
        <React.Fragment key={i}>
          <Card className={classes.cardCarousel}>
            <a href={`${hrefs[i]}`}>
              <img src={baseUrlForMainCarousel + images[i]} alt={"slide_" + i + "-1"} className='slick-image' />
            </a>
          </Card>
          <Card className={classes.cardCarousel}>
            <a href={`${hrefs[i + 1]}`}>
              <img src={baseUrlForMainCarousel + images[i + 1]} alt={"slide_" + (i + 1)} className='slick-image' />
            </a>
          </Card>
        </React.Fragment>
      );
    }

    return temp;
  };

  const cards2 = () => {
    let temp: JSX.Element[] = [];

    for (let i = 0; i < 6; i++) {
      temp[i] = (
        <Card className={classes.cardCarousel2} key={i}>
          <a href={`${hrefs2[i]}`}>
            <img src={baseUrlForMainCarousel + images[i]} alt={"slide_" + i} className='slick-image' />
          </a>
        </Card>
      );
    }

    return temp;
  };

  return (
    <React.Fragment>
      <Grid container className={classes.gridContainer}>
        <Grid item container justify='center' alignItems='center' xs={1}>
          <IconButton onClick={() => refCarousel.current?.slickPrev()} aria-label='left-arrow' style={{ padding: "10px" }}>
            <ArrowBackIosIcon viewBox='-4 0 24 24' />
          </IconButton>
        </Grid>
        <Grid item xs={10} className={classes.gridItem}>
          <Carousel ref={refCarousel} {...settings}>
            {middleScreen ? cards2() : cards()}
          </Carousel>
        </Grid>
        <Grid item container justify='center' alignItems='center' xs={1}>
          <IconButton onClick={() => refCarousel.current?.slickNext()} aria-label='right-arrow' style={{ padding: "10px" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
