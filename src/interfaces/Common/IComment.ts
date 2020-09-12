import IWriter from 'interfaces/Common/IWriter';

interface IComment {
  key: string,
  id: string,
  message: string,
  writer: IWriter
  comments?: Array<{
    key: string,
    id: string,
    message: string,
    writer: IWriter
  }>
}

export default IComment;