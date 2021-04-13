import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const ServerState = atom<number>({
  key: "ServerState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export default ServerState;