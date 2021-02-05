import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, FilterState } from "state/index";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ComponentProps, ColDef, GridOverlay } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
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

import IPost from "interfaces/Board/IPost";
import { CategoryType } from "interfaces/Board/IPost";

import * as CommonUtil from "utils/CommonUtil";
import { getCategoryName } from "utils/PostUtil";

let nowCategory: CategoryType;

const useStyles = makeStyles(theme => ({
  top: {
    textAlign: "right",
    marginBottom: "5px",
    justifyContent: "space-between",
  },
  header: {
    padding: "10px",
    paddingLeft: "30px",
    fontWeight: "bold",
    lineHeight: "30px",
  },
  datagrid: {
    "& .title": {
      paddingLeft: "30px",
    },
    "& .MuiDataGrid-footer": {
      padding: "0 5px",
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
  },
}));

interface IProps {
  category: CategoryType;
  posts: Array<IPost>;
  page?: number;
  filter?: string;
  keyword?: string;
}

const cols: ColDef[] = [
  { field: "id", headerName: "번호", type: "number", headerAlign: "center", align: "center" },
  { field: "title", headerName: "제목", type: "string", width: 480, sortable: false, headerClassName: "title", cellClassName: "title" },
  { field: "writer", headerName: "작성자", type: "string", width: 150, sortable: false, headerAlign: "center", align: "center" },
  { field: "viewCount", headerName: "조회수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "commentCount", headerName: "댓글수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "recommendCount", headerName: "추천수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "createDateString", headerName: "작성일", type: "date", width: 150, headerAlign: "center", align: "center" },
];

function CustomHeader(props: ComponentProps) {
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

function CustomPagination(props: ComponentProps) {
  const { paginationProps } = props;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const filterValue = useRecoilValue(FilterState);
  const [searchFilter, setSearchFilter] = React.useState<string | undefined>(filterValue.filter);
  const [searchValue, setSearchValue] = React.useState<string | undefined>(filterValue.keyword);

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
    document.location.href = `/board/${nowCategory}?${searchFilter}=${searchValue}`;
  };

  return (
    <Container style={{ padding: "0 20px" }}>
      <Bottom category={nowCategory} />
      <Grid container direction='row' justify='center' style={{ width: "100%", marginBottom: "5px" }}>
        <Pagination
          color='primary'
          shape='rounded'
          page={paginationProps.page}
          count={paginationProps.pageCount}
          showFirstButton={true}
          showLastButton={true}
          onChange={(event, value) => paginationProps.setPage(value)}
        />
      </Grid>
      <MyGridDivider />
      <Grid container spacing={2} direction='row' justify='center' style={{ width: "100%", margin: "5px" }}>
        <Grid item style={{ padding: "5px" }}>
          <ButtonGroup color='primary'>
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
        <Grid item style={{ padding: "5px" }}>
          <FormControl variant='outlined'>
            <OutlinedInput
              id='post-search-text'
              value={searchValue}
              onChange={e => _onChangeSearch(e.target.value)}
              onKeyUp={e => _onEnterSearch(e.keyCode)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='post-search-icon' onClick={search} edge='end' style={{ height: "35px" }}>
                    <SearchIcon style={{ height: "35px" }} />
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{ style: { height: "35px", padding: "10px" } }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}

const Board = (props: IProps, {}) => {
  const classes = useStyles();

  const { category, posts, page } = props;
  const rows: RowsProp = [];
  nowCategory = category;

  posts.map(post => {
    rows.push({
      id: post.seq ? post.seq : -1,
      title: post.title,
      writer: post.writer.id,
      viewCount: post.viewCount,
      commentCount: post.commentList ? post.commentList.length : 0,
      recommendCount: post.recommendUserList ? post.recommendUserList.length : 0,
      createDateString: CommonUtil.getStringByDate(post.writer.createDateString),
    });
  });

  const _onRowClick = (id: number) => {
    document.location.href = `/board/${nowCategory}/${id}`;
  };

  return (
    <React.Fragment>
      <div style={{ height: 630, width: "100%", marginBottom: "20px" }}>
        <Container className={classes.top}>
          <Typography variant='body2'>{rows.length} 건의 검색 결과가 조회되었습니다.</Typography>
        </Container>
        <DataGrid
          className={classes.datagrid}
          headerHeight={40} //default 56
          rowHeight={40} //default 52
          sortingMode='client'
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          paginationMode='client'
          hideFooterRowCount={true}
          hideFooterSelectedRowCount={true}
          columns={cols}
          rows={rows}
          onRowClick={param => _onRowClick(param.data.id as number)}
          components={{
            header: CustomHeader,
            noRowsOverlay: CustomNoRowsOverlay,
            pagination: CustomPagination,
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Board;
