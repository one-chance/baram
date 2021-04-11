import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";

import IPost from "interfaces/Board/IPost";
import IComment from "interfaces/Board/IComment";
import CommentItem from "components/Board/CommentItem";

const useStyles = makeStyles(theme => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  pageSet: {
    alignItems: "center",
    width: "200px",
    "& button": {
      minWidth: "36px",
      height: "100%",
      border: "0 none",
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
  current: {
    color: "red",
    fontWeight: "bold",
  },
}));

interface IProps {
  post: IPost;
  commentList: Array<IComment>;
}

const PAGE_LENGTH = 5; // 한 페이지당 보여질 목록 개수
const PAGE_SET = 5; // 한번에 보여질 최대 페이지 개수

const PostCommentList = (props: IProps) => {
  const classes = useStyles();
  const { post, commentList } = props;

  const [allPageList, setAllPageList] = useState<Array<number>>([]);

  const [nowCommentList, setNowCommentList] = useState<Array<IComment>>([]);
  const [pageList, setPageList] = useState<Array<number>>([]);

  const [nowPage, setNowPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    if (commentList && commentList.length > 0) {
      const totalPages = [];
      for (let i = 0; i < commentList.length; i += PAGE_LENGTH) {
        totalPages.push(i / PAGE_LENGTH + 1);
      }

      setAllPageList(totalPages);
      setLastPage(totalPages[totalPages.length - 1]);
    }
  }, [commentList]);

  useEffect(() => {
    onHandlePageSet(1);
    // eslint-disable-next-line
  }, [allPageList]);

  // 페이지셋 목록 변화
  const onHandlePageSet = (page: number) => {
    const pageList = [];
    const ceil = Math.ceil(page / PAGE_SET);
    for (let i = ceil * PAGE_SET - PAGE_SET; i < ceil * PAGE_SET; i++) {
      if (allPageList[i]) pageList.push(allPageList[i]);
    }

    setPageList(pageList);
    onHandlePage(page);
  };
  const onHandlePrevPageSet = () => onHandlePageSet(nowPage - PAGE_SET);
  const onHandleNextPageSet = () => {
    const next = nowPage + PAGE_SET;
    lastPage <= next ? onHandlePageSet(lastPage) : onHandlePageSet(next);
  };
  const onHandleFirstPageSet = () => onHandlePageSet(1);
  const onHandleLastPageSet = () => onHandlePageSet(lastPage);

  // 페이지 이동에 따른 데이터 목록 변화
  const onHandlePage = (page: number) => {
    setNowPage(page);

    const end = page * PAGE_LENGTH;
    const start = end - PAGE_LENGTH;

    const _nowCommentList: Array<IComment> = [];
    for (let i = start; i < end; i++) {
      if (commentList[i]) _nowCommentList.push(commentList[i]);
      else break;
    }

    setNowCommentList(_nowCommentList);
  };

  return (
    <>
      {nowCommentList.length > 0 && (
        <>
          <div>
            {nowCommentList.map((comment, idx) => (
              <CommentItem key={idx} post={post} commentItem={comment} />
            ))}
          </div>

          <div className={classes.pagination}>
            {PAGE_SET < pageList[pageList.length - 1] ? (
              <div>
                <IconButton aria-label='comment-first-page' size='medium' onClick={() => onHandleFirstPageSet()} style={{ padding: "6px" }}>
                  <FirstPageIcon fontSize='inherit' />
                </IconButton>

                <IconButton aria-label='comment-prev-page' size='medium' onClick={() => onHandlePrevPageSet()} style={{ padding: "6px" }}>
                  <ChevronLeftIcon fontSize='inherit' />
                </IconButton>
              </div>
            ) : (
              <div>
                12
                <IconButton aria-label='comment-first-page' size='medium' style={{ padding: "6px" }}>
                  <FirstPageIcon fontSize='inherit' color='disabled' />
                </IconButton>
                <IconButton aria-label='comment-prev-page' size='medium' style={{ padding: "6px" }}>
                  <ChevronLeftIcon fontSize='inherit' color='disabled' />
                </IconButton>
              </div>
            )}

            <Grid container justify='center' className={classes.pageSet}>
              {pageList.map(page => (
                <Button key={`btn-comment-page-${page}`} className={nowPage === page ? classes.current : ""} onClick={() => onHandlePage(page)}>
                  {page}
                </Button>
              ))}
            </Grid>

            {pageList[pageList.length - 1] !== lastPage ? (
              <div>
                <IconButton aria-label='comment-next-page' size='medium' onClick={() => onHandleNextPageSet()} style={{ padding: "6px" }}>
                  <ChevronRightIcon fontSize='inherit' />
                </IconButton>

                <IconButton aria-label='comment-last-page' size='medium' onClick={() => onHandleLastPageSet()} style={{ padding: "6px" }}>
                  <LastPageIcon fontSize='inherit' />
                </IconButton>
              </div>
            ) : (
              <div>
                34
                <IconButton aria-label='comment-next-page' size='medium' style={{ padding: "6px" }}>
                  <ChevronRightIcon fontSize='inherit' color='disabled' />
                </IconButton>
                <IconButton aria-label='comment-last-page' size='medium' style={{ padding: "6px" }}>
                  <LastPageIcon fontSize='inherit' color='disabled' />
                </IconButton>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PostCommentList;
