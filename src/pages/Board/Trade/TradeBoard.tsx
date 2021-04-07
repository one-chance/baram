import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import IPost from "interfaces/Board/IPost";
import IServer from "interfaces/Common/IServer";
import { getPosts } from "utils/PostUtil";

import Board from "components/Board/Board";
import { getServerList } from "utils/CommonUtil";

const nowCategory = "trade";

const useStyles = makeStyles({
  root: {
    width: "auto",
    marginBottom: "10px",
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
});

function TradeBoard({ location }: any) {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [posts, setPosts] = React.useState<Array<IPost>>([]);
  const [server, setServer] = useState<IServer>();

  const serverList = getServerList();

  useEffect(() => {
    setServer(serverList[0]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (server) _onServerLoad();
    // eslint-disable-next-line
  }, [server]);

  const _onServerLoad = async () => {
    let filterUri = "";

    if (server) filterUri = `server=${server.key}`;
    else filterUri = `server=${serverList[0].key}`;

    setPosts(await getPosts(nowCategory, filterUri));
  };

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid container item direction='row' justify='center' className={classes.serverWrapper}>
        {smallScreen ? (
          <ButtonGroup color='default'>
            {serverList.map(sv => (
              <Button
                key={sv.key}
                variant='outlined'
                className={classes.server}
                color={server && sv.key === server.key ? "secondary" : "primary"}
                onClick={() => setServer(sv)}>
                {sv.name}
              </Button>
            ))}
          </ButtonGroup>
        ) : (
          <div style={{ marginBottom: "10px" }}>
            {serverList.map(sv => (
              <Button
                key={sv.key}
                className={classes.server}
                variant='outlined'
                color={server && sv.key === server.key ? "secondary" : "primary"}
                onClick={() => setServer(sv)}
                style={{ margin: "0 20px" }}>
                {sv.name}
              </Button>
            ))}
          </div>
        )}
      </Grid>

      <Board category={nowCategory} posts={posts} page={2} />
    </Grid>
  );
}

export default TradeBoard;
