import { atom } from 'recoil';

const EngraveState = atom<Array<number>>({
  key: "EngraveState",
  default: [9, 0, 0, 0, 0, 0],
});

export default EngraveState;