import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import SignInDialogState from "state/common/SignInDialogState";
import Typography from "@material-ui/core/Typography";

const NoAuth = () => {
  const setIsOpen = useSetRecoilState(SignInDialogState);

  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Typography style={{ width: "100%", textAlign: "center" }} gutterBottom>
      로그인 정보가 없습니다. 로그인 해주세요.
    </Typography>
  );
};

export default NoAuth;
