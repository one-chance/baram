import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { CategoryType } from "interfaces/Board/IPost";

import * as CommonUtil from "utils/CommonUtil";

interface IProps {
  category: CategoryType;
}

const Bottom = (props: IProps) => {
  const { category } = props;
  return (
    <Grid container direction='row' style={{ width: "100%", marginBottom: "5px" }}>
      <Button
        variant='outlined'
        color='primary'
        style={{ margin: "auto", alignItems: "left", marginLeft: "10px" }}
        onClick={() => {
          document.location.href = `/board/${category}`;
        }}>
        전체목록
      </Button>
      {CommonUtil.getToken() && (
        <Button
          variant='contained'
          color='primary'
          style={{ margin: "auto", alignItems: "right", marginRight: "10px", boxShadow: "none" }}
          onClick={() => {
            document.location.href = `/board/write/${category}`;
          }}>
          글쓰기
        </Button>
      )}
    </Grid>
  );
};

export default Bottom;
