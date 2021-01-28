import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

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

function PostContent(props: IProps) {
  const classes = useStyles();
  const post: IPost = props.post;

  return (
    <Container>
      <Grid item xs={12} style={{ padding: "0 15px" }}>
        <div className={classes.BodyContent} dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </Grid>
      <Bottom category={post.category} />
    </Container>
  );
}

export default PostContent;
