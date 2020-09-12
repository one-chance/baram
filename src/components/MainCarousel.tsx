import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Carousel from "react-slick";
import { getBaseUrlForMainCarousel } from 'utils/ConfigUtil';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "5 0",
    width: "100%",
    height: "auto",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  gridContainer: {
    marginTop: "15px",
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto"
  },
  cardCarousel: {
    border: "0",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    maxHeight: "300px",
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    transition: "all 300ms linear",
    overflow: "hidden"
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
  }
}));

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}>
        <ArrowForwardIosIcon/>
    </IconButton>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}>
        <ArrowBackIosIcon/>
    </IconButton>
  );
}

export default function MainCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    NextArrow: <NextArrow />,
    PrevArrow: <PrevArrow />
  };

  const baseUrlForMainCarousel = getBaseUrlForMainCarousel();

  //creating the ref
  const refCarousel: React.RefObject<Carousel> = React.createRef();

  const images = [];
  images.push("bg1.jpg");
  images.push("bg2.jpg");
  images.push("bg3.jpg");

  return (
    <Container
      className={classes.container}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={1} className={classes.btnMove}>
          <IconButton
            onClick={() => refCarousel.current?.slickPrev()}>
              <ArrowBackIosIcon/>
          </IconButton>
        </Grid>
        <Grid item xs={10} className={classes.gridItem}>
            <Carousel ref={refCarousel}
              {...settings}>
              {
                images.map((image, i) => (
                  <Card className={classes.cardCarousel} key={image}>
                      <img src={baseUrlForMainCarousel + image} alt={"slide_" + i} className="slick-image" />
                  </Card>
                ))
              }
            </Carousel>
        </Grid>
        <Grid item xs={1} className={classes.btnMove}>
          <IconButton
            onClick={() => refCarousel.current?.slickNext()}>
              <ArrowForwardIosIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}