import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState, MyBackdropState } from "state/index";
import queryString from "query-string";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ServerState from "state/Board/ServerState";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import IPost from "interfaces/Board/IPost";
import IServer from "interfaces/Common/IServer";
import { getPostCount, getPosts } from "utils/PostUtil";

import Board from "components/Board/Board";
import BoardM from "components/Board/BoardM";
import { getServerList } from "utils/CommonUtil";

const useStyles = makeStyles({
  serverWrapper: {
    margin: "8px 0 12px 0",
    padding: "0",
  },
  btn: {
    minWidth: "50px",
    height: "40px",
    margin: "0 20px",
    padding: "0",
  },
  btnM: {
    minWidth: "45px",
    height: "40px",
    margin: "0 4px",
    padding: "0",
  },
  defaultBox: {
    maxWidth: "960px",
    height: "580px",
    padding: "32px 0 0 0",
    margin: "8px auto",
    border: "2px solid lightgray",
    borderRadius: "10px",
  },
  text: {
    "& h4": {
      width: "60%",
      margin: "5px 0",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    "& h6": {
      width: "60%",
      margin: "5px 0",
    },
  },
  textM: {
    "& h4": {
      width: "60%",
      margin: "5px 0",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    "& h6": {
      width: "90%",
      fontSize: "1rem",
      margin: "5px 0",
    },
  },
});

function TradeBoard({ location }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [defaultScreen, setDefaultScreen] = useState(true);

  const serverList = getServerList();
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [server, setServer] = useState<IServer>();
  const setServerState = useSetRecoilState(ServerState);

  const query = queryString.parse(location.search);
  const setFilter = useSetRecoilState(FilterState);
  const [rowCount, setRowCount] = useState<number>(0);
  const setMyBackdrop = useSetRecoilState(MyBackdropState);

  const _onServerLoad = async () => {
    let filterUri = "";

    if (server) filterUri = `server=${server.key}`;
    else filterUri = `server=${serverList[0].key}`;

    setPosts(await getPosts("trade", filterUri));
  };

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
    setRowCount(await getPostCount("trade", filterUri));
    setPosts(await getPosts("trade", filterUri, page, pageSize));
    setMyBackdrop(false);
  };

  useEffect(() => {
    if (server) _onServerLoad();
    // eslint-disable-next-line
  }, [server]);

  return (
    <Grid container justify='center'>
      <Grid container direction='row' justify='center' className={classes.serverWrapper}>
        {serverList.map((sv, idx) => (
          <Button
            key={sv.key}
            className={smallScreen ? classes.btnM : classes.btn}
            variant='outlined'
            color={server && sv.key === server.key ? "secondary" : "primary"}
            onClick={() => {
              setServerState(idx);
              setDefaultScreen(false);
              setServer(sv);
            }}>
            {sv.name}
          </Button>
        ))}
      </Grid>

      {defaultScreen ? (
        <Grid container alignItems='flex-start' justify='center' className={classes.defaultBox}>
          <Grid container justify='center' className={smallScreen ? classes.textM : classes.text}>
            <Typography variant='h4'>이 용&nbsp; &nbsp;규 칙</Typography>
            <Typography variant='h6'>1. 대표 캐릭터를 인증해야 게시물을 작성할 수 있습니다.</Typography>
            <Typography variant='h6'>2. 판매자는 물품마다 가격과 흥정여부를 기재해야 합니다.</Typography>
            <Typography variant='h6'>3. 상대의 대표 캐릭터와 오픈 카톡을 잘 확인해야 합니다.</Typography>
            <Typography variant='h6'>4. 규칙을 어기는 게시물은 통보 없이 삭제될 수 있습니다.</Typography>
            <Typography variant='h6'>5. 불량 이용자는 약관에 따라 서비스 이용이 제한 됩니다.</Typography>
            <Typography variant='h6'>6. 거래소 오픈시 규칙은 변경될 수 있습니다.</Typography>
          </Grid>
        </Grid>
      ) : smallScreen ? (
        <BoardM category={"trade"} posts={posts} page={2} totalArticleCount={rowCount} articleSize={10} onPageChange={_onPageChanged} />
      ) : (
        <Board category={"trade"} posts={posts} page={2} totalArticleCount={rowCount} articleSize={10} onPageChange={_onPageChanged} />
      )}
    </Grid>
  );
}

export default TradeBoard;
