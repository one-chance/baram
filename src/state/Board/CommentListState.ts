import { atom } from 'recoil';
import IComment from 'interfaces/Board/IComment';

const CommentListState = atom<Array<IComment>>({
  key: "CommentListState",
  default: [],
});

export default CommentListState;