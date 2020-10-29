import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, RowsProp, ComponentProps, ColDef, GridOverlay } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';

import IPost from 'interfaces/Board/IPost';

import * as CommonUtil from 'utils/ComoonUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
  top: {
    textAlign: "right",
    margin: "5px",
    justifyContent: "space-between"
  },
  header: {
    padding: "10px",
    paddingLeft: "30px"
  },
  datagrid: {
    '& .title': {
      paddingLeft: "30px"
    },
    '& .MuiDataGrid-footer': {
      padding: "10px",
      margin: "auto",
      align: "center"
    },
    '& .MuiDataGrid-overlay': {
      margin: 'auto'
    }
  }
}));

interface IProps {
  posts: Array<IPost>,
  page?: number
}

const cols: ColDef[] = [
  {field: "id", headerName: "번호", type: 'number', headerAlign: "center", align: "center"},
  {field: "title", headerName: "제목", type: 'string', width: 450, sortable: false, headerClassName: "title", cellClassName: "title"},
  {field: "writer", headerName: "작성자", type: 'string', width: 150, sortable: false, headerAlign: "center", align: "center"},
  {field: "viewCount", headerName: "조회수", type: 'number', width: 100, headerAlign: "center", align: "center"},
  {field: "createDateString", headerName: "작성일", type: 'date', width: 150, headerAlign: "center", align: "center"}
]

function CustomHeader(props: ComponentProps) {
  const classes = useStyles();

  return (
    <Typography
      className={classes.header}
      variant="h6">
      자유게시판
    </Typography>
  );
}

function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay>
      <Typography>
        게시글이 존재하지 않습니다.
      </Typography>
    </GridOverlay>
  );
}

function CustomPagination(props: ComponentProps) {
  const { paginationProps } = props;

  return (
    <Pagination
      color="primary"
      page={paginationProps.page}
      count={paginationProps.pageCount}
      showFirstButton={true}
      showLastButton={true}
      onChange={(event, value) => paginationProps.setPage(value)}
    />
  );
}

const Board = (props: IProps, {}) => {
  const classes = useStyles();

  const { posts, page } = props;
  const rows: RowsProp = [];

  posts.map((post) => {
    rows.push({
      id: post.seq ? post.seq : -1,
      title: post.title,
      writer: post.writer.id,
      viewCount: post.viewCount,
      createDateString: CommonUtil.getDateFromString(post.writer.createDateString)
    })
  });

  const _onRowClick = (id: number) => {
    document.location.href = `/board/free/${id}`;
  }

  return (
    <div style={{ height: 600, width: '100%' }}>
      <Container
        className={classes.top}>
          <Typography
            variant="body2">
              {rows.length} 건의 검색 결과가 조회되었습니다.
          </Typography>
      </Container>
      <DataGrid
        className={classes.datagrid}
        headerHeight={46} //default 56
        rowHeight={42} //default 52
        //autoHeight
        sortingMode="client" 
        pagination
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        paginationMode="client" 
        hideFooterRowCount={true}
        hideFooterSelectedRowCount={true}
        columns={cols} 
        rows={rows}
        onRowClick={(param) => _onRowClick(param.data.id as number)}
        components={{
          header: CustomHeader,
          noRowsOverlay: CustomNoRowsOverlay,
          pagination: CustomPagination,
        }} />
    </div>
  );
}

export default Board;