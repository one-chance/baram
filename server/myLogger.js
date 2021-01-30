const myLogger = log => {
  const dt = new Date();

  console.log(`[${dt}] : ${log}`);
};

module.exports = myLogger;
