import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
}));

function FreeBoard() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography>
        자유게시판
      </Typography>
      <Link href="/board/write" variant="body2">
          글쓰기
      </Link>
    </React.Fragment>
  );
}

export default FreeBoard;