import { atom } from 'recoil';

const AnimalState = atom<Array<number>>({
  key: "AnimalState",
  default: [9, 0, 0, 0, 0, 0],
});

export default AnimalState;