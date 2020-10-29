import React, { useEffect } from 'react';
import {useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import IPost from 'interfaces/Board/IPost';
import IComment from 'interfaces/Board/IComment';

import { CreateComment, CreateRecomment } from 'utils/PostUtil';

interface IProps {
  post: IPost
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
  },
  input: {
    backgroundColor: "#ffffff",
    border: "2px",
    padding: "20px",
  },
  inputButton: {
    height: "100%"
  },
  footer: {
    marginTop: '50px',
    textAlign: 'center'
  },
  table: {
    minWidth: 500,
    padding: "20px",
    backgroundColor: "#ffffff",
    '& .MuiTablePagination-root': {
      textAlign: 'center',
      align: 'center',
      margin: 'auto'
    }
  },
  commentRow: {
    backgroundColor: "#d6e0f0",
  },
  recommentRow: {
    backgroundColor: "#f1f3f8",
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
let comments: Array<IComment> = [];

function PostComment(props: IProps) {

  const classes = useStyles();
  const post: IPost = props.post;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, comments.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [count, setCount] = React.useState(0);
  const [inputComment, setInputComment] = React.useState("");
  const [inputRecomment, setInputRecomment] = React.useState("");

  const [commentIdx, setCommentIdx] = React.useState(-1);

  useEffect(() => {
    if (post.commentList) {
      setCount(post.commentList.length);
      comments = post.commentList;
    }
  }, []);

  const _onSubmitComment = async () => {
    setMyBackdrop(true);

    if (post.seq) {
      const res = await CreateComment(post, inputComment);
  
      if (res.code === 200) {
        setMyAlert({
          isOpen: true,
          severity: "success",
          duration: duration,
          message: res.message
        });
  
        setTimeout(() => document.location.reload(), duration);
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
  
        setTimeout(() => document.location.reload(), duration);
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

  // TODO 댓글 수정, 삭제 기능 구현
  const _onEdit = async () => {
    alert("구현 예정인 기능입니다.");
  }

  const _onDelete = async () => {
    alert("구현 예정인 기능입니다.");
  }

  return (
    <Container
      className={classes.root}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2">
              {count} 개의 댓글이 있습니다.
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={10}>
              <Input
                type="text"
                id="input-comment"
                className={classes.input}
                multiline
                fullWidth
                rows={4}
                placeholder="댓글을 입력하세요. 올바른 언어 사용 문화를 지지합니다."
                onChange={(e) => setInputComment(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                className={classes.inputButton}
                fullWidth
                variant="outlined"
                color="primary"
                onClick={_onSubmitComment}>
                  등록
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table 
                className={classes.table} aria-label="custom pagination table">
                <TableBody>
                  {(rowsPerPage > 0
                    ? comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : comments
                  ).map((comment: IComment) => (
                    <Box key={comment.idx}>
                      <TableRow key={comment.idx} className={classes.commentRow}>
                        <TableCell  style={{ width: "20%" }} component="th" scope="row">
                          [{comment.writer.key}]{comment.writer.id}<br/>
                          {comment.writer.createDateString}
                        </TableCell>
                        <TableCell style={{ width: "70%" }}>
                          <Typography>
                            {comment.message}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ width: "10%" }} align="right">
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
                                onClick={_onEdit}>
                                  수정
                              </Button>
                            </Grid> 
                            <Grid item>
                              <Button
                                onClick={_onDelete}>
                                  삭제
                              </Button>
                            </Grid> 
                          </Grid>
                        </TableCell>
                      </TableRow>
                      {
                        (comment.recommentList && comment.recommentList.length > 0) &&
                          comment.recommentList.map((recomment) => (
                            <TableRow key={`${comment.idx}-${recomment.idx}`} className={classes.recommentRow}>
                              <TableCell  style={{ width: "20%" }} component="th" scope="row">
                                [{recomment.writer.key}]{recomment.writer.id}<br/>
                                {recomment.writer.createDateString}
                              </TableCell>
                              <TableCell style={{ width: "70%" }}>
                                {recomment.message}
                              </TableCell>
                              <TableCell style={{ width: "10%" }} align="right">
                                <Grid container direction="row"
                                  className={classes.commentButton}>
                                  <Grid item>
                                    <Button>
                                      수정
                                    </Button>
                                  </Grid> 
                                  <Grid item>
                                    <Button>
                                      삭제
                                    </Button>
                                  </Grid> 
                                </Grid>
                              </TableCell>
                            </TableRow>
                          ))
                      }
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
                    </Box>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      labelRowsPerPage="표시 개수"
                      labelDisplayedRows={(paginationInfo) => {
                        return `총 ${paginationInfo.count}개 중 
                                ${paginationInfo.from} - 
                                ${paginationInfo.to === -1 ? "All" : paginationInfo.to}`;
                      }}
                      colSpan={3}
                      count={comments.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
    </Container>
  ); 
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.tableButton}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default PostComment;