import IRaids, { IRaid } from 'interfaces/Dictionary/IRaids';

const tempRaidList: Array<IRaid> = [
  {
    idx: 0,
    key: "0101",
    name: "검은용-일반",
    limitPower: 17000,
    limitEnter: "-",
    minPeopleCount: 1,
    maxPeopleCount: 10,
    maxEnterCount: "-",
    reward:[
      {
        name: "중국황제",
        reward: [
          {
            key: "xx",
            title: "용x노리개"
          },
        ]
      },
      {
        name: "검은용",
        reward: [
          {
            key: "xx",
            title: "흑룡의결정"
          },
          {
            key: "xx",
            title: "흑룡의용안"
          }
        ]
      }
    ],
    img: "blackDragon.png",
  },
  {
    idx: 1,
    key: "0102",
    name: "검은용-심연",
    limitPower: 37000,
    limitEnter: "-",
    minPeopleCount: 1,
    maxPeopleCount: 4,
    maxEnterCount: "-",
    reward:[
      {
        name: "검은용",
        reward: [
          {
            key: "xx",
            title: "용전설보급품"
          },
          {
            key: "xx",
            title: "기술서:검은용의 공포"
          }
        ]
      }
    ],
    img: "blackDragon.png",
  },
]

const tempRaidList2: Array<IRaid> = [
  {
    idx: 0,
    key: "0201",
    name: "구미호",
    limitPower: "-",
    limitEnter: "-",
    minPeopleCount: 1,
    maxPeopleCount: 10,
    maxEnterCount: 3,
    reward:[
      {
        name: "구미호",
        reward: [
          {
            key: "xx",
            title: "구미호의 영혼(병/갑/투)"
          },
          {
            key: "xx",
            title: "전설구미호 무기류"
          },
          {
            key: "xx",
            title: "전설구미호 방어구류"
          },
          {
            key: "xx",
            title: "순수여우구슬"
          },
          {
            key: "xx",
            title: "타락여우구슬"
          }
        ]
      }
    ],
    img: "blackDragon.png",
  },
]

export const getDicAllRaidList = () => {
  const dicRaidList: Array<IRaids> = [];
  dicRaidList.push({
    idx: 0,
    key: "01",
    section: "section1",
    raidInfos: tempRaidList
  });

  dicRaidList.push({
    idx: 0,
    key: "02",
    section: "section2",
    raidInfos: tempRaidList2
  });

  return dicRaidList;
}

export const getDicRaidBykey = (findKey: string) => {
  let resRaid;

  resRaid = tempRaidList.filter((raid) => raid.key === findKey);

  if (resRaid.length === 0) {
    resRaid = tempRaidList2.filter((raid) => raid.key === findKey);
  }

  return resRaid;
}