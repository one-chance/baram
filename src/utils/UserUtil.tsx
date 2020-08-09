import ISginInUser from 'interfaces/Common/ISginInUser';

export const SignInUser = (_id: string, _password: string) => {
  // Check DB

  // Create SignOn User Info
  const signInUser: ISginInUser = {
    id: _id,
  }

  // Session Store
  localStorage.setItem(
    "SignInUser",
    JSON.stringify(signInUser)
  );
}

export const LogoutUser = () => {
  localStorage.removeItem("SignInUser");
}

export const getSignInUserInfo = () => {
  const userInfo = localStorage.getItem("SignInUser");

  if ( userInfo === null ) {
    return "";
  }
  
  return JSON.parse(userInfo);
}

