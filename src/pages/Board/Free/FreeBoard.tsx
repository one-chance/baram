import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import IPost from 'interfaces/Board/IPost';
import { getPosts } from 'utils/PostUtil';

import Board from 'components/Board/Board';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px"
  },
}));

function FreeBoard() {
  const classes = useStyles();

  const [posts, setPosts] = React.useState<Array<IPost>>([]);

  useEffect(() => {
    _onLoad();
  }, []);

  const _onLoad = async () => {
    setPosts(await getPosts("free"));
  }

  return (
    <Container
      className={classes.root}>
      {/* <Link href="/board/write/free" variant="body2">
          글쓰기
      </Link> */}
      <Board posts={posts} page={2}/>
    </Container>
  );
}

export default FreeBoard;