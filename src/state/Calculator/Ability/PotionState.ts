import { atom } from 'recoil';

const PotionState = atom<Array<number>>({
  key: "PotionState",
  default: [0, 0, 0, 0, 0, 0],
});

export default PotionState;