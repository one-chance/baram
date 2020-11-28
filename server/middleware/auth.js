const jsonwebtoken = require('jsonwebtoken');
const config = require('../config.json');
const myLogger = require('../myLogger');

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if ( !token ) {
    myLogger("[ERROR] DO NOT FIND TOKEN INFORMATION IN REQUEST HEADER");
    res.redirect('/api/error/auth');
  }
  
  try {
    const decoded = jsonwebtoken.verify(token, config.secret);
    if (!decoded) {
      throw new Error("YOU CAN NOT ACCESSED"); 
    }
    
    next();
  } catch (error) {
    myLogger(`[AUTH ERROR] - [${error.name}] : ${error.message} at ${error.expiredAt}`);

    res.status(200).send({
      code: 401,
      message: "접근 권한이 만료되었습니다.",
      redirectUri: "/signin"
    });

    // res.redirect('/api/error/auth');
  }
}

module.exports = authMiddleware;