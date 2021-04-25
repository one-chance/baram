import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState, MyBackdropState } from "state/index";
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
  const [rowCount, setRowCount] = useState<number>(0);
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  useEffect(() => {
    _onLoad();
  }, []);

  const _onLoad = async () => {
    await initPage(0, 10);
  };

  const _onPageChanged = async(params: GridPageChangeParams) => {
    await initPage(params.page, params.pageSize);
  }

  const initPage = async (page: number, pageSize: number) => {
    let filterUri: string;
    let currentQuery = Array<string>();

    if (Object.keys(query).length > 0) {
      for (let prop in query) {
        let qu = `` + prop + `=` + query[prop]?.toString();
        currentQuery.push(qu);
      }
    }

    filterUri = ``;
    for (let idx in currentQuery) {
      if(filterUri === ``)
        filterUri += currentQuery[idx];
      else
        filterUri += `&` + currentQuery[idx];
    }

    setFilter({
      query : currentQuery
    });

    setMyBackdrop(true);
    setRowCount(await getPostCount(nowCategory, filterUri));
    setPosts(await getPosts(nowCategory, filterUri, page, pageSize));
    setMyBackdrop(false);
  }

  return (
    <Grid container justify='center' className={classes.root}>
      <Board category={nowCategory} posts={posts} page={2} rowCount={rowCount} onPageChange={_onPageChanged}/>
    </Grid>
  );
}

export default FreeBoard;
