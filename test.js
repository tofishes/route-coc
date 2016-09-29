const glob = require('glob');

glob(`${__dirname}/routes/**/*.js`, (error, files) => {
  console.log(__dirname, files);
});
