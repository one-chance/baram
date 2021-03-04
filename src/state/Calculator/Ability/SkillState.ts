import { atom } from 'recoil';

const SkillState = atom<Array<number>>({
  key: "SkillState",
  default: [0, 0, 0, 0, 0, 0],
});

export default SkillState;