import { atom } from 'recoil';
import IMyAlert from 'interfaces/Common/IMyAlert';

export const MyAlertState = atom({
  key: "MyAlertState",
  default: <IMyAlert>{
    isOpen: false,
    severity: "success",
    duration: 3000,
    message: "Success Alert Message"
  }
});