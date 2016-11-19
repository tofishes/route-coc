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
    log.error(`Read value of ${chain} on '${keys[i]}' error:\n`, e.stack);
    value = defaultVal;
  }

  if (value === undefined || value === null) {
    value = defaultVal;
  }

  return value;
}
// strange! 非常奇怪，getValue函数定义不能换行，否则只要对data做了原型扩展，
// 暂不清楚，换行对headers设置有何种影响
// 在代理转发的地方(request-proxy.js)pipe(res)就会报如下错误：
// TypeError: The header content contains invalid characters
// at ServerResponse.OutgoingMessage.setHeader (_http_outgoing.js:358:11)
//
// https://www.alexkras.com/typeerror-the-header-content-contains-invalid-characters/
function getValue(chain, defaultVal) { return valueChain.set(valueChain(this, chain, defaultVal)); }
function getList(chain) { return getValue.call(this, chain, []); }
function getMap(chain) { return getValue.call(this, chain, {}); }

valueChain.set = obj => {
  if (!obj) {
    return obj;
  }
  // 扩展数据原型，增加getValue方法
  const proto = Object.getPrototypeOf(obj);
  proto.getValue = getValue;
  proto.getList = getList;
  proto.getMap = getMap;

  return obj;
};

module.exports = valueChain;
