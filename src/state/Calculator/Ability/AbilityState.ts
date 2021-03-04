import { atom } from 'recoil';

const AbilityState = atom<Array<number>>({
  key: "AbilityState",
  default: [9, 0, 0, 0, 0, 0],
});

export default AbilityState;