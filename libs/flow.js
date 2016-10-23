/**
 * // 参数action是一个function回调，比如
// function(i, data) {}
// i是当前步骤的索引，从0开始
// data是所有步骤存储的数据数组，因为本工作流提供数据存储，也自然提供获取
// data[i]即 第i步的数据
// action中的this指向为flow实例对象
flow.start(action); // start其实内部实现为调用next方法，因此start等同于next，其存在价值大概是为了语义
flow.next(action);  // next，添加下一步action
flow.done(action);  // done，完成所有步骤，该方法也是启动整个工作流的必须方法，也必须是最后调用。
// 如下API应该在流程添加的action中的条件控制中调用
// waiting()设计为一种标识作用，本身只是个空函数，当action中有prevStep, nextStep的方法调用时，该方法就不需要调用。
flow.prevStep(); // 在action中，完成某些任务之后调用该api将执行下一步action
flow.nextStep(); // 在action中，完成某些任务之后调用该api将返回执行上一步action
flow.waiting();  // 流程等待，停留在当前步骤中。
// data可选，在某一步action中，调用store, 传了data，将存储data，不传则为获取该步骤的data
// 在action中，如果有return语句，则return的值将自动被存储
// 例如 flow.next(function(i, data){
//    return {a: 1}; // 自动被存储为 data[i]
// });
flow.store(data)
// 一个详细的数据存储的例子
flow.next(function(i, data){
    // 以下获取数据方式是等价的
    var a = data[i];
    var b = this.store();

    // 以下存储数据方式是等价的
    this.store('hello store!');
    return 'hello store';
}).done(function(i, data){
    console.info(data[0]);// 输出第一步的数据： hello store
});

var flow = new Flow(), j = 0;
flow.start(function() {
    j++;
    console.info('j : ' + j);
}).next(function() {
    if (j > 2) {
        console.info('j = ' + j, ' 2秒后继续下一步')
        setTimeout(function(){
          flow.nextStep();
        }, 2000)
    } else {
        console.info('j = ' + j, ' 返回上一步')
        // 异步情况下：
        // setTimeout(function(){
        //   flow.prevStep();
        // }, 2000)
        this.prevStep();
    }
}).next(function () {
    console.info('j理应为3，实际 j = ' , j);
}).done();
// 输出结果：
// j : 1
// j = 1  返回上一步
// j : 2
// j = 2  返回上一步
// j : 3
// j = 3  2秒后继续下一步
// j理应为3，实际 j =  3
 */
function prototype(_class, protos) {
  Object.keys(protos).map(proto => {
    _class.prototype[proto] = protos[proto];
    return 1;
  });
}
function noop() {}

function Flow() {
  this.actions = [];
  this.data = [];
  this.stepIndex = 0;
}

function isWaiting(action) {
  const actionName = action.toString();

  return actionName.indexOf('.nextStep()') !== -1
    || actionName.indexOf('.prevStep()') !== -1
    || actionName.indexOf('.waiting()') !== -1;
}

prototype(Flow, {
  'start': function start(...args) {
    return this.next.apply(this, args);
  },
  'next': function next(action = noop) {
    this.actions.push(action);

    return this;
  },
  'done': function done(...args) {
    this.next.apply(this, args);

    return this.work();
  },
  'work': function work() {
    let i = this.stepIndex;
    const actions = this.actions;
    const l = actions.length;
    for (; i < l; i++) {
      this.store(actions[i].call(this, i, this.data));
      this.stepIndex = i + 1;
      if (isWaiting(actions[i])) {
        this.stepIndex = i;
        break;
      }
    }
    return this;
  },
  'store': function store(...args) {
    const { data } = args;
    if (args.length === 0) {
      return this.data[this.stepIndex];
    }
    this.data[this.stepIndex] = data;
    return this;
  },
  'nextStep': function nextStep() {
    this.stepIndex++;
    return this.work();
  },
  'prevStep': function prevStep() {
    this.stepIndex--;
    return this.work();
  },
  'waiting': noop
});

module.exports = Flow;
