import { atom } from 'recoil';

const AwakState = atom<Array<number>>({
  key: "AwakState",
  default: [0, 0, 0, 0, 0, 0],
});

export default AwakState;