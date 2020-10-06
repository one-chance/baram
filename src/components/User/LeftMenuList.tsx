import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  leftSection: {
  }
}));

function LeftMenuList() {
  const classes = useStyles();

  const _onViewUser = () => {
    document.location.href = "/myinfo/view";
  }

  const _onEditUser = () => {
    document.location.href = "/myinfo/edit";
  }

  const _onAuthUser = () => {
    document.location.href = "/myinfo/auth";
  }

  const _onCharUser = () => {
    document.location.href = "/myinfo/char";
  }

  const _onChangePassword = () => {
    document.location.href = "/myinfo/chgPwd";
  }
  
  return (
    <React.Fragment>
      <MenuList className={classes.leftSection}>
        <MenuItem onClick={_onViewUser}>회원 정보</MenuItem>
        <Divider variant="middle"/>
        <MenuItem onClick={_onEditUser}>정보 수정</MenuItem>
        <Divider variant="middle"/>
        <MenuItem onClick={_onAuthUser}>캐릭터 인증</MenuItem>
        <Divider variant="middle"/>
        <MenuItem onClick={_onCharUser}>캐릭터 관리</MenuItem>
        <Divider variant="middle"/>
        <MenuItem onClick={_onChangePassword}>비밀번호 변경</MenuItem>
      </MenuList>
    </React.Fragment>
  )
}

export default LeftMenuList;