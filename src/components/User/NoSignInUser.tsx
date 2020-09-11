import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const NoSignInUser = () => {
  return (
    <React.Fragment>
      <Typography gutterBottom>
        로그인 된 정보가 없습니다. 로그인 해주세요.
      </Typography>
      <Link 
        component="button"
        variant="body2"
        onClick={() => document.location.href="/signin"}>
          로그인하기
      </Link>
    </React.Fragment>
  );
}

export default NoSignInUser;