import axios from 'axios';

/*
* ㅁㅁ
*/
export const getItemData = async (_id: string) => {
  const res = await axios.get('/api/cal/item', {
      params: {
        "id": _id
      }
    })
    .then((res) => {
      console.log(res.data.item);
      return res.data;
    })
    .catch((e) => {
      return false;
    });
  return res;
}