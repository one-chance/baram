import React from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";
import "react-quill/dist/quill.snow.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { RecommendPost, UnrecommendPost } from "utils/PostUtil";
import { getNowUserInfo } from "utils/UserUtil";

import IPost from "interfaces/Board/IPost";
import Bottom from "./Bottom";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles(theme => ({
  BodyContent: {
    "& img": {
      display: "block",
      maxWidth: "100%",
      height: "auto",
    },
    "& p": {
      margin: "5px 0",
    },
    "& h1": {
      margin: "15px 0",
    },
    "& h2": {
      margin: "10px 0",
    },
  },
}));

const duration = 2000;
function PostContent(props: IProps) {
  const classes = useStyles();
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
      <Grid item xs={12} style={{ minHeight: "300px", padding: "0 15px", marginBottom: "30px" }}>
        <div className='ql-editor'>
          <div className={classes.BodyContent} dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </Grid>

      <Bottom
        category={post.category}
        seq={post.seq}
        isRecommended={post.recommendUserList ? post.recommendUserList.includes(signInUserId) : false}
        recommendCount={post.recommendUserList ? post.recommendUserList.length : 0}
        onRecommendPost={onRecommendPost}
        onUnrecommendPost={onUnrecommendPost}
      />
    </Container>
  );
}

export default PostContent;
