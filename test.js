const glob = require('glob');
const path = require('path');
const minimatch = require("minimatch");

// glob(`${__dirname}/routes/**/*.js`, (error, files) => {
//   console.log(__dirname, files);
// });

// console.log(minimatch('/home/ab1/include/cc', '**/include/**, /home'));
//
console.log(path.join('/home/abc', '/a.txt'));

const http = require("http");

const server = http.createServer((req, res) => {
    setTimeout(function () {
        res.writeHead(200);
        res.end();
    }, Math.random() * 100);
});

server.listen(8888);
