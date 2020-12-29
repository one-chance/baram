export interface IMonster {
  idx: number,
  name: string,
  score: string,
  location: string
}

export interface IStuff {
  idx: number,
  name: string,
  score: number,
  obtain: string
}

export interface IMission {
  idx: number,
  name: string,
  score: number,
  npc: string
}

export interface IPlace {
  idx: number,
  name: string,
  score: number,
  location: string
}

export interface IRewardImg {
  idx: number,
  img: string
}

export interface IAdventure {
  idx: number,
  name: string,
  monsterList: Array<IMonster>,
  stuffList: Array<IStuff>,
  missionList: Array<IMission>,
  placeList: Array<IPlace>,
  rewardImgList: Array<IRewardImg>
}