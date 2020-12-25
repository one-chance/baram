export interface IMonster {
  idx: number,
  name: string,
  score: string,
  location: string
}

export interface IArticle {
  idx: number,
  name: string,
  score: string,
  obtain: string
}

export interface IMission {
  idx: number,
  name: string,
  score: string,
  npc: string
}

export interface IExploration {
  idx: number,
  name: string,
  score: string,
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
  articleList: Array<IArticle>,
  missionList: Array<IMission>,
  explorationList: Array<IExploration>,
  rewardImgList: Array<IRewardImg>
}