import { atom } from 'recoil';

const GoldState2 = atom<Array<number>>({
  key: "GoldState2",
  default: [0, 0, 0, 0, 0, 0],
});

export default GoldState2;