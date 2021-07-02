import IWriter from "interfaces/Common/IWriter";
import IComment from "interfaces/Board/IComment";
import { ServerType } from "interfaces/Common/IServer";

export type CategoryType = "tip" | "free" | "photo" | "server" | "trade" | "video";

interface IPost {
  seq?: number;
  category: CategoryType;
  server?: ServerType;
  title: string;
  content: string;
  writer: IWriter;
  viewCount: number;
  commentCount: number;
  commentList: Array<IComment>;
  recommendUserList: Array<string>;
  imgs?: Array<string>;
}

export default IPost;
