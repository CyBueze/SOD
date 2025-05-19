const cons = require('consolidate');

module.exports.views = {
  extension: 'pug',
  getRenderFn: () => cons.pug,
  layout: false
};