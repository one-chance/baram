import React, {useEffect} from "react";
import { useSetRecoilState } from "recoil";
import { MyAlertState } from "state/index";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {RecommendPost, UnrecommendPost} from 'utils/PostUtil';
import {getNowId} from "utils/CommonUtil";

import IPost from "interfaces/Board/IPost";
import Bottom from "./Bottom";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: "50px",
    textAlign: "center",
  },
  BodyContent: {
    "& img": {
      display: "block",
      maxWidth: "100%",
      height: "auto",
    },
  },
}));

const duration = 2000;
function PostContent(props: IProps) {
  const classes = useStyles();
  const post: IPost = props.post;
  const setMyAlert = useSetRecoilState(MyAlertState);

  const onRecommendPost = async () => {
    if (post.seq) {
      const res = await RecommendPost(post.category, post.seq, getNowId());
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });
      }
    }
  }
  const onUnrecommendPost = async () => {
    if (post.seq) {
      const res = await UnrecommendPost(post.category, post.seq, getNowId());
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message,
        });
      }
    }
  }
  return (
    <Container>
      <Grid item xs={12} style={{ minHeight: "300px", padding: "0 15px" }}>
        <div className={classes.BodyContent} dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </Grid>
      <Bottom 
        category={post.category} 
        seq={post.seq}
        isRecommended={post.recommendUserList ? post.recommendUserList.includes(getNowId()) : false}
        recommendCount={post.recommendUserList ? post.recommendUserList.length : 0}
        onRecommendPost={onRecommendPost}
        onUnrecommendPost={onUnrecommendPost}/>
    </Container>
  );
}

export default PostContent;
