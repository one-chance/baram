import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function RaidInfo({match}: any) {
  const classes = useStyles();
  const { key } = match.params;

  return (
    <React.Fragment>
			Raid Key - {key}
    </React.Fragment>
  );
}