import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState } from "state/index";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import IPost from "interfaces/Board/IPost";
import { getPosts } from "utils/PostUtil";

import Board from "components/Board/Board";

const nowCategory = "tip";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "20px",
  },
}));

function TipBoard({ location }: any) {
  const classes = useStyles();
  const query = queryString.parse(location.search);
  const setFilter = useSetRecoilState(FilterState);
  let filterUri: string;
  let filter;
  let keyword;
  if (Object.keys(query).length > 0) {
    for (let prop in query) {
      filter = prop;
      keyword = query[prop]?.toString();
    }
    setFilter({
      filter: filter,
      keyword: keyword,
    });
    filterUri = `${filter}=${keyword}`;
  }

  const [posts, setPosts] = React.useState<Array<IPost>>([]);

  useEffect(() => {
    _onLoad();
    // eslint-disable-next-line
  }, []);

  const _onLoad = async () => {
    setPosts(await getPosts(nowCategory, filterUri));
  };

  return (
    <Container className={classes.root}>
      <Board category={nowCategory} posts={posts} page={2} />
    </Container>
  );
}

export default TipBoard;
