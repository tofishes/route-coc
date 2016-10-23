module.exports = {
  '/post': {
    'post': {
      handle(req, res) {
        const body = JSON.stringify(req.body);
        res.send(`post body: ${body}`);
      }
    }
  }
};
