import axios from 'axios';
import IMarketItem from 'interfaces/Auction/IMarketItem';

// NOTE 게시글 리스트 조회
export const getMarketItems = async (_filterUri?: string) => {
  let posts: Array<IMarketItem> = [];

  // await axios.get(`/api/auction/market/find?${filter}`)
  await axios.get(`/api/auction/market/find?${_filterUri}`)
    .then((res) => {
      if (res.data.code === 200) {
        posts = Object.setPrototypeOf(res.data.posts, posts);
      }
      return true;
    })
    .catch((e) => {
      console.log(`FIND POSTS ERROR > ${e}`);

      return false;
    });

    return posts;
}

// 게시글 리스트 조회 더미
export const getMarketItemsDummy = async () => {
  let posts: Array<IMarketItem> = [];

  posts.push({seq: 1, item: "도토리", price: 3000, writer: "asdf", remainDate: new Date()});
  posts.push({seq: 2, item: "도톨", price: 3001, writer: "asdf", remainDate: new Date()});
  posts.push({seq: 3, item: "목검", price: 3005, writer: "asdf", remainDate: new Date()});
  posts.push({seq: 4, item: "목도", price: 3002, writer: "asdf", remainDate: new Date()});
  posts.push({seq: 5, item: "웅담", price: 3003, writer: "asdf", remainDate: new Date()});

  return posts;
}