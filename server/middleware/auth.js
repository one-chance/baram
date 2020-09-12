const jsonwebtoken = require('jsonwebtoken');
const config = require('../config.json');

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if ( !token ) {
    console.log("DO NOT FIND TOKEN INFORMATION");
    res.status(200).send({
      message: "접근 권한 정보가 없습니다.",
      code: 4002
    });
  }
  
  try {
    const decoded = jsonwebtoken.verify(token, config.secret);
    if (!decoded) {
      throw new Error("YOU CAN NOT ACCESSED"); 
    }
    
    next();

  } catch (error) {
    console.log("YOU CAN NOT ACCESSED");
    res.status(200).send({
      message: "접근 권한이 만료되었습니다.",
      code: 4003
    })
  }
}

module.exports = authMiddleware;