import { atom } from 'recoil';

const EquipState = atom<Array<number>>({
  key: "EquipState",
  default: [2, 0, 0, 0, 0, 0],
});

export default EquipState;