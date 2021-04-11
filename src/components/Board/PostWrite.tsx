import React, { useEffect, useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSetRecoilState } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import IPost from "interfaces/Board/IPost";
import { CategoryType } from "interfaces/Board/IPost";
import { CreatePost, EditPost, getPost } from "utils/PostUtil";
import * as CommonUtil from "utils/CommonUtil";
import IServer from "interfaces/Common/IServer";
import { getServerList } from "utils/CommonUtil";

interface IProps {
  tab: CategoryType;
  seq?: number;
}

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: "660px",
    margin: "10px 0",
  },
  selector: {
    width: "150px",
    margin: "0 5px",
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "36px",
      textAlign: "center",
    },
  },
  box: {
    margin: "5px 0",
    height: "550px",
    "& div": {
      width: "100%",
      maxHeight: "500px",
    },
  },
}));

const Menus = withStyles({
  root: {
    fontSize: "0.9rem",
    justifyContent: "center",
    padding: "6px 0",
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
      ["link", "image"],
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

  const refTitle = useRef<any>();

  const [openConfirmCancle, setOpenConfirmCancle] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [category, setCategory] = useState<CategoryType>(tab);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState<IPost>();

  const [server, setServer] = useState<IServer>();
  const serverList = getServerList();

  useEffect(() => {
    const init = async () => {
      if (tab) setCategory(tab);

      if (tab === "trade") setServer(serverList[0]);

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
    init();
  }, [category, seq, tab]);

  const _onCancle = () => {
    setCategory("free");
    setTitle("");
    setContent("");
    setOpenConfirmCancle(false);

    window.history.back();
  };

  const _onWrite = async () => {
    setMyBackdrop(true);

    let res: any;
    if (server) res = seq ? await EditPost(title, content, post, server.key) : await CreatePost(category, title, content, server.key);
    else res = seq ? await EditPost(title, content, post) : await CreatePost(category, title, content);

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
      <Grid container direction='row' justify='center' className={classes.root}>
        <Grid container justify='space-between' style={{ minWidth: "850px", margin: "5px 0" }}>
          <div style={{ padding: "0" }}>
            <Select variant='outlined' id='category' value={category} className={classes.selector} disabled={true}>
              <Menus value={"tip"}>팁게시판</Menus>
              <Menus value={"free"}>자유게시판</Menus>
              <Menus value={"screenshot"}>스크린샷게시판</Menus>
              <Menus value={"server"}>서버게시판</Menus>
              <Menus value={"offer"}>구인게시판</Menus>
              <Menus value={"job"}>직업게시판</Menus>
              <Menus value={"trade"}>거래게시판</Menus>
            </Select>

            {category === "trade" ? (
              <Select variant='outlined' id='server' value={server ? server.key : ""} className={classes.selector} style={{ width: "100px" }}>
                {serverList.map(sv => (
                  <Menus value={sv.key} onClick={() => setServer(sv)}>
                    {sv.name}
                  </Menus>
                ))}
              </Select>
            ) : (
              ""
            )}
          </div>
          <div style={{ padding: "0" }}>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setOpenConfirmCancle(true)}
              style={{ width: "100px", margin: "0 5px", height: "40px", boxShadow: "none" }}>
              취소
            </Button>
            <Button
              variant='outlined'
              onClick={() => {
                if (title !== "" && content !== "") setOpenPreview(true);
              }}
              style={{ width: "100px", margin: "0 5px", height: "40px" }}>
              미리보기
            </Button>
            <Button variant='contained' color='primary' onClick={_onWrite} style={{ width: "100px", margin: "0 5px", height: "40px", boxShadow: "none" }}>
              작성
            </Button>
          </div>
        </Grid>
        <Grid container style={{ height: "auto", padding: "0", margin: "5px 0" }}>
          <TextField
            variant='outlined'
            required
            fullWidth
            autoFocus
            id='title'
            placeholder='게시글의 제목을 입력하세요.'
            value={title}
            inputRef={refTitle}
            inputProps={{ style: { padding: "0 10px", height: "40px", lineHeight: "40px", fontSize: "1rem" } }}
            style={{ margin: "2.5px 0" }}
            onChange={e => {
              if (e.target.value.length < 25) {
                setTitle(e.target.value);
              }
            }}
          />
        </Grid>
        <Grid container className={classes.box}>
          <ReactQuill
            value={content}
            theme='snow'
            modules={modules}
            formats={formats}
            style={{ maxHeight: "550px" }}
            placeholder='작성할 내용을 입력하세요.'
            onChange={e => {
              setContent(e);
            }}
          />
        </Grid>
      </Grid>

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
      <Dialog open={openPreview} maxWidth='lg'>
        <DialogTitle style={{ fontWeight: "bold", textAlign: "center" }}>{title}</DialogTitle>
        <Divider />
        <DialogContent style={{ padding: "10px" }} dangerouslySetInnerHTML={{ __html: content }}></DialogContent>
        <Divider />
        <DialogActions style={{ padding: "0" }} disableSpacing={true}>
          <Button
            onClick={() => {
              setOpenPreview(false);
            }}
            color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PostWrite;
