import React, { useEffect } from 'react';
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

import IPost from 'interfaces/Board/IPost';

import MyButton from 'elements/Button/MyButton';

import { CategoryType } from 'interfaces/Board/IPost';

import { CreatePost, EditPost, getPost } from 'utils/PostUtil';

import * as CommonUtil from 'utils/ComoonUtil';

interface IProps {
  tab: CategoryType,
  seq?: number
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
  selector: {
    minWidth: "180px",
    textAlign: "center",
  },
  buttonZone: {
    marginTop: "10px"
  }
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

function PostWrite(props: IProps) {
  const classes = useStyles();
  const { tab, seq } = props;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  
  const refTitle = React.useRef<any>();

  const [openConfirmCancle, setOpenConfirmCancle] = React.useState(false);
  const [category, setCategory] = React.useState<CategoryType>(tab);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [post, setPost] = React.useState<IPost>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (tab) setCategory(tab);

    if (seq) {
      const res: IPost | null = await getPost(category, seq);
      if (res) {

        if (res.writer.key !== CommonUtil.getNowKey()) {
          alert("수정 권한이 없습니다.");
          window.location.href = `/board/${category}/${seq}`

          return false;
        }

        setTitle(res.title);
        setContent(res.content);
        setPost(res);
      }
    }
  }

  const _onChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as CategoryType);
    refTitle.current.focus();
  }

  const _onCancle = () => {
    setCategory("free");
    setTitle("");
    setContent("");
    setOpenConfirmCancle(false);
    
    window.history.back();
  }

  const _onWrite = async () => {
    setMyBackdrop(true);

    const res = seq ? 
      await EditPost(title, content, post) :
      await CreatePost(category, title, content)
    
    if (res.code === 200) {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message
      });

      setTimeout(() => document.location.href = `/board/${category}/${res.seq}`, duration);
    }
    else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message
      });
      
      setTimeout(()=> { setMyBackdrop(false); }, duration);
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
                <MenuItem value={"tip"}>팁게시판</MenuItem>
                <MenuItem value={"free"}>자유게시판</MenuItem>
                <MenuItem value={"screenshot"}>스크린샷게시판</MenuItem>
                <MenuItem value={"server"}>서버게시판</MenuItem>
                <MenuItem value={"offer"}>구인게시판</MenuItem>
                <MenuItem value={"job"}>직업게시판</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="Title"
              value={title}
              inputRef={refTitle}
              onChange={(e) => {setTitle(e.target.value)}}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="editor">
              <ReactQuill
                value={content}
                theme="snow"
                modules={modules}
                formats={formats}
                placeholder={'내용을 입력해주세요'}
                onChange={(e) => {setContent(e)}}
              />
            </div>
          </Grid>
          <Grid container item xs={12}
            justify="space-between"
            className={classes.buttonZone}>
              {/* <Grid item xs={3}>
                <MyButton
                  color="red"
                  text="취소"
                  onClick={() => setOpenConfirmCancle(true)}/>
              </Grid>
              <Grid item xs={3}>
                <MyButton
                  color="blue"
                  text="저장"
                  onClick={_onWrite}/>
              </Grid> */}
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => setOpenConfirmCancle(true)}>
                    취소
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained" 
                  color="primary"
                  fullWidth
                  onClick={_onWrite}>
                    저장
                </Button>
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
            <Button onClick={() => {setOpenConfirmCancle(false)}} color="primary">
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