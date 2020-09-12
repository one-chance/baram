import React from 'react';
import Button from '@material-ui/core/Button';

import { SignUpUser } from 'utils/UserUtil';

import {useRecoilState} from 'recoil';

import {MyAlertState} from 'state/index';

export default function Test() {

  const [myAlert, setMyAlert] = useRecoilState(MyAlertState);

  const _onTest = () => {
    SignUpUser({
      id: "whitow",
      password: "admin",
      mail: "whitow@test.com"
    });
  }

  const _onSuccessAlert = () => {
    setMyAlert({
      isOpen: true,
      severity: "success",
      duration: 3000,
      message: "Success Message",
    });
  }

  const _onErrorAlert = () => {
    setMyAlert({
      isOpen: true,
      severity: "error",
      duration: 3000,
      message: "Error Message",
    });
  }

  console.log(myAlert);

  return (
    <React.Fragment>
      <Button 
        autoFocus
        tabIndex={-1}
        onClick={_onTest} 
        color="primary">
          유저생성
      </Button>
      <Button 
        autoFocus
        tabIndex={-1}
        onClick={_onSuccessAlert} 
        color="primary">
          SuccessAlert
      </Button>
      <Button 
        autoFocus
        tabIndex={-1}
        onClick={_onErrorAlert} 
        color="primary">
          ErrorAlert
      </Button>
    </React.Fragment>
  );
}