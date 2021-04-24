import IAccount from 'interfaces/User/IAccount';

export default interface IWriter {
  key: number,
  id: string,
  titleAccount: IAccount,
  createDate?: Date,
  lastEditDate?: Date,
}