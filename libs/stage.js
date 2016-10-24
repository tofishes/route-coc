// class Stage
// express中叫 layer, 这里则称为 stage（阶段），代表某个处理阶段
const concat = Array.prototype.concat;
function Stage(stages) {
  const befores = {};
  const afters = {};

  this.stages = stages;
  this.stageNames = stages.map(stage => {
    const name = stage.name;

    befores[name] = [];
    afters[name] = [];

    return name;
  });
  this.befores = befores;
  this.afters = afters;
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
Stage.prototype.set = function set(prop, value) {
  this[prop] = value;
  return this;
};
Stage.prototype.get = function get(prop) {
  return this[prop];
};
Stage.prototype.handle = function handle(req, res, next) {
  const actions = this.actions;
  const originNext = next;
  const startIndex = 0;
  // 特别注意，nextStage不应改变全局变量
  const nextStage = () => {
    const prevIndex = req.stageIndex;
    const stageIndex = prevIndex + 1;
    const isLast = stageIndex === actions.length;

    if (isLast) {
      originNext();
      return;
    }

    req.stageIndex = stageIndex;
    actions[stageIndex](req, res, nextStage);
  };

  // 增加一个pathname自定义属性，用于取代req.path
  // pathname可实现forward功能
  req.pathname = req.path;
  res.forward = pathname => {
    if (pathname === req.path) {
      throw new Error('foward path cannot be the same as req.path!');
    }

    req.pathname = pathname;
    req.stageIndex = 0;
    actions[req.stageIndex](req, res, nextStage);
  };

  req.stageIndex = startIndex;
  actions[startIndex](req, res, nextStage);
};

module.exports = Stage;
