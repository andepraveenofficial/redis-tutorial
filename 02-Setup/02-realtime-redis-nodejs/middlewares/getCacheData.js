const client = require("../config/redis");

const getCacheData = (key) => async (res, req, next) => {
  const cacheExist = await client.exists(key);

  if (cacheExist) {
    const cacheValue = await client.get("todos");
    const data = JSON.parse(cacheValue);
    res.json(data);
  } else {
    next();
  }
};

module.exports = getCacheData;
