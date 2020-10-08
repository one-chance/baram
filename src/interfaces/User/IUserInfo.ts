interface IAccount {
  server: string,
  character: string,
  authDateString?: string
}

export default interface IUserInfo {
  id: string,
  mail?: string,
  titleAccount?: IAccount,
  accountList?: Array<IAccount>,
  openKakao?: string,
  isActive: boolean,
  createDateString: string,
  editDateString: string,
  point?: number,
  grade?: string
}