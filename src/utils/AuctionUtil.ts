import axios from 'axios';
import IMarketContent from 'interfaces/Auction/IMarketContent';

// NOTE 게시글 리스트 조회
export const getMarketItems = async (_filterUri?: string) => {
  let posts: Array<IMarketContent> = [];

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
  let posts: Array<IMarketContent> = [];

  return posts;
}