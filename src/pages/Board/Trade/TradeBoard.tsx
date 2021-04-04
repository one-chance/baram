import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { FilterState } from "state/index";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import IPost from "interfaces/Board/IPost";
import IServer from "interfaces/Common/IServer";
import { getPosts } from "utils/PostUtil";

import Board from "components/Board/Board";

import { getServerList } from 'utils/CommonUtil';

const nowCategory = "trade";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 0 15px 0",
    float: "left",
  },
  serverWrapper: {
    width: '100%',
    margin: '5px',
    padding: '5px'
  },
  server: {
    height: '35px',
    margin: '0px',
  }
}));

function TradeBoard({ location }: any) {
  const classes = useStyles();

  const [posts, setPosts] = React.useState<Array<IPost>>([]);
  const [server, setServer] = useState<IServer>();

  const serverList = getServerList();

  useEffect(() => {
    setServer(serverList[0]);
  }, []);

  useEffect(() => {
    if (server)
      _onServerLoad();
  }, [server]);

  const _onServerLoad = async () => {
    let filterUri = '';

    if (server) 
      filterUri = `server=${server.key}`;
    else
      filterUri = `server=${serverList[0].key}`;

    setPosts(await getPosts(nowCategory, filterUri));
  };

  return (
    <Container className={classes.root}>
      <Grid container item spacing={2} direction='row' justify='center' className={classes.serverWrapper}>
        <ButtonGroup color='primary'>
          { serverList.map((sv) => 
            <Button
              key={sv.key}
              className={classes.server}
              color={server && sv.key === server.key ? "secondary" : "primary"}
              onClick={() => setServer(sv)}>
              {sv.name}
            </Button>
          )}
        </ButtonGroup>
      </Grid>
      <Board category={nowCategory} posts={posts} page={2} />
    </Container>
  );
}

export default TradeBoard;
