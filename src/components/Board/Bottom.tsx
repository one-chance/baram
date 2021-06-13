import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";
import SignInDialogState from "state/common/SignInDialogState";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { CategoryType } from "interfaces/Board/IPost";
import { getNowUserInfo } from "utils/UserUtil";

interface IProps {
  category: CategoryType;
  seq: number;
  isRecommended?: boolean;
  recommendCount?: Number;
  onRecommendPost?: any;
  onUnrecommendPost?: any;
}
const useStyles = makeStyles({
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
  btnClose: {
    minWidth: 10,
    fontSize: "1rem",
    padding: "0",
    position: "absolute",
    top: 5,
    right: 10,
  },
});

const Bottom = (props: IProps) => {
  const classes = useStyles();
  const setIsSignInOpen = useSetRecoilState(SignInDialogState);
  const setMyAlert = useSetRecoilState(MyAlertState);

  const { category, seq, isRecommended, recommendCount, onRecommendPost, onUnrecommendPost } = props;
  const [isReload, setIsReload] = useState(false);
  const [rc, setRc] = useState(0);
  const signInUser = getNowUserInfo();

  useEffect(() => {
    setIsReload(isRecommended ? isRecommended : false);
    setRc(recommendCount ? parseInt(recommendCount.toString()) : 0);
  }, [isRecommended, recommendCount]);

  const handleRecommend = () => {
    if (signInUser) {
      if (isReload) {
        onUnrecommendPost();
        setIsReload(false);
        setRc(rc > -1 ? rc - 1 : 0);
      } else {
        onRecommendPost();
        setIsReload(true);
        setRc(rc > -1 ? rc + 1 : 0);
      }
    } else {
      setIsSignInOpen(true);
    }
  };

  const handlePostWrite = () => {
    if (signInUser) {
      if (category === "tip") {
        writeTip();
        return;
      } else if (1 < Number(signInUser.grade)) {
        document.location.href = `/board/write/${category}`;
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
      if (category === "tip" && 9 === Number(signInUser.grade)) {
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
    <>
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
          // 게시글 정보가 있으면
          seq && (
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
          )
        }
        <Button variant='contained' color='primary' className={classes.button} onClick={handlePostWrite} style={{ height: "35px" }}>
          글쓰기
        </Button>
      </Grid>
    </>
  );
};

export default Bottom;
