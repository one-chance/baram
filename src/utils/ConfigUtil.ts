import config from 'conf/config.json';

import IMenu from 'interfaces/Common/IMenu';

export const getSessionNameUserToken = () => {
  return config.sessionUserToken;
}

export const getBaseUrlForMainCarousel = () => {
  return config.baseUrlForMainCarousel;
}

export const getBaseUrlForRaidImg = () => {
  return config.baseUrlForRaidImg;
}

export const getMenus = () => {
  const menus = Array<IMenu>();

  const res = config.menus.map((menu) => {
    menus.push(menu);

    return true;
  });
  
  return res ? menus : new Array<IMenu>();
}