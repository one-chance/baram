import axios from 'axios';

/*
* 계정 장비 정보 가져오기
*/
export const getItemData = async (_id: string) => {
  const res = await axios.get('/api/cal/item', {
      params: {
        "id": _id
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return false;
    });
  return res;
}