const fs = require('fs');
const mkdirp = require('mkdirp');
const multiparty = require('multiparty');

/**
 * 解析上传,把值挂到req.body
 * @param  {[type]}   req
 * @param  {[type]}   res
 * @param  {Function} next
 * @return {[type]}
 */
module.exports = function upload(req, res, next) {
  if (!req.router || !req.is('multipart')) {
    next();

    return;
  }

  // cat set upload options through req.uploadOptions
  const options = Object.assign({
    uploadDir: this.get('uploadDir')
  }, req.uploadOptions);

  fs.access(options.uploadDir, fs.constants.W_OK, err => {
    if (err) {
      mkdirp.sync(options.uploadDir);
    }

    const form = new multiparty.Form(options);

    form.parse(req, (error, fields, files) => {
      // parse normal fields and files
      const inputs = Object.assign({}, fields, files);

      Object.keys(inputs).map(name => {
        const values = inputs[name];
        req.body[name] = values.length === 1 ? values[0] : values;

        return name;
      });

      next(error);
    });
  });
};
