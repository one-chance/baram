import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import ClothState from "state/Calculator/Ability/ClothState";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  btnCloth: {
    width: "120px",
    height: "40px",
    margin: "5px 10px",
    padding: "0",
    textAlign: "center",
  },
});

export default function ClothStat() {
  const classes = useStyles();
  const [stat, setState] = useState(1);
  const [click, setClick] = useState({ s1: false, s2: false, s3: false, s4: false });
  const setClothState = useSetRecoilState(ClothState);

  useEffect(() => {
    const saveStat = () => {
      var temp: number[] = [stat, stat, stat, stat, stat, stat];
      setClothState(temp);
    };

    saveStat();
  }, [stat, setClothState]);

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        color='primary'
        className={classes.btnCloth}
        onClick={() => {
          if (!click.s1) {
            setState(1);
            setClick({ s1: true, s2: false, s3: false, s4: false });
          } else {
            setState(1);
            setClick({ s1: false, s2: false, s3: false, s4: false });
          }
        }}>
        노품의
      </Button>
      <Button
        variant='outlined'
        color={!click.s2 ? "primary" : "secondary"}
        className={classes.btnCloth}
        onClick={() => {
          if (!click.s2) {
            setState(1.025);
            setClick({ s1: false, s2: true, s3: false, s4: false });
          } else {
            setState(1);
            setClick({ s1: false, s2: false, s3: false, s4: false });
          }
        }}>
        2품의
      </Button>
      <Button
        variant='outlined'
        color={!click.s3 ? "primary" : "secondary"}
        className={classes.btnCloth}
        onClick={() => {
          if (!click.s3) {
            setState(1.05);
            setClick({ s1: false, s2: false, s3: true, s4: false });
          } else {
            setState(1);
            setClick({ s1: false, s2: false, s3: false, s4: false });
          }
        }}>
        1품의
      </Button>
      <Button
        variant='outlined'
        color={!click.s4 ? "primary" : "secondary"}
        className={classes.btnCloth}
        onClick={() => {
          if (!click.s4) {
            setState(1.075);
            setClick({ s1: false, s2: false, s3: false, s4: true });
          } else {
            setState(1);
            setClick({ s1: false, s2: false, s3: false, s4: false });
          }
        }}>
        명품의
      </Button>
    </React.Fragment>
  );
}
