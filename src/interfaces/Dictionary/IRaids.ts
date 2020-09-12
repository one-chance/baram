import IItem from 'interfaces/Dictionary/IItem';

interface IDropItem {
  name: string,
  reward: Array<IItem>
}

export interface IRaid {
  idx: number,
  key: string,
  name: string,
  limitPower?: number | "-",
  limitEnter?: string,
  minPeopleCount?: number,
  maxPeopleCount?: number,
  maxEnterCount?: number | "-",
  reward: Array<IDropItem>,
  img: string,
}

export default interface IRaids {
  idx: number,
  key: string,
  section: string,
  raidInfos: Array<IRaid>
}