import { atom } from 'recoil';

const GoldState = atom<Array<number>>({
  key: "GoldState",
  default: [0, 0, 0, 0, 0, 0],
});

export default GoldState;