const myLogger = log => {
  const dt = new Date();

  let d = dt.getFullYear().toString();
  d += dt.getMonth()+1 < 10 ? `.0${dt.getMonth()+1}` : `.${dt.getMonth()+1}`;
  d += dt.getDate() < 10 ? `.0${dt.getDate()}` : `.${dt.getDate()}`;

  let t = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
  t += dt.getMinutes() < 10 ? `:0${dt.getMinutes()}` : `:${dt.getMinutes()}`;
  t += dt.getSeconds() < 10 ? `:0${dt.getSeconds()}` : `:${dt.getSeconds()}`;
  t += dt.getMilliseconds() < 100 ? 
        dt.getMilliseconds() < 10 ? `:00${dt.getMilliseconds()}` 
          : `:0${dt.getMilliseconds()}`
        : `:${dt.getMilliseconds()}`;

  console.log(`[${d} ${t}] : ${log}`);
};

module.exports = myLogger;
