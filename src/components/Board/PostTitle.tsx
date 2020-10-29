import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import VisibilityIcon from '@material-ui/icons/Visibility';

import IPost from 'interfaces/Board/IPost';

import { getCategoryName } from 'utils/PostUtil';
import MyGridDivider from 'elements/Grid/MyGridDivider';

interface IProps {
  post: IPost
}

const useStyles = makeStyles((theme) => ({
  title: {
    
  },
  form: {
    marginTop: 10,
  },
  middleText: {
    margin: "auto",
    verticalAlign: 'middle'
  }
}));

function PostTitle(props: IProps) {

  const classes = useStyles();
  const post: IPost = props.post;

  const categoryName = getCategoryName(post.category);

  return (
    <Container>
      <Typography
        variant="subtitle2"
        className={classes.title}>
          {categoryName}
      </Typography>
      <Grid container item xs={12} spacing={1}
        className={classes.form}>
        <Grid item xs={12}>
          <Typography
            variant="h6">
            {post.title} 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          [{post.writer.key}]{post.writer.id}
          <Typography variant="body2" className={classes.middleText}>
            <VisibilityIcon fontSize="small"/> {post.viewCount}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          작성일 : {post.writer.createDateString} / 수정일 : {post.writer.lastEditDateString}
        </Grid>
        <MyGridDivider/>
      </Grid>
      
    </Container>
  ); 
}

export default PostTitle;