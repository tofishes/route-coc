// class Stage
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

  this.notExist = name => new Error(`Stage ${name} does not exist`);
}

['before', 'after'].map(name => {
  Stage.prototype[name] = function filter(stageName, action) {
    const propname = `${name}s`;
    const actions = this[propname][stageName];

    if (! actions) {
      throw this.notExist(stageName);
    }

    actions.push(action);

    return this;
  };

  return name;
});
Stage.prototype.set = function set(prop, value) {
  this[prop] = value;
  return this;
};
Stage.prototype.get = function get(prop) {
  return this[prop];
};
Stage.prototype.run = function run() {
  const app = this.get('app');

  this.stages.map((stage, i) => {
    const name = this.stageNames[i];
    const befores = this.befores[name];
    const afters = this.afters[name];
    const actions = befores.concat([stage]).concat(afters);

    return actions.map(action => app.use(action.bind(this)));
  });
};

module.exports = Stage;
