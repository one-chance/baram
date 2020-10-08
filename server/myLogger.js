const myLogger = (log) => {
  const dt = new Date().toLocaleString();

  console.log(`[${dt}] : ${log}`);
}

module.exports = myLogger;