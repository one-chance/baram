import React from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
//Quill.register('modules/imageUpload', ImageUpload); // 커스텀 라이브러리를 등록해 준다.

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

import { CreatePost } from 'utils/PostUtil';

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

const modules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video']
    ],
    // container:  [['bold', 'italic', 'underline', 'blockquote'],
    // [{'list': 'ordered'}, {'list': 'bullet'}],
    // ['formula','link', 'image'],
    // ['clean']],
    // handlers: { 'image' : this.handleImage }
  },
  /*
  imageUpload: {
    url: "image server url", // server url
    method: "POST", // change query method, default 'POST'
    name : 'images', // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
    headers: {
      Authorization: `Bearer tokenValue`, 
      'X-Total-Count': 0,
    },
    callbackOK: (serverResponse, next) => { // 성공하면 리턴되는 함수
        next(serverResponse);
    },
    callbackKO: (serverError) => { // 실패하면 리턴되는 함수
      console.log(serverError);
        // alert(serverError);
    },
    // optional
    // add callback when a image have been chosen
    checkBeforeSend: (file, next) => {
        console.log(file);
        next(file); // go back to component and send to the server
    }
  },
  */
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  // imageDrop: true, // imageDrop 등록
  // imageResize: {} // imageResize 등록
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

const duration = 3000;

function PostWrite() {
  const classes = useStyles();
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [openConfirmCancle, setOpenConfirmCancle] = React.useState(false);
  const [category, setCategory] = React.useState(10);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const refTitle = React.useRef<any>();

  const _onChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as number);
    refTitle.current.focus();
  }

  const _onCancle = () => {
    setOpenConfirmCancle(true);
    setCategory(10);
    setTitle("");

  }

  const _onWrite = async () => {
    setMyBackdrop(true);

    const res = await CreatePost(category, title, content);
    
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
            <div className="editor">
              <ReactQuill
                value={content} // state 값
                theme="snow" // 테마값 이미 snow.css를 로드해서 제거해도 무망
                onChange={(e) => {setContent(e)}}
                modules={modules}
                formats={formats}
                placeholder={'내용을 입력해주세요'}
              />
            </div>
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
            <Button onClick={_onCancle} color="primary">
              Ok
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PostWrite;