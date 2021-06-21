import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, FilterState } from "state/index";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import Bottom from "./Bottom";
import IPost, { CategoryType } from "interfaces/Board/IPost";
import { getCategoryName } from "utils/PostUtil";
import * as CommonUtil from "utils/CommonUtil";

const useStyles = makeStyles({
  select: {
    width: "80px",
    height: "36px",
    padding: "0",
    margin: "2px 0",
    fontSize: "0.875rem",
    color: "blue",
    textAlignLast: "center",
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "30px",
      textAlign: "center",
      color: "blue",
    },
  },
  infoText: {
    minWidth: "60px",
    lineHeight: "24px",
    margin: "4px 0",
    padding: "0",
    textAlign: "center",
    float: "left",
  },
  titleText: {
    minWidth: "60px",
    lineHeight: "24px",
    margin: "4px 0",
    padding: "0",
    fontWeight: "bold",
    textAlign: "center",
    float: "left",
  },
  pageBtn: {
    backgroundColor: "transparent",
    color: "black",
    boxShadow: "none",
    minWidth: "32px",
    height: "32px",
    padding: "0",
    margin: "4px 2px",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
  },
  selectPageBtn: {
    backgroundColor: "#3f51b5",
    color: "white",
    boxShadow: "none",
    minWidth: "32px",
    height: "32px",
    padding: "0",
    margin: "4px 2px",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      backgroundColor: "#3f51b5",
      outline: "none",
      boxShadow: "none",
    },
  },
});

const Menus = withStyles({
  root: {
    minHeight: "36px",
    justifyContent: "center",
    paddding: "4px 0",
    color: "blue",
  },
})(MenuItem);

interface IProps {
  category: CategoryType;
  subCategory?: string;
  posts: Array<IPost>;
  totalArticleCount: number;
  articleSize: number;
  page?: number;
  filter?: string;
  keyword?: string;
  onPageChange?: (page: number, articleSize: number) => Promise<void>;
}

interface PaginationProps {
  totalPageCount: number;
  onPageChange?: (index: number) => void;
}

interface Article {
  id: number;
  title: string;
  writer: string;
  viewCount: number;
  commentCount: number;
  recommendCount: number;
  createDate: string;
}

let nowCategory: CategoryType;

