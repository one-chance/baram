import IAccount from 'interfaces/User/IAccount';

export default interface IUserInfo {
  key: number,
  id: string,
  email?: string,
  titleAccount?: IAccount,
  accountList?: Array<IAccount>,
  openKakao?: string,
  isActive: boolean,
  createDate: Date,
  editDate: Date,
  point?: number,
  grade?: string
}