import { atom } from 'recoil';
import IMyAlert from 'interfaces/Common/IMyAlert';

const myAlert: IMyAlert = {
  isOpen: false,
  severity: "success",
  duration: 3000,
  message: "Success Alert Message"
}

const MyAlertState = atom({
  key: "MyAlertState",
  default: myAlert
});

export default MyAlertState;