const iosRex = /(i(?:pad|phone|pod))(?:.*)cpu(?: i(?:pad|phone|pod))? os (\d+(?:[\.|_]\d+){1,})/;

module.exports = (userAgent) => {
  if (!userAgent) {
    return {};
  }

  const ua = userAgent.toLowerCase();

  const match = /(webkit)[ \/]([\w.]+)/.exec(ua)
    || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua)
    || /(msie) ([\w.]+)/.exec(ua)
    || !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua)
    || [null, null, 0];
  let version = match[2];
  const kernel = match[1];

  let mobile = false;
  const android = ua.match(/(android)\s+([\d.]+)/);
  const ios = ua.match(iosRex);
  const isWechat = !!ua.match(/micromessenger/i);

  if (android) {
    version = +android[2];
    mobile = 'android';
  } else if (ios) {
    version = parseFloat(ios[2].replace(/_/g, '.'));
    mobile = 'ios';
  }

  return {
    version,
    mobile,
    isWechat,
    ie: kernel === 'msie',
    gecko: (ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1),
    webkit: (ua.indexOf('webkit') > -1),
    opera: (ua.indexOf('opera') > -1),
  };
};
