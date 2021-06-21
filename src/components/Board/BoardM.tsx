import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, FilterState } from "state/index";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MessageIcon from "@material-ui/icons/Message";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import IPost, { CategoryType } from "interfaces/Board/IPost";
import SignInDialogState from "state/common/SignInDialogState";
import * as CommonUtil from "utils/CommonUtil";
import { getCategoryName } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";

const useStyles = makeStyles({
  infoIcon: {
    width: "16px",
    height: "16px",
    margin: "2px 4px 2px 0",
    float: "left",
  },
  infoText: {
    lineHeight: "20px",
    fontSize: "0.8rem",
    margin: "0 10px 0 0",
    padding: "0",
    float: "left",
  },
  titleLink: {
    width: "100%",
    lineHeight: "24px",
    fontSize: "1rem",
    margin: "4px 0",
    color: "black",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
  },
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
      <Grid container justify='center' style={{ height: "56px", padding: "8px 0", borderTop: "1px solid lightgray" }}>
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

const BoardM = (props: IProps) => {
  const classes = useStyles();
  const setIsSignInOpen = useSetRecoilState(SignInDialogState);
  const setMyAlert = useSetRecoilState(MyAlertState);
  const { category, posts, totalArticleCount, articleSize, onPageChange } = props;
  const rows: Array<Article> = [];
  nowCategory = category;
  const categoryName = getCategoryName(nowCategory)?.split(" ")[0];
  const signInUser = getNowUserInfo();

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

    temp = rows.map((row: any, idx: number) => {
      return (
        <Grid container key={idx} style={{ borderTop: "1px solid lightgray", padding: "0 5px" }}>
          <a className={classes.titleLink} href={`/board/${nowCategory}/${row.id}`}>
            <span style={{ color: "blue", marginRight: "5px" }}>{`[${categoryName}]`}</span>
            <span>{row.title}</span>
          </a>
          <Grid container style={{ margin: "4px 0", padding: "0" }}>
            <Typography className={classes.infoText}>{row.writer}</Typography>
            <VisibilityIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.viewCount}</Typography>
            <MessageIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.commentCount}</Typography>
            <ThumbUpIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.recommendCount}</Typography>
            <AccessTimeIcon className={classes.infoIcon} />
            <Typography className={classes.infoText}>{row.createDate}</Typography>
          </Grid>
        </Grid>
      );
    });

    return temp;
  };

  const _onPageChanged = (params: number) => {
    if (onPageChange !== undefined) onPageChange(params, articleSize);
  };

  const handleList = () => {
    document.location.href = `/board/${nowCategory}`;
  };

  const handlePostWrite = () => {
    if (signInUser) {
      if (nowCategory === "tip") {
        writeTip();
        return;
      } else if (1 < Number(signInUser.grade)) {
        document.location.href = `/board/write/${nowCategory}`;
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

  const writeTip = () => {
    if (signInUser) {
      if (nowCategory === "tip" && 9 === Number(signInUser.grade)) {
        document.location.href = `/board/write/tip`;
      } else {
        setMyAlert({
          isOpen: true,
          severity: "error",
          duration: 2000,
          message: "Level 9 부터 작성할 수 있습니다.",
        });
      }
    } else {
      setIsSignInOpen(true);
    }
  };

  return (
    <React.Fragment>
      <Grid container justify='center' style={{ border: "1px solid darkgray", borderRadius: "5px", margin: "4px 0" }}>
        <Grid container alignItems='center' justify='space-between'>
          <Button variant='outlined' onClick={handleList} style={{ minWidth: "32px", lineHeight: "28px", padding: "0", margin: "8px" }}>
            <ListIcon style={{ width: "28px", height: "28px" }} />
          </Button>
          <Typography style={{ lineHeight: "28px", margin: "8px", fontSize: "1.2rem", fontWeight: "bold" }}>팁 게시판</Typography>
          <Button variant='outlined' onClick={handlePostWrite} style={{ minWidth: "32px", lineHeight: "28px", padding: "0", margin: "8px" }}>
            <CreateIcon style={{ width: "28px", height: "28px" }} />
          </Button>
        </Grid>

        <div style={{ width: "100%", minHeight: "410px" }}>{article()}</div>

        <CustomPagination totalPageCount={Math.floor((totalArticleCount - 1) / articleSize) + 1} onPageChange={_onPageChanged} />
      </Grid>
    </React.Fragment>
  );
};

export default BoardM;
