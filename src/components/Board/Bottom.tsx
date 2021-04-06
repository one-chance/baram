import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { CategoryType } from "interfaces/Board/IPost";
import * as CommonUtil from "utils/CommonUtil";

interface IProps {
  category: CategoryType;
  seq?: number;
  isRecommended?: boolean;
  recommendCount?: Number;
  onRecommendPost?: any;
  onUnrecommendPost?: any;
}
const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    width: "100%",
    padding: "0 20px",
    marginBottom: "5px",
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

const Bottom = (props: IProps) => {
  const classes = useStyles();
  const { category, seq, isRecommended, recommendCount, onRecommendPost, onUnrecommendPost } = props;

  const [isReload, setIsReload] = React.useState(false);
  const [rc, setRc] = React.useState(0);

  useEffect(() => {
    setIsReload(isRecommended ? isRecommended : false);
    setRc(recommendCount ? parseInt(recommendCount.toString()) : 0);
  }, [isRecommended, recommendCount]);

  const handleRecommend = () => {
    if (isReload) {
      onUnrecommendPost();
      setIsReload(false);
      setRc(rc > -1 ? rc - 1 : 0);
    } else {
      onRecommendPost();
      setIsReload(true);
      setRc(rc > -1 ? rc + 1 : 0);
    }
  };

  return (
    <Grid container direction='row' className={document.location.href.indexOf(`/board/write`) < 0 ? classes.buttonWrapper : classes.buttonWrapperOne}>
      {
        // 게시글 View 에서만 보여지도록
        document.location.href.indexOf(`/board/write`) < 0 && (
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={() => {
              document.location.href = `/board/${category}`;
            }}
            style={{ height: "35px" }}>
            전체목록
          </Button>
        )
      }
      {
        // 사용자 로그인 정보가 있고 게시글 정보가 있으면
        CommonUtil.getToken() && seq && (
          <>
            <Button
              aria-label='recommend'
              variant={isReload ? "contained" : "outlined"}
              color='primary'
              size='small'
              className={classes.button}
              onClick={handleRecommend}
              startIcon={<ThumbUpIcon />}
              style={{ height: "35px" }}>
              {rc}
            </Button>
          </>
        )
      }
      {
        // 사용자 로그인 정보가 있으면
        CommonUtil.getToken() && (
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={() => {
              document.location.href = `/board/write/${category}`;
            }}
            style={{ height: "35px" }}>
            글쓰기
          </Button>
        )
      }
    </Grid>
  );
};

export default Bottom;
