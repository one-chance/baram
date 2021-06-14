import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import SearchIcon from "@material-ui/icons/Search";

import { SearchItemByName, SearchItemByOption } from "../../utils/CalUtil";
import { getBaseUrlForItemImg } from "utils/ConfigUtil";
import IItemInfo from "interfaces/Calculator/IItemInfo";

const useStyles = makeStyles({
  itemChip: {
    height: "30px",
    margin: "2.5px",
  },
  itemText: {
    width: "180px",
    margin: "5px 2.5px",
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
    width: "100px",
    height: "40px",
    padding: "0",
    margin: "5px 2.5px",
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
  btn: {
    minWidth: "40px",
    height: "40px",
    margin: "5px 2.5px",
    padding: "0",
    boxShadow: "none",
  },
});

const Menus = withStyles({
  root: {
    minHeight: "40px",
    fontSize: "0.875rem",
    justifyContent: "center",
  },
})(MenuItem);

export default function Item() {
  const classes = useStyles();
  const baseUrlForItemImg = getBaseUrlForItemImg();

  const [searchName, setSearchName] = useState(""); // 검색할 장비 이름 (이름용)
  const [options, setOptions] = useState({ op1: 0, op2: 0, op3: 0 }); // 검색할 장비 옵션 1~3
  const [itemList, setItemList] = useState<Array<IItemInfo>>([]); // 검색된 아이템의 정보
  const [selectedImg, setSelectedImg] = useState("empty.png"); // 선택된 이미지 이름

  var menuList = [
    // prettier-ignore
    ["종류", "용장비", "북방장비", "중국전설", "일본전설", "환웅장비", "백제/황산벌", "전우치/구미호", "타계장비", "흉수계/봉래산", "생산장비", "격전지/전장", "승급장비", "합성노리개", "귀문장비", "기타장비"],
    ["부위", "목/어깨장식", "투구", "얼굴장식", "무기", "갑옷", "방패/보조무기", "손", "망토", "보조", "신발", "세트", "장신구"],
    ["직업", "공용", "전사", "도적", "주술사", "도사", "궁사", "천인", "마도사", "영술사", "차사"],
  ];

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
    setOptions({ op1: 0, op2: 0, op3: 0 });

    if (name === "") {
      setItemList([]);
      setSelectedImg("empty.png");
      return;
    }

    let realName = convertName(name);
    const res = await SearchItemByName(realName);
    const temp = Array<IItemInfo>();
    if (res !== null && res !== undefined) res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  const convertName = (str: string) => {
    if (str.split("(").length > 1 || str.split("[").length > 1) {
      return str.replace("(", "\\(").replace(")", "\\)").replace("[", "\\[").replace("]", "\\]");
    } else {
      return str;
    }
  };

  // 리스트 통해서 검색
  const searchByList = async () => {
    if (options.op1 === 0 || options.op2 === 0 || options.op3 === 0) {
      alert("세부 옵션을 모두 선택해주세요.");
      return;
    }
    setSearchName("");

    const res = await SearchItemByOption(options.op1, options.op2, options.op3);
    const temp = Array<IItemInfo>();
    if (res !== null && res !== undefined) res.forEach(r => temp.push(r));
    setItemList(temp);
  };

  return (
    <React.Fragment>
      <Grid container justify='center' direction='column' style={{ margin: "0", padding: "0" }}>
        <Grid container justify='center' style={{ margin: "5px 0", padding: "0" }}>
          <div>
            <TextField
              className={classes.itemText}
              variant='outlined'
              placeholder='아이템명'
              value={searchName || ""}
              onChange={e => {
                inputName(e.target.value);
              }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  searchByName(searchName);
                }
              }}
            />
            <Button
              className={classes.btn}
              variant='contained'
              color='primary'
              style={{ marginLeft: "-5px", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
              onClick={e => {
                searchByName(searchName);
              }}>
              <SearchIcon />
            </Button>
          </div>
          <div>
            <Select
              variant='outlined'
              className={classes.select}
              value={options.op1}
              onChange={e => {
                setOptions({ ...options, op1: Number(e.target.value) });
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
              value={options.op2}
              onChange={e => {
                setOptions({ ...options, op2: Number(e.target.value) });
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
              value={options.op3}
              style={{ width: "80px" }}
              onChange={e => {
                setOptions({ ...options, op3: Number(e.target.value) });
              }}>
              {menuList[2].map((name: string, idx: number) => {
                return (
                  <Menus value={idx} key={idx} disableGutters={true}>
                    {name}
                  </Menus>
                );
              })}
            </Select>
          </div>
          <Button
            className={classes.btn}
            variant='contained'
            color='primary'
            onClick={() => {
              searchByList();
            }}>
            <SearchIcon />
          </Button>
        </Grid>
        <Grid
          container
          justify='center'
          style={{
            width: `calc(100% - 10px)`,
            minHeight: "82px",
            margin: "5px",
            padding: "5px 10px",
            border: "1px solid lightgray",
            borderRadius: "10px",
          }}>
          {itemList.length === 0 ? (
            <span>
              <br />
              검색 결과가 없습니다.
            </span>
          ) : (
            itemName
          )}
        </Grid>
        <Grid container justify='center' style={{ margin: "5px 0", padding: "0" }}>
          <img src={baseUrlForItemImg + selectedImg} alt='아이템' />
          <Typography style={{ margin: "20px 5px", textAlign: "center" }}>※ 비교 기능은 PC환경에서만 제공됩니다 ※</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
