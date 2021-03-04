import { atom } from 'recoil';

const CharState = atom<Array<number>>({
  key: "CharState",
  default: [0, 0, 0, 0, 0, 0],
});

export default CharState;