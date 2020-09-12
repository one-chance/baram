export default interface ISignUpUser {
  id: string,
  mail: string,
  password: string,
  salt?: string
}
