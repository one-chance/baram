import React, { useEffect } from 'react';
import {useSetRecoilState} from 'recoil';
import SignInDialogState from 'state/common/SignInDialogState';

const NoAuth = () => {
  const setIsOpen = useSetRecoilState(SignInDialogState);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div>
      로그인 해주세요
    </div>
  );
}

export default NoAuth;