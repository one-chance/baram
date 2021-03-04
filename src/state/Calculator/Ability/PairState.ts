import { atom } from 'recoil';

const PairState = atom<Array<number>>({
  key: "PairState",
  default: [0, 0, 0, 0, 0, 0],
});

export default PairState;