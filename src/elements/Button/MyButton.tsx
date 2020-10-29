import React, { ButtonHTMLAttributes } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { Omit } from '@material-ui/types';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  color: 'red' | 'blue',
  text?: string,
}

const useStyles = makeStyles({
  root: {
    background: (props: Props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props: Props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: "auto",
    paddingTop: 4,
    paddingBottom: 4,
    padding: '0 50px',
  },
});

function MyButton(props: Props & Omit<MuiButtonProps, keyof Props>) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button 
          fullWidth
          variant="contained"
          className={classes.root} 
          {...other}/>;
}

export default function AdaptingHook(props: Props) {
  return (
    <React.Fragment>
      <MyButton 
        {...props}>
          {props.text}
      </MyButton>
    </React.Fragment>
  );
}
