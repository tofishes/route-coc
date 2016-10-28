const cacheMap = {};

module.exports = (key, value) => {
  if (value) {
    cacheMap[key] = value;
    return value;
  }

  return cacheMap[key];
};
