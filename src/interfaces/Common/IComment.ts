import IWriter from 'interfaces/Common/IWriter';

interface IComment {
  seq: string,
  id: string,
  message: string,
  writer: IWriter
  comments?: Array<{
    seq: string,
    id: string,
    message: string,
    writer: IWriter
  }>
}

export default IComment;