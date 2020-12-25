interface IReward {
  count: string,
  name: string
}

export default interface IArcheology {
  idx: number,
  itemName: string,
  location: string,
  use: string,
  rewardList: Array<IReward>
}