// 연 호동 하자 유리 무휼 진
export type ServerType =
  | "yeon"
  | "hodong"
  | "haja"
  | "yuri"
  | "muhyul"
  | "jin";

interface IServer {
  key: ServerType,
  name: string
}

export default IServer;