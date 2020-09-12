import React from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import MyButton from 'elements/Button/MyButton';
import MyTextEditor from 'elements/TextEditor/MyTextEditor';

import IPost from 'interfaces/Board/IPost';

import { CreatePost } from 'utils/PostUtil';

import * as CommonUtil from 'utils/ComoonUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
  selector: {
    minWidth: "180px",
    textAlign: "center"
  },
  buttonZone: {
    marginTop: "10px"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const duration = 3000;

function PostWrite() {
  const classes = useStyles();
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [openConfirmCancle, setOpenConfirmCancle] = React.useState(false);
  const [category, setCategory] = React.useState(10);
  const [title, setTitle] = React.useState("");

  const refTitle = React.useRef<any>();

  const _onChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as number);
    refTitle.current.focus();
  }

  const _onCancle = () => {
    setOpenConfirmCancle(true);
  }

  const _onWrite = () => {
    setMyBackdrop(true);

    // Processing...
    const post: IPost = {
      key: "9999",
      section: "free",
      title: "title",
      content: "content",
      viewCount: 0,
      writer: {
        creater: "sys",
        createDateString: CommonUtil.getNowDateString(),
        editer: "sys",
        lastEditDateString: CommonUtil.getNowDateString(),
      }
    }

    const res = CreatePost(post);
    
    if (res) {
      // Successed Authentication
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: "작성되었습니다. 잠시 후 게시판으로 이동합니다."
      });

      setTimeout(() => document.location.reload(), duration);
    }
    else {
      // Failed Authentication
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: "작성에 실패하였습니다."
      });
      
      setTimeout(()=> {
        setMyBackdrop(false);
      }, duration);
    }
  }

  return (
    <React.Fragment>
      <Container
        maxWidth="md"
        className={classes.root}>
        <Grid 
          container
          spacing={1}
          direction="column"
          justify="flex-start">
          <Grid item xs={3}>
            <Select
              labelId="post-category"
              id="category"
              value={category}
              onChange={_onChangeCategory}
              displayEmpty
              className={classes.selector}>
                <MenuItem value={10}>자유게시판</MenuItem>
                <MenuItem value={20}>서버게시판</MenuItem>
                <MenuItem value={30}>게시판1</MenuItem>
                <MenuItem value={40}>게시판2</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              id="title"
              name="title"
              label="Title"
              value={title}
              inputRef={refTitle}
              onChange={(e) => { setTitle(e.target.value); }}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextEditor/>
          </Grid>
          <Grid container item xs={12}
            justify="space-between"
            className={classes.buttonZone}>
              <Grid item xs={3}>
                <MyButton
                  color="red"
                  text="취소"
                  onClick={_onCancle}/>
              </Grid>
              <Grid item xs={3}>
                <MyButton
                  color="blue"
                  text="저장"
                  onClick={_onWrite}/>
              </Grid>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={openConfirmCancle}>
          <DialogContent>
            작업한 내용이 사라집니다. 
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => {setOpenConfirmCancle(false)}} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {setOpenConfirmCancle(false)}} color="primary">
              Ok
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PostWrite;