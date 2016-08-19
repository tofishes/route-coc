const noop = () => {};
const separator = ',';
/**
 * 配置对象中key是以逗号间隔的字符串，解析为两个或多个配置，并返回新的配置
 * @param  {[type]} map  [description]
 * @param  {[type]} each [description]
 * @return {[type]}      [description]
 */
module.exports = function parseMultiName(map, each = noop) {
  const keys = Object.keys(map);
  const newMap = {};

  keys.forEach(name => {
    const names = name.split(separator);

    if (names.length > 1) {
      names.forEach(item => {
        newMap[item.trim()] = map[name];
        // 注意：map[name]是同一个对象引用，each方法需注意
        each(item, map[name]);
      });
    } else {
      newMap[name] = map[name];
      each(name, map[name]);
    }
  });

  return newMap;
};
