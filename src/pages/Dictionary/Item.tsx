import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";

import { SearchItemByName, SearchItemByOption } from "../../utils/CalUtil";
import { getBaseUrlForItemImg } from "utils/ConfigUtil";
import IItemInfo from "interfaces/Calculator/IItemInfo";

const useStyles = makeStyles(theme => ({
  itemChip: {
    height: "30px",
    margin: "2.5px",
  },

  itemText: {
    width: "12.5vw",
    minWidth: "150px",
    maxWidth: "200px",
    margin: "5px 2.5px",
    float: "left",
    "& input": {
      height: "36px",
      padding: "2px 10px",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid",
    },
  },

  select: {
    width: "120px",
    height: "40px",
    padding: "1px",
    margin: "5px",
    color: "blue",
    textAlignLast: "center",
    fontSize: "0.8rem",
    float: "left",
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "30px",
      textAlign: "center",
      color: "blue",
    },
  },

  btn: {
    minWidth: "60px",
    maxWidth: "60px",
    height: "40px",
    margin: "5px 2.5px",
    padding: "0",
    boxShadow: "none",
    float: "left",
  },
}));

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Item() {
  const classes = useStyles();
  const baseUrlForItemImg = getBaseUrlForItemImg();

  const [searchName, setSearchName] = useState(""); // 검색할 장비 이름 (이름용)
  const [option1, setOption1] = useState(0); // 검색할 장비 옵션1
  const [option2, setOption2] = useState(0); // 검색할 장비 옵션2
  const [option3, setOption3] = useState(0); // 검색할 장비 옵션3
  const [itemList, setItemList] = useState<Array<IItemInfo>>([]); // 검색된 아이템의 정보

  var menuList = [
    // prettier-ignore
    ["종류", "용장비", "북방장비", "중국전설", "일본전설", "환웅장비", "백제/황산벌", "전우치/구미호", "타계장비", "흉수계/봉래산", "생산장비", "격전지/전장", "승급장비", "합성노리개", "귀문장비", "기타장비"],
    ["부위", "목/어깨장식", "투구", "얼굴장식", "무기", "갑옷", "방패/보조무기", "손", "망토", "보조", "신발", "세트", "장신구"],
    ["직업", "공용", "전사", "도적", "주술사", "도사", "궁사", "천인", "마도사", "영술사", "차사"],
  ];

  const [selectedImg, setSelectedImg] = useState("empty.png"); // 선택된 이미지 이름
  const [img1, setImg1] = useState("empty.png");
  const [img2, setImg2] = useState("empty.png");
  const [img3, setImg3] = useState("empty.png");

  const itemName = itemList.map(item => (
    <Chip
      className={classes.itemChip}
      label={item.name}
      key={item.name}
      variant='outlined'
      onClick={() => {
        setSelectedImg(`${item.idx}.png`);
      }}
    />
  ));

  const inputName = (name: string) => {
    if (name === "") {
      setSearchName("");
    } else {
      setSearchName(name);
    }
  };

  // 이름 직접 검색
  const searchByName = async (name: string) => {
    setOption1(0);
    setOption2(0);
    setOption3(0);

    if (name === "") {
      setItemList([]);
      setSelectedImg("empty.png");
      return;
    }

    const res = await SearchItemByName(name);
    const temp = Array<IItemInfo>();
    if (res !== null && res !== undefined) res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  // 리스트 통해서 검색
  const searchByList = async () => {
    if (option1 === 0 || option2 === 0 || option3 === 0) {
      alert("세부 옵션을 모두 선택해주세요.");
      return;
    }
    setSearchName("");

    const res = await SearchItemByOption(option1, option2, option3);
    const temp = Array<IItemInfo>();
    if (res !== null && res !== undefined) res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  const saveImage = (name: string, slot: number) => {
    switch (slot) {
      case 1:
        if (name === img1) {
          setImg1("empty.png");
          break;
        } else {
          setImg1(name);
          break;
        }

      case 2:
        if (name === img2) {
          setImg2("empty.png");
          break;
        } else {
          setImg2(name);
          break;
        }

      case 3:
        if (name === img3) {
          setImg3("empty.png");
          break;
        } else {
          setImg3(name);
          break;
        }
    }
  };

  return (
    <React.Fragment>
      <Grid container justify='center' style={{ margin: "10px 0", padding: "0" }}>
        <Grid
          item
          container
          alignItems='center'
          direction='column'
          style={{ minWidth: "203px", maxWidth: "220px", margin: "10px", padding: "0", textAlign: "center" }}>
          <img src={baseUrlForItemImg + selectedImg} alt='아이템' />
          <ButtonGroup color='primary' style={{ height: "40px", margin: "10px 0" }}>
            <Button
              variant='outlined'
              color={img1 === "empty.png" ? "primary" : "secondary"}
              style={{ width: "60px", padding: "0 10px" }}
              onClick={() => {
                saveImage(selectedImg, 1);
              }}>
              슬롯1
            </Button>
            <Button
              variant='outlined'
              color={img2 === "empty.png" ? "primary" : "secondary"}
              style={{ width: "60px", padding: "0 10px" }}
              onClick={() => {
                saveImage(selectedImg, 2);
              }}>
              슬롯2
            </Button>
            <Button
              variant='outlined'
              color={img3 === "empty.png" ? "primary" : "secondary"}
              style={{ width: "60px", padding: "0 10px" }}
              onClick={() => {
                saveImage(selectedImg, 3);
              }}>
              슬롯3
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item container xs={8} style={{ margin: "0 10px", padding: "0" }}>
          <Grid item container justify='space-between' style={{ margin: "5px 0", padding: "0", float: "left" }}>
            <div>
              <TextField
                className={classes.itemText}
                variant='outlined'
                placeholder='아이템명'
                value={searchName || ""}
                onChange={e => {
                  inputName(e.target.value);
                }}
              />
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={e => {
                  searchByName(searchName);
                }}>
                검색
              </Button>
            </div>
            <div>
              <Select
                variant='outlined'
                className={classes.select}
                value={option1}
                onChange={e => {
                  setOption1(Number(e.target.value));
                }}>
                {menuList[0].map((name: string, idx: number) => {
                  return (
                    <Menus value={idx} key={idx} disableGutters={true}>
                      {name}
                    </Menus>
                  );
                })}
              </Select>

              <Select
                variant='outlined'
                className={classes.select}
                value={option2}
                onChange={e => {
                  setOption2(Number(e.target.value));
                }}>
                {menuList[1].map((name: string, idx: number) => {
                  return (
                    <Menus value={idx} key={idx} disableGutters={true}>
                      {name}
                    </Menus>
                  );
                })}
              </Select>

              <Select
                variant='outlined'
                className={classes.select}
                value={option3}
                onChange={e => {
                  setOption3(Number(e.target.value));
                }}>
                {menuList[2].map((name: string, idx: number) => {
                  return (
                    <Menus value={idx} key={idx} disableGutters={true}>
                      {name}
                    </Menus>
                  );
                })}
              </Select>
              <Button
                className={classes.btn}
                variant='contained'
                color='primary'
                onClick={() => {
                  searchByList();
                }}>
                검색
              </Button>
            </div>
          </Grid>
          <Container
            style={{
              minHeight: "82px",
              margin: "5px 0",
              padding: "5px 10px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              textAlign: "center",
              float: "left",
            }}>
            {itemList.length === 0 ? (
              <span>
                <br />
                검색 결과가 없습니다.
                <br />※ 능력치가 같은 장비는 원조의 이름으로 검색해주세요. (손상, 불멸) ※
              </span>
            ) : (
              itemName
            )}
          </Container>
          <Container style={{ width: "100%", margin: "0", padding: "0", textAlign: "center", float: "left" }}>
            <img src={baseUrlForItemImg + img1} alt='아이템' style={{ margin: "10px" }} />
            <img src={baseUrlForItemImg + img2} alt='아이템' style={{ margin: "10px" }} />
            <img src={baseUrlForItemImg + img3} alt='아이템' style={{ margin: "10px" }} />
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
