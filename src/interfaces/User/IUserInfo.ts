interface IAccount {
  server: string,
  character: string,
  authDate?: string
}

export default interface IUserInfo {
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