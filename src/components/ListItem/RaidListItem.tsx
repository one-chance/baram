import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';

import { IRaid } from 'interfaces/Dictionary/IRaids';
import { baseUrlForRaidImg } from 'utils/ConfigUtil';

interface IProps {
  raid: IRaid,
  keyword?: string,
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10",
    padding: "10"
  },
  shortImage: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function RaidListItem(props: IProps) {
  const classes = useStyles();

  const [ isHover, setIsHover ] = React.useState(false);

  return (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
        <Grid container item xs={12}
          className={classes.root}>
          <Grid item xs={2}>
            <Avatar src={baseUrlForRaidImg.concat(props.raid.img)} 
              className={classes.shortImage}/>
          </Grid>
          <Grid item xs={4}>
            {props.raid.name}
          </Grid>
          <Grid item xs={2}>
            {props.raid.limitPower}
          </Grid>
          <Grid item xs={2}>
            {props.raid.minPeopleCount} ~ {props.raid.maxPeopleCount}
          </Grid>
          <Grid item xs={2}>
            검색어 - {props.keyword}
            {
              isHover &&
                "Over"
            }
          </Grid>
        </Grid>
    </Container>
  );
}