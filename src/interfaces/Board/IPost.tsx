import IWriter from 'interfaces/Common/IWriter';
import IComment from 'interfaces/Common/IComment';

interface IPost {
  key: string,
  section: string,
  title: string,
  content: string,
  writer: IWriter,
  viewCount: number,
  comments?: Array<IComment>,
}

export default  IPost;