import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, FilterState } from "state/index";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef, GridOverlay, BaseComponentProps } from "@material-ui/data-grid";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
  box: {
    width: "1010px",
    height: "630px",
  },
  box2: {
    height: "560px",
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
  { field: "id", headerName: "번호", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "title", headerName: "제목", type: "string", width: 420, sortable: false, headerAlign: "center" },
  { field: "writer", headerName: "작성자", type: "string", width: 140, sortable: false, headerAlign: "center", align: "center" },
  { field: "viewCount", headerName: "조회수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "commentCount", headerName: "댓글수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "recommendCount", headerName: "추천수", type: "number", width: 80, headerAlign: "center", align: "center" },
  { field: "createDate", headerName: "작성일", type: "date", width: 120, headerAlign: "center", align: "center" },
];

const cols2: ColDef[] = [
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

function CustomPagination(props: BaseComponentProps) {
  const { state, api } = props;
  const { pagination } = state;
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
    <Container style={{ margin: "0", padding: "0" }}>
      <Bottom category={nowCategory} />
      <Grid container direction='row' justify='center' style={{ width: "100%", height: "30px", marginBottom: "5px" }}>
        <Pagination
          color='primary'
          shape='rounded'
          page={pagination.page}
          count={pagination.pageCount}
          showFirstButton={true}
          showLastButton={true}
          onChange={(event, value) => api.current.setPage(value)}
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
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { category, posts } = props;
  const rows: RowsProp = [];
  nowCategory = category;

  posts.forEach(post => {
    rows.push({
      id: post.seq ? post.seq : -1,
      title: post.title,
      writer: post.writer.id,
      viewCount: post.viewCount,
      commentCount: post.commentList ? post.commentList.length : 0,
      recommendCount: post.recommendUserList ? post.recommendUserList.length : 0,
      createDate: CommonUtil.getStringByDate(post.writer.createDate),
    });
  });

  const _onRowClick = (id: number) => {
    document.location.href = `/board/${nowCategory}/${id}`;
  };

  return (
    <React.Fragment>
      <Grid container justify='center' className={smallScreen ? classes.box2 : classes.box}>
        {/*         <Container className={classes.top}>
          <Typography variant='body2'>{rows.length} 건의 검색 결과가 조회되었습니다.</Typography>
        </Container> */}
        <DataGrid
          className={classes.datagrid}
          headerHeight={smallScreen ? 30 : 40} //default 56
          rowHeight={smallScreen ? 30 : 40} //default 52
          sortingMode='client'
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          paginationMode='server'
          hideFooterRowCount={true}
          hideFooterSelectedRowCount={true}
          disableColumnMenu={true}
          columns={smallScreen ? cols2 : cols}
          rows={rows}
          onRowClick={param => _onRowClick(param.row.id as number)}
          components={{
            Header: CustomHeader,
            NoRowsOverlay: CustomNoRowsOverlay,
            Pagination: CustomPagination,
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

export default Board;
