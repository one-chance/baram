import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MyAlertState, MyBackdropState } from "state/index";
import ServerState from "state/Board/ServerState";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import IPost from "interfaces/Board/IPost";
import { CategoryType } from "interfaces/Board/IPost";
import { CreatePost, EditPost, getPost } from "utils/PostUtil";
import IServer from "interfaces/Common/IServer";
import { getServerList } from "utils/CommonUtil";

interface IProps {
  tab: CategoryType;
  seq?: number;
}

const useStyles = makeStyles({
  selector: {
    width: "160px",
    margin: "5px 0",
    "& .MuiSelect-selectMenu": {
      padding: "2px 20px 2px 5px",
      lineHeight: "36px",
      textAlign: "center",
    },
  },
  box: {
    margin: "5px 0",
    "& .quill": {
      width: "100%",
      minHeight: "500px",
      height: "100%",
    },
    "& .ql-editor.ql-blank": {
      padding: "10px",
      height: "460px",
    },
    "& .ql-editor .ql-video": {
      width: "800px",
      height: "450px",
      margin: "0 auto",
    },
    "& .ql-container.ql-snow": {
      maxHeight: "460px",
    },
    "& .ql-toolbar.ql-snow": {
      minHeight: "40px",
      padding: "5px",
    },
  },
  preview: {
    minWidth: "40vw",
    minHeight: "30vh",
    padding: "10px",
    "& p": {
      margin: "5px 0",
    },
    "& h1": {
      margin: "15px 0",
    },
    "& h2": {
      margin: "10px 0",
    },
  },
  dlgBox: {
    minWidth: "400px",
    minHeight: "150px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& h6": {
      width: "100%",
      textAlign: "center",
      fontWeight: "bold",
    },
  },
  btn: {
    minWidth: "100px",
    margin: "5px 0",
    padding: "0",
    height: "40px",
    boxShadow: "none",
  },
});

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
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "color",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const duration = 3000;

function PostWrite(props: IProps) {
  const classes = useStyles();
  const { tab, seq } = props;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  var serverName = useRecoilValue(ServerState);

  const [openConfirmCancle, setOpenConfirmCancle] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [category, setCategory] = useState<CategoryType>(tab);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState<IPost>();

  const [server, setServer] = useState<IServer>();
  const serverList = getServerList();

  const _onCancle = () => {
    setOpenConfirmCancle(false);
    window.history.back();
  };

  const _onWrite = async () => {
    setMyBackdrop(true);

    //post의 writer랑 현재 아이디랑 같아야 수정 가능하게 변경해야 함
    // 최초 작성 seq는 undefined, 수정은 seq 번호
    let res: any;

    if (server) {
      res = seq ? await EditPost(title, content, post, server.key) : await CreatePost(category, title, content, server.key);
    } else {
      res = seq ? await EditPost(title, content, post) : await CreatePost(category, title, content);
    }

    if (!res) {
      setMyAlert({
        isOpen: true,
        severity: "error",
        duration: 2000,
        message: "수정 권한이 없습니다.",
      });
      setTimeout(() => {
        setMyBackdrop(false);
      }, 2000);
      document.location.href = `/board/${category}`;
      return;
    }

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

  useEffect(() => {
    const init = async () => {
      if (tab) setCategory(tab);

      if (tab === "trade") setServer(serverList[serverName]);

      if (seq) {
        const res: IPost | null = await getPost(category, seq);
        if (res) {
          setTitle(res.title);
          setContent(res.content);
          setPost(res);
        }
      }
    };
    init();
    return () => {
      localStorage.removeItem("recoil-persist");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Grid container style={{ maxWidth: "960px" }}>
        <Grid item container justify='space-between'>
          <div style={{ padding: "0" }}>
            <Select variant='outlined' id='category' value={category} className={classes.selector} disabled={true}>
              <Menus value={"tip"}>팁 게시판</Menus>
              <Menus value={"free"}>자유 게시판</Menus>
              <Menus value={"screenshot"}>스샷 게시판</Menus>
              <Menus value={"server"}>서버 게시판</Menus>
              <Menus value={"offer"}>구인 게시판</Menus>
              <Menus value={"job"}>직업 게시판</Menus>
              <Menus value={"trade"}>거래 게시판</Menus>
            </Select>

            {category === "trade" ? (
              <Select
                variant='outlined'
                id='server'
                className={classes.selector}
                style={{ width: "100px", margin: "0 5px" }}
                value={server ? server.key : ""}
                disabled>
                {serverList.map(sv => (
                  <Menus key={sv.key} value={sv.key} onClick={() => setServer(sv)}>
                    {sv.name}
                  </Menus>
                ))}
              </Select>
            ) : (
              ""
            )}
          </div>
          <div style={{ padding: "0" }}>
            <Button variant='contained' color='secondary' className={classes.btn} onClick={() => setOpenConfirmCancle(true)}>
              취소
            </Button>
            <Button
              variant='outlined'
              className={classes.btn}
              onClick={() => {
                if (title !== "" && content !== "") setOpenPreview(true);
              }}
              style={{ margin: "0 10px" }}>
              미리보기
            </Button>
            <Button variant='contained' color='primary' onClick={_onWrite} className={classes.btn}>
              작성
            </Button>
          </div>
        </Grid>
        <Grid item container style={{ height: "auto", padding: "0", margin: "5px 0" }}>
          <TextField
            variant='outlined'
            required
            fullWidth
            autoFocus
            id='title'
            autoComplete='off'
            placeholder='게시글의 제목을 입력하세요.'
            value={title}
            inputProps={{ style: { padding: "0 8px", height: "40px", lineHeight: "40px", fontSize: "1rem" } }}
            style={{ margin: "2.5px 0" }}
            onChange={e => {
              if (e.target.value.length < 26) {
                setTitle(e.target.value);
              }
            }}
          />
        </Grid>
        <Grid item container className={classes.box}>
          <ReactQuill
            value={content}
            theme='snow'
            modules={modules}
            formats={formats}
            placeholder='작성할 내용을 입력하세요.'
            onChange={e => {
              setContent(e);
            }}
          />
        </Grid>
      </Grid>

      <Dialog
        open={openConfirmCancle}
        onClose={() => {
          setOpenConfirmCancle(false);
        }}>
        <DialogContent dividers={true} className={classes.dlgBox}>
          <Typography variant='h6'>게시글 작성을 취소하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions style={{ padding: "0" }} disableSpacing={true}>
          <Button
            onClick={() => {
              setOpenConfirmCancle(false);
            }}
            style={{ fontWeight: "bold" }}
            color='primary'>
            취소
          </Button>
          <Button onClick={_onCancle} color='primary' style={{ fontWeight: "bold" }}>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPreview} maxWidth='lg'>
        <DialogTitle>
          <span style={{ fontWeight: "bold", textAlign: "center" }}>{title}</span>
        </DialogTitle>
        <DialogContent className={classes.preview} dividers={true} dangerouslySetInnerHTML={{ __html: content }}></DialogContent>
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
