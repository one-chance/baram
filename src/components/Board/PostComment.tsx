import React, { useEffect } from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {MyAlertState, MyBackdropState} from 'state/index';
import {CommentListState} from 'state/index';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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

import { CreateComment } from 'utils/PostUtil';

import Comment from 'components/Board/Comment';

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
let comments: Array<IComment> = [];

function PostComment(props: IProps) {

  const classes = useStyles();
  const post: IPost = props.post;

  const setMyAlert = useSetRecoilState(MyAlertState);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);
  const [commentList, setCommentList] = useRecoilState(CommentListState);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [count, setCount] = React.useState(0);
  const [inputComment, setInputComment] = React.useState("");
  // const [viewCommentList, setViewCommentList] = React.useState<Array<IComment>>([]);

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, comments.length - page * rowsPerPage);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, commentList.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //NOTE 최초 로딩 시 
  useEffect(() => {
    if (post.commentList) {
      setCount(post.commentList.length);
      // comments = post.commentList;
      setCommentList(post.commentList);
    }
  }, []);

  //NOTE 댓글 목록 변경 시
  useEffect(() => {
    setCount(commentList.length);
  }, [commentList]);

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

        setMyBackdrop(false);
        setInputComment("");
        setCommentList(res.commentList);
        post.commentIdx = res.commentIdx;

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
                value={inputComment}
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
                {/* <TableHead></TableHead> */}
                <TableBody>
                  { (rowsPerPage > 0
                    ? commentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : commentList
                  ).map((comment: IComment) => (
                    <Comment
                      key={comment.idx}
                      post={post}
                      comment={comment}/>
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
                      // count={comments.length}
                      count={commentList.length}
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