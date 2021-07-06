import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, FilterState } from "state/index";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import IPost, { CategoryType } from "interfaces/Board/IPost";
import SignInDialogState from "state/common/SignInDialogState";
import { getCategoryName } from "utils/PostUtil";
import * as CommonUtil from "utils/CommonUtil";
import { getNowUserInfo } from "utils/UserUtil";

const useStyles = makeStyles({
  infoIcon: {
    width: "16px",
    height: "16px",
    color: "gray",
    margin: "2px 4px 2px 0",
    float: "left",
  },
  infoText: {
    color: "gray",
    lineHeight: "20px",
    fontSize: "0.8rem",
    margin: "0 8px 0 0",
    padding: "0",
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
  titleLink: {
    width: "100%",
    color: "black",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "& p": {
      lineHeight: "20px",
      margin: "6px 0 4px 0",
      padding: "0 4px",
    },
    "& img": {
      width: "100%",
      height: "180px",
      backgroundColor: "darkgray",
    },
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
  },
  bottomBtn: {
    minWidth: "80px",
    height: "36px",
    padding: "0",
    margin: "2px 0",
    boxShadow: "none",
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
  content: string;
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
  const setIsSignInOpen = useSetRecoilState(SignInDialogState);
  const signInUser = getNowUserInfo();

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [pageList, setPageList] = useState<number>(0);
  const pageListSize = 5; // 화면에 보여지는 최대 페이지 수

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
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

  const handleList = () => {
    document.location.href = `/board/${nowCategory}`;
  };

  const handlePostWrite = () => {
    if (signInUser) {
      if (1 < Number(signInUser.grade)) {
        document.location.href = `/board/write/video`;
      } else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: 2000,
          message: "Level 2 부터 작성하실 수 있습니다. 대표 캐릭터 인증을 완료해주세요.",
        });
      }
    } else {
      setIsSignInOpen(true);
    }
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
    var sValue = searchValue;
    if (searchValue.split("@").length > 1) {
      sValue = searchValue.split("@")[0];
    }

    let uri = `/board/${nowCategory}?`;
    if (searchQuery === ``) uri += `${searchFilter}=${sValue}`;
    else uri += searchQuery + `&${searchFilter}=${sValue}`;
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

    temp.push(PageButton(0));
    for (var i = 1; i < pageListSize && pageList * pageListSize + i < props.totalPageCount; ++i) temp.push(PageButton(i));

    temp.push(
      <Button className={classes.pageBtn} key={-1} onClick={onPageListLast}>
        ▶
      </Button>
    );

    return temp;
  };

  return (
    <>
      <Grid container justify='space-between' style={{ height: "40px", padding: "0 20px", margin: "12px 0 4px 0" }}>
        <Button variant='outlined' color='primary' className={classes.bottomBtn} onClick={handleList}>
          전체목록
        </Button>
        <div>{PageButtonList()}</div>
        <Button variant='contained' color='secondary' className={classes.bottomBtn} onClick={handlePostWrite}>
          글쓰기
        </Button>
      </Grid>

      <Grid container direction='row' justify='center' style={{ margin: "4px 0 12px 0" }}>
        <Grid item style={{ padding: "0", margin: "5px 10px" }}>
          <ButtonGroup color='default'>
            <Button
              color={searchFilter === "title" ? "secondary" : "primary"}
              onClick={() => setSearchFilter(searchFilter === "title" ? "" : "title")}
              style={{ height: "36px", margin: "0" }}>
              제목
            </Button>
            <Button
              color={searchFilter === "content" ? "secondary" : "primary"}
              onClick={() => setSearchFilter(searchFilter === "content" ? "" : "content")}
              style={{ height: "36px", margin: "0" }}>
              내용
            </Button>
            <Button
              color={searchFilter === "writer" ? "secondary" : "primary"}
              onClick={() => setSearchFilter(searchFilter === "writer" ? "" : "writer")}
              style={{ height: "36px", margin: "0" }}>
              작성자
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item style={{ padding: "0", margin: "5px 10px" }}>
          <FormControl variant='outlined'>
            <OutlinedInput
              id='post-search-text'
              value={searchValue}
              onChange={e => _onChangeSearch(e.target.value)}
              onKeyUp={e => _onEnterSearch(e.keyCode)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='post-search-icon' onClick={search} edge='end' style={{ height: "36px", padding: "5px" }}>
                    <SearchIcon style={{ height: "36px" }} />
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{ style: { height: "36px", padding: "0 10px" } }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

const BoardV = (props: IProps) => {
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
      content: post.content,
      viewCount: post.viewCount,
      commentCount: post.commentList ? post.commentList.length : 0,
      recommendCount: post.recommendUserList ? post.recommendUserList.length : 0,
      createDate: CommonUtil.getStringByDate(post.writer.createDate, false),
    });
  });

  const article = () => {
    let temp: JSX.Element[] = [];
    temp = rows.map((row, idx) => {
      let url = "";
      if (row.content.split("/embed/").length > 1) url = row.content.split("/embed/")[1].split("?")[0];
      else url = "0";
      let sumnail = `https://img.youtube.com/vi/${url}/mqdefault.jpg`;

      return (
        <Grid item container direction='column' key={idx} style={{ width: "320px", height: "240px", border: "1px solid gray", margin: "8px" }}>
          <a href={`/board/video/${row.id}`} className={classes.titleLink}>
            <div style={{ width: "100%", height: "180px", backgroundColor: "darkgray" }}>
              <img src={sumnail} alt={`썸네일${row.id}`} />
            </div>
            <Typography>{row.title}</Typography>
          </a>
          <div style={{ width: "100%", height: "auto", margin: "4px 0", padding: "0 4px" }}>
            <Typography className={classes.infoText}>{row.writer}</Typography>
            <VisibilityIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.viewCount}</Typography>
            <MessageIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.commentCount}</Typography>
            <ThumbUpIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.recommendCount}</Typography>
            <AccessTimeIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.createDate}</Typography>
          </div>
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
      <Grid container alignItems='flex-start' style={{ maxWidth: "1020px", margin: "8px auto", border: "1px solid darkgray", borderRadius: "5px" }}>
        <Grid container>
          <Typography style={{ width: "100%", lineHeight: "32px", paddingLeft: "20px", margin: "12px 0 4px 0", fontSize: "1.2rem", fontWeight: "bold" }}>
            {categoryName}
          </Typography>
        </Grid>
        <Divider style={{ width: "100%", backgroundColor: "lightgray", margin: "0" }} />

        <Grid container style={{ minHeight: "520px", padding: "4px 0" }}>
          {article()}
        </Grid>

        <Divider style={{ width: "100%", backgroundColor: "lightgray", margin: "0" }} />
        <CustomPagination totalPageCount={Math.floor((totalArticleCount - 1) / articleSize) + 1} onPageChange={_onPageChanged} />
      </Grid>
    </React.Fragment>
  );
};

export default BoardV;
