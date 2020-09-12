import axios from 'axios';
import cheerio from 'cheerio';
import crypto from 'crypto';

import IUserInfo from 'interfaces/User/IUserInfo';
import ISignUpUser from 'interfaces/User/ISignUpUser';

import * as CommonUtil from 'utils/ComoonUtil';

import { getToken, setToken, delToken } from 'utils/ComoonUtil';

/*
* 중복 유저 있는 지 체크
*/
export const CheckExistUser = async (id: string) => {
  
}

/*
* 사용자 회원가입
*/
export const SignUpUser = (user: ISignUpUser) => {

  // Create Encrypt salt
  let mySalt = Math.round((new Date().valueOf() * Math.random())) + "";

  const newUser: ISignUpUser = {
    id: user.id,
    mail: user.mail,
    password: crypto.createHash("sha512").update(user.password + mySalt).digest("hex"),
    salt: mySalt
  }

  //DB Process for Create User
  const res = axios.post('api/common/signup', newUser)
    .then((res) => {
      console.log("SIGN UP RES > ", res);

      if (res.data.code === 1) {
        return true;
      }
      else {
        alert(res.data.message);

        return false;
      }
    })
    .catch((e) => {
      console.log("SIGN UP ERROR > ", e);

      return false;
    });

  return res;
}

/*
* 사용자 로그인
*/
export const SignInUser = async (_id: string, _password: string) => {
  // TODO - DB Process for Check Sign Up User
  const res = await axios.post('api/common/signin', {id: _id, password: _password})
    .then((res) => {
      console.log("SIGN IN RES > ", res);

      if (res.data.code === 1) {
        // Create JWT
        const token = res.data.token;

        // Session Store
        setToken(token);

        return true;
      }
      else {
        alert(res.data.message);

        return false;
      }
    });

  return res;
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
  const token = getToken();
  
  return token ? getIdFromToken(token) : null;
}

/*
* 사용자 ID로 사용자 정보 가져오기
*/
export const getUserInfoById = async (_id: string) => {
  // TODO - DB Process Get UserInfo By Id
  let user: IUserInfo;
  const res = await axios.get('api/user/find/', {
      params: {
        "id": _id
      },
      ...CommonUtil.getHeaderToken()})
    .then((res) => {
      const json = JSON.parse(res.data.userInfo);
      const userInfo: IUserInfo = {...json};

      user = { ...json };

      Promise.resolve(true);
    });
}

/*
* 사용자 정보 수정하기
*/
export const setUserInfo = async (userInfo: IUserInfo) => {
  const r = await axios.put('/api/user/update', {
      id: userInfo.id,
      server: userInfo.server,
      character: userInfo.character,
      editDateString: CommonUtil.getNowDateString(),
    }, CommonUtil.getHeaderToken())
    .then((res) => {
      console.log(res);

      return res.data.message;
    })
    .catch((e) => {
      console.log("EDIT USER INFO ERROR > ", e);

      return false;
    });

  return r;
}

/*
* 바람의 나라 공식 사이트 한줄인사말 데이터 크롤링하여, 사용자 인증 처리
*/
export const checkGameUser = async (server: string, character: string) => {
  const r = await axios.post('/api/user/check', {
      character: character,
      server: server
    }, CommonUtil.getHeaderToken())
    .then((res) => {
      console.log(res.data);
      //alert(res.data.message);

      return res.data;
    })
    .catch((e) => {
      console.log("CHECK GAME USER ERROR > ", e);
      
      return false;
    });

  return r;
}

/*
* JWT 구조
* [HEADER].[PAYLOAD].[VERIFY SIGNATURE]
*/
const getIdFromToken = (token: string) => {
  if (token !== "") {
    // Get Token
    const splitToken = token.split(".");
  
    // Get Payload Token
    const payloadToken = splitToken[1];
  
    // Decode Base64 and Transfer to JSON
    const payload = JSON.parse(atob(payloadToken));
  
    return payload.id;
  }
  else {
    return null;
  }
}

//TODO
const getUserInfoModel = (data: any) => {
  let userInfo: IUserInfo;

}