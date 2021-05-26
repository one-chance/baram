import IWriter from 'interfaces/Common/IWriter';

interface IRecomment {
  idx: number,
  message: string,
  writer: IWriter,
  isDeleted: boolean
}

export default IRecomment;