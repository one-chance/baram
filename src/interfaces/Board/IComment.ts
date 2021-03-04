import IWriter from 'interfaces/Common/IWriter';
import IRecomment from 'interfaces/Board/IRecomment';

interface IComment {
  idx?: number,
  message: string,
  writer: IWriter,
  recommentCount: number,
  recommentList: Array<IRecomment>,
  isDeleted: boolean
}

export default IComment;