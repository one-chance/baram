import React from 'react';
import {getItemText} from 'utils/OcrUtil'
import { getBaseUrlForMainCarousel } from "utils/ConfigUtil";

const TesseractOcr = () => {
  var filename = getBaseUrlForMainCarousel() + 'item2.jpg'
  
  const [restxt, setResTxt] = React.useState<string>("");

  const _getItemTxt = async () => {
    setResTxt(await getItemText(filename))
  }
  _getItemTxt()
  
  return (
    <div>
      <img src={filename}></img>
      {restxt}
    </div>
  );
}

export default TesseractOcr;