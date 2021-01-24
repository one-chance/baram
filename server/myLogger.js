const myLogger = log => {
  const dt = new Date().toLocaleString().split(" ├")[0];

  console.log(`[${dt}] : ${log}`);
};

module.exports = myLogger;
