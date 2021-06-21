import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, FilterState } from "state/index";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridRowsProp, GridColDef, GridOverlay, useGridSlotComponentProps, GridPageChangeParams } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import MyGridDivider from "elements/Grid/MyGridDivider";
import Bottom from "./Bottom";

import IPost, { CategoryType } from "interfaces/Board/IPost";
import * as CommonUtil from "utils/CommonUtil";
import { getCategoryName } from "utils/PostUtil";

let nowCategory: CategoryType;

const useStyles = makeStyles({
  header: {
    padding: "10px",
    paddingLeft: "30px",
    fontWeight: "bold",
    lineHeight: "30px",
  },
  box: {
    width: "1010px",
    height: "630px",
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
});

interface IProps {
  category: CategoryType;
  posts: Array<IPost>;
  rowCount?: number;
  page?: number;
  filter?: string;
  keyword?: string;
  onPageChange?: (params: GridPageChangeParams) => void;
}

const cols: GridColDef[] = [
  { field: "id", headerName: "번호", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "title", headerName: "제목", type: "string", width: 420, sortable: false, headerAlign: "center" },
  { field: "writer", headerName: "작성자", type: "string", width: 140, sortable: false, headerAlign: "center", align: "center" },
  { field: "viewCount", headerName: "조회수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "commentCount", headerName: "댓글수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "recommendCount", headerName: "추천수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "createDate", headerName: "작성일", type: "date", width: 120, headerAlign: "center", align: "center" },
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

function CustomPagination() {
  const classes = useStyles();
  const { state, apiRef } = useGridSlotComponentProps();
  const { pagination } = state;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const filterValue = useRecoilValue(FilterState);

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

  const _onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    apiRef.current.setPage(value - 1);
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

  return (
    <Container style={{ margin: "0", padding: "0" }}>
      <Bottom category={nowCategory} />
      <Grid container direction='row' justify='center' className={classes.pageBox}>
        <Pagination
          color='primary'
          shape='rounded'
          count={pagination.pageCount}
          page={pagination.page + 1}
          showFirstButton={true}
          showLastButton={true}
          onChange={(event, value) => _onChangePage(event, value)}
        />
      </Grid>
      <MyGridDivider />
      <Grid container spacing={2} direction='row' justify='center' style={{ width: "100%", margin: "5px 0" }}>
        <Grid item style={{ padding: "0", margin: "2.5px 10px" }}>
          <ButtonGroup color='default'>
            <Button
              color={searchFilter === "title" ? "secondary" : "primary"}
              onClick={() => setSearchFilter(searchFilter === "title" ? "" : "title")}
              style={{ height: "35px", margin: "0" }}>
              제목
            </Button>
            <Button
              color={searchFilter === "content" ? "secondary" : "primary"}
              onClick={() => setSearchFilter(searchFilter === "content" ? "" : "content")}
              style={{ height: "35px", margin: "0" }}>
              내용
            </Button>
            <Button
              color={searchFilter === "writer" ? "secondary" : "primary"}
              onClick={() => setSearchFilter(searchFilter === "writer" ? "" : "writer")}
              style={{ height: "35px", margin: "0" }}>
              작성자
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item style={{ padding: "0", margin: "2.5px 10px" }}>
          <FormControl variant='outlined'>
            <OutlinedInput
              id='post-search-text'
              value={searchValue}
              onChange={e => _onChangeSearch(e.target.value)}
              onKeyUp={e => _onEnterSearch(e.keyCode)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='post-search-icon' onClick={search} edge='end' style={{ height: "35px", padding: "5px" }}>
                    <SearchIcon style={{ height: "35px" }} />
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{ style: { height: "35px", padding: "5px 10px" } }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}

const Board = (props: IProps) => {
  const classes = useStyles();
  const { category, posts, rowCount, onPageChange } = props;
  const rows: GridRowsProp = [];
  nowCategory = category;

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

  const _onRowClick = (id: number) => {
    document.location.href = `/board/${nowCategory}/${id}`;
  };

  const _onPageChanged = (params: GridPageChangeParams) => {
    if (onPageChange !== undefined) onPageChange(params);
  };

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

  return (
    <React.Fragment>
      <Grid container style={{ maxWidth: "960px", margin: "0 auto", border: "1px solid darkgray", borderRadius: "5px" }}>
        <Grid container>
          <Typography style={{ width: "100%", lineHeight: "32px", paddingLeft: "30px", margin: "8px 0", fontSize: "1.2rem", fontWeight: "bold" }}>
            팁 게시판
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
      </Grid>
      {/*       <Grid container justify='center' className={classes.box}>
        <DataGrid
          className={classes.datagrid}
          headerHeight={40} //default 56
          rowHeight={40} //default 52
          sortingMode='client'
          pageSize={10}
          paginationMode='server'
          onPageChange={_onPageChanged}
          hideFooterRowCount={true}
          hideFooterSelectedRowCount={true}
          disableColumnMenu={true}
          columns={cols}
          rows={rows}
          rowCount={rowCount ? rowCount : rows.length}
          onRowClick={param => _onRowClick(param.row.id as number)}
          components={{
            Header: CustomHeader,
            NoRowsOverlay: CustomNoRowsOverlay,
            Pagination: CustomPagination,
          }}
        />
      </Grid> */}
    </React.Fragment>
  );
};

export default Board;
