import React from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import IPost from 'interfaces/Board/IPost';

interface IProps {
  post: IPost
}

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: '50px',
    textAlign: 'center'
  },
}));

function PostContent(props: IProps) {
  const setMyAlert = useSetRecoilState(MyAlertState);

  const classes = useStyles();
  const post: IPost = props.post;
  const copyUrl = document.location.href;

  const _onCopyUrl = () => {
    var ta = document.createElement('textarea');
    ta.value = copyUrl;  
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);

    setMyAlert({
      isOpen: true,
      severity: "success",
      duration: 2000,
      message: "클립보드에 복사되었습니다."
    });
  }

  return (
    <Container>
      <Grid item xs={12}>
        <Typography
          variant="body1">
          <div dangerouslySetInnerHTML={ {__html: post.content} }></div>
        </Typography>
      </Grid>
      <Grid item xs={12}
        className={classes.footer}>
          <input type="hidden" id="url" value={copyUrl}/>
          <Button
            variant="outlined"
            color="default"
            startIcon={<FileCopyIcon />}
            onClick={_onCopyUrl}>
              URL 복사
          </Button>
      </Grid>
    </Container>
  ); 
}

export default PostContent;