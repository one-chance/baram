import { atom } from 'recoil';

const ClothState = atom<Array<number>>({
  key: "ClothState",
  default: [0, 0, 0, 0, 0, 0],
});

export default ClothState;