function CustomPagination(props: PaginationProps) {
  const classes = useStyles();
  const filterValue = useRecoilValue(FilterState);
  const setMyAlert = useSetRecoilState(MyAlertState);

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [pageList, setPageList] = useState<number>(0);
  const pageListSize = 5; // 화면에 보여지는 최대 페이지 수

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("title");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    for (let idx in filterValue.query) {
      let query = filterValue.query[idx].split(`=`);
      if (query[0] === `title` || query[0] === `content` || query[0] === `writer`) {
        setSearchFilter(query[0]);
        setSearchValue(query[1]);
      } else {
        if (searchQuery === ``) setSearchQuery(filterValue.query[idx]);
        else setSearchQuery(searchQuery + `&` + filterValue.query[idx]);
      }
    }
    // eslint-disable-next-line
  }, [filterValue]);

  useEffect(() => {}, [pageNumber]);

  const selectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchFilter(event.target.value as string);
  };

  const onPageListChanged = (diff: number) => {
    if (pageList + diff >= 0 && pageList + diff <= Math.floor((props.totalPageCount - 1) / pageListSize)) {
      setPageList(pageList + diff);
      onPageButtonClick(pageList + diff, 0);
    }
  };

  const onPageListFirst = () => {
    onPageListChanged(-1);
  };

  const onPageListLast = () => {
    onPageListChanged(1);
  };

  const onPageButtonClick = (searchPageList: number, searchPage: number) => {
    setSelectedPage(searchPage);
    onPageChanged(searchPageList, searchPage);
  };

  const onPageChanged = (searchPageList: number, searchPage: number) => {
    setPageNumber(searchPageList * pageListSize + searchPage);
    if (props.onPageChange !== undefined) props.onPageChange(searchPageList * pageListSize + searchPage);
  };

  const _onChangeSearch = (value: string) => {
    setSearchValue(value);
  };

  const _onEnterSearch = (keyCode: number) => {
    keyCode === 13 && search();
  };

  const search = () => {
    if (!searchFilter) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: 2000,
        message: "검색 조건을 설정해주세요.",
      });

      return 0;
    }
    if (!searchValue) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: 2000,
        message: "검색어를 입력해주세요.",
      });

      return 0;
    }

    let uri = `/board/${nowCategory}?`;
    if (searchQuery === ``) uri += `${searchFilter}=${searchValue}`;
    else uri += searchQuery + `&${searchFilter}=${searchValue}`;
    document.location.href = uri;
  };

  const PageButton = (page: number) => {
    let btn: JSX.Element = (
      <Button
        variant='contained'
        key={page}
        className={page === selectedPage ? classes.selectPageBtn : classes.pageBtn}
        onClick={() => {
          onPageButtonClick(pageList, page);
        }}>
        {pageList * pageListSize + page + 1}
      </Button>
    );
    return btn;
  };

  const PageButtonList = () => {
    let temp: JSX.Element[] = [];

    temp.push(
      <Button className={classes.pageBtn} key={-2} onClick={onPageListFirst}>
        ◀
      </Button>
    );

    for (var i = 0; i < pageListSize && pageList * pageListSize + i < props.totalPageCount; ++i) {
      temp.push(PageButton(i));
    }

    temp.push(
      <Button className={classes.pageBtn} key={-1} onClick={onPageListLast}>
        ▶
      </Button>
    );

    return temp;
  };

  return (
    <>
      <Grid container justify='center' style={{ height: "40px", padding: "0" }}>
        {PageButtonList()}
      </Grid>

      <Grid container justify='center' style={{ height: "56px", padding: "8px 0" }}>
        <Select variant='outlined' className={classes.select} value={searchFilter} onChange={selectChange}>
          <Menus value={"title"} disableGutters={true}>
            제목
          </Menus>
          <Menus value={"content"} disableGutters={true}>
            내용
          </Menus>
          <Menus value={"writer"} disableGutters={true}>
            작성자
          </Menus>
        </Select>
        <Grid item style={{ padding: "0", margin: "2px 8px" }}>
          <FormControl variant='outlined'>
            <OutlinedInput
              id='post-search'
              value={searchValue}
              onChange={e => _onChangeSearch(e.target.value)}
              onKeyUp={e => _onEnterSearch(e.keyCode)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='post-search' edge='end' style={{ height: "36px", padding: "0" }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{ style: { width: "100px", height: "36px", padding: "0 0 0 10px" } }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

const Board = (props: IProps) => {
  const classes = useStyles();
  const { category, posts, totalArticleCount, articleSize, onPageChange } = props;
  const rows: Array<Article> = [];
  nowCategory = category;
  const categoryName = getCategoryName(nowCategory);

  posts.forEach(post => {
    rows.push({
      id: post.seq ? post.seq : -1,
      title: post.title,
      writer: CommonUtil.getTitleAccountString(post.writer.titleAccount),
      viewCount: post.viewCount,
      commentCount: post.commentList ? post.commentList.length : 0,
      recommendCount: post.recommendUserList ? post.recommendUserList.length : 0,
      createDate: CommonUtil.getStringByDate(post.writer.createDate),
    });
  });

  const article = () => {
    let temp: JSX.Element[] = [];

    temp = rows.map((row, idx) => {
      return (
        <Grid container key={idx} justify='space-between' style={{ borderTop: "1px solid lightgray", padding: "4px 8px" }}>
          <Typography className={classes.infoText}>{row.id}</Typography>
          <a
            style={{ minWidth: "300px", lineHeight: "24px", fontSize: "1rem", margin: "4px 0", textDecoration: "none", color: "black" }}
            href={`/board/tip/${row.id}`}>
            {row.title}
          </a>
          <Typography className={classes.infoText} style={{ minWidth: "140px" }}>
            {row.writer}
          </Typography>
          <Typography className={classes.infoText}>{row.viewCount}</Typography>
          <Typography className={classes.infoText}>{row.commentCount}</Typography>
          <Typography className={classes.infoText}>{row.recommendCount}</Typography>
          <Typography className={classes.infoText} style={{ minWidth: "100px" }}>
            {row.createDate}
          </Typography>
        </Grid>
      );
    });

    return temp;
  };

  const _onPageChanged = (params: number) => {
    if (onPageChange !== undefined) onPageChange(params, articleSize);
  };

  return (
    <React.Fragment>
      <Grid container style={{ maxWidth: "960px", margin: "0 auto", border: "1px solid darkgray", borderRadius: "5px" }}>
        <Grid container>
          <Typography style={{ width: "100%", lineHeight: "32px", paddingLeft: "30px", margin: "12px 0 4px 0", fontSize: "1.2rem", fontWeight: "bold" }}>
            {categoryName}
          </Typography>
          <Grid container justify='space-between' style={{ padding: "4px 8px" }}>
            <Typography className={classes.titleText}>번호</Typography>
            <Typography className={classes.titleText} style={{ minWidth: "300px" }}>
              제목
            </Typography>
            <Typography className={classes.titleText} style={{ minWidth: "140px" }}>
              작성자
            </Typography>
            <Typography className={classes.titleText}>조회수</Typography>
            <Typography className={classes.titleText}>댓글</Typography>
            <Typography className={classes.titleText}>추천</Typography>
            <Typography className={classes.titleText} style={{ minWidth: "100px" }}>
              작성일
            </Typography>
          </Grid>
        </Grid>
        {article()}

        <Divider style={{ width: "100%", backgroundColor: "lightgray", margin: "0" }} />
        <Bottom category={nowCategory} />
        <CustomPagination totalPageCount={Math.floor((totalArticleCount - 1) / articleSize) + 1} onPageChange={_onPageChanged} />
      </Grid>
    </React.Fragment>
  );
};

export default Board;
