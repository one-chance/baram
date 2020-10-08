import React from 'react';
import {useSetRecoilState} from 'recoil';
import SignInDialogState from 'state/common/SignInDialogState';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const NoSignInUser = () => {

  const setIsSignInOpen = useSetRecoilState(SignInDialogState);

  const _onGoToSignIn = () => {
    setIsSignInOpen(true);  
  }

  return (
    <React.Fragment>
      <Typography gutterBottom>
        로그인 된 정보가 없습니다. 로그인 해주세요.
      </Typography>
      <Link 
        component="button"
        variant="body2"
        onClick={_onGoToSignIn}>
          로그인하기
      </Link>
    </React.Fragment>
  );
}

export default NoSignInUser;