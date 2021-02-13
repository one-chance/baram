export default interface ISignUpUser {
  id: string,
  password: string,
  email: string,
  salt?: string,
  createDate?: Date,
  editDate?: Date
}
