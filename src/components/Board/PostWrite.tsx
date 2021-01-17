import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import IPost from "interfaces/Board/IPost";

import { CategoryType } from "interfaces/Board/IPost";
import { CreatePost, EditPost, getPost } from "utils/PostUtil";

import * as CommonUtil from "utils/CommonUtil";

interface IProps {
  tab: CategoryType;
  seq?: number;
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "20px",
    float: "left",
  },
  selector: {
    minWidth: "150px",
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "36px",
      textAlign: "center",
    },
  },
}));

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
  },
})(MenuItem);

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      // ['link', 'image', 'video']
      ['link', 'image']
    ],
    // container:  [['bold', 'italic', 'underline', 'blockquote'],
    // [{'list': 'ordered'}, {'list': 'bullet'}],
    // ['formula','link', 'image'],
    // ['clean']],
    // handlers: { 'image' : handleImage }
  },
  // imageUpload: {
  //   url: "image server url", // server url
  //   method: "POST", // change query method, default 'POST'
  //   name : 'images', // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
  //   headers: {
  //     Authorization: `Bearer tokenValue`, 
  //     'X-Total-Count': 0,
  //   },
  //   callbackOK: (serverResponse: any, next: any) => { // 성공하면 리턴되는 함수
  //       next(serverResponse);
  //   },
  //   callbackKO: (serverError: any) => { // 실패하면 리턴되는 함수
  //     console.log(serverError);
  //       // alert(serverError);
  //   },
  //   // optional
  //   // add callback when a image have been chosen
  //   checkBeforeSend: (file: any, next: any) => {
  //       console.log(file);
  //       next(file); // go back to component and send to the server
  //   }
  // },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  // imageDrop: true, // imageDrop 등록
  // imageResize: {} // imageResize 등록
};

const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video"];

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
          window.location.href = `/board/${category}/${seq}`;

          return false;
        }

        setTitle(res.title);
        setContent(res.content);
        setPost(res);
      }
    }
  };

  const _onChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as CategoryType);
    refTitle.current.focus();
  };

  const _onCancle = () => {
    setCategory("free");
    setTitle("");
    setContent("");
    setOpenConfirmCancle(false);

    window.history.back();
  };

  const _onWrite = async () => {
    setMyBackdrop(true);

    const res = seq ? await EditPost(title, content, post) : await CreatePost(category, title, content);

    if (res.code === 200) {
      setMyAlert({
        isOpen: true,
        severity: "success",
        duration: duration,
        message: res.message,
      });

      setTimeout(() => (document.location.href = `/board/${category}/${res.seq}`), duration);
    } else {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: duration,
        message: res.message,
      });

      setTimeout(() => {
        setMyBackdrop(false);
      }, duration);
    }
  };

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Grid container spacing={1} justify='flex-start'>
          <Grid item xs={3}>
            <Select variant='outlined' id='category' value={category} onChange={_onChangeCategory} displayEmpty className={classes.selector}>
              <Menus value={"tip"}>팁게시판</Menus>
              <Menus value={"free"}>자유게시판</Menus>
              <Menus value={"screenshot"}>스크린샷게시판</Menus>
              <Menus value={"server"}>서버게시판</Menus>
              <Menus value={"offer"}>구인게시판</Menus>
              <Menus value={"job"}>직업게시판</Menus>
            </Select>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <Button variant='contained' color='secondary' fullWidth onClick={() => setOpenConfirmCancle(true)} style={{ height: "40px" }}>
              취소
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant='contained' color='primary' fullWidth onClick={_onWrite} style={{ height: "40px" }}>
              저장
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              autoFocus
              margin='dense'
              id='title'
              placeholder='게시글의 제목을 입력하세요.'
              value={title}
              inputRef={refTitle}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div className='editor'>
              <ReactQuill
                value={content}
                theme='snow'
                modules={modules}
                formats={formats}
                style={{ height: "350px" }}
                placeholder='작성할 내용을 입력하세요.'
                onChange={e => {
                  setContent(e);
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={openConfirmCancle}>
        <DialogContent style={{ padding: "20px" }}>게시글 작성을 취소하시겠습니까?</DialogContent>
        <DialogActions style={{ padding: "0" }} disableSpacing={true}>
          <Button
            onClick={() => {
              setOpenConfirmCancle(false);
            }}
            color='primary'>
            돌아가기
          </Button>
          <Button onClick={_onCancle} color='primary'>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PostWrite;
