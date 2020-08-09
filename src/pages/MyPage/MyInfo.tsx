import React from 'react';

import { getSignInUserInfo } from 'utils/UserUtil';
import Typography from '@material-ui/core/Typography';
import NoSignInUser from 'components/User/NoSignInUser';

const MyInfo = () => {

  const userInfo = getSignInUserInfo();

  return (
    <React.Fragment>
      {
        userInfo === "" ?
          <NoSignInUser />
        :
          <Typography>
            LOGIN USER ID - {userInfo.id}
          </Typography>
      }
    </React.Fragment>
  )
}

export default MyInfo;