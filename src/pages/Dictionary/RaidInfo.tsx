import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { getDicRaidBykey } from 'utils/DictionaryUtil';
import { getBaseUrlForRaidImg } from 'utils/ConfigUtil';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  image: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

function RaidInfo({match}: any) {
  const classes = useStyles();
  const { key } = match.params;

  const baseUrlForRaidImg = getBaseUrlForRaidImg();
  const raid = getDicRaidBykey(key);

  return (
    <React.Fragment>
      {
        raid.length > 0 ?
          <Container className={classes.root}>
            <Grid container
              direction="column"
              justify="center"
              alignItems="center">
                <Grid item xs={12}>
                  <Avatar src={baseUrlForRaidImg.concat(raid[0].img)} 
                    className={classes.image}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h5">
                    {raid[0].name}
                  </Typography>
                </Grid>
            </Grid>
          </Container>
        :
          <Container>
            정보가 존재하지 않습니다.
          </Container>
      }
    </React.Fragment>
  );
}

export default RaidInfo;