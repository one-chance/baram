import axios from 'axios';

import IPost from 'interfaces/Board/IPost';
import { getSignInUserId } from 'utils/UserUtil';
import * as CommonUtil from 'utils/ComoonUtil';

export const CreatePost = async (category: number, title: string, content: string) => {
  // Processing...
  const post: IPost = {
    section: category,
    title: title,
    content: content,
    viewCount: 0,
    writer: {
      creater: getSignInUserId(),
      createDateString: CommonUtil.getNowDateString(),
      editer: getSignInUserId(),
      lastEditDateString: CommonUtil.getNowDateString(),
    }
  }
  
  console.log(post);

  const res = await axios.post('/api/board/write', post)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return false;
    });

  return res;
}