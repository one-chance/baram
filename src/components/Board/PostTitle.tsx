import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import VisibilityIcon from "@material-ui/icons/Visibility";

import IPost from "interfaces/Board/IPost";

import { getCategoryName } from "utils/PostUtil";
import MyGridDivider from "elements/Grid/MyGridDivider";

interface IProps {
  post: IPost;
}

const useStyles = makeStyles(theme => ({
  title: {
    padding: "0",
    textAlign: "center",
    lineHeight: "30px",
  },
  form: {
    marginTop: 10,
  },
  middleText: {
    margin: "auto",
    verticalAlign: "middle",
  },
}));

function PostTitle(props: IProps) {
  const classes = useStyles();
  const post: IPost = props.post;

  const categoryName = getCategoryName(post.category);

  return (
    <Container>
      <Grid container item xs={12} spacing={1} className={classes.form}>
        <Grid item xs={2}>
          <Typography variant='h5' className={classes.title}>
            {categoryName}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant='h5'>{post.title}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
            {post.writer.id}
          </Typography>
          <VisibilityIcon fontSize='small' style={{ float: "left" }} />
          <Typography variant='h6' style={{ margin: "0", padding: "0", float: "left" }}>
            {post.viewCount}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          작성일 : {post.writer.createDateString} / 수정일 : {post.writer.lastEditDateString}
        </Grid>
        <MyGridDivider />
      </Grid>
    </Container>
  );
}

export default PostTitle;
