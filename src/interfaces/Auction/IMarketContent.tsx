import IItemInfo from "interfaces/Calculator/IItemInfo"

interface IMarketContent {
  seq?: number,
  server: number,
  item: IItemInfo,
  price: number,
  writer: string,
  remainDate: Date,
}

export default IMarketContent;