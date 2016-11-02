module.exports = {
  '/*': {
    'api': 'http://113.108.139.178:9190/user/getUserInfo',
    'series': true,
    'name': 'userInfo',
    handle(data, req, res) {
      // res.forward('/proxy');
      return data;
    }
  }
};
