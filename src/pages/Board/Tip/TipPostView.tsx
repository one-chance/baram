import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useRecoilValue } from "recoil";
import { CommentListState } from "state/index";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import PostTitle from "components/Board/PostTitle";
import PostTitleM from "components/Board/PostTitleM";
import PostContent from "components/Board/PostContent";
import PostComment from "components/Board/PostComment";
import PostCommentList from "components/Board/PostCommentList";

import IPost from "interfaces/Board/IPost";
import { getPost } from "utils/PostUtil";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "10px auto",
    maxWidth: "960px",
  },
  postBox: {
    border: "1px solid lightgray",
    padding: "0 5px",
  },
}));

function TipPostView({ match }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { seq } = match.params;
  const commentList = useRecoilValue(CommentListState);
  const [post, setPost] = useState<IPost>();

  const _onLoad = async () => {
    const res = await getPost("tip", seq);
    if (res) setPost(res);
  };

  useEffect(() => {
    _onLoad();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Grid container justify='center' className={classes.root}>
        {post ? (
          <Grid container direction='column' className={classes.postBox}>
            {smallScreen ? <PostTitleM post={post} /> : <PostTitle post={post} />}
            <PostContent post={post} />
            <PostComment post={post} />
            <PostCommentList post={post} commentList={commentList} />
          </Grid>
        ) : (
          <Container>게시글 내용을 불러오고 있습니다.</Container>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default TipPostView;
