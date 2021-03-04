import { atom } from 'recoil';

const GoldState1 = atom<Array<number>>({
  key: "GoldState1",
  default: [0, 0, 0, 0, 0, 0],
});

export default GoldState1;