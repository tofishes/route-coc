const slash = '/';
const defaultModuleName = 'home';

// 获取路径中第一个单词作为moduleName
module.exports = function urlInfo(pathname) {
  const pathes = pathname.split(slash).filter(item => !!item);
  const moduleName = pathes[0] || defaultModuleName;

  return { moduleName, pathes };
};
