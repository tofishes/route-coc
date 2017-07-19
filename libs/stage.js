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
  const stage = this;
  const actions = this.actions;
  const originNext = next;
  const startIndex = 0;
  // 特别注意，nextStage不应改变全局变量
  function nextStage(error) {
    // 已响应了客户端，则不再继续任何处理
    if (res.hasSent || res.headersSent) {
      return;
    }

    // res.forward会产生多个流程，需打断原流程
    if (this.pathname !== req.pathname) {
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

    invokeAction(stageIndex); // eslint-disable-line no-use-before-define
  }
  // 提供跳过stage处理流程的功能
  nextStage.origin = originNext;

  function invokeAction(stageIndex) {
    actions[stageIndex].call(stage, req, res, nextStage.bind({
      'pathname': req.pathname, stageIndex
    }));
  }

  // 添加扩展属性
  // 增加一个pathname自定义属性，用于取代req.path
  // pathname可实现forward功能
  req.pathname = req.path.replace(/\/+/g, '/'); // 纠正多个/的问题
  req.stageIndex = startIndex;
  req.stage = res.stage = stage;

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
    // 让转发前的流程先执行并在下一个next时终止
    // 然后继续转发后的流程
    // 这样可以避免两个流程的变量污染
    process.nextTick(() => {
      invokeAction(req.stageIndex);
    });
  };

  invokeAction(startIndex);
};

module.exports = Stage;
