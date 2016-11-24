// class Stage
// express中叫 layer, 这里则称为 stage（阶段），代表某个处理阶段
const concat = Array.prototype.concat;
function Stage(stages) {
  const befores = {};
  const afters = {};

  this.stages = this.actions = stages;
  this.stageNames = stages.map(stage => {
    const name = stage.name;

    befores[name] = [];
    afters[name] = [];

    return name;
  });
  this.befores = befores;
  this.afters = afters;
  this.props = {};
}

['before', 'after'].map(filterName => {
  Stage.prototype[filterName] = function filter(stageName, action) {
    const propname = `${filterName}s`;
    const filters = this[propname][stageName]; // this.befores[stagesName];

    if (! filters) {
      throw new Error(`Stage ${name} does not exist`);
    }

    filters.push(action);

    this.merge();

    return this;
  };

  return filterName;
});
Stage.prototype.merge = function merge() {
  // 合并所有的filter、stage
  this.actions = [];
  this.stages.map((stage, i) => {
    const name = this.stageNames[i];
    const befores = this.befores[name];
    const afters = this.afters[name];
    this.actions = concat.call(this.actions, befores, [stage], afters);

    return null;
  });
};
Stage.prototype.set = function set(name, value) {
  this.props[name] = value;
  return this;
};
Stage.prototype.get = function get(name) {
  return this.props[name];
};
Stage.prototype.handle = function handle(req, res, next) {
  const actions = this.actions;
  const originNext = next;
  const startIndex = 0;
  // 特别注意，nextStage不应改变全局变量
  const nextStage = (error) => {
    // 已响应了客户端，则不再继续任何处理
    if (res.hasSent || res.headersSent) {
      return;
    }

    if (error) {
      originNext(error);
      return;
    }

    const prevIndex = req.stageIndex;
    const stageIndex = prevIndex + 1;
    const isLast = stageIndex === actions.length;

    if (isLast) {
      originNext();
      return;
    }

    req.stageIndex = stageIndex;
    // TODO nextOnce can't be used;
    // const nextOnce = () => {
    //   if (nextOnce.invoked) {
    //     return;
    //   }

    //   nextOnce.invoked = true;
    //   nextStage();
    // };

    actions[stageIndex](req, res, nextStage);
  };
  // 提供跳过stage处理流程的功能
  nextStage.origin = originNext;

  // 添加扩展属性
  // 增加一个pathname自定义属性，用于取代req.path
  // pathname可实现forward功能
  req.pathname = req.path;
  req.stageIndex = startIndex;

  res.apiData = {};
  res.apiInfo = {};
  res.forward = pathname => {
    if (pathname === req.path) {
      const error = new Error('foward path cannot be the same as req.path!');
      originNext(error);
      return;
    }

    res.forwardSent = true;
    req.pathname = pathname;
    req.stageIndex = 0;
    actions[req.stageIndex](req, res, nextStage);
  };

  actions[startIndex](req, res, nextStage);
};

module.exports = Stage;
