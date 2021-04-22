import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import SignInDialogState from "state/common/SignInDialogState";
import Typography from "@material-ui/core/Typography";
import { getSignInUserId } from "utils/UserUtil";

const NoAuth = () => {
  const setIsOpen = useSetRecoilState(SignInDialogState);

  useEffect(() => {
    setIsOpen(true);

    var signInUserId = getSignInUserId();
    if (signInUserId) {
      setIsOpen(false);
      document.location.href = "/";
    }
  }, [setIsOpen]);

  return (
    <>
      <div style={{ height: "70vh" }}>
        <Typography style={{ width: "100%", margin: "20px 0", textAlign: "center" }} gutterBottom>
          로그인 정보가 없습니다.
        </Typography>
      </div>
    </>
  );
};

export default NoAuth;
