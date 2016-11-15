require('should');
const Task = require('../libs/task');

describe('Class Task', () => {
  const task = new Task();

  it('should init mode default parallel', () => {
    task.props.mode.should.equal('parallel');
  });

  it('should set mode to series', () => {
    task.mode(true);
    task.props.mode.should.equal('series');
  });
});
