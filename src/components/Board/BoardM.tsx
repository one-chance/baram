import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, FilterState } from "state/index";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DataGrid, GridRowsProp, GridColDef, GridOverlay, useGridSlotComponentProps, GridPageChangeParams, unorderedGridRowModelsSelector } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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

import MyGridDivider from "elements/Grid/MyGridDivider";
import Bottom from "./Bottom";

import IPost, { CategoryType } from "interfaces/Board/IPost";
import SignInDialogState from "state/common/SignInDialogState";
import * as CommonUtil from "utils/CommonUtil";
import { getCategoryName } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";

let nowCategory: CategoryType;

const useStyles = makeStyles({
  header: {
    padding: "10px",
    paddingLeft: "30px",
    fontWeight: "bold",
    lineHeight: "30px",
  },
  box: {
    minHeight: "560px",
  },
  datagrid: {
    "& .title": {
      paddingLeft: "30px",
    },
    "& .MuiDataGrid-footer": {
      padding: "0",
      margin: "0",
      align: "center",
    },
    "& .MuiDataGrid-mainGridContainer": {
      minHeight: "450px",
      maxHeight: "450px",
    },
    "& .MuiDataGrid-overlay": {
      margin: "auto",
    },
    "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
      padding: "0 10px",
    },
    "& .MuiDataGrid-row": {
      cursor: "pointer",
      "& div": {
        "&:focus, &:hover, &:visited, &:link, &:active": {
          outline: "none",
        },
      },
    },
  },
  pageBox: {
    width: "100%",
    height: "30px",
    marginBottom: "10px",
    "& button": {
      padding: "0",
    },
  },
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
  pageButton: {

  },
  selectPageButton: {

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

/* const cols: GridColDef[] = [
  { field: "id", headerName: "번호", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "title", headerName: "제목", type: "string", width: 420, sortable: false, headerAlign: "center" },
  { field: "writer", headerName: "작성자", type: "string", width: 140, sortable: false, headerAlign: "center", align: "center" },
  { field: "viewCount", headerName: "조회수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "commentCount", headerName: "댓글수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "recommendCount", headerName: "추천수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "createDate", headerName: "작성일", type: "date", width: 120, headerAlign: "center", align: "center" },
]; */

const cols2: GridColDef[] = [
  { field: "title", headerName: "제목", type: "string", width: 230, sortable: false, headerAlign: "center" },
  { field: "writer", headerName: "작성자", type: "string", width: 90, sortable: false, headerAlign: "center", align: "center" },
  { field: "viewCount", headerName: "조회수", type: "number", width: 70, headerAlign: "center", align: "center" },
  { field: "createDate", headerName: "작성일", type: "date", width: 90, headerAlign: "center", align: "center" },
];

function CustomHeader() {
  const classes = useStyles();

  return (
    <Grid container direction='row' justify='space-between' alignItems='center'>
      <Typography className={classes.header} variant='h6'>
        {getCategoryName(nowCategory)}
      </Typography>
    </Grid>
  );
}

function CustomNoRowsOverlay() {
  return (
    <GridOverlay>
      <Typography>게시글이 존재하지 않습니다.</Typography>
    </GridOverlay>
  );
}

interface PaginationProps {
  totalPageCount: number;
  onPageChange?: (index: number) => void;
}

function CustomPagination(props : PaginationProps) {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [pageList, setPageList] = useState<number>(0);
  const [pageListSize, setPageListSize] = useState<number>(5);

  const [selectedPage, setSelectedPage] = useState<number>(0);


  useEffect(() => {
    
    // eslint-disable-next-line
  }, [pageNumber]);
  
  const onPageListChanged = (diff : number) => {
    if(pageList + diff >= 0 && pageList + diff <= Math.floor((props.totalPageCount-1) / pageListSize)) {
      setPageList(pageList + diff);
      onPageButtonClick(pageList + diff, 0);
    }
  } 

  const onPageButtonClick = (searchPageList : number, searchPage : number) => {
    setSelectedPage(searchPage);
    onPageChanged(searchPageList, searchPage);
  }

  const onPageChanged = (searchPageList : number, searchPage : number) => {
    setPageNumber(searchPageList*pageListSize + searchPage);
    if(props.onPageChange != undefined)
      props.onPageChange(searchPageList*pageListSize + searchPage);
  }

  const PageButton = (page : number) => {
    let btn :JSX.Element = (
      <Button
        variant='contained'
        color='primary' 
        className={page === selectedPage ? `${classes.pageButton} ${classes.selectPageButton}` : classes.pageButton} 
        style={{ minWidth: "32px", height: "32px", padding: "0", margin: "4px 2px" }}
        onClick={()=> {onPageButtonClick(pageList, page)}}>
        {pageList*pageListSize + page + 1}
      </Button>
    );
    return btn;
  }

  const PageButtonList = () => {
    let temp: JSX.Element[] = [];
    for(var i = 0; i < pageListSize && pageList*pageListSize + i < props.totalPageCount; ++i) {
      temp.push(PageButton(i));
    }

    return temp;
  }

  return (
    <Container style={{ margin: "0", padding: "0" }}>
      <Bottom category={nowCategory} />
      <Grid container direction='row' justify='center' className={classes.pageBox}>
        <Grid container justify='center' style={{ height: "56px", padding: "8px 0", borderTop: "1px solid lightgray" }}>
          <Button
            style={{ minWidth: "32px", height: "32px", padding: "0", margin: "4px 2px" }}
            onClick={()=> {onPageListChanged(-1)}}
          >
              &lt;
          </Button>

          {PageButtonList()}

          <Button
            style={{ minWidth: "32px", height: "32px", padding: "0", margin: "4px 2px" }}
            onClick={()=> {onPageListChanged(1)}}
          >
            &gt;
          </Button>
        </Grid>
      </Grid>
      <MyGridDivider />
    </Container>
  );
}

const BoardM = (props: IProps) => {
  const classes = useStyles();
  const { category, posts, totalArticleCount, articleSize, onPageChange } = props;
  const rows: GridRowsProp = [];
  nowCategory = category;

  const signInUser = getNowUserInfo();
  const setIsSignInOpen = useSetRecoilState(SignInDialogState);
  const setMyAlert = useSetRecoilState(MyAlertState);
  const [searchFilter, setSearchFilter] = useState<number>(0);

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
        <Grid container key={idx} style={{ borderTop: "1px solid lightgray", padding: "0 5px" }}>
          <a
            style={{ width: "100%", lineHeight: "24px", fontSize: "1rem", margin: "4px 0", textDecoration: "none", color: "black" }}
            href={`/board/tip/${row.id}`}>
            <span style={{ color: "blue", marginRight: "5px" }}>[게시판]</span>
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

  const _onRowClick = (id: number) => {
    document.location.href = `/board/${nowCategory}/${id}`;
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
      <Grid container justify='center'>
        <Grid id='renew' container justify='center' style={{ border: "1px solid darkgray", borderRadius: "5px", margin: "10px 0" }}>
          <Grid id='title' container alignItems='center' justify='space-between'>
            <Button variant='outlined' onClick={handleList} style={{ minWidth: "32px", lineHeight: "28px", padding: "0", margin: "8px" }}>
              <ListIcon style={{ width: "28px", height: "28px" }} />
            </Button>
            <Typography style={{ lineHeight: "28px", margin: "8px", fontSize: "1.2rem", fontWeight: "bold" }}>팁 게시판</Typography>
            <Button variant='outlined' onClick={handlePostWrite} style={{ minWidth: "32px", lineHeight: "28px", padding: "0", margin: "8px" }}>
              <CreateIcon style={{ width: "28px", height: "28px" }} />
            </Button>
          </Grid>
          {article()}
          
          <CustomPagination totalPageCount={Math.floor((totalArticleCount-1)/articleSize)+1} onPageChange={_onPageChanged}/>

          <Grid container justify='center' style={{ height: "56px", padding: "8px 0" }}>
            <Select
              variant='outlined'
              className={classes.select}
              defaultValue={0}
              onChange={e => {
                setSearchFilter(Number(e));
              }}>
              <Menus value={0} disableGutters={true}>
                제목
              </Menus>
              <Menus value={1} disableGutters={true}>
                내용
              </Menus>
              <Menus value={2} disableGutters={true}>
                작성자
              </Menus>
            </Select>
            <Grid item style={{ padding: "0", margin: "2px 8px" }}>
              <FormControl variant='outlined'>
                <OutlinedInput
                  id='post-search'
                  //value={searchValue}
                  //onChange={e => _onChangeSearch(e.target.value)}
                  //onKeyUp={e => _onEnterSearch(e.keyCode)}
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BoardM;
