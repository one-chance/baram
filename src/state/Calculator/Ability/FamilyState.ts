import { atom } from 'recoil';

const FamilyState = atom<Array<number>>({
  key: "FaamilyState",
  default: [0, 0, 0, 0, 0, 0],
});

export default FamilyState;