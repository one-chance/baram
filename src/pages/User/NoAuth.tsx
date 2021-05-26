import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import SignInDialogState from "state/common/SignInDialogState";
import Typography from "@material-ui/core/Typography";
import { getNowUserInfo } from "utils/UserUtil";

const NoAuth = () => {
  const setIsOpen = useSetRecoilState(SignInDialogState);

  useEffect(() => {
    setIsOpen(true);

    var signInUserId = getNowUserInfo().id;
    if (signInUserId) {
      setIsOpen(false);
      document.location.href = "/";
    }
  }, [setIsOpen]);

  return (
    <>
      <div style={{ height: "70vh" }}>
        <Typography style={{ width: "100%", margin: "30px 0", textAlign: "center" }}>로그인 정보가 없습니다.</Typography>
        <Typography style={{ width: "100%", margin: "30px 0", textAlign: "center" }}>
          <a href='/'>홈으로 돌아가기</a>
        </Typography>
      </div>
    </>
  );
};

export default NoAuth;
