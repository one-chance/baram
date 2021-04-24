import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState } from "state/index";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { GridPageChangeParams } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";

import IPost from "interfaces/Board/IPost";
import { getPosts, getPostCount } from "utils/PostUtil";

import Board from "components/Board/Board";

const nowCategory = "free";

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    margin: "10px 0",
    padding: "0",
  },
}));

function FreeBoard({ location }: any) {
  const classes = useStyles();
  const query = queryString.parse(location.search);
  const setFilter = useSetRecoilState(FilterState);
  const [rowCount, setRowCount] = React.useState<number>(0); 

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
    setRowCount(await getPostCount(nowCategory, filterUri));
    setPosts(await getPosts(nowCategory, filterUri, 0, 10));
  };

  const _onPageChanged = async(params: GridPageChangeParams) => {
    setPosts(await getPosts(nowCategory, filterUri, params.page, params.pageSize));
  }

  useEffect(() => {
    _onLoad();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container justify='center' className={classes.root}>
      <Board category={nowCategory} posts={posts} page={2} rowCount={rowCount} onPageChange={_onPageChanged}/>
    </Grid>
  );
}

export default FreeBoard;
