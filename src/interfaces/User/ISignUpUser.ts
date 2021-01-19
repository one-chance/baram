export default interface ISignUpUser {
  id: string,
  password: string,
  email: string,
  salt?: string,
  createDateString?: string,
  editDateString?: string
}
