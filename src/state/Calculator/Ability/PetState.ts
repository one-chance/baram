import { atom } from 'recoil';

const PetState = atom<Array<number>>({
  key: "PetState",
  default: [0, 0, 0, 0, 0, 0],
});

export default PetState;