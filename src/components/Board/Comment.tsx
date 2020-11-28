import React, { useEffect } from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';
import {CommentListState} from 'state/index';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import IPost from 'interfaces/Board/IPost';
import IComment from 'interfaces/Board/IComment';

import { CreateRecomment, DeleteComment, EditComment, EditRecomment, DeleteRecomment } from 'utils/PostUtil';

interface IProps {
  post: IPost,
  comment: IComment
}

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "#ffffff",
    border: "2px",
    padding: "20px",
  },
  commentRow: {
    backgroundColor: "#f1f3f8",
  },
  recommentRow: {
    backgroundColor: "#d6e0f0",
  },
  commentButton: {
    spacing: "5"
  },
  tableButton: {
    flexShrink: 0,
    width: 'auto'
  }
}));

const duration = 2000;

function Comment(props: IProps) {
  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const setCommentList = useSetRecoilState(CommentListState);

  const classes = useStyles();
  const { post } = props;
  const [comment, setComment] = React.useState<IComment | null>(props.comment);
  const [recommentList, setRecommentList] = React.useState<Array<IComment>>([]);
  
  const [editComment, setEditComment] = React.useState("");
  const [editCommentIdx, setEditCommentIdx] = React.useState<number | undefined>(undefined);

  const [commentIdx, setCommentIdx] = React.useState(-1); // 답글 달 대상이 될 댓글 인덱스 값
  const [inputRecomment, setInputRecomment] = React.useState("");
  const [editRecomment, setEditRecomment] = React.useState("");
  const [editRecommentIdx, setEditRecommentIdx] = React.useState<number | undefined>(undefined);

  useEffect(() => {
    if (props.comment.recommentList) setRecommentList(props.comment.recommentList);
  }, []);

  const _onSubmitRecomment = async () => {
    setMyBackdrop(true);

    if (post.seq) {
      const res = await CreateRecomment(post, commentIdx, inputRecomment);
  
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });
  
        setMyBackdrop(false);
        setCommentIdx(-1);
        setInputRecomment("");
        setRecommentList(recommentList.concat(res.recomment));
        setCommentList(res.commentList);

        // setTimeout(() => document.location.reload(), duration);
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
  }

  const _onEditComment = async (comment: IComment) => {
    setMyBackdrop(true);

    comment = {
      ...comment,
      message: editComment
    }

    if (post.seq) {
      const res = await EditComment(post, comment);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });
        
        setMyBackdrop(false);
        setEditCommentIdx(undefined);
        setComment(res.comment);
        setCommentList(res.commentList);
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
  }

  const _onDeleteComment = async (commentIdx?: number) => {
    setMyBackdrop(true);

    if (commentIdx !== undefined) {
      const res = await DeleteComment(post, commentIdx);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });
  
        setMyBackdrop(false);
        setComment(null);

        setCommentList(res.commentList);
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
  }
  
  const _onEditRecomment = async (recomment: IComment) => {
    if (recommentList) {
      setMyBackdrop(true);
  
      recomment = {
        ...recomment,
        message: editRecomment
      }
  
      if (comment && comment.idx) {
        const res = await EditRecomment(post, comment.idx, recomment);
        if (res.code === 200) {
          setMyAlert({
            isOpen: true,
            severity: "success",
            duration: duration,
            message: res.message
          });
          
          setMyBackdrop(false);
          setEditRecommentIdx(undefined);
          setRecommentList(res.recommentList);

          setCommentList(res.commentList);
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
    }
  }

  const _onDeleteRecomment = async (commentIdx?: number, recommentIdx?: number) => {
    setMyBackdrop(true);

    if (commentIdx !== undefined && recommentIdx !== undefined) {
      const res = await DeleteRecomment(post, commentIdx, recommentIdx);
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });
  
        setMyBackdrop(false);
        setRecommentList(res.recommentList)

        setCommentList(res.commentList);
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
  }

  return (
    comment && 
      <TableContainer key={comment.idx}>
        <TableRow key={comment.idx} className={classes.commentRow}>
          <TableCell  style={{ width: "20%" }} component="th" scope="row">
            {comment.writer.id}<br/>
            {comment.writer.lastEditDateString}
          </TableCell>
          <TableCell style={{ width: "70%" }}>
            {
              editCommentIdx === comment.idx ?
                <Input
                  type="text"
                  id="edit-comment"
                  className={classes.input}
                  multiline
                  fullWidth
                  rows={4}
                  placeholder={comment.message}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
              :
                <Typography>
                  {comment.message}
                </Typography>
            }
          </TableCell>
          <TableCell style={{ width: "10%" }} align="right">
            {
              editCommentIdx === comment.idx ?
                <Grid container direction="row"
                  className={classes.commentButton}>
                  <Grid item>
                    <Button
                      onClick={() => _onEditComment(comment)}>
                        완료
                    </Button>
                  </Grid> 
                  <Grid item>
                    <Button
                      onClick={() => setEditCommentIdx(undefined)}>
                        취소
                    </Button>
                  </Grid> 
                </Grid>
              :
                <Grid container direction="row"
                  className={classes.commentButton}>
                  <Grid item>
                    <Button
                      onClick={() => {
                        setCommentIdx(comment.idx !== undefined ? comment.idx : -1);
                      }}>
                        답글
                    </Button>
                  </Grid> 
                  <Grid item>
                    <Button
                      onClick={() => {
                        setEditRecommentIdx(undefined);
                        setEditComment(comment.message);
                        setEditCommentIdx(comment.idx);
                      }}>
                        수정
                    </Button>
                  </Grid> 
                  <Grid item>
                    <Button
                      onClick={() => _onDeleteComment(comment.idx)}>
                        삭제
                    </Button>
                  </Grid> 
                </Grid>
            }
          </TableCell>
        </TableRow>
        {
          commentIdx === comment.idx &&
            <TableRow key={comment.idx}>
              <TableCell  style={{ textAlign: "center", verticalAlign: "middle", margin: "auto", width: "20%" }} component="th" scope="row">
                <Typography variant="subtitle1">
                  <SubdirectoryArrowRightIcon/> 답글 달기
                </Typography>
              </TableCell>
              <TableCell style={{ width: "70%" }}>
                <Input
                  id="input-recomment"
                  className={classes.input}
                  multiline
                  fullWidth
                  rows={4}
                  placeholder="답글을 입력하세요. 올바른 언어 사용 문화를 지지합니다."
                  value={inputRecomment}
                  onChange={(e) => setInputRecomment(e.target.value)}
                />
              </TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                <Button
                  onClick={_onSubmitRecomment}>
                    등록
                </Button>
                <Button
                  onClick={() => setCommentIdx(-1)}>
                    취소
                </Button>
              </TableCell>
            </TableRow>
        }
        {
          recommentList.length > 0 &&
            recommentList.map((recomment: IComment) => (
              (recomment.idx !== null && recomment.idx !== undefined) &&
              <TableRow key={`${comment.idx}-${recomment.idx}`} className={classes.recommentRow}>
                <TableCell  style={{ width: "20%" }} component="th" scope="row">
                  {recomment.writer.id}<br/>
                  {recomment.writer.lastEditDateString}
                </TableCell>
                <TableCell style={{ width: "70%" }}>
                {
                  editRecommentIdx === recomment.idx ?
                    <Input
                      type="text"
                      id="edit-comment"
                      className={classes.input}
                      multiline
                      fullWidth
                      rows={4}
                      placeholder={recomment.message}
                      value={editRecomment}
                      onChange={(e) => setEditRecomment(e.target.value)}
                    />
                  :
                    <Typography>
                      {recomment.message}
                    </Typography>
                }
                </TableCell>
                <TableCell style={{ width: "10%" }} align="right">
                {
                  editRecommentIdx === recomment.idx ?
                    <Grid container direction="row"
                      className={classes.commentButton}>
                      <Grid item>
                        <Button
                          onClick={() => _onEditRecomment(recomment)}>
                            완료
                        </Button>
                      </Grid> 
                      <Grid item>
                        <Button
                          onClick={() => setEditRecommentIdx(undefined)}>
                            취소
                        </Button>
                      </Grid> 
                    </Grid>
                  :
                    <Grid container direction="row"
                      className={classes.commentButton}>
                      <Grid item>
                        <Button
                          onClick={() => {
                            setEditCommentIdx(undefined);
                            setEditRecomment(recomment.message);
                            setEditRecommentIdx(recomment.idx)
                          }}>
                            수정
                        </Button>
                      </Grid> 
                      <Grid item>
                        <Button
                          onClick={() => _onDeleteRecomment(comment.idx, recomment.idx)}>
                            삭제
                        </Button>
                      </Grid> 
                    </Grid>
                } 
                </TableCell>
              </TableRow>
            ))
        }
      </TableContainer>
  ); 
}

export default Comment;