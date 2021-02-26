import axios from 'axios';
import IItemInfo from '../interfaces/Calculator/IItemInfo'
import IItemOptionInfo from '../interfaces/Calculator/IItemOptionInfo'
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
* 아이템 이름으로 검색하기
*/
export const SearchItemByName = async (_name: string) => {
  var itemNames = Array<IItemInfo>();
  await axios.get('/api/cal/searchitem', {
    params: {
      "name": _name
    }
  })
  .then((res) => {
    itemNames = res.data.items as Array<IItemInfo>;

    return true;
  })
  .catch((e) => {
    alert(e)
    return false;
  });
  
  return itemNames;
}

/*
* 아이템 옵션으로 검색하기
*/
export const SearchItemByOption = async (_op1: number, _op2: number, _op3: number) => {
  var itemNames = Array<IItemInfo>();
  await axios.get('/api/cal/searchitem', {
    params: {
      "op1": _op1,
      "op2": _op2,
      "op3": _op3
    }
  })
  .then((res) => {
    itemNames = res.data.items as Array<IItemInfo>;

    return true;
  })
  .catch((e) => {
    alert(e)
    return false;
  });
  
  return itemNames;
}

/*
* 아이템 이름, 옵션으로 검색하기
* _name = "" 이면 쿼리에 들어가지 않음
* _op = 0 이면 쿼리에 들어가지 않음
*/
export const SearchItem = async (_name: string, _op1: number, _op2: number, _op3: number) => {
  var items = Array<IItemInfo>();
  await axios.get('/api/cal/searchitem', {
    params: {
      "name": _name,
      "op1": _op1,
      "op2": _op2,
      "op3": _op3
    }
  })
  .then((res) => {
    items = res.data.items as Array<IItemInfo>;
    return true;
  })
  .catch((e) => {
    alert(e)
    return false;
  });
  
  return items;
}

/*
* 아이템 이름으로 옵션 검색하기
*/
export const SearchOptionByName = async (_name: string) => {
  var itemOptions : IItemOptionInfo | null;
  itemOptions = null;

  await axios.get('/api/cal/searchoption', {
    params: {
      "name": _name
    }
  })
  .then((res) => {
    itemOptions = res.data.items as IItemOptionInfo;
    return true;
  })
  .catch((e) => {
    alert(e)
    return false;
  });
  
  return itemOptions;
}