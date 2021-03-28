import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, RowsProp, ColDef, GridOverlay } from "@material-ui/data-grid";

import IMarketItem from "interfaces/Auction/IMarketItem";

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
}));

interface IProps {
  posts: Array<IMarketItem>;
  page?: number;
  filter?: string;
  keyword?: string;
}

const cols: ColDef[] = [
  { field: "id", headerName: "번호", type: "number", headerAlign: "center", align: "center" },
  { field: "item", headerName: "아이템", type: "string", width: 400, headerClassName: "title", cellClassName: "title" },
  { field: "price", headerName: "가격", type: "number", width: 150, headerAlign: "center", align: "center" },
  { field: "writer", headerName: "판매자", type: "string", width: 150, sortable: false, headerAlign: "center", align: "center" },
  { field: "remainDate", headerName: "만료시간", type: "date", width: 150, headerAlign: "center", align: "left" },
];

const MarketDataGrid = (props: IProps) => {
  const classes = useStyles();
  const rows: RowsProp = [] as RowsProp;

  props.posts.forEach(post => {
    rows.push({
      id: post.seq ? post.seq : -1,
      item: post.item,
      price: post.price,
      writer: post.writer,
      remainDate: post.remainDate,
    });
  });

  return (
    <React.Fragment>
      <div style={{ height: 630, width: "100%", marginBottom: "20px" }}>
        <DataGrid className={classes.datagrid} pageSize={10} columns={cols} rows={rows} />
      </div>
    </React.Fragment>
  );
};

export default MarketDataGrid;
