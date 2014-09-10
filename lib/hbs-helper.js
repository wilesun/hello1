var hbs = require('hbs');

hbs.registerHelper('strArray', function(obj, context) {
  if (!obj)
    return '[]';
  if (Array.isArray(obj)) {
    var buf = '\'' + obj[0] + '\'';
    for (var i = 1; i < obj.length; i++) {
      buf += ',\'' + obj[i] + '\'';
    }
    return '[' + buf + ']';
  }
  return '[\'' + obj + '\']';
});

hbs.registerHelper('blocks', function(names, context) {
  if (!names)
    return;
  var buf = '';
  names.forEach(function(name) {
    var f = hbs.handlebars.partials[name];
    if (f) {
      buf += '\n' + (hbs.compile(f))(context);
    }
  });
  return new hbs.handlebars.SafeString(buf);
});

hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a == b)
    return opts.fn(this);
  else
    return opts.inverse(this);
});

hbs.registerHelper('tif', function(value, fval, opts) {
  if (value) {
    return value;
  } else {
    return fval;
  }
});
