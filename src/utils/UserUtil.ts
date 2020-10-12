import axios from 'axios';
import crypto from 'crypto';

import IUserInfo from 'interfaces/User/IUserInfo';
import ISignUpUser from 'interfaces/User/ISignUpUser';

import * as CommonUtil from 'utils/ComoonUtil';

import { setToken, delToken, checkServerError, getNowIdFromToken } from 'utils/ComoonUtil';

/*
* 중복 유저 있는 지 체크
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
* 사용자 회원가입
*/
export const SignUpUser = async (_id: string, _password: string) => {

  // Create Encrypt salt
  let mySalt = getRandomSalt();

  const newUser: ISignUpUser = {
    id: _id,
    password: crypto.createHash("sha512").update(_password + mySalt).digest("hex"),
    salt: mySalt,
    createDateString: CommonUtil.getNowDateString(),
    editDateString: CommonUtil.getNowDateString()
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
* 사용자 로그인
*/
export const SignInUser = async (_id: string, _password: string) => {
  const res = await axios.post('/api/common/signin', {id: _id, password: _password})
    .then((res) => {

      if (res.data.code === 200) {
        const token = res.data.token;
        // Session Store
        setToken(token);

        return token;
      }
      else {
        alert(res.data.message);

        return false;
      }
    });

  return res;
}

/*
* 사용자 비밀번호 확인
*/
export const CheckPassword = async (_id: string, _password: string) => {
  const r = await axios.post('/api/user/checkpassword', {
      id: _id, 
      password: _password
    },
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      checkServerError(res.data);
      return res.data.code === 200 ? true : false;
    })
    .catch((e) => {
      console.log("PASSWORD CHECK ERROR > ", e);

      return false;
    });

  return r;
}

/*
* 사용자 로그아웃
*/
export const LogoutUser = () => {
  delToken();
}

/*
* 로그인 한 사용자 ID 가져오기
*/
export const getSignInUserId = () => {
  return getNowIdFromToken();
}

/*
* 사용자 ID로 사용자 정보 가져오기
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
    checkServerError(res.data);

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
* 사용자 정보 수정하기
*/
export const setUserInfo = async (userInfo: IUserInfo) => {
  const r = await axios.put('/api/user/update', {
      id: userInfo.id,
      openKakao: userInfo.openKakao,
      editDateString: CommonUtil.getNowDateString(),
    }, 
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      checkServerError(res.data);

      return res.data;
    })
    .catch((e) => {
      console.log("EDIT USER INFO ERROR > ", e);

      return false;
    });

  return r;
}

/*
* 사용자 비밀번호 수정
*/
export const setChangePassword = async (_id: string, _changePassword: string) => {
  const mySalt = getRandomSalt();

  const r = await axios.put('/api/user/changepassword', {
      id: _id,
      password: crypto.createHash("sha512").update(_changePassword + mySalt).digest("hex"),
      salt: mySalt,
      editDateString: CommonUtil.getNowDateString()
    },
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      checkServerError(res.data);

      return res.data;
    })
    .catch((e) => {
      console.log("CHANGE USER PASSWORD ERROR > ", e);

      return false;
    });

  return r;
}

/*
* 바람의 나라 공식 사이트 한줄인사말 데이터 크롤링하여 사용자 인증
*/
export const checkGameUser = async (_id: string, _server: string, _character: string) => {
  const r = await axios.post('/api/user/check', {
      id: _id,
      server: _server,
      character: _character
    }, 
    {
      headers: {
        token: CommonUtil.getToken()
      }
    })
    .then((res) => {
      checkServerError(res.data);

      if (res.data.code === 200) {
        return authUser(_id, _server, _character);
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
* 사용자 인증 DB 처리
*/
export const authUser = async (_id: string, _server: string, _character: string) => {
  const r = await axios.put('/api/user/auth', {
    id: _id,
    server: _server,
    character: _character,
    authDateString: CommonUtil.getNowDateString()
  }, 
  {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    checkServerError(res.data);

    return res.data;
  })
  .catch((e) => {
    console.log("AUTH USER ERROR > ", e);
  });

  return r;
}

/*
* 대표캐릭터 설정
*/
export const setTitleAccount = async (_id: string, _server: string, _character: string) => {
  const r = await axios.put('/api/user/settitle', {
    id: _id,
    server: _server,
    character: _character,
    editDateString: CommonUtil.getNowDateString()
  },
  {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    checkServerError(res.data);
    
    return res.data;
  })
  .catch((e) => {
    console.log("SET TITLE ACCOUNT ERROR > ", e);
  });

  return r;
}

/*
* 회원 탈퇴
*/
export const WithDrawUser = async (_id: string, _password: string) => {
  const r = await axios.post('/api/user/withdraw', {
    id: _id,
    password: _password
  },
  {
    headers: {
      token: CommonUtil.getToken()
    }
  })
  .then((res) => {
    checkServerError(res.data);

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
    id: "",
    mail: "",
    isActive: false,
    createDateString: "",
    editDateString: ""
  }

  return Object.setPrototypeOf(jsonInfo, userInfo);
}

const getRandomSalt = () => {
  // Create Encrypt salt
  return Math.round((new Date().valueOf() * Math.random())) + "";
}