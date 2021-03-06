import axios from 'axios';

import IUserInfo from 'interfaces/User/IUserInfo';
import ISignUpUser from 'interfaces/User/ISignUpUser';
import IAccount from 'interfaces/User/IAccount';

import * as CommonUtil from 'utils/CommonUtil';

/*
* NOTE 중복 유저 있는 지 체크
*/
export const CheckExistUser = async (_id: string) => {
  const res = await axios.post('/api/common/checkid', {id: _id})
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return false;
    });

  return res;
}

/*
* NOTE 사용자 회원가입
*/
export const SignUpUser = async (_id: string, _password: string, _email: string) => {

  const newUser: ISignUpUser = {
    id: _id,
    password: _password,
    email: _email
  }

  //DB Process for Create User
  const res = await axios.post('api/common/signup', newUser)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return false;
    });

  return res;
}

/*
* NOTE 사용자 로그인
*/
export const SignInUser = async (id: string, password: string) => {
  const res = await axios.post('/api/common/signin', {
    id,
    password
  })
    .then((res) => {

      if (res.data.code === 200) {
        const token = res.data.token;
        const isReset = res.data.isReset;
        // Session Store
        CommonUtil.setToken(token);

        return {
          token,
          isReset
        };
      }
      else {
        alert(res.data.message);

        return false;
      }
    });

  return res;
}

/*
* NOTE 사용자 비밀번호 확인
*/
export const CheckPassword = async (_id: string, _password: string) => {
  const r = await axios.post('/api/user/password', {
      id: _id, 
      password: _password
    },
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      if (CommonUtil.checkServerError(res.data)) return false;
      return res.data.code === 200 ? true : false;
    })
    .catch((e) => {
      console.log("PASSWORD CHECK ERROR > ", e);

      return false;
    });

  return r;
}

/*
* NOTE 사용자 로그아웃
*/
export const LogoutUser = () => {
  CommonUtil.delToken();
}

/*
* NOTE 로그인 한 사용자정보 가져오기
*/
export const getNowUserInfo = () => {
  const signInUser = CommonUtil.getNowUser();
  return signInUser ? signInUser : '';
}

/*
* NOTE 사용자 ID로 사용자 정보 가져오기
*/
export const getUserInfoById = async (_id: string) => {
  const info = await axios.get('/api/user/find', {
    params: {
      "id": _id
    },
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data.userInfo;
  });

  if ( typeof info === "object" ) {
    const userInfo: IUserInfo = getUserInfoFromJson(info);

    return userInfo;
  }
  else {
    return null;
  }
}

/*
* NOTE 사용자 ID로 사용자 정보 가져오기
*/
export const getOpenKakaoById = async (_id: string) => {
  const info = await axios.get('/api/common/openkakao', {
    params: {
      "id": _id
    }
  })
  .then((res) => {
    return res.data.userInfo;
  });
  if ( typeof info === "object" ) {
    const userInfo: IUserInfo = getUserInfoFromJson(info);
    return userInfo;
  }
  else {
    return null;
  }
}

/*
* NOTE 사용자 정보 수정하기
*/
export const setUserInfo = async (userInfo: IUserInfo) => {
  const r = await axios.put('/api/user/info', {
      id: userInfo.id,
      openKakao: userInfo.openKakao
    }, 
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      if (CommonUtil.checkServerError(res.data)) return false;

      return res.data;
    })
    .catch((e) => {
      console.log("EDIT USER INFO ERROR > ", e);

      return false;
    });

  return r;
}

/*
* NOTE 사용자 비밀번호 수정
*/
export const setChangePassword = async (_id: string, _changePassword: string) => {
  const r = await axios.put('/api/user/password', {
      id: _id,
      password: _changePassword,
    },
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      if (CommonUtil.checkServerError(res.data)) return false;

      return res.data;
    })
    .catch((e) => {
      console.log("CHANGE USER PASSWORD ERROR > ", e);

      return false;
    });

  return r;
}

/*
* NOTE 바람의나라 공식 사이트 한줄인사말 데이터 크롤링하여 사용자 인증
*/
export const checkGameUser = async (key: number, id: string, server: string, character: string) => {
  const r = await axios.post('/api/user/check', {
      id,
      server,
      character,
    }, 
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      if (CommonUtil.checkServerError(res.data)) return false;

      if (res.data.code === 200) {
        return authUser(key, id, server, character);
      }
      else {
        return res.data;
      }

    })
    .catch((e) => {
      console.log("CHECK GAME USER ERROR > ", e);
      
      return false;
    });

  return r;
}

/*
* NOTE 사용자 인증 DB 처리
*/
export const authUser = async (key: number, id: string, server: string, character: string) => {
  const r = await axios.put('/api/user/auth', {
    key,
    id,
    server,
    character,
  }, 
  {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data;
  })
  .catch((e) => {
    console.log("AUTH USER ERROR > ", e);
  });

  return r;
}

/*
* NOTE 대표캐릭터 설정
*/
export const setTitleAccount = async (id: string, titleAccount: IAccount) => {
  console.log('run setTitleAccount');
  console.log(titleAccount);

  const r = await axios.put('/api/user/titleaccount', {
    id,
    titleAccount
  },
  {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;
    
    return res.data;
  })
  .catch((e) => {
    console.log("SET TITLE ACCOUNT ERROR > ", e);
  });

  return r;
}

/*
* NOTE 회원 탈퇴
*/
export const WithDrawUser = async (_id: string, _password: string) => {
  const r = await axios.delete('/api/user/info', {
    headers: {
      token: CommonUtil.getToken(),
      id: _id
    }
  })
  .then((res) => {
    if (CommonUtil.checkServerError(res.data)) return false;

    return res.data;
  })
  .catch((e) => {
    console.log("WITHDRAW ERROR > ", e);

    return false;
  })

  return r;
}

const getUserInfoFromJson = (jsonInfo: JSON) => {
  const userInfo: IUserInfo = {
    key: 0,
    id: "",
    email: "",
    isActive: false,
    createDate: new Date(),
    editDate: new Date()
  }

  return Object.setPrototypeOf(jsonInfo, userInfo);
}