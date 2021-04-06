import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getBaseUrlForPetItemImg } from "utils/ConfigUtil";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Accuracy from "components/Dictionary/Accuracy";

const useStyles = makeStyles({
  btnGroup: {
    margin: "5px 0 20px 0",
    padding: "1px",
    "& Button": {
      width: "75px",
      height: "40px",
      padding: "0",
    },
  },
  btnGroup2: {
    margin: "5px auto",
    padding: "0",
    "& Button": {
      width: "45px",
      height: "40px",
      padding: "0",
    },
  },
  img: {
    width: "96vw",
    objectFit: "contain",
  },
});

interface IPetItem {
  src: string;
  check: boolean;
}

export default function PetItem() {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const baseUrlForPetItemImg = getBaseUrlForPetItemImg();

  const [img1, setImg1] = useState<IPetItem>({ src: "empty.png", check: false });
  const [img2, setImg2] = useState<IPetItem>({ src: "empty.png", check: false });

  const handleImage = (idx: number, num: number, info: IPetItem) => {
    let srcs = ["empty.png", "centerGod.png", "eastGod.png", "southGod.png", "westGod.png", "northGod.png", "others.png", "required.png"];

    if (idx === 1) {
      if (info.src === srcs[num]) {
        setImg1({ src: srcs[0], check: false });
        return;
      }
      setImg1({ src: srcs[num], check: true });
    } else if (idx === 2) {
      if (info.src === srcs[num]) {
        setImg2({ src: srcs[0], check: false });
        return;
      }
      setImg2({ src: srcs[num], check: true });
    }
  };

  return (
    <Grid container alignItems='center' justify='center' style={{ width: "100%", margin: "10px 0", padding: "0" }}>
      <Grid container spacing={3} style={{ width: "950px", margin: "10px 0", border: "1px solid" }}>
        <Accuracy />
      </Grid>

      <Grid container spacing={3} alignItems='center' justify='space-between' style={{ margin: "10px 0", padding: "0 5px" }}>
        <Grid item container justify={smallScreen ? "center" : "flex-start"} style={{ maxWidth: "508px", margin: "0 10px", padding: "0" }}>
          <ButtonGroup color='default' className={smallScreen ? classes.btnGroup2 : classes.btnGroup}>
            <Button color={img1.src === "centerGod.png" ? "secondary" : "primary"} onClick={() => handleImage(1, 1, img1)}>
              황룡
            </Button>
            <Button color={img1.src === "eastGod.png" ? "secondary" : "primary"} onClick={() => handleImage(1, 2, img1)}>
              청룡
            </Button>
            <Button color={img1.src === "southGod.png" ? "secondary" : "primary"} onClick={() => handleImage(1, 3, img1)}>
              주작
            </Button>
            <Button color={img1.src === "westGod.png" ? "secondary" : "primary"} onClick={() => handleImage(1, 4, img1)}>
              백호
            </Button>
            <Button color={img1.src === "northGod.png" ? "secondary" : "primary"} onClick={() => handleImage(1, 5, img1)}>
              현무
            </Button>
            <Button color={img1.src === "others.png" ? "secondary" : "primary"} onClick={() => handleImage(1, 6, img1)}>
              기타
            </Button>
            <Button color={img1.src === "required.png" ? "secondary" : "primary"} onClick={() => handleImage(1, 7, img1)}>
              재료
            </Button>
          </ButtonGroup>
          <img src={baseUrlForPetItemImg + img1.src} alt='장비1' className={smallScreen ? classes.img : ""} />
        </Grid>
        <Grid item container justify={smallScreen ? "center" : "flex-start"} style={{ width: "508px", margin: "0 10px", padding: "0" }}>
          <ButtonGroup color='default' className={smallScreen ? classes.btnGroup2 : classes.btnGroup}>
            <Button color={img2.src === "centerGod.png" ? "secondary" : "primary"} onClick={() => handleImage(2, 1, img2)}>
              황룡
            </Button>
            <Button color={img2.src === "eastGod.png" ? "secondary" : "primary"} onClick={() => handleImage(2, 2, img2)}>
              청룡
            </Button>
            <Button color={img2.src === "southGod.png" ? "secondary" : "primary"} onClick={() => handleImage(2, 3, img2)}>
              주작
            </Button>
            <Button color={img2.src === "westGod.png" ? "secondary" : "primary"} onClick={() => handleImage(2, 4, img2)}>
              백호
            </Button>
            <Button color={img2.src === "northGod.png" ? "secondary" : "primary"} onClick={() => handleImage(2, 5, img2)}>
              현무
            </Button>
            <Button color={img2.src === "others.png" ? "secondary" : "primary"} onClick={() => handleImage(2, 6, img2)}>
              기타
            </Button>
            <Button color={img2.src === "required.png" ? "secondary" : "primary"} onClick={() => handleImage(2, 7, img2)}>
              재료
            </Button>
          </ButtonGroup>
          <img src={baseUrlForPetItemImg + img2.src} alt='장비2' className={smallScreen ? classes.img : ""} />
        </Grid>
      </Grid>
    </Grid>
  );
}
