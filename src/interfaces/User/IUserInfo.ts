export default interface IUserInfo {
  id: string,
  mail: string,
  server: string,
  character: string,
  isActive: boolean,
  createDateString: string,
  editDateString: string,
  // 인증 완료 시 사용 하게 될 항목들
  isAuth: boolean,
  point?: number,
  grade?: string,
  authDateString?: string,
}