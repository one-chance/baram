import React from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";
import "react-quill/dist/quill.snow.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { RecommendPost, UnrecommendPost } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";

import IPost from "interfaces/Board/IPost";
import Bottom from "./Bottom";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles({
  BodyContent: {
    "& img": {
      display: "inline-block",
      maxWidth: "100%",
      height: "auto",
    },
    "& p": {
      lineHeight: "20px",
      margin: "5px 0",
    },
    "& h1": {
      margin: "15px 0",
    },
    "& h2": {
      margin: "10px 0",
    },
    "& .ql-video": {
      width: "800px",
      height: "450px",
      margin: "0 auto",
    },
  },
  BodyContentM: {
    "& img": {
      display: "inline-block",
      maxWidth: "100%",
      height: "auto",
    },
    "& p": {
      lineHeight: "20px",
      margin: "5px 0",
    },
    "& h1": {
      margin: "15px 0",
    },
    "& h2": {
      margin: "10px 0",
    },
    "& .ql-video": {
      width: "100%",
      height: "auto",
      margin: "0",
    },
  },
});

const duration = 2000;
function PostContent(props: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down(800));
  const post: IPost = props.post;
  const setMyAlert = useSetRecoilState(MyAlertState);
  const signInUserId = getNowUserInfo().id;

  const onRecommendPost = async () => {
    if (post.seq) {
      const res = await RecommendPost(post.category, post.seq, signInUserId);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });
      }
    }
  };
  const onUnrecommendPost = async () => {
    if (post.seq) {
      const res = await UnrecommendPost(post.category, post.seq, signInUserId);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });
      }
    }
  };
  return (
    <Container style={{ padding: "0" }}>
      <Grid item xs={12} style={{ minHeight: "300px", padding: "10px", marginBottom: "20px" }}>
        <div className='ql-editor' style={{ padding: "0 10px" }}>
          <div className={smallScreen ? classes.BodyContentM : classes.BodyContent} dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </Grid>

      <Bottom
        category={post.category}
        isRecommended={post.recommendUserList ? post.recommendUserList.includes(signInUserId) : false}
        recommendCount={post.recommendUserList ? post.recommendUserList.length : 0}
        onRecommendPost={onRecommendPost}
        onUnrecommendPost={onUnrecommendPost}
      />
    </Container>
  );
}

export default PostContent;
