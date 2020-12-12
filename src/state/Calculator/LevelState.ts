import { atom } from 'recoil';

const LevelState = atom<number>({
  key: "LevelState",
  default: 0,
});

export default LevelState;