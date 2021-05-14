import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState, MyBackdropState } from "state/index";
import queryString from "query-string";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ServerState from "state/Board/ServerState";

import Grid from "@material-ui/core/Grid";
import { GridPageChangeParams } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import IPost from "interfaces/Board/IPost";
import IServer from "interfaces/Common/IServer";
import { getPostCount, getPosts } from "utils/PostUtil";

import Board from "components/Board/Board";
import { getServerList } from "utils/CommonUtil";

const nowCategory = "trade";

const useStyles = makeStyles({
  root: {
    width: "auto",
    padding: "0",
  },
  serverWrapper: {
    width: "100%",
    margin: "10px 0",
    padding: "0",
  },
  server: {
    minWidth: "50px",
    height: "40px",
    margin: "0",
    padding: "0",
  },
  defaultBox: {
    maxWidth: "800px",
    padding: "10px",
    border: "2px solid lightgray",
    borderRadius: "10px",
    margin: "20px 0",
  },
  text: {
    width: "75%",
    margin: "5px 0",
  },
  text2: {
    width: "90%",
    fontSize: "1rem",
    margin: "5px 0",
  },
});

function TradeBoard({ location }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));
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

    setPosts(await getPosts(nowCategory, filterUri));
  };

  const _onPageChanged = async (params: GridPageChangeParams) => {
    await initPage(params.page, params.pageSize);
  };

  const initPage = async (page: number, pageSize: number) => {
    let filterUri: string;
    let currentQuery = Array<string>();

    if (Object.keys(query).length > 0) {
      for (let prop in query) {
        let qu = `` + prop + `=` + query[prop]?.toString();
        if (prop === `server`) {
        }
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

  useEffect(() => {
    if (server) _onServerLoad();
    // eslint-disable-next-line
  }, [server]);

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid container item direction='row' justify='center' className={classes.serverWrapper}>
        {smallScreen ? (
          <ButtonGroup color='default'>
            {serverList.map((sv, idx) => (
              <Button
                key={sv.key}
                variant='outlined'
                className={classes.server}
                color={server && sv.key === server.key ? "secondary" : "primary"}
                onClick={() => {
                  setServerState(idx);
                  setDefaultScreen(false);
                  setServer(sv);
                }}>
                {sv.name}
              </Button>
            ))}
          </ButtonGroup>
        ) : (
          <div style={{ marginBottom: "10px" }}>
            {serverList.map((sv, idx) => (
              <Button
                key={sv.key}
                className={classes.server}
                variant='outlined'
                color={server && sv.key === server.key ? "secondary" : "primary"}
                onClick={() => {
                  setServerState(idx);
                  setDefaultScreen(false);
                  setServer(sv);
                }}
                style={{ margin: "0 20px" }}>
                {sv.name}
              </Button>
            ))}
          </div>
        )}
      </Grid>

      {defaultScreen ? (
        <Grid container alignItems='center' justify='center' direction='column' className={classes.defaultBox}>
          <Typography variant='h4' className={classes.text} style={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
            이 용&nbsp; &nbsp;규 칙
          </Typography>
          <Typography variant='h6' className={smallScreen ? classes.text2 : classes.text}>
            1. 대표 캐릭터를 인증해야 게시물을 작성할 수 있습니다.
          </Typography>
          <Typography variant='h6' className={smallScreen ? classes.text2 : classes.text}>
            2. 판매자는 물품마다 가격과 흥정여부를 기재해야 합니다.
          </Typography>
          <Typography variant='h6' className={smallScreen ? classes.text2 : classes.text}>
            3. 상대의 대표 캐릭터와 오픈 카톡을 잘 확인해야 합니다.
          </Typography>
          <Typography variant='h6' className={smallScreen ? classes.text2 : classes.text}>
            4. 규칙을 어기는 게시물은 통보 없이 삭제될 수 있습니다.
          </Typography>
          <Typography variant='h6' className={smallScreen ? classes.text2 : classes.text}>
            5. 불량 이용자는 약관에 따라 서비스 이용이 제한 됩니다.
          </Typography>
          <Typography variant='h6' className={smallScreen ? classes.text2 : classes.text}>
            6. 거래소 오픈시 규칙은 변경될 수 있습니다.
          </Typography>
        </Grid>
      ) : (
        <Board category={nowCategory} posts={posts} page={2} rowCount={rowCount} onPageChange={_onPageChanged} />
      )}
    </Grid>
  );
}

export default TradeBoard;
