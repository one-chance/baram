export default interface ISignUpUser {
  id: string,
  password: string,
  salt?: string,
  createDateString: string,
  editDateString: string
}
