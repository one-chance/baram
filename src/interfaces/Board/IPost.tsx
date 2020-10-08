import IWriter from 'interfaces/Common/IWriter';
import IComment from 'interfaces/Common/IComment';

interface IPost {
  seq?: number,
  section: number,
  title: string,
  content: string,
  writer: IWriter,
  viewCount: number,
  commentList?: Array<IComment>,
}

export default  IPost;