import { atom } from 'recoil';

const ServerState = atom<string>({
  key: "ServerState",
  default: "서버",
});

export default ServerState;