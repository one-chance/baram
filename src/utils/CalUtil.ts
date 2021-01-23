import axios from 'axios';
import IItemInfo from '../interfaces/Calculator/IItemInfo'
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

/*
* 아이템 옵션으로 이름 찾기
*/
export const SearchItemByOption = async (_name: string, _op1: number, _op2: number, _op3: number) => {
  var itemNames = Array<string>();
  await axios.get('/api/cal/searchitem', {
    params: {
      "name": _name,
      "op1": _op1,
      "op2": _op2,
      "op3": _op3
    }
  })
  .then((res) => {
    var items = res.data.items as Array<IItemInfo>;
    items.forEach(item => itemNames.push(item.name));

    return true;
  })
  .catch((e) => {
    alert(e)
    return false;
  });
  
  return itemNames;
}