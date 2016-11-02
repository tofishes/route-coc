const log = require('t-log');

function valueChain(data, chain, defaultVal) {
  const keys = chain.split('.');
  const l = keys.length;
  let i = 0;
  let value = data;

  try {
    for (; i < l; i++) {
      value = value[keys[i]];
    }
  } catch (e) {
    log.error(`read value of ${chain} on '${keys[i]}' error:\n`, e.stack);
    value = defaultVal;
  }

  if (value === undefined || value === null) {
    value = defaultVal;
  }

  return value;
}
valueChain.set = obj => {
  if (!obj) {
    return obj;
  }
  // 扩展数据原型，增加getValue方法
  const proto = Object.getPrototypeOf(obj);
  proto.getValue = function getValue(chain, defaultVal) {
    return valueChain(this, chain, defaultVal);
  };

  return obj;
};

module.exports = valueChain;
