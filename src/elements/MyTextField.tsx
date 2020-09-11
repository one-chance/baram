import React, { InputHTMLAttributes } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  id: string,
  name: string,
  label: string,
  required?: boolean,
}

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
  },
});

export default function AdaptingHook(props: Props) {
  const classes = useStyles();
  return (
    <React.Fragment>
       <TextField 
          className={classes.root}
          variant="outlined"
          fullWidth
          label={props.label}
          id={props.id}
          name={props.name}
          {...props.required} />
    </React.Fragment>
  );
}
