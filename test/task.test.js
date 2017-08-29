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

  it('should get undefined when not any tasks', () => {
    task.run(result => {
      const isEmpty = result === undefined;
      isEmpty.should.be.true; // eslint-disable-line
    });
  });

  it('should handle error right', () => {
    task.error(err => {
      err.message.should.containEql('handle error');
    });

    task.add(callback => {
      callback(new Error('handle error'), {});
    });

    task.run(result => {
      result.should.be.empty; // eslint-disable-line
    });
  });
});
