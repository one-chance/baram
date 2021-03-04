import { atom } from 'recoil';

const TitleState = atom<Array<number>>({
  key: "TitleState",
  default: [0, 0, 0, 0, 0, 0],
});

export default TitleState;