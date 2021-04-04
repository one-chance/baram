import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef, GridOverlay } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";

import IMarketContent from "interfaces/Auction/IMarketContent";
import SearchList from "conf/searchList.json";
import * as CommonUtil from "utils/CommonUtil";

const useStyles = makeStyles(theme => ({
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
  buttonWrapper: {
    width: "100%",
    justifyContent: "space-between",
  },
  buttonWrapperOne: {
    width: "100%",
    float: "right",
    textAlign: "right",
  },
  button: {
    boxShadow: "none",
  },
}));

interface IProps {
  posts: Array<IMarketContent>;
  page?: number;
  filter?: string;
  keyword?: string;
}

const cols: ColDef[] = [
  { field: "id", headerName: "번호", type: "number", sortable: false, headerAlign: "center", align: "center", disableColumnMenu: true },
  { field: "server", headerName: "서버", type: "string", sortable: false, headerAlign: "center", align: "center", disableColumnMenu: true },
  { field: "item", headerName: "아이템", type: "string", width: 400, sortable: false, headerClassName: "title", cellClassName: "title", disableColumnMenu: true },
  { field: "price", headerName: "가격", type: "number", width: 150, sortable: false, headerAlign: "center", align: "center", disableColumnMenu: true },
  { field: "writer", headerName: "판매자", type: "string", width: 150, sortable: false, headerAlign: "center", align: "center", disableColumnMenu: true },
  { field: "remainDate", headerName: "만료시간", type: "date", width: 150, sortable: false, headerAlign: "center", align: "left", disableColumnMenu: true },
];

const MarketBoardHeader = () => {
  return (
    <div></div>
  );
}

const MarketDataGrid = (props: IProps) => {
  const classes = useStyles();
  const rows: RowsProp = [] as RowsProp;

  props.posts.forEach(post => {
    rows.push({
      id: post.seq? post.seq : -1,
      server: SearchList.server[post.server].name,
      item: post.item.name,
      price: post.price,
      writer: post.writer,
      remainDate: post.remainDate,
    });
  });

  return (
    <React.Fragment>
      <MarketBoardHeader />
      <div style={{ height: 630, width: "100%", marginBottom: "20px" }}>
        <DataGrid className={classes.datagrid} pageSize={10} columns={cols} rows={rows} />
      </div>

      {
        // 사용자 로그인 정보가 있으면
        CommonUtil.getToken() && (
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={() => {
              document.location.href = '/auction/market/write';
            }}
            style={{ height: "35px" }}>
            아이템 등록
          </Button>
        )
      }
    </React.Fragment>
  );
};

export default MarketDataGrid;
