const fs = require('fs');
const multiparty = require('multiparty');

/**
 * 解析上传,把值挂到req.body
 * @param  {[type]}   req
 * @param  {[type]}   res
 * @param  {Function} next
 * @return {[type]}
 */
module.exports = function upload(req, res, next) {
  if (!req.router) {
    next();

    return;
  }

  if (req.is('multipart')) {
    // cat set upload options through req.uploadOptions
    const options = Object.assign({
      uploadDir: this.get('uploadDir')
    }, req.uploadOptions);

    const form = new multiparty.Form(options);

    form.parse(req, (err, fields, files) => {
      // parse normal fields and files
      const inputs = Object.assign({}, fields, files);

      Object.keys(inputs).map(name => {
        const values = inputs[name];

        req.body[name] = values.length === 1 ? values[0] : values;
      });

      next(err);
    });

    return;
  }

  next();
};
