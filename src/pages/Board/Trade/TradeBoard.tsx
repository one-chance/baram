import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState } from "state/index";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import IPost from "interfaces/Board/IPost";
import { getPosts } from "utils/PostUtil";

import Board from "components/Board/Board";

const nowCategory = "trade";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 0 15px 0",
    float: "left",
  },
}));

function TradeBoard({ location }: any) {
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

  const _onLoad = async () => {
    console.log(nowCategory);
    setPosts(await getPosts(nowCategory, filterUri));
  };

  useEffect(() => {
    _onLoad();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className={classes.root}>
      <Board category={nowCategory} posts={posts} page={2} />
    </Container>
  );
}

export default TradeBoard;
