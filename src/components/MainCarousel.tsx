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

const useStyles = makeStyles(theme => ({
  gridContainer: {
    width: "auto",
    marginBottom: "25px",
  },
  cardCarousel: {
    border: "0",
    borderRadius: "5px",
    maxWidth: "515px",
    maxHeight: "300px",
    boxShadow: "none",
    transition: "all 300ms linear",
    margin: "0 5px",
    float: "left",
    "& img": {
      maxWidth: "100%",
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
  },
  btnMove: {
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    verticalAlign: "middle",
  },
}));

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick}>
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick}>
      <ArrowBackIosIcon />
    </IconButton>
  );
}

export default function MainCarousel() {
  const classes = useStyles();
  const theme = useTheme();
  const middleScreen = useMediaQuery(theme.breakpoints.down("md"));

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    NextArrow: <NextArrow />,
    PrevArrow: <PrevArrow />,
  };

  //creating the ref
  const refCarousel: React.RefObject<Carousel> = React.createRef();
  const baseUrlForMainCarousel = getBaseUrlForMainCarousel();
  const images = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];
  const images2 = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg1.jpg", "bg2.jpg", "bg3.jpg"];
  const hrefs = ["/dic/item", "/cal/power", "/cal/ability"];
  const hrefs2 = ["/dic/item", "/cal/power", "/cal/ability", "/dic/item", "/cal/power", "/cal/ability"];

  const cards = () => {
    let temp: JSX.Element[] = images.map((image, i) => (
      <React.Fragment key={image}>
        <Card className={classes.cardCarousel}>
          <a href={`${hrefs[i]}`}>
            <img src={baseUrlForMainCarousel + image} alt={"slide_" + i + "-1"} className='slick-image' />
          </a>
        </Card>
        <Card className={classes.cardCarousel}>
          <a href={`${hrefs[2 - i]}`}>
            <img src={baseUrlForMainCarousel + image} alt={"slide_" + i + "-2"} className='slick-image' />
          </a>
        </Card>
      </React.Fragment>
    ));

    return temp;
  };

  const cards2 = () => {
    let temp: JSX.Element[] = images2.map((image, i) => (
      <Card className={classes.cardCarousel2} key={image}>
        <a href={`${hrefs2[i]}`}>
          <img src={baseUrlForMainCarousel + image} alt={"slide_" + i + "-1"} className='slick-image' />
        </a>
      </Card>
    ));

    return temp;
  };

  return (
    <React.Fragment>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={1} className={classes.btnMove}>
          <IconButton onClick={() => refCarousel.current?.slickPrev()}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10} className={classes.gridItem}>
          <Carousel ref={refCarousel} {...settings}>
            {middleScreen ? cards2() : cards()}
          </Carousel>
        </Grid>
        <Grid item xs={1} className={classes.btnMove}>
          <IconButton onClick={() => refCarousel.current?.slickNext()}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
