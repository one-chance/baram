import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState, MyBackdropState } from "state/index";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { GridPageChangeParams } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";

import IPost from "interfaces/Board/IPost";
import BoardM from "components/Board/BoardM";
import { getPosts, getPostCount } from "utils/PostUtil";

const nowCategory = "tip";

const useStyles = makeStyles({
  root: {
    width: "auto",
    margin: "10px 0",
    padding: "0",
  },
});

function TipBoard({ location }: any) {
  const classes = useStyles();
  const query = queryString.parse(location.search);
  const setFilter = useSetRecoilState(FilterState);
  const [rowCount, setRowCount] = useState<number>(0);
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const _onPageChanged = async (page: number, articleSize: number) => {
    await initPage(page, articleSize);
  };

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
      if (filterUri === ``) filterUri += currentQuery[idx];
      else filterUri += `&` + currentQuery[idx];
    }

    setFilter({
      query: currentQuery,
    });

    setMyBackdrop(true);
    setRowCount(await getPostCount(nowCategory, filterUri));
    setPosts(await getPosts(nowCategory, filterUri, page, pageSize));
    setMyBackdrop(false);
  };

  useEffect(() => {
    initPage(0, 10);
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container justify='center' className={classes.root}>
      <BoardM 
        category={nowCategory} 
        posts={posts} 
        page={2} 
        totalArticleCount={rowCount} 
        articleSize={10}
        onPageChange={_onPageChanged} />
    </Grid>
  );
}

export default TipBoard;
