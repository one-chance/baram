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
    width: "200px",
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
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "30px",
      textAlign: "center",
      color: "blue",
    },
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

  const [searchName1, setSearchName1] = useState(""); // 검색할 장비 이름 (이름용)
  const [option1, setOption1] = useState(0); // 검색할 장비 옵션1
  const [option2, setOption2] = useState(0); // 검색할 장비 옵션2
  const [option3, setOption3] = useState(0); // 검색할 장비 옵션3
  //const [nameList, setNameList] = useState<string[]>([""]);
  const [itemList, setItemList] = useState<Array<IItemInfo>>([]); // 검색된 아이템의 정보

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
      setSearchName1("");
    } else {
      setSearchName1(name);
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
    res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  // 리스트 통해서 검색
  const searchByList = async () => {
    if (option1 === 0 || option2 === 0 || option3 === 0) {
      alert("세부 옵션을 모두 선택해주세요.");
      return;
    }
    setSearchName1("");

    const res = await SearchItemByOption(option1, option2, option3);
    const temp = Array<IItemInfo>();
    res.forEach(r => temp.push(r));
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
      <Grid container spacing={3} style={{ margin: "10px", float: "left" }}>
        <Grid item xs={8} style={{ margin: "0 10px", padding: "10px" }}>
          <Container style={{ margin: "5px 0", padding: "0", float: "left" }}>
            <TextField
              className={classes.itemText}
              variant='outlined'
              placeholder='아이템명'
              value={searchName1 || ""}
              onChange={e => {
                inputName(e.target.value);
              }}
              style={{ margin: "5px 0" }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={e => {
                searchByName(searchName1);
              }}
              style={{ minWidth: "60px", height: "40px", margin: "5px 100px 5px -5px", borderBottomLeftRadius: "0", borderTopLeftRadius: "0" }}>
              검색
            </Button>
            <Select
              variant='outlined'
              className={classes.select}
              value={option1}
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={e => {
                setOption1(Number(e.target.value));
              }}>
              <Menus value={0}>종류</Menus>
              <Menus value={1}>용장비</Menus>
              <Menus value={2}>북방장비</Menus>
              <Menus value={3}>중국전설</Menus>
              <Menus value={4}>일본전설</Menus>
              <Menus value={5}>환웅장비</Menus>
              <Menus value={6}>백제/황산벌</Menus>
              <Menus value={7}>전우치/구미호</Menus>
              <Menus value={8}>타계장비</Menus>
              <Menus value={9}>흉수계/봉래산</Menus>
              <Menus value={10}>생산장비</Menus>
              <Menus value={11}>격전지/전장</Menus>
              <Menus value={12}>승급장비</Menus>
              <Menus value={13}>기타</Menus>
            </Select>

            <Select
              variant='outlined'
              className={classes.select}
              value={option2}
              MenuProps={{ disableScrollLock: true }}
              onChange={e => {
                setOption2(Number(e.target.value));
              }}>
              <Menus value={0}>부위</Menus>
              <Menus value={1}>목/어깨장식</Menus>
              <Menus value={2}>투구</Menus>
              <Menus value={3}>얼굴장식</Menus>
              <Menus value={4}>무기</Menus>
              <Menus value={5}>갑옷</Menus>
              <Menus value={6}>방패/보조무기</Menus>
              <Menus value={7}>손</Menus>
              <Menus value={8}>망토</Menus>
              <Menus value={9}>보조</Menus>
              <Menus value={10}>신발</Menus>
              <Menus value={11}>장신구</Menus>
              <Menus value={12}>분신</Menus>
            </Select>

            <Select
              variant='outlined'
              className={classes.select}
              value={option3}
              MenuProps={{ disableScrollLock: true }}
              onChange={e => {
                setOption3(Number(e.target.value));
              }}>
              <Menus value={0}>직업</Menus>
              <Menus value={1}>공용</Menus>
              <Menus value={2}>전사</Menus>
              <Menus value={3}>도적</Menus>
              <Menus value={4}>주술사</Menus>
              <Menus value={5}>도사</Menus>
              <Menus value={6}>궁사</Menus>
              <Menus value={7}>천인</Menus>
              <Menus value={8}>마도사</Menus>
              <Menus value={9}>영술사</Menus>
              <Menus value={10}>차사</Menus>
            </Select>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                searchByList();
              }}
              style={{ minWidth: "60px", height: "40px", margin: "5px" }}>
              검색
            </Button>
          </Container>
          <Container
            style={{
              minHeight: "82px",
              margin: "5px 0",
              padding: "5px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              textAlign: "center",
              float: "left",
            }}>
            {itemList.length === 0 ? (
              <span>
                <br />
                검색 결과가 없습니다.
              </span>
            ) : (
              itemName
            )}
          </Container>
          <Container style={{ width: "100%", margin: "0", padding: "10px", textAlign: "center", float: "left" }}>
            <img src={baseUrlForItemImg + img1} alt='아이템' style={{ margin: "10px" }} />
            <img src={baseUrlForItemImg + img2} alt='아이템' style={{ margin: "10px" }} />
            <img src={baseUrlForItemImg + img3} alt='아이템' style={{ margin: "10px" }} />
          </Container>
        </Grid>

        <Grid item xs={3} style={{ margin: "20px 10px", padding: "5px", textAlign: "center" }}>
          <img src={baseUrlForItemImg + selectedImg} alt='아이템' />
          <Container style={{ width: "100%", padding: "0" }}>
            <ButtonGroup color='primary'>
              <Button
                variant='outlined'
                color={img1 === "empty.png" ? "primary" : "secondary"}
                onClick={() => {
                  saveImage(selectedImg, 1);
                }}>
                슬롯 1
              </Button>
              <Button
                variant='outlined'
                color={img2 === "empty.png" ? "primary" : "secondary"}
                onClick={() => {
                  saveImage(selectedImg, 2);
                }}>
                슬롯 2
              </Button>
              <Button
                variant='outlined'
                color={img3 === "empty.png" ? "primary" : "secondary"}
                onClick={() => {
                  saveImage(selectedImg, 3);
                }}>
                슬롯 3
              </Button>
            </ButtonGroup>
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
