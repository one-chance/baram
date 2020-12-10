import config from "conf/config.json";

import IMenu from "interfaces/Common/IMenu";

export const getSessionNameUserToken = () => {
  return config.sessionUserToken;
};

export const getBaseUrlForMainCarousel = () => {
  return config.baseUrlForMainCarousel;
};

export const getBaseUrlForAdventureImg = () => {
  return config.baseUrlForAdventureImg;
};

export const getBaseUrlForRaidImg = () => {
  return config.baseUrlForRaidImg;
};

export const getBaseUrlForPetItemImg = () => {
  return config.baseUrlForPetItemImg;
};

export const getBaseUrlForFonts = () => {
  return config.baseUrlForFonts;
};

export const getMenus = () => {
  const menus = Array<IMenu>();

  const res = config.menus.map((menu) => {
    menus.push(menu);

    return true;
  });
  
  return res ? menus : new Array<IMenu>();
}