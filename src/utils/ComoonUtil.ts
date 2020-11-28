import axios from 'axios';

import { getSessionNameUserToken } from 'utils/ConfigUtil';

export const setToken = (_token: string) => {
  localStorage.setItem(
    getSessionNameUserToken(),
    _token
  );
}

export const getToken = () => {
  const _token = localStorage.getItem(getSessionNameUserToken());
  return _token ? _token : null;
}

export const delToken = () => {
  localStorage.removeItem(getSessionNameUserToken());
}

export const refreshToken = () => {
  const token = getToken();
  const id = getIdFromToken(token);
  const key = getKeyFromToken(token);
  
  if (token){
    const res = axios.post('/api/common/refresh', {id: id, key: key, token: token})
      .then((res) => {
        if (res.data.code === 200 && res.data.token) {
          setToken(res.data.token);
          return true;
        }
        else {
          delToken();
          return false;
        }
      })
      .catch((e) => {
        // delToken();
        return false;
      });
    
    return res;
  }
  else {
    return false;
  }
}

export const checkServerError = (res: any) => {
  
  if (res.code === 401) {
    // alert(res.message);
    delToken();
    setTimeout(() => {
      document.location.href = res.redirectUri
    }, 5000);
  }

  return true;
}

/*
* JWT 구조
* [HEADER].[PAYLOAD].[VERIFY SIGNATURE]
*/
export const getIdFromToken = (token: string | null) => {
  if (token !== null) {
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

export const getKeyFromToken = (token: string | null) => {
  if (token !== null) {
    // Get Token
    const splitToken = token.split(".");
  
    // Get Payload Token
    const payloadToken = splitToken[1];
  
    // Decode Base64 and Transfer to JSON
    const payload = JSON.parse(atob(payloadToken));
  
    return payload.key;
  }
  else {
    return null;
  }
}

export const getNowId = () => {
  return getIdFromToken(getToken());
}

export const getNowKey = () => {
  return getKeyFromToken(getToken());
}

export const getDateFromString = (dateString: string | undefined) => {
  if (!dateString) return "Unknown Date";

  const date = dateString.split(' ');
  return date[0];
}