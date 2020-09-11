import { atom } from 'recoil';

export default interface ISignUpUser {
  id: string,
  password: string,
  mail: string,
}

export const SignUpUserState = atom ({
  key: 'SignUpUserState',
  default: {
    id: "",
    password: "",
    mail: "",
  }
});