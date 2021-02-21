import axios from 'axios';

import { getSessionNameUserToken } from 'utils/ConfigUtil';

export const checkServerError = (res: any) => {
  
  if (res.code === 401) {
    // alert(res.message);
    delToken();
    setTimeout(() => {
      document.location.href = res.redirectUri
    }, 2000);

    return true;
  }

  return false;
}

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
        if (res.data.code === 200 && res.data.token) { // 토큰 갱신
          setToken(res.data.token);
          return true;
        }
        else { // 토큰 만료
          delToken();
          document.location.href = '/signin';

          return false;
        }
      })
      .catch((e) => {
        delToken();
        document.location.href = '/signin';
        
        return false;
      });
    
    return res;
  }
  else {
    console.log('empty token');
    return false;
  }
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

export const getStringByDate = (date: Date | undefined, full?: boolean) => {
  if (!date) return "Unknown Date";
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1); // 하루 전날로 설정

  const dt = new Date(date);
  let d: string = '', t: string;

  d = dt.getFullYear().toString();
  d += dt.getMonth()+1 < 10 ? `.0${dt.getMonth()+1}` : `.${dt.getMonth()+1}`;
  d += dt.getDate() < 10 ? `.0${dt.getDate()} ` : `.${dt.getDate()} `;
  
  t = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
  t += dt.getMinutes() < 10 ? `:0${dt.getMinutes()}` : `:${dt.getMinutes()}`;

  // 전체 표시할 경우 연/월/일 시/분 표시
  return full ? `${d}${t}` 
  // 오늘 날짜 이전 일경우에는 연/월/일 표시
    : dt.getTime() <= yesterday.getTime() ? `${d}`
  // 오늘 날짜일 경우에는 시/분 표시
    : `${t}`;
}

export const getMMDDByDate = (date: Date | undefined) => {
  if (!date) return "Unknown Date";
  const dt = new Date(date);
  let d: string = '';

  d += dt.getMonth()+1 < 10 ? `0${dt.getMonth()+1}` : `${dt.getMonth()+1}`;
  d += dt.getDate() < 10 ? `.0${dt.getDate()} ` : `.${dt.getDate()} `;
  
  return d;
}

// 이미지 포함여부를 확인하여 있을 경우 S3에 업로드 처리
// react quill 에서 이미지는 <img src={base64}> 로 사용함..
// 1. base64 를 이미지 파일로 변경
// 2. 서버 위치에 업로드
// 3. 업로드 된 경로로 img src 경로 변경
// 4. 서버 저장

export const checkUploadImage = async (content: any) => {

  const imgs: Array<string> = [];
  
  // base 64 이미지 포함 검사.
  let elImgList = content.match(new RegExp(/<img src="data:image\/\w+;base64,.*?>/g));
  
  if (elImgList) {
    for(let elImg of elImgList) {
      // base64 코드들 추출
      const base64 = elImg.replace(/<img src="data:image\/.*?;base64,/, "").substr(0, elImg.length-1);
      const base64Data: Buffer = Buffer.from(base64, 'base64');

      // 파일번호 채번
      await axios.post('/api/common/config/imageCount')
        .then(async (res) => {
          if (res.data.code === 200) {
            // S3에 저장.
            await axios.post('/api/common/upload', {
              fileName: `IM${res.data.newImageCount}`,
              file: base64Data
            })
              .then((res) => {
                if (res.data.code === 200) {
                  // 게시글 내용의 base64 이미지를 S3 이미지 경로로 변경.
                  content = content.replace(/data:image\/.*?;base64,/g, "");
                  content = content.replace(base64, `${res.data.url}">`);
                  imgs.push(res.data.url);
                }
                else {
                  // 업로드 실패
                }
            });
          }
        });
    }

    return { content, imgs };
  }
  else {
    return undefined;
  }
}

export const sendVerifyEmail = async (email: string) => {
  // 인증 이메일 전송
  const res = await axios.put('/api/common/email', {
    email
  })
    .then((res) => {
      if (res.data.code === 200) {
        // 메일 전송 성공
        return {result: 'success', message: res.data.message};
      }
      else if (res.data.code === 201) {
        // 이미 인증된 이메일
        return {result: 'fail', message: res.data.message};
      }
      else {
        // 메일 전송 실패
        return {result: 'error', message: res.data.message};
      }
    });

  return res;
}

export const sendVerifyEmailById = async (id: string, email: string) => {
  // 인증 이메일 전송
  const res = await axios.put('/api/common/id/email', {
    id,
    email
  })
    .then((res) => {
      if (res.data.code === 200) {
        // 메일 전송 성공
        return {result: 'success', message: res.data.message};
      }
      else if (res.data.code === 2005) {
        // 존재하지 않는 사용자
        return {result: 'fail', message: res.data.message};
      }
      else {
        // 메일 전송 실패
        return {result: 'error', message: res.data.message};
      }
    });

  return res;
}

export const checkVerifyEmail = async (email: string, emailCode: string) => {
  // 인증번호 확인
  const res = await axios.post('/api/common/email', {
    email,
    emailCode
  })
    .then((res) => {
      if (res.data.code === 200) {
        // 인증 성공
        return true;
      }
      else if (res.data.code === 201) {
        // 불일치
        return false;
      }
      else {
        // 실패
        return false;
      }
    });

  return res;
}

export const FindIdByEmail = async (email: string) => {
  const res = await axios.get('/api/common/find', {
    params: {
      email
    }
  })
  .then((res) => {
    if (res.data.code === 200) {
      return {result: 'success', message: res.data.message, id: res.data.id};
    }
    else {
      return {result: 'error', message: res.data.message};
    }
  });

  return res;
}

export const resetPassword = async (id: string, email: string) => {
  // 인증 이메일 전송
  const res = await axios.put('/api/common/reset', {
    id,
    email
  })
  .then((res) => {
    if (res.data.code === 200) {
      // 메일 전송 성공
      return {result: 'success', message: res.data.message};
    }
    else if (res.data.code === 201) {
      // 이미 인증된 이메일
      return {result: 'fail', message: res.data.message};
    }
    else {
      // 메일 전송 실패
      return {result: 'error', message: res.data.message};
    }
  });

  return res;
}

// 방문자 수 가져오기
export const getVisitCount = async () => {
  const r = await axios.get('/api/common/visit/count')
  .then((res) => {
    const { data } = res;
    if (data.code === 200)
      return data.visitorData;
    else
      return false;
  })
  .catch((e) => {
    console.log("GET VISIT COUNT ERROR > ", e);

    return false;
  })

  return r;
}